const express = require("express");
const Admin = require("../models/admin");
// const auth = require('../middleware/auth')
const router = new express.Router();

router.post("/api/admin/add", async (req, res) => {
  console.log(req.body);
  const admin = new Admin(req.body);

  try {
    await admin.save();
    res.status(201).send(admin);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/admin/auth", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.username,
      req.body.password
    );
    const expiresInSeconds = 60*30 //expires in 30 minutes
    const token = await admin.generateAuthToken(expiresInSeconds);
    res.send({ admin, token, expiresIn: expiresInSeconds });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/admin/logout", async (req, res) => {
    

});

module.exports = router;
