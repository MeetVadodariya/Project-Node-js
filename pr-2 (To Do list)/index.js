const express=require('express')

const port =7000

const app=express()

app.set('view engine', 'ejs')

app.use(express.urlencoded())

let users=[]
app.get('/',(req,res)=>{
    return res.render('index',{
        all: users
    })
})
app.get('/deleteusers',(req,res)=>{
    let id =req.query.deleteId
   let d= users.filter(val => val.id !=  id)
   users=d
   return res.redirect('/')
    
})

app.get('/editUsers',(req,res)=>{

    let single=users.find(val=> val.id ==req.query.editId)
    return res.render('edit',{
        single
    })
})
app.post('/insertRecord', (req,res)=>{
    const {name,phone,date}=req.body
    let obj={
        id :Math.floor(Math.random()*1000),
        name:name,
        phone:phone,
        date:date
    }
    users.push(obj)
console.log("login sucessfully");

   return res.redirect('/')
})
app.post('/updateusers',(req,res)=>{
   const {editId,name,phone,date}=req.body

    let up=users.map((val)=>{
        if(val.id == editId){
            val.name=name,
            val.phone =phone
            val.date =date
        }
        return val 
    })

    users=up
    return res.redirect('/')
})
app.listen(port,(err)=>{
    if(err){

        console.log("err");
        
    }
    console.log("server is runing");
    
})