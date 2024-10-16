const express=require('express')
const port=9999
const app=express()

app.set('view engine','ejs')
let path=require('path')

app.use('/',express.static(path.join(__dirname,'/public')))

app.get('/',(req,res)=>{
    return res.render('index')
})

app.get('/charts',(req,res)=>{
    return res.render('charts')
})
app.get('/widgets',(req,res)=>{
    return res.render('widgets')
})
app.get('/tables',(req,res)=>{
    return res.render('tables')
})
app.get('/grid',(req,res)=>{
    return res.render('grid')
})
app.get('/from-basic',(req,res)=>{
    return res.render('from-basic')
})
app.get('/from-wizrad',(req,res)=>{
    return res.render('from-wizrad')
})
app.get('/button',(req,res)=>{
    return res.render('button')
})
app.get('/icon',(req,res)=>{
    return res.render('icon')
})
app.get('/icon-font',(req,res)=>{
    return res.render('icon-font')
})
app.get('/p-elements',(req,res)=>{
    return res.render('icon-font')
})
app.get('/index-2',(req,res)=>{
    return res.render('index-2')
})
app.get('/p-gallery',(req,res)=>{
    return res.render('p-gallery')
})
app.get('/p-clender',(req,res)=>{
    return res.render('p-clender')
})
app.get('/p-invoice',(req,res)=>{
    return res.render('p-invoice')
})
app.get('/p-chat',(req,res)=>{
    return res.render('p-chat')
})
app.get('/a-login',(req,res)=>{
    return res.render('a-login')
})
app.get('/a-regiter',(req,res)=>{
    return res.render('a-regiter')
})
app.get('/403',(req,res)=>{
    return res.render('403')
})
app.get('/404',(req,res)=>{
    return res.render('404')
})
app.get('/405',(req,res)=>{
    return res.render('405')
})
app.get('/500',(req,res)=>{
    return res.render('500')
})
app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        
    }
    console.log("server id runinng");
    
})