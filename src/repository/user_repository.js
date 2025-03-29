const { User, Role } = require('../models/index')
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
    async deleteUser(id) {
        try {
            await User.destroy({
                where: {
                    id: id,
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

    async isAdmin(id) {
        try {
            const user = await User.findByPk(id);
            const admin = await Role.findOne({
                where: {
                    name: 'ADMIN',
                }
            })
            return user.hasRole(admin);
        } catch (error) {
            console.log("Something went wrong with the repository layer");
            throw error;
        }
    }

    async addRoleToUser(id, roleName) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error("User not found");
            }

            const role = await Role.findOne({ where: { name: roleName.toUpperCase() } });

            if (!role) {
                throw new Error("Role not found");
            }

            return await user.addRole(role);

        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;