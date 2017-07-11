FlowRouter.route('/', {
  name: 'home',
  subscriptions: function(params, queryParams) {
    // using Fast Render
    this.register('posts', Meteor.subscribe('posts'));
    this.register('siteDetails', Meteor.subscribe('siteDetails'));
  },
  action(){
    BlazeLayout.render('index');
  },
  fastRender: true
});

FlowRouter.route('/admin', {
  name: "admin",
  action(){
    if(Meteor.userId()){
      BlazeLayout.render('admin');
    }else{
      BlazeLayout.render('signin');
    }
  }
})

FlowRouter.route('/admin-login', {
  name: "login",
  action(){
    BlazeLayout.render('signin');
  }
})
