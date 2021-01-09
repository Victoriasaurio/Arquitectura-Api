const mongoose = require('mongoose')
const { Schema } =  mongoose

const IdeaSchema = new Schema({
  idea: {
    type: String, required: true
  },
  description: {
    type: String
  },
  upvotes: [{ type:Boolean }],
  downvotes: [{ type:Boolean }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "user", //Relaciona el Schema de 'user'
    required: true,
    autopopulate: true //Trae la info del autor.
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment",
    required: true,
    autopopulate: true
  }]
});

IdeaSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("idea", IdeaSchema);
