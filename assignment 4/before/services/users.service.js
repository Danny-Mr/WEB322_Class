const { models } = require ("../db")

class UsersService {
  static async find() {
    return await models.Users.findAll();
  }

  static async findById(id) {

    return await models.User.findByPk(id);
  
}

static async create(user) {
  return await models.User.create(user);
}

static async delete (id){
  return await models.User.destroy({where:{id}});
}

static async update(user) {
  let saveUser = await models.User.findByPk(user.id);
  Object.assign(savedUser, user );
  await savedUser.save();
  return savedUser;
}


}

module.exports = UsersService;
