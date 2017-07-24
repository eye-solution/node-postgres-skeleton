'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        console.log('debug', {
          Author: typeof models.Author,
          Post: typeof Post
        });
        Post.belongsTo(models.Author);
      }
    }
  });
  return Post;
};
