const mongosse = require('mongoose');
const Schema = mongosse.Schema;

const userSchema = new Schema({
    username: String,
    googleid: String,
    thumbnail: String
});

const User = mongosse.model('user', userSchema);

module.exports = User;