const express = require('express');

const port = 9999;

const app = express()

const database = require('./config/db')

const book = require('./models/BookModel')

app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    book.find({})
        .then((books) => {
            return res.render('add', { books:books });
        })
        .catch((err) => {
            console.log(err);
        });
});

const BookModel = require('./models/BookModel')
app.post('/insertBook', (req, res) => {

    const { book_name, book_price, book_pages, book_author } = req.body;

    if (!book_name || !book_price || !book_pages || !book_author) {
        return res.status(400).send('All fields are required');
    }

    BookModel.create({
        book_name: book_name,
        book_price: book_price,
        book_pages: book_pages,
        book_author: book_author
    })
        .then((data) => {
            console.log('Book inserted:', data);
            return res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/deleteRecord/:id', (req, res) => {
    const id = req.params.id; 
    book.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send('Book not found');
            }
            return res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send('Error deleting the book');
        });
});


app.get('/editRecord/:id', (req, res) => {
    const id = req.params.id; 

    book.findById(id)
        .then((single) => {
            return res.render('edit', { 
                book: single 
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send('Error retrieving the book');
        });
});

app.post('/updateBook/:id', (req, res) => {
    const { id } = req.params;
    const { book_name, book_price, book_pages, book_author } = req.body;

    if (!book_name || !book_price || !book_pages || !book_author) {
        return res.status(400).send('All fields are required');
    }

    BookModel.findByIdAndUpdate(id, {
        book_name: book_name,
        book_price: book_price,
        book_pages: book_pages,
        book_author: book_author
    }, { new: true })
    .then((updatedBook) => {
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }
        console.log('Book updated:', updatedBook);
        return res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send('Error updating book');
    });
});

app.get('/add', (req, res) => {
    return res.render('add');
})

app.listen(port, (err) => {
    if (err) {
        console.log("err");        
    }
    console.log(`app is running on port :- ${port}`);
})