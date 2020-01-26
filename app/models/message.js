module.exports = function(sequelize, Datatypes) {
  var Message = sequelize.define("Message", {
    name: {
      type: Datatypes.STRING
    },
    email: {
      type: Datatypes.STRING,
      validate: {
        isEmail: true
      }
    },
    note: {
      type: Datatypes.STRING
    }
  });

  return Message;
};
