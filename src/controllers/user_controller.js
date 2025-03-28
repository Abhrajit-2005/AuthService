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

const signIn = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false,
                data: {},
                error: {}
            });
        }
        const response = await userService.signin(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            message: 'Successfully Signed In',
            data: response,
            success: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            message: 'User authenticated',
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: 'Internal Server Error',
            success: false,
            err: error
        })
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated
}