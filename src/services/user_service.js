const { UserRepository } = require('../repository/index')

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
}

module.exports = UserService;
