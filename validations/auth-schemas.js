const Joi = require("joi");

const authSchemas = {
  login: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required().messages({
        "string.email": "Geçerli bir e-posta adresi girin",
        "any.required": "Email alanı zorunludur",
      }),
    password: Joi.string()
      .required()
      .messages({
        "any.required": "Şifre alanı zorunludur",
      }),
  }),

  register: Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.min": "En az 3 karakter olmalıdır.",
      "any.required": "İsim alanı zorunludur",
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Geçerli bir e-posta adresi girin",
        "any.required": "Email alanı zorunludur",
      }),

    password: Joi.string()
      .required()
      .messages({
        "any.required": "Şifre alanı zorunludur",
      }),
  }),
};

module.exports = authSchemas;
