const mongoose = require("mongoose");
const { Schema } = mongoose;

const ManufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

ManufacturerSchema.virtual("url").get(function () {
  return `/catalog/manufacturer/${this._id}`;
});

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
