//import mongoose from "mongoose";
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, require: true, unique:true},
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // pour n'avoir qu'une seul emai par user
// Et ça se fait avant d'importer le schéma

module.exports = mongoose.model('User', userSchema);