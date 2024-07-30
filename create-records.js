const User = require('./models/User')
const Room = require('./models/room')
const userDatabase = require('./database/user-database')
const roomDataBase = require('./database/room-database')

 const berkay = new User(undefined,'Berkay')
 const nagihan = new User(undefined,'Nagihan')

 
 userDatabase.save([berkay,nagihan])

 const room1 = new Room(undefined,'Room1',berkay)

 roomDataBase.save([room1])


berkay.createRoom('2.room')

roomDataBase.update(room1)

userDatabase.update(berkay)