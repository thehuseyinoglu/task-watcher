const express = require("express");

const ApiResponse = require("../utils/apiResponse");

class CustomErrorHandler {
  error(error, _req, res, _next) {
    const responseObject =  ApiResponse.error(error.message, 500);

    // Class validator handle errors
    if (responseObject.getStatus() == 400) {
      let validatorErrors = {};

      if (
        typeof error === "object" &&
        error.hasOwnProperty("errors") &&
        Array.isArray(error.errors)
      ) {
        error.errors.forEach((element) => {
          if (element.property && element.constraints) {
            validatorErrors[element.property] = element.constraints;
          }
        });
        responseObject.setMessage(
          "İstek doğrulama hatası, lütfen gönderilen verilerin uygun formatta olduğunu kontrol ediniz."
        );
        responseObject.setStatus(422);
      }

      responseObject.setErrors(validatorErrors);
    }

    // Append stack
    if (
      error.stack &&
      process.env.NODE_ENV === "development" &&
      responseObject.getStatus() == 500
    ) {
      responseObject.setStack(error.stack);
    }

    // Final response
    res.json(responseObject);
  }
}

module.exports = CustomErrorHandler;
