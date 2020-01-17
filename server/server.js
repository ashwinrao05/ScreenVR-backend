const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb')
const _ = require('lodash')

const User = require('./models/user');

app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['username', 'password', 'locations', 'phone', 'blood']);
    const user = new User({...body});
    console.log(body.username);
    // const exists = 
    User.findOne({username: body.username}, (err, user) => {
        if (user) {
            res.statusCode(400).send('Username already exists!');
        } else {
            user.save();
        }
    });
})

app.listen(3000, () => {
    console.log('Server is running on 3000!');
});