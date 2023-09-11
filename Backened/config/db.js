const mongoose = require("mongoose") ;

const dbconnection = mongoose.connect("mongodb+srv://shivaverma1115:Shiva1998@cluster0.dzvaj3f.mongodb.net/?retryWrites=true&w=majority") ;

module.exports = {
    dbconnection
}