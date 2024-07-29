const User = require('./User')
const userDatabase = require('./database/user-database')


// const berkay = new User(undefined,'Berkay')
// const nagihan = new User(undefined,'Nagihan')
// userDatabase.save([berkay,nagihan])




//  const users = userDatabase.load()

const berkay = userDatabase.findBy( 'userName','Berkay')


berkay.createRoom('2.room')

userDatabase.update(berkay)

console.log(berkay)


