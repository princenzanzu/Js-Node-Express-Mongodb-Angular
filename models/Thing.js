//import mongoose from "mongoose";
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// Ewportation du schéma en tant modèle
module.exports = mongoose.model('Thing', thingSchema);