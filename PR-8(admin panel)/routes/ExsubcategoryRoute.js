const express = require('express');

const routes = express.Router();

const {  addexsubcategoryPage, viewexsubcategoryPage,insertExsubcategory,ajaxCategory,deleteExsubcategory,editExsubcategory, changeStatus, updateExsubCategory} = require('../controller/ExsubcategoryController');

const passport = require('passport');

routes.get('/',passport.checkUser,viewexsubcategoryPage);
routes.get('/addexsubcategorypage',passport.checkUser,addexsubcategoryPage);
routes.post('/insertexsubcategory',insertExsubcategory);
routes.get('/ajaxGetcategory',ajaxCategory);
routes.get('/deleteexsubcategory',deleteExsubcategory);
routes.get('/editexsubcategory',editExsubcategory);
routes.post('/updateexsubcategory',updateExsubCategory);
routes.get('/changestatus',changeStatus);

module.exports = routes;