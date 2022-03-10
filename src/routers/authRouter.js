const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectId } = require('mongodb');
const { Passport } = require('passport');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {

    // res.json(req.body);

    //create user

    const {fName, lName, username, password} = req.body;


    const url = 'mongodb+srv://testingDB:PyyMAfDN2Ue4ta2@cluster0.gmpln.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'captureContent';

    (async function addUser() {
        let client;

        try {
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const user = { fName, lName, username, password };
            const results = await db.collection('users').insertOne(user);
            debug(results);
            req.login(results, () => {
                res.redirect('/auth/profile');
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

authRouter
    .route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(
        passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
        })
);


authRouter.route('/profile').get((req, res) => {
    // res.json(req.user);
    res.render('home')
})







module.exports = authRouter;