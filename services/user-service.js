const BaseService = require("./base-service");
const User = require("../models/User");
const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcrypt");

class UserService extends BaseService {
  async editProfile(name, email, oldPassword, newPassword, userId) {
    try {
      const user = await this.find(userId);

      if (newPassword && oldPassword) {
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
          return apiResponse.error("Kullanıcı şifresi yanlış", 400);
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);

        await this.update(userId, { password: passwordHash });
      }

      await this.update(userId, { name, email });

      return apiResponse.success("Kullanıcı güncellendi");
    } catch (error) {
      console.log(error);
      return apiResponse.error(error.message, 500);
    }
  }
}

module.exports = new UserService(User);
