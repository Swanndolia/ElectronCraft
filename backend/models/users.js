module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    mail: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    username: {
      type: Sequelize.STRING,
      required: true,
    },
    isOnline: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Users;
};
