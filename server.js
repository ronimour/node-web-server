const express = require('express');
const hbs = require('hbs');
const fs = require('file-system');

const port = process.env.PORT;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });

  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance page',
    aboutMessage: 'This website is under maintenance'
  })

});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my home page'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About page',
    aboutMessage: 'This is a test website with NodeJS, Express and HBS',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req, res) => {
  res.send('Unable to precess the request');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
