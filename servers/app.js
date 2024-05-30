// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3000;
// // register view engine
// app.set("view engine",'ejs')
// // Route to serve the index.html file
// app.get('/', (req, res) => {
//     res.render('index')
//     //res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
// app.get('/about', (req, res) => {
//     res.render('about')

//    // res.sendFile(path.join(__dirname, 'views', 'about.html'));
// });
// app.get('/blog/create', (req, res) => {
//    res.render('create')
//     // res.sendFile(path.join (__dirname,"views","about.html"))
// });
// // Handle 404 errors
// app.use((req, res) => {
//     res.status(404).render("404")
//    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const  morgan =require("morgan")
const blog =require("./model/blog");
const Blog = require('./model/blog');

// express app
const app = express();


//middle ware and static file
app.use(express.static("public"))
// connect to mongodb
const uri = "mongodb+srv://engineerfelex:rw75LoJqazy8d6Rv@cluster0.vte1e4l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//rw75LoJqazy8d6Rv
mongoose.connect(uri)
  .then(() =>{console.log('Connected!');// listen for requests
  app.listen(3000);} );



 app.use(morgan("dev"))

 app.get('/add-blog',(res,req)=>{
  const blog =new Blog({
  title:"new title",
  snippet:"about new blog",
  body:"Learn More"

 });
blog.save().
then((result)=>{
  // res.send(result)
  console.log(result)
})
.catch((error)=>{console.log(error);

});
 })

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});