const { UserRepository } = require('../repository/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/server-config')

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }
    async createUser({ email, password }) {
        try {
            const user = await this.repository.createUser({ email, password });
            return user;
        } catch (error) {
            console.log("Something went wrong with the service layer");
            throw error;
        }
    }
    async deleteUser(userid) {
        try {
            const res = await this.repository.deleteUser(userid);
            return res;
        } catch (error) {
            console.log("Something went wrong with the service layer");
            throw error;
        }
    }

    async checkPass(pass, encryptedpass) {
        try {
            return bcrypt.compareSync(pass, encryptedpass);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    async signin(email, pass) {
        try {
            const user = await this.repository.getbymail(email);
            const passmatch = this.checkPass(pass, user.password);
            if (!passmatch) {
                console.log("Password didn't match");
                throw { error: 'Incorrect Password' };
            }
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the signin process");
            throw error;
        }
    }

    createToken(user) {
        const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
        return token;
    }

    async isAuthenticated(token) {
        try {
            const verify = this.verifyToken(token);
            if (!verify) {
                console.log("Please login first");
                throw { error: "Invalid token" };
            }
            const user = await this.repository.getbyid(verify.id);
            if (!user) {
                console.log("User not found");
                throw { error: 'User does not exist' };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in authentication process");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Token Verification process went wrong");
            throw error;
        }
    }

}

module.exports = UserService;
