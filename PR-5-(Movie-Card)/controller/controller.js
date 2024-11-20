const fs = require('fs')
const usersmodel = require('../models/usersmodels')
const addpage = (req, res) => {
    return res.render('add')
}
const viewpage = async (req, res) => {

    try {

        const users = await usersmodel.find({})

        return res.render('views', {
            users
        })
    } catch (error) {

        console.log(error);
        return false
    }
}

const adddata = async (req, res) => {
    try {
        const { name, desc, price } = req.body;

        await usersmodel.create({
            name: name,
            desc: desc,
            price: price,
            image: req.file.path
        })
        console.log(`user add`);
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deletedata = async (req, res) => {
    try {
        const { id } = req.query;

        const record = await usersmodel.findById(id);
        if (!record) {
            console.error("Record not found");
            return res.status(404).send("Record not found");
        }

        try {
            if (record.image && fs.existsSync(record.image)) {
                fs.unlinkSync(record.image); 
            }
        } catch (error) {
            console.error("Error deleting image:", error);
            return res.status(500).send("Error deleting image");
        }

        await usersmodel.findByIdAndDelete(id);

        return res.redirect('/');
    } catch (error) {
        console.error("Error deleting record:", error);
        return res.status(500).send("Internal server error");
    }
};

const edit = async (req, res) => {

    try {
        const id = req.query.id

        const singal = await usersmodel.findById(id)

        return res.render('edit', {
            singal
        })

    } catch (error) {
        console.log(error);
        return false
    }
}
const update = async (req, res) => {
    try {
        const { editid, name, desc, price } = req.body;

        const record = await usersmodel.findById(editid);
        if (!record) {
            console.error("Record not found");
            return res.status(404).send("Record not found");
        }

        if (req.file) {
            try {
                if (record.image && fs.existsSync(record.image)) {
                    fs.unlinkSync(record.image);
                }
            } catch (error) {
                console.error("Error deleting old image:", error);
                return res.status(500).send("Error deleting old image");
            }

            record.image = req.file.path;
        }

        record.name = name || record.name;
        record.desc = desc || record.desc;
        record.price = price || record.price;

        await record.save();

        return res.redirect('/views');
    } catch (error) {
        console.error("Error updating record:", error);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    addpage,
    viewpage,
    adddata,
    deletedata, edit,
    update
}