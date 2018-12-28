const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    photo: Array,
    gender: String
});

mongoose.model('users', userSchema);