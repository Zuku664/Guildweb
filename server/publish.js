Meteor.publish("posts", function(limit){
  var dl = limit || 7;
  //send data newest first to the client
  if(!this.userId){
    return posts.find({}, {sort:{date_created: -1}, limit: dl});
  }else{
    return posts.find({})
  }
});

Meteor.publish("raids", function(){
  return raids.find({}, {sort:{date: -1}});
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
  return apps.find({}, {sort:{date: -1}});
});


Meteor.publish('images', function(search, post){
  return images.find({}, {sort: {date_created: -1}, limit: 7});
})
