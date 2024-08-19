class ApiResponse {
  success = true;
  status = 200;
  message = "";
  data = null;
  errors = null;
  stack = null;

  static success(message = "İşlem başarıyla tamamlandı.") {
    const obj = new ApiResponse();
    obj.setSuccess(true).setMessage(message).setStatus(200);
    return obj;
  }

  static error(message, status = 500) {
    const obj = new ApiResponse();
    obj.setSuccess(false).setMessage(message).setStatus(status);
    return obj;
  }

  setSuccess(value) {
    this.success = value;
    return this;
  }

  getStatus() {
    return this.status;
  }

  getMessage() {
    return this.message;
  }

  setStatus(value) {
    this.status = value;
    return this;
  }

  setMessage(value) {
    this.message = value;
    return this;
  }

  setErrors(value) {
    this.errors = value;
    return this;
  }

  setStack(value) {
    this.stack = value;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }
}

module.exports = ApiResponse;
