const UserValidation = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Invalid fields',
            err: 'Email or password missing'
        });
    }
    next();
}

const RoleInputVerification = (req, res, next) => {
    if (!req.body.id || !req.body.roleName) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Invalid fields',
            err: 'Email or password missing'
        });
    }
    next();
}

module.exports = {
    UserValidation,
    RoleInputVerification
}