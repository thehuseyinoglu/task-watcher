const BaseDatabase = require("./base-database");
const Task = require("../models/task");

class TaskDatabase extends BaseDatabase {

    async findByUserId (userId){
        return this.findBy('user',userId)
    }
}

module.exports = new TaskDatabase(Task);
