nimport mongoose from 'mongoose';

let Schema = mongoose.Schema;
let PouleSchema = new Schema({
  name: String,
  weight: Number,
  color: String

});

module.exports = mongoose.model('Poule', PouleSchema);
