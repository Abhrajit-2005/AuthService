const { User } = require('../models/index')
class UserRepository {
    async createUser({ email, password }) {
        try {
            const user = await User.create({ email, password });
            return user;
        } catch (error) {
            console.log("Something gone wrong in the repository layer");
            throw error;
        }
    }
    async deleteUser(userid) {
        try {
            await User.destroy({
                where: {
                    id: userid,
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong wih the repository layer");
            throw error;
        }
    }

    async getbymail(mail) {
        try {
            const user = await User.findOne({
                where: {
                    email: mail,
                }
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getbyid(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: ['email', 'id'],
            });
            return user;
        }
        catch (error) {
            console.log("Something went wrong with the repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;