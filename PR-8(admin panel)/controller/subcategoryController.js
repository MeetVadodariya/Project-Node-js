const categoryModel = require('../models/CategoryModel');

const subcategoryModel = require('../models/subcategoryModel');

const subcategoryPage = async(req,res) => {
       try {
        let subcategory = await subcategoryModel.find({}).populate("categoryId");
        
        return res.render('view_subcategory',{
          subcategory
        })
       } catch (error) {
        console.log(error);
        return false;
       }
}

const addsubCategory = async (req,res) => {
      try {
        let category = await categoryModel.find({status : "active"})

        return res.render('add_subcategory',{category});
      } catch (error) {
        console.log(error);
        return false;
      }
}

const insertSubcategory = async (req,res) => {
  try {
    const {category,subcategory} = req.body;
    await subcategoryModel.create({
      categoryId : category,
      subcategory : subcategory,
    })
    return res.redirect('/subcategory/addsubcategory')
  } catch (error) {
    console.log(error);
    return false;
  }
}

const deletesubCategory = async (req,res) => {
  try {
    id = req.query.id;
    await subcategoryModel.findByIdAndDelete(id);
    return res.redirect('/subcategory')
  } catch (error) {
    console.log(error);
    return false;
  }
}

const editsubCategory = async (req,res) => {
      try {
        const id = req.query.id;
        const category = await categoryModel.find({status : 'active'});
        const single = await subcategoryModel.findById(id).populate("categoryId");
         return res.render('edit_subcategory',{
          category:category,
          single:single,
         });
      } catch (error) {
        console.log(error);
        return false;
      }
}

const updateSubCategory = async (req, res) => {
  try {
      const { editid, category, subcategory } = req.body;
      await subcategoryModel.findByIdAndUpdate(editid, {
          categoryId: category,
          subcategory: subcategory
      })
      return res.redirect('/subcategory');
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
          await subcategoryModel.findByIdAndUpdate(id, { status: "deactive" })
          return res.redirect('/subcategory')
      } else {
          await subcategoryModel.findByIdAndUpdate(id, { status: "active" })
          return res.redirect('/subcategory')
      }
  } catch (err) {
      console.log(err);
      return false;
  }
}
module.exports = { subcategoryPage,addsubCategory,insertSubcategory,deletesubCategory,editsubCategory,updateSubCategory,changeStatus}