// src/models/Counter.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CounterSchema = new Schema({
  _id:    { type: String, required: true },  // e.g. 'invoice'
  seq:    { type: Number, default: 0 },
});
module.exports = model('Counter', CounterSchema);
