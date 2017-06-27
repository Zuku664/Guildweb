Template.nav.events({
  //on click Home in Nav
  'click #home': () => {
    //set the current page to feed (home)
    currentPage.set("feed")
  },
  'click #about': () =>{
    currentPage.set("about")
  },
  'click #events': () =>{
    currentPage.set("events")
  },
  'click #news': () =>{
    currentPage.set("news")
  },
  'click #apply': () =>{
    currentPage.set("apply")
  }
})

Template.admin.events({
  'click .fa-tachometer': ()=>{
    adminLoc.set('dash');
  },
  'click .fa-pencil': ()=>{
    adminLoc.set('post');
  },
  'click .fa-image': ()=>{
    adminLoc.set('media');
  },
  'click .fa-file': ()=>{
    adminLoc.set('applications');
  },
  'click .fa-cog': ()=>{
    adminLoc.set('settings');
  },
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
      Meteor.call('post', imageData, title, content)
    }
  })


  Template.settings.events({
    'click #post':()=>{
      var specLength = 35; //is 36, but we count from 0
      var spec = ['dnB','dnU','dnF','dhH','dhV','drB','drF','drR','drG','huM','huS','huB','maF','maFr','maA','moM','moW','moB','paH','paR','paP','prS','prD','prH','roA','roS','roC','shE','shR','shEn','waA','waD','waDe','warA','warF','warP']

      var specStatus = []
      //'''
      for(var i = 0; i < specLength; i++){
        specStatus.push($('#'+spec[i]).prop('checked'));
      }

      var title = $('.postTitle').val();
      var about = $('.content').val()

      Meteor.call('updateSite', specStatus, title, about)
    }
  });
