const express = require("express");
const router = express.Router();
//bring the model  service(drservice)>>qr

const { QRservice } = require("../models/qr");


//Post:creat new service
router.post("/post", (req, res) => {
    service = new QRservice({
      _qrcode: new mongoose.Types.ObjectId(),
      idservice:req.body.idservice,
      description:req.body.description,
      nbcours: req.body.nbcours,
      nbtotal: req.body.nbtotal,
      name: req.body.qrname,
    });
    service
      .save()
      .then((service) => {
        res.send(service);
      })
      .catch((error) => {
        res.status(500).send("not stored in database");
      });
  });

  module.exports = router;