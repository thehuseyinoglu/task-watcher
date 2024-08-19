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

      if (!user || !match) {
        return {
          errors: [],
          stack: "",
          message: "Kullanıcı bilgileri yanlış",
          success: false,
          status: 500,
        };
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
      return {
        errors: [],
        stack: "",
        message: "Giriş başarılı",
        success: true,
        status: 200,
        data: {
          token,
        },
      };
    } catch (err) {
      return {
        errors: [],
        stack: "",
        message: err.message,
        success: false,
        status: 500,
      };
    }
  }

  async register(name, email, age, password) {
    try {
      const user = await userService.findOne({ email });
      if (user) {
        return {
          errors: [],
          stack: "",
          message: "Kullanıcı sistemde kayıtlı",
          success: false,
          status: 500,
        };
      }

      await authSchemas.register.validateAsync({ email, name, password });
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = await userService.insert({
        name,
        age,
        email,
        password: passwordHash,
      });
      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN);

      return {
        errors: [],
        stack: "",
        message: "Hesap oluşturuldu",
        success: true,
        status: 200,
        data: {
          token,
        },
      };
    } catch (err) {
      console.log(err);
      return apiResponse.error(err.message, 422);
    }
  }
}

module.exports = new AuthService(User);
