posts = new Mongo.Collection('posts');
userCount = new Mongo.Collection('userCount');
siteDetails = new Mongo.Collection('siteDetails');

//denys anyone access to these (unless the above allow is met)
posts.deny({
  update: function() {
    return true;
  },

  insert: function() {
    return true;
  }
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});

userCount.deny({
  update: function() {
    return true;
  },

  insert: function() {
    return true;
  }
});

siteDetails.deny({
  update: function() {
    return true;
  },

  insert: function() {
    return true;
  }
});
