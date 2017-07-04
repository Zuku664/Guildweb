Meteor.publish("posts", function(){
  return posts.find({});
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
