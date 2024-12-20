const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category_name : {
        type : String,
        required : true,
    },
    status :{
        type:String,
        default:"deactive"
    }
})
const category = mongoose.model('category',CategorySchema);
module.exports = category;