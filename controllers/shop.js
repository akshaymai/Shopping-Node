const Product = require('../models/product');
const Cart = require('../models/cart');
const Order=require('../models/order')

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });
  Product.find().then((gg)=>{
    console.log('List of all prod',gg)
    res.render('shop/product-list',{
      prods: gg,
          pageTitle: 'All Products',
          path: '/products'
    })
  }).catch((rrr)=>{
    res.send(rrr)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findById(prodId, product => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   }
  // });

  Product.findById(prodId).then((product)=>{
    console.log("My prod list",product)
  res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path: '/products'
  })
  })
  
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
  Product.find().then((gg)=>{
   console.log(gg)
    res.render('shop/index',{
      prods: gg,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch((gg)=>{
    res.send(gg)
  })
};

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });


  req.user.populate('cart.items.productId').execPopulate().then((prod)=>{
    
    res.render('shop/cart',{
      path: '/cart',
      pageTitle: 'Your Cart',
      products:  prod.cart.items
    })
  })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteProduct(prodId).then((tt)=>{
    res.redirect('/cart');
  }).catch((rr)=>{
    res.send(rr)
  })
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};
exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.postOrders=(req,res,next)=>{

req.user.populate('cart.items.productId').execPopulate()
.then((user)=>{
  const products=user.cart.items.map((i)=>{
    return {product:{...i.productId._doc},quantity:i.quantity}
  })

const order=new Order({
  user:{
    name:req.user.name,
    userId:req.user
  },
  products:products
})
order.save().then((tt)=>{
 return  req.user.clearCard()
 
}).then(()=>{
  res.redirect('/orders')
}).catch((err)=>{
  console.log(err)
})
})

}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

 
