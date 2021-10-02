const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/api/users/add", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/api/users/get-all-by-name", async (req, res) => {
  try {
    const pattern = ".*" + req.query.name + ".*";
    const users = await User.find({
      $or: [
        {
          'username': {
            $regex: pattern,
          },
        },

        {
          'email': {
            $regex: pattern,
          },
        },
      ],
    });
    
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/users/update-multiple", async (req, res) => {
    
})

module.exports = router;
