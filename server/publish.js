Meteor.publish("posts", function(){
  //send data newest first to the client
  return posts.find({}, {sort:{date_created: -1}});
});

Meteor.publish("raids", function(){
  return raids.find({});
});

Meteor.publish("questions", function(){
  return questions.find({});
});

Meteor.publish("siteDetails", function(){
  return siteDetails.find({});
});

Meteor.publish("counts", function(){
  return counts.find({});
});

Meteor.publish("apps", function(){
  return apps.find({});
});
