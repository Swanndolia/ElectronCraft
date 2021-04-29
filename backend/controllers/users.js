const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  mailBody = req.body.mail.split("@");
  bcrypt
    .hash(req.body.pass, 10)
    .then((hash) => {
      const user = {
        mail: secureCrypt(mailBody[0]) + "@" + mailBody[1],
        pass: hash,
        username: secureCrypt(req.body.username),
      };
      db.users
        .create(user)
        .then((user) => {
          res.status(201).json({
            username: secureCrypt(user.username),
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c",
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the db.users.",
          });
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
  //si l'utilisateur a utilisé son email
  if (req.body.username.includes("@")) {
    userBody = req.body.username.split("@");
    db.users
      .findOne({
        where: { mail: secureCrypt(userBody[0]) + "@" + userBody[1] },
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.pass, user.pass)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              username: secureCrypt(user.username),
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c",
                { expiresIn: "24h" }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } //si l'utilisateur a utilisé son username
  else {
    db.users
      .findOne({ where: { username: secureCrypt(req.body.username) } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(req.body.pass, user.pass)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              username: secureCrypt(user.username),
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c",
                { expiresIn: "9999 years" }
              ),
            });
          })
          .catch((error) => {
            res.status(500).json({ error });
            console.log(error);
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
        console.log(error);
      });
  }
};
exports.getOneUser = (req, res, next) => {
  db.users
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      user.username = secureCrypt(user.username);
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.getAllUsers = (req, res, next) => {
  db.users
    .findAll({
      order: [["username", "DESC"]],
    })
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        users[i].username = secureCrypt(users[i].username);
      }
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
