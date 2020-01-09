const _ = require('lodash');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const Response = require('../middlewares/response');

// Get All Users
router.get('/', async (req, res) => {
    const api_response = Response(req, res);
    const users = await User.find().select('firstName lastName email color');
    api_response({ users: users });
});

// Create New User
router.post('/', async (req, res) => {
    const api_response = Response(req, res);
    const { error } = validate(req.body);
    if (error) return api_response(null, error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return api_response(null, "User with that email already exist");

    user = new User(req.body);
    await user.save();

    api_response({ user: user });
});

// Get User data by id
router.get('/:id', async (req, res) => {
    const api_response = Response(req, res);
    let user = await User.findById(req.params.id);
    if (!user) return api_response(null, 'The User with given id not found');
    api_response({ user: user });
});

// Update User
router.put('/:id', async (req, res) => {
    const api_response = Response(req, res);
    let user = await User.findById(req.params.id);
    if (!user) return api_response(null, 'The User with given id not found');

    const { error } = validate(req.body);
    if (error) return api_response(null, error.details[0].message);

    user.set(req.body);
    const result = await user.save();
    api_response({ user: result });
});

// Delete User
router.delete('/:id', async (req, res) => {
    const api_response = Response(req, res);
    let result = await User.findByIdAndRemove(req.params.id);
    if (!result) return api_response(null, 'The User with given id not found');
    api_response({ message: 'User successfully deleted.' });
});

module.exports = router;