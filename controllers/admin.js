const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log("rREQ.USER",req.user)
  const product = new Product({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description,
    userId:req.user
  });
  product.save().then((uu)=>{
    console.log('product created',uu)
    res.redirect('/');
  }).catch((vv)=>{
    console.log(vv)
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });

    Product.findById(prodId).then((ff)=>{

  res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: ff
    });

    })



};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');

 Product.findById(prodId).then((product)=>{
product.title=updatedTitle;
product.price=updatedPrice;
product.imageUrl=updatedImageUrl;
product.description=updatedDesc;
return product.save();
 }).then((kk)=>{
  res.redirect('/admin/products');
 })


};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });


  Product.find().then((gg)=>{
    
    res.render('admin/products',{
      prods: gg,
          pageTitle: 'Admin Products',
          path: '/admin/products'
    })
  }).catch((rrr)=>{
    res.send(rrr)
  })



};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByIdAndDelete(prodId).then((oo)=>{
//     console.log('deleted')
//     res.redirect('/admin/delete-products');

//   })
   
// };
exports.postDeleteProd=(req,res,next)=>{
  const prodId = req.body.productId;

  // Product.findById(prodId).then((gg)=>{

  //   res.render('admin/edit-product', {
  //     pageTitle: 'delete Product',
  //     path: '/admin/delete-product',
  //     editing: editMode,
  //     product: ff
  //   });
  // })


  Product.findByIdAndDelete(prodId).then((bb)=>{
console.log('Product deleted..')
res.redirect('/admin/products')
  }).catch((tt)=>{
    res.send(tt)
  })
  
}