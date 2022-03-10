const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { render } = require('ejs');


const PORT = process.env.PORT || 3000;
const app = express();
const authRouter = require('./src/routers/authRouter')



// middleware 

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// for passport js --> user authenthication 
app.use(cookieParser());
app.use(session({secret: 'captureContent', resave: true, saveUninitialized: true }));



require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/auth', authRouter)


app.get("/", (req, res) => {
    res.render('index', {title: 'This is working properly', data: ['a', 'b', 'c']})
})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})