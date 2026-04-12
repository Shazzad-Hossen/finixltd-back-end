const { model, Schema } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
}, { timestamps: true });
schema.index({ referrar: 1, _id: 1 });



schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  delete obj.updatedAt;
  return JSON.parse(JSON.stringify(obj));
};

module.exports = model('User', schema);
