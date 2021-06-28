const uri = "mongodb+srv://root:root@cluster0.7qyo0.mongodb.net/foap-apartments?retryWrites=true&w=majority";

const mongoose = require('mongoose');

class DataBase {
    // When connection is OK, cb listen port:3000
    static connect(cb) {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) throw err;
            console.log("Conectados a la base de datos correctamente.")
            cb(); // 'cb' is defined at App.js
        })
    }

}

module.exports = DataBase;