const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const path = require('path');
const ejs = require("ejs");
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catcherror');
const ExpressError = require('./utils/ExpreeError');
const login = require('./models/database');
const router = require('./routes');

app.use("/dogs",router);




main().then(()=>{console.log("conneccted to server")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/registration');
 

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const static_path = path.join(__dirname,"./public");
const template_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

console.log(path.join(__dirname,"./partials/navbar"))
app.use(express.static(static_path));
app.set("view engine","ejs"); 
app.set("views",template_path);
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));





app.get('/foxaisr',(req,res)=>{
    res.render('index')
});


app.get('/foxaisr/register',(req,res)=>{
    res.render("register")
});

app.get('/foxaisr/login',(req,res)=>{
  res.render("login")
});


app.get('/foxaisr/dashboard',(req,res)=>{
  res.render("dashboard")
});


app.post('/foxaisr',async(req,res)=>{
  console.log(req.body);
  const Login = new login(req.body.login);
  await Login.save();
  res.redirect(`/foxaisr`)
})




app.listen(3000,()=>{console.log('listning on port 3000')});




app.all('*', (req, res, next) => {
  next(new ExpressError('page not found', 404))
})



app.use((err, req, res, next) => {
  const{ statuscode = 500,message = 'something went wrong'} = err;
  if(!err.message)err.message = "something went wrong"
  res.status(statuscode).render('err',{ err });
})
