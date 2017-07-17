Template.nav.events({
  //on click Home in Nav
  'click #home': () => {
    //set the current page to feed (home)
    currentPage.set("feed")
    newsFilter.set("")
  },
  'click #about': () =>{
    currentPage.set("about")
  },
  'click #events': () =>{
    currentPage.set("events")
  },
  'click #news': () =>{
    currentPage.set("news")
    newsFilter.set("News")
  },
  'click #apply': () =>{
    currentPage.set("apply")
  }
})

Template.admin.events({
  'click .fa-tachometer': ()=>{
    adminLoc.set('dash');
  },
  'click .new': ()=>{
    adminLoc.set('post');
  },
  'click .fa-image': ()=>{
    adminLoc.set('media');
  },
  'click .fa-file': ()=>{
    adminLoc.set('apps');
  },
  'click .fa-cog': ()=>{
    adminLoc.set('settings');
  },
  'click .fa-trophy': ()=>{
    adminLoc.set('raids');
  }
})

Template.applyPage.events({
  'click button': ()=>{
    //store the questions for if they change
    var questions = []
    var resps = []
    for(var i = 0; i < amt; i++){
      questions.push(ques[i]+"::")
      resps.push($('#qu'+i).val()+"::")
    }
    console.log(questions)
    console.log(resps)
    Meteor.call("sendApp", questions, resps, amt)
    location.reload();
  }
})

Template.newPost.events({
  'click .upload': () =>{
    //get image, resizes image in canvas then converts to base64 and sends to the server
    // the server then inserts it into the public directory with an id of the post._id
    // and serves it to the client on request
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    function handleFiles(e) {
      var ctx = document.getElementById('canvas').getContext('2d');
      var img = new Image;
      //CREATES new image from selected file
      img.src = URL.createObjectURL(e.target.files[0]);
      //when its loaded do this
      img.onload = function() {
        //modify the cancas
        canvas.height = canvas.width * (img.height / img.width) * 3;
        canvas.width = canvas.width * 3
        /// step 1
        var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

        oc.width = img.width * 0.5;
        oc.height = img.height * 0.5;
        octx.drawImage(img, 0, 0, oc.width, oc.height);

        /// step 2
        octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

        ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
          0, 0, canvas.width, canvas.height);

          //convert the canvas to base64 canvas
          var jpegUrl = canvas.toDataURL("image/jpeg");
          $('#imageData').val(jpegUrl)
        }
      }
    },
    'click #post': () =>{
      var imageData = $('#imageData').val()
      var title = $('#title').val()
      var content = $('.content').val()
      var cata = $('.flair').html()
      //if nothing is selected
      if(!cata){
        //default to news
        cata = "News"
      }
      console.log(cata)
      Meteor.call('post', imageData, title, content, cata, function(err, result){
        if(!err){
          location.reload();
        }
      })
      $('#post').prop('disabled', true);

    }
  })

  Template.editPost.events({
    'click #editPost': ()=>{
      var title = $('#editTitle').val()
      var content = $('#editContent').val()
      var id = currentPost.get()
      Meteor.call('updatePost', title, content, id)
      location.reload();
    }
  })

  Template.modals.events({
    'click .delY': ()=>{
      var type = deleting.get()
      type = type.split('::')
      var id = type[1]
      type = type[0]

      if(type == "post"){
        Meteor.call('deletePost', id)
      }else if(type == 'raid'){
        Meteor.call('deleteRaid', id)
      }else{
        Meteor.call('deleteApp', id)
      }
      deleting.set('')
      $('.deleteModal').hide()
    },
    'click .delN': ()=>{
      deleting.set('')
      $('.deleteModal').hide()
    }
  })

  Template.settings.events({
    'click #post':()=>{
      var specLength = 36;
      var spec = ['dnB','dnU','dnF','dhH','dhV','drB','drF','drR','drG','huM','huS','huB','maF','maFr','maA','moM','moW','moB','paH','paR','paP','prS','prD','prH','roA','roS','roC','shE','shR','shEn','waA','waD','waDe','warA','warF','warP']
      //'''
      var specStatus = []
      for(var i = 0; i < specLength; i++){
        specStatus.push($('#'+spec[i]).prop('checked'));
      }

      var title = $('.postTitle').val();
      var about = $('.content').val()

      Meteor.call('updateSite', specStatus, title, about)
      location.reload();
    }
  });

  Template.login.events({
  "click .loginBttn" : () =>{
    var usm = $(".username").val();
    var psw = $('.password').val();

    //try to login
    Meteor.loginWithPassword(usm, psw, function(err, result){
      if(err){
        //if you cant login see if there is an account
        Meteor.call('accountCheck', function(err, result){
          if(result == true){
            //no account show secret modal
            $('.firstCreateModal').show();
          }else{
            alert("Opps, something isn't right")
          }
        })
      }
    });
  },
  //calls the server with the phrase on initial account create
  "click .secretPhraseBttn" : () =>{
    var usm = $(".username").val();
    var psw = $('.password').val();
    var secretPhrase = $('.secretPhrase').val();
    Meteor.call('phraseCheck', secretPhrase, function(err, result){
      if(result == true){
        //if right, create account with that info
        Meteor.call('createAcc', usm, psw);
        Meteor.loginWithPassword(usm, psw);
      }else{
        //if wrong alert
        alert("Wrong secret phrase");
      }
    })
  }
})
