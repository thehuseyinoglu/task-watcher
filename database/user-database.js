const BaseDatabase = require('./base-database')
const User = require('../User')

class UserDatabase extends BaseDatabase{}

module.exports = new  UserDatabase(User)