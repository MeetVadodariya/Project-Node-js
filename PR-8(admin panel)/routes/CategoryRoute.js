const express = require('express');

const routes = express.Router();

const { addCategoryPage, viewCategoryPage, insertCategory, deleteCategory, editCategory, updateCategory,changeStatus } = require('../controller/CategoryController');

const passport = require('passport');

routes.get('/addcategory',passport.checkUser,addCategoryPage);
routes.get('/viewcategory',passport.checkUser,viewCategoryPage);
routes.post('/insertcategory',insertCategory);
routes.get('/deleteCategory',deleteCategory);
routes.get('/edit',editCategory);
routes.post('/updateCategory',updateCategory);
routes.get('/changestatus',changeStatus);

module.exports = routes;