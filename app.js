const express = require('express');
const port = 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');

const { nextTick } = require('process');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://Admin:Admin19121985@cluster0.y8k496w.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(()=> app.listen(port))
    .catch((err) => console.log(err));

//register view engine ejs
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); //data halen van form
app.use((req,res,next)=> {
    res.locals.path = req.path;
    next();
});
//morgan dev npm packet
app.use(morgan('dev'));

//routes
app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req,res)=>{
    res.render('about', {title:'Xinu Design'});
});

//blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });