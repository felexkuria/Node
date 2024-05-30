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


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// connect to mongodb
const uri = "mongodb+srv://engineerfelex:rw75LoJqazy8d6Rv@cluster0.vte1e4l.mongodb.net/node-tuts";

//rw75LoJqazy8d6Rv
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Assuming `Blog` is a Mongoose model
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: "Internet Connections",
    snippet: "about new blog",
    body: "Learn More"
  });

  blog.save()
    .then((result) => {
      console.log('Blog saved successfully:', result);
      res.send(result);
    })
    .catch((error) => {
      console.error('Error saving blog:', error);
      res.status(500).send('Error saving blog');
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
app.get('/single-blog', (req, res) => {
  Blog.findById('66589d90436b95453e98ff0e')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err)
      // console.log(err);
    });
});




 app.use(morgan("dev"))

//  app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: " kuria",
//     snippet: "about new blog",
//     body: "Learn More"
//   });

//   blog.save()
//     .then((result) => {
//       res.send(result)
//      // console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  res.redirect('/blogs');
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', { title: 'Home', blogs });
  
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});
 // blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});