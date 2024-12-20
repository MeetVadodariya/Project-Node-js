const category = require('../models/CategoryModel');
const CategoryModel = require('../models/CategoryModel');

const addCategoryPage = (req,res) =>{
    return res.render('add_category')
};

const viewCategoryPage = async (req,res) =>{
try {
    let categories = await CategoryModel.find({});
    return res.render('view_category',{categories})

} catch (error) {
    console.log(error);
    return false;
}};

const insertCategory = async (req,res) => {

   try {
    await CategoryModel.create({
        category_name : req.body.category,
    })
    console.log("category successfully create");
    req.flash('success','category successfully add!!')
    return res.redirect('/category/addcategory')
    
   } catch (error) {
    console.log(error);
    return false;
   }
   
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.query.id;
        await CategoryModel.findByIdAndDelete(id);
        req.flash('danger',"category succesfully delete")
        return res.redirect('/category/viewcategory')
    } catch (err) {
        console.log(err);
        return false;
    }
}

const editCategory = async (req, res) => {
    try {
        const id = req.query.id;
        let single = await CategoryModel.findById(id);
        return res.render('edit_category', {
            single
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        await CategoryModel.findByIdAndUpdate(req.body.editid, {
            category_name: req.body.category
        })
        return res.redirect('/category/viewcategory')
    } catch (err) {
        console.log(err);
        return false;
    }
}

const changeStatus = async(req,res) =>{
       try {
        let id = req.query.id;
        let st = req.query.status;
        if (st == "active") {
            await CategoryModel.findByIdAndUpdate(id,{status:"deactive"})
            req.flash("success",'status successfully changed!');
            return res.redirect('/category/viewcategory')
        } else {
            await CategoryModel.findByIdAndUpdate(id,{status:"active"})
            req.flash("success",'status successfully changed!');
            return res.redirect('/category/viewcategory')
        }
        
       } catch (error) {
        console.log(error);
        return false;
       }
}

module.exports = {addCategoryPage,viewCategoryPage,insertCategory,deleteCategory,editCategory,updateCategory,changeStatus}