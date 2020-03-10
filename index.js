const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/',(req,res) => res.render('index',{
    title: 'Member app',
    members
}));

//static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server Started on port ${PORT}`)); 