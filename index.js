const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
//index(router)>>service(drservice)>>qr
const serviceRoute = require("./routes/service");
const PORT = process.env.PORT || 3000;

//middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //routers
app.use("/api/myturn", serviceRoute);


//connect to mongoose
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((error) => {
    console.log("something is wrong!!", error);
  });

app.listen(PORT, () => {
  console.log("server start at port", PORT);
});
