const BaseDatabase = require("./base-database");
const Task = require("../task");

class TaskDatabase extends BaseDatabase {}

module.exports = new TaskDatabase(Task);
