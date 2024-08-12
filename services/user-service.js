const BaseService = require("./base-service");
const User = require("../models/User");

class UserService extends BaseService {
  async findYoungUsers() { 
    return this.query({
      age: {
        $lt: 30,
      },
    });
  }
}

module.exports = new UserService(User);
  