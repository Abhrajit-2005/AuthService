const { UserService } = require('../services/index')
//const { response } = require('express');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false,
                data: {},
                error: {}
            });
        }
        const response = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            message: 'User created successfully',
            success: true,
            error: {}
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            data: {},
            success: false,
            err: error
        });
    }
}
module.exports = {
    createUser,
}