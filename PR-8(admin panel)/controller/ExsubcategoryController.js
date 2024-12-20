const CategoryModel = require('../models/CategoryModel');
const SubcategoryModel = require('../models/subcategoryModel');
const ExsubcategoryModel = require('../models/exsubcategoryModel');

const viewexsubcategoryPage = async (req,res) =>{
    try {
        let exsubcategory = await ExsubcategoryModel.find({}).populate("categoryId").populate("subcategoryId");
        console.log(exsubcategory);
        
        return res.render('view_exsubcategory',{
            exsubcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addexsubcategoryPage = async (req,res) =>{
        try {
            let category = await CategoryModel.find({});
            let subcategory = await SubcategoryModel.find({});
            return res.render('add_exsubcategory',{
                category,
                subcategory,
            })
        } catch (error) {
            console.log(error);
            return false;
        }
}

const insertExsubcategory = async (req,res) =>{
    try {
        const {category,subcategory,exsubcategory} = req.body;
        await ExsubcategoryModel.create({
            categoryId : category,
            subcategoryId : subcategory,
            exsubcategory : exsubcategory,
        })
        console.log("Exsubcategory add");
        return res.redirect('/exsubcategory');
        
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

const deleteExsubcategory  = async (req,res) => {
      try {
        let id = req.query.id;
        await ExsubcategoryModel.findByIdAndDelete(id);
        return res.redirect('/exsubcategory')

      } catch (error) {
        console.log(error);
        return false;
      }
}

const editExsubcategory = async (req,res) => {
    try {
        let id = req.query.id;
        const category = await CategoryModel.find({status : 'active'});
        const subcategory = await SubcategoryModel.find({status : 'active'});
        const single = await ExsubcategoryModel.findById(id).populate("categoryId").populate("subcategoryId");
        return res.render('edit_exsubcategory',{
          category:category,
          subcategory:subcategory,
          single:single,
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateExsubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory , exsubcategory } = req.body;
        await ExsubcategoryModel.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory:exsubcategory,
        })
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return false;
    }
  }
  

const changeStatus = async (req, res) => {
    try {
        const status = req.query.status;
        const id = req.query.id;
        if (status == "active") {
            await ExsubcategoryModel.findByIdAndUpdate(id, { status: "deactive" })
            return res.redirect('/exsubcategory')
        } else {
            await ExsubcategoryModel.findByIdAndUpdate(id, { status: "active" })
            return res.redirect('/exsubcategory')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
  }

module.exports = {viewexsubcategoryPage,addexsubcategoryPage,insertExsubcategory,ajaxCategory,deleteExsubcategory,editExsubcategory,updateExsubCategory,changeStatus}