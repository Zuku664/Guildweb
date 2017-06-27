Meteor.publish("posts", function(){
  return posts.find({});
});

Meteor.publish("siteDetails", function(){
  return siteDetails.find({});
});
