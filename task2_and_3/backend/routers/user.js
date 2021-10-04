const express = require("express");
const User = require("../models/user");
const auth = require('../middleware/authentication')
const router = new express.Router();

router.post("/api/users/add", auth, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/users/get", async(req, res) => {
  res.send("Hello world")
})

router.get("/api/users/get-all-by-name", auth, async (req, res) => {
  try {
    const pattern = ".*" + req.query.name + ".*";
    const users = await User.find({
      $or: [
        {
          username: {
            $regex: pattern,
          },
        },

        {
          email: {
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

router.post("/api/users/update-multiple", auth, async (req, res) => {
  const updatedUsers = req.body;
  const finalizedUsers = [];
  let containedErrorFlag = false;

  try {
    for (let i = 0; i < updatedUsers.length; ++i) {
      let toBeUpdatedUser = { ...updatedUsers[i] };
      const id = toBeUpdatedUser._id;
      delete toBeUpdatedUser._id;

      try {
        const updatedUser = await User.findByIdAndUpdate(id, toBeUpdatedUser, {
          new: true,
          runValidators: true,
        });
        if (!updatedUser) continue;
        finalizedUsers.push(updatedUser);
      } catch (error) {
        containedErrorFlag = true;
      }
    }
    containedErrorFlag
      ? res.send({
          errorCode: 1,
          finalizedUsers: finalizedUsers,
        })
      : res.send({ errorCode: null, finalizedUsers: finalizedUsers });
  } catch (error) {
    if (finalizedUsers.length === 0)
      res.status(400).send({ errorCode: 2 });
  }
});

module.exports = router;
