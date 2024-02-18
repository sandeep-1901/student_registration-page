const mongoose =  require('mongoose');
const schema = mongoose.Schema;



const loginSchema  = new schema({
   
    username:String,
    email:String,
    password:String,
    Cpassword:String

});

module.exports = mongoose.model('database', loginSchema)