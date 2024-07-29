const BaseDatabase = require('./base-database')
const Room = require('../room')

class RoomDatabase extends BaseDatabase{}

module.exports = new  RoomDatabase(Room)