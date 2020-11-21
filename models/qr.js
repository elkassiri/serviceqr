const mongoose = require("mongoose");

//creat the schema
const qrSchema = new mongoose.Schema({
  _qrcode: mongoose.Schema.Types.ObjectId, 
  idservice: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
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

exports.Service = new mongoose.model("QRservice", qrSchema);
