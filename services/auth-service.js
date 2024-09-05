const BaseService = require("./base-service");
const User = require("../models/User");
const userService = require("./user-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authSchemas = require("../validations/auth-schemas");
const apiResponse = require("../utils/apiResponse");

class AuthService extends BaseService {
  async login(email, password) {
    try {
      await authSchemas.login.validateAsync({ email, password });
      const user = await userService.findOne({ email });
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return apiResponse.error("Kullanıcı bilgileri yanlış", 400);
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
      return apiResponse
        .success("Giriş başarılı")
        .setData({ token: token, user: user });
    } catch (err) {
      console.log(err);
      return apiResponse.error("Kullanıcı bilgileri yanlış", 500);
    }
  }

  async register(name, email, age, password) {
    try {
      const user = await userService.findOne({ email });
      if (user) {
        return apiResponse.error("Kullanıcı sistemde kayıtlı", 500);
      }
      await authSchemas.register.validateAsync({ email, name, password });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = await userService.insert({
        name,
        age,
        email,
        password: passwordHash,
      });


      return apiResponse.success("Hesap oluşturuldu")
    } catch (err) {
      return apiResponse.error(err.message, 500);
    }
  }
}

module.exports = new AuthService(User);
