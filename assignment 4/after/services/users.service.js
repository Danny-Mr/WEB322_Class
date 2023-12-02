const { models } = require("../db");

class UsersService {
  static async findAll() {
    return await models.User.findAll();
  }

  static async findById(id) {
    const user = await models.User.findOne({
      where: { id },
      include: [{ model: models.Order, as: "orders" }],
    });
    return user;
  }

  static async create(product) {
    return await models.User.create(user);
  }

  static async update(product) {
    let savedUser = await models.User.findByPk(product.id);
    Object.assign(savedUser, product);
    await savedUser.save();
    return savedUser;
  }

  static async delete(id) {
    return await models.User.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = UsersService;
