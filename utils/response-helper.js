const createResponse = (status, message, data = {}, errors = [], stack = "") => {
    return {
      errors,
      stack,
      message,
      success: status >= 200 && status < 300,
      status,
      data,
    };
  };
  
  module.exports = createResponse;