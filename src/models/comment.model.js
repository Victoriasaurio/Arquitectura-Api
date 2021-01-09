const mongoose = require('mongoose')
const { Schema } =  mongoose

const CommentSchema = new Schema({
  comment: {
    type: String, required: true
  },
  description: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user", //Relaciona el Schema de 'user'
    required: true,
    autopopulate: true //Trae la info del autor.
  }
});

// plugins - Son métodos que le dan más poder a mongoose.
CommentSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model('comment', CommentSchema);
