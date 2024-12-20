const express = require('express');

const routes = express.Router();

const { subcategoryPage, addsubCategory, insertSubcategory, deletesubCategory, editsubCategory, updateSubCategory, changeStatus } = require('../controller/subcategoryController');

const passport = require('passport');

routes.get('/',passport.checkUser,subcategoryPage);
routes.get('/addsubcategory',passport.checkUser,addsubCategory);
routes.post('/insertsubcategory',insertSubcategory);
routes.get('/deletesubcategory',deletesubCategory);
routes.get('/editsubcategory',editsubCategory);
routes.post('/updatesubcategory',updateSubCategory);
routes.get('/changestatus',changeStatus);

module.exports = routes;