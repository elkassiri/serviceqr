const express = require("express");
const router = express.Router();
//bring the model  service(drservice)>>qr

const { QRservice } = require("../models/qr");

//***************************************CLIENT*********************************************************//

//PUT:nbtotal=nbtotal+1 (quand un client faitl le scanne le nombre totale s'incrémente par 1)
router.put("/client/put/:qr", async (req, res) => {
  const updatedService = await QRservice.findByIdAndUpdate(
    req.params.qr,

    { $inc: { nbtotal: 1 } },
    { new: true }
  );
  if (!updatedService) res.status(404).send("QR NON ENREGISTRE");
  res.send(updatedService);
});

//GET:retourne nbtotal
router.get("/client/get/:qr", (req, res) => {
  QRservice.findById(req.params.qr)
    .then((service) => {
      if (service) res.json({ nbtotal: service.nbtotal });
      res.status(404).send("erreur:nombre totale");
    })
    .catch((error) => {
      res.status(500).send("ERROR FOUND");
    });
});

//GET:retourne all information about a qr

router.get("/client/getall/:qr", (req, res) => {
  QRservice.findById(req.params.qr)
    .then((service) => {
      if (service)
        res.json({
          idservice: service.idservice,
          description: service.description,
          nbcours: service.nbcours,
        });
      res.status(404).send("erreur:nombre totale");
    })
    .catch((error) => {
      res.status(500).send("ERROR FOUND");
    });
});

//***************************************SERVICE*********************************************************//

//GET:select les qr d'un service
router.get("/service/get/:service", (req, res) => {
  var service = req.params.service;
  QRservice.find({ idservice: service }, function (err, docs) {
    let qr = [];
    docs.forEach((element) => {
      qr.push({ qr: element._id, name: element.name });
    });
    res.json(Object.assign({}, qr));
  });
});
//GET:retourne all information about a qr
router.get("/service/getall/:qr", (req, res) => {
  QRservice.findById(req.params.qr)
    .then((service) => {
      if (service)
        res.json({
          description: service.description,
          nbcours: service.nbcours,
          nbtotal: service.nbtotal,
        });
      res.status(404).send("erreur:nombre totale");
    })
    .catch((error) => {
      res.status(500).send("ERROR FOUND");
    });
});

//Boutton suivant
//put : nbcours++
router.put("/service/put/:qr", async (req, res) => {
  const updatedService = await QRservice.findByIdAndUpdate(
    req.params.qr,

    { $inc: { nbcours: 1 } },
    { new: true }
  );
  if (!updatedService) res.status(404).send("QR NON ENREGISTRE");
  res.send(updatedService);
});

//GET:retourne all information about a qr
router.get("/service/getactualiser/:qr", (req, res) => {
  QRservice.findById(req.params.qr)
    .then((service) => {
      if (service)
        res.json({
          nbcours: service.nbcours,
          nbtotal: service.nbtotal,
        });
      res.status(404).send("erreur:nombre totale");
    })
    .catch((error) => {
      res.status(500).send("ERROR FOUND");
    });
});

//actualiser la liste
router.put("/service/put/actualiser/:qr", async (req, res) => {
  const updatedService = await QRservice.findByIdAndUpdate(req.params.qr, {
    nbtotal: 0,
    nbcours: 0,
  });

  if (!updatedService) res.status(404).send("QR NON ENREGISTRE");
  res.send(updatedService);
});


////////////////////////////////////////////////////////////

//Post:creat new service
router.post("/post", (req, res) => {
  service = new QRservice({
    idservice: req.body.idservice,
    description: req.body.description,
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



//GET:all
router.get("/all/get", (req, res) => {
  QRservice.find()
    .then((serveces) => res.send(serveces))
    .catch((error) => {
      res.status(500).send("something went wrong");
    });
});


module.exports = router;
