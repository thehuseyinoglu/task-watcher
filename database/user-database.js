const BaseDatabase = require('./base-database')
const User = require('../models/User')

class UserDatabase extends BaseDatabase{}

module.exports = new  UserDatabase(User)