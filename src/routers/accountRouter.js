const express = require('express');
const debug = require('debug')('app:accountRouter');
const { MongoClient, ObjectId } = require('mongodb');
const { Passport } = require('passport');
const passport = require('passport');

const accountRouter = express.Router();

accountRouter.route('/signUp').post((req, res) => {

    // res.json(req.body);

    //create user

    const { fName, lName, username, email, password} = req.body;


    const url = 'mongodb+srv://testingDB:PyyMAfDN2Ue4ta2@cluster0.gmpln.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'captureContent';

    (async function addUser() {
        let client;

        try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const user = { fName, lName, username, email, password };
            const results = await db.collection('users').insertOne(user);
            debug(results);
            req.login(results, () => {
                res.redirect('/account/welcome');
            });

        } catch (error) {
            debug(error);
        }

        client.close();
    }())

    //use this to test if the input is being stores in json

    //     req.login(req.body, () => {
    //     res.redirect('/auth/profile');
    // })


});


// accountRouter.route('/login')
//     .get((req, res) => {
//         res.render('login')

// })

accountRouter.route('/')
    .get((req, res) => {
        res.render('register');
        console.log('create an account')
    })
    .post(
        passport.authenticate('local', {
        successRedirect: '/account/welcome',
        failureRedirect: '/',
        })
);


accountRouter.route('/welcome').get((req, res) => {

    const { fName, lName, username, email, password} = req.body;


    const url = 'mongodb+srv://testingDB:PyyMAfDN2Ue4ta2@cluster0.gmpln.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'captureContent';


    (async function getUser() {
        let client;

        try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const user = { fName, lName, username, email, password };
            const results = await db.collection('users').findOne(user);
            debug(results);
            req.login(results, () => {
                res.redirect('/account/welcome');
            });

        } catch (error) {
            debug(error);
        }

        client.close();
    }())
    
    // res.render('accountCreated');
    // console.log('account was created')
})







module.exports = accountRouter;