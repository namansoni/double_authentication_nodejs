const mongoose = require('mongoose')
function initDatabase() {
    return new Promise((res, rej) => {
        mongoose.connect('mongodb://localhost:27017/yesbank', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        if(err) {
            rej(err);
        }
        res(client.db)
    });
    })
}
module.exports = {initDatabase}