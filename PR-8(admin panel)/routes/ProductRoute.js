const express = require('express');

const path = require('path');

const routes = express.Router();

const {  addProductPage, productPage, addProduct, deleteProduct, ajaxCategory, ajaxsubcategory, changeStatus, editProduct, updateProduct,} = require('../controller/ProductController');

const multer = require('multer');

const st = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const passport = require('passport');

const fileUpload = multer({storage:st}).single("image");

routes.get('/',passport.checkUser,productPage)
routes.get('/addproductpage',passport.checkUser,addProductPage)
routes.post('/addproduct',fileUpload,addProduct)
routes.get('/deleteproduct',deleteProduct)
routes.get('/ajaxGetcategory',ajaxCategory);
routes.get('/ajaxGetsubcategory',ajaxsubcategory);
routes.get('/changeStatus',changeStatus);
routes.get('/editproduct',editProduct);
routes.post('/updateproduct',fileUpload,updateProduct);


module.exports = routes;