const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/subcategoryModel');
const ExsubcategoryModel = require('../models/exsubcategoryModel');
const ProductModel = require('../models/ProductModel');

const fs = require('fs')

const productPage = async (req,res) => {
    const product = await ProductModel.find({}).populate("categoryId").populate("subcategoryId").populate("exsubcategoryId");

    return res.render('view_product',{
        product 
    })
}

const addProductPage = async (req,res) => {
    try {

        const category = await CategoryModel.find({status : 'active'});
        const subcategory = await SubcategoryModel.find({status : 'active'});
        const exsubcategory = await ExsubcategoryModel.find({status : 'active'});

        res.render('add_product',{
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory,
        })
        
    } catch (error) {
     console.log(error);
     return false;
    }
}

const addProduct = async(req, res) => {
    try{

        const {category,subcategory,exsubcategory,product,price,desc} = req.body;

        await ProductModel.create({
          categoryId : category,
          subcategoryId : subcategory,
          exsubcategoryId : exsubcategory,
          name : product,
          price : price,
          description : desc,
          image : req.file.path
        });
        
        return  res.redirect("/product");
    }catch(err){
      console.log(err);
      return false;
    }
 };

const deleteProduct = async (req,res) => {
    try {
        
        let id = req.query.id;

        await ProductModel.findByIdAndDelete(id);
        return res.redirect('/product')
    } catch (error) {
        console.log(error);
        return false;
    }
}

const ajaxCategory = async (req,res) => {
    try {
      let id = req.query.id;
      let category = await SubcategoryModel.find({categoryId:id});
      
      return res.send({
          success : true,
          message : "record successfully fetch",
          category
      })
    } catch (error) {
       console.log(error);
       return false;
    }
}

const ajaxsubcategory = async (req,res) => {
    try {
        let id = req.query.id;

        let subcategory = await ExsubcategoryModel.find({subcategoryId:id});
      
      return res.send({
          success : true,
          message : "record successfully fetch",
          subcategory
      })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const changeStatus = async (req, res) => {
    try {
        const status = req.query.status;
        const id = req.query.id;
        if (status == "active") {
            await ProductModel.findByIdAndUpdate(id, { status: "deactive" })
            return res.redirect('/product')
        } else {
            await ProductModel.findByIdAndUpdate(id, { status: "active" })
            return res.redirect('/product')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
  }

  const editProduct = async (req,res) => {
    try {
        let id = req.query.editid;


        const category = await CategoryModel.find({status : 'active'});
        const subcategory = await SubcategoryModel.find({status : 'active'});
        const exsubcategory = await ExsubcategoryModel.find({status : 'active'});

        let single = await ProductModel.findById(id).populate("categoryId").populate("subcategoryId").populate("exsubcategoryId");

        return res.render('edit_product',{
            category:category,
            subcategory:subcategory,
            exsubcategory:exsubcategory,
            single
        })
    } catch (error) {
        console.log(error);
        return false;
    }
  }

const updateProduct = async (req , res) => {
    try {        
        const { editid, category, subcategory, exsubcategory, product, price, desc } = req.body;
        
        let single = await ProductModel.findById(editid);

        if (req.file) {
            // Delete the old image file
            fs.unlinkSync(single.image);

            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                name: product,
                price: price,
                description: desc,
                image: req.file.path
            });
            console.log("Record updated with new image");
            return res.redirect('/product');
        } else {
            await ProductModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                name: product,
                price: price,
                description: desc,
                image: single.image // Keep the old image if no new one is provided
            });
            console.log("Record updated without new image");
            return res.redirect('/product');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {addProductPage,productPage,addProduct,deleteProduct,ajaxCategory,ajaxsubcategory,changeStatus,editProduct,updateProduct}