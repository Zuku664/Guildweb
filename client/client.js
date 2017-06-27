BlazeLayout.setRoot('body');

Meteor.subscribe('posts');
Meteor.subscribe('siteDetails');
Meteor.subscribe('myFiles');

var currentFilter = 0;
Meteor.newsFilter =({
  'change' : () =>{
    if(currentFilter == 0){
      newsFilter.set('boss');
      currentFilter = 1;
    }else{
      newsFilter.set('news');
      currentFilter = 0;
    }
  }
})
