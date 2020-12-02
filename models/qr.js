const mongoose = require("mongoose");
const { object } = require("yup");

//creat the schema
const qrSchema = new mongoose.Schema({
  idservice: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  nameservice: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  nbcours: {
    type: Number,
  },
  nbtotal: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
});

exports.QRservice = new mongoose.model("QRservice", qrSchema);
