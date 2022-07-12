const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите название картинки'],
    minlength: [2, 'Название не должно быть короче 2 символов'],
    maxlength: [30, 'Название не должно быть длинее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
