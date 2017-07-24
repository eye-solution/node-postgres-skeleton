var models = require("../models");
module.exports = async () =>{
  models.sequelize.sync().then(function() {
    console.log('done');
  });
}
