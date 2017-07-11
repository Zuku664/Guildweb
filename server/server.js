Meteor.startup(function () {
  fs = Npm.require('fs');
})


//checks to see if default site values are set, creates template for later
var needed = ['title', 'about', 'tabard', 'background', 'favicon', 'recruiting']
var firstTime = 0;
for(var i = 0; i < needed.length; i++){
  if(siteDetails.findOne({_id: needed[i]})){
    //horray!!
  }else{
    //lets create em
    siteDetails.insert({_id: needed[i]})
    firstTime = 1;
  }
}
if(firstTime == 1){
  //wow
  siteDetails.update({_id: 'recruiting'}, {$set:{dnB: 'checked', dnU: 'checked', dnF: 'checked', dhH: 'checked', dhV: 'checked', drB: 'checked', drF: 'checked', drR: 'checked', drG: 'checked', huM: 'checked', huS: 'checked', huB: 'checked', maF: 'checked', maFr: 'checked', maA: 'checked', moM: 'checked', moW: 'checked', moB: 'checked', paH: 'checked', paR: 'checked', paP: 'checked', prS: 'checked', prD: 'checked', prH: 'checked', roA: 'checked', roS: 'checked', roC: 'checked', shE: 'checked', shR: 'checked', shEn: 'checked', waA: 'checked', waD: 'checked', waDe: 'checked', warA: 'checked', warF: 'checked', warP: 'checked'}})
  console.log('hi')
  firstTime = 0
  counts.insert({_id:"data", postCount:0, appCount:0, raidCount: 0})
}


//creates initial account
Meteor.methods({
  'accountCheck' : () =>{
    if(userCount.findOne({count: 0})){
      return true;
    }else{
      return false;
    }
  },
  'phraseCheck': (secret) =>{
    if(secret == "SnowyTableSanDiegoFifteenTwelve"){
      return true;
    }
  },
  'createAcc': (usm, psw) =>{
    Accounts.createUser({
      username: usm,
      password: psw
    });
    userCount.insert({count: 1});
    userCount.remove({count: 0});
  }
})

Meteor.methods({
  'post': (imageData, title, content, cata) =>{
    if(Meteor.user()){
      // our data URL string from canvas.toDataUrl();
      var imageDataUrl = imageData;
      // declare a regexp to match the non base64 first characters
      var dataUrlRegExp = /^data:image\/\w+;base64,/;
      // remove the "header" of the data URL via the regexp
      var base64Data = imageDataUrl.replace(dataUrlRegExp, "");
      // declare a binary buffer to hold decoded base64 data
      var imageBuffer = new Buffer(base64Data, "base64");
      var id = ShortId.generate();
      var isoDate = new Date()
      var res = isoDate.toString().split(" ");
      var date = res[1] + " " + res[2] + " " + res[3]
      var path = process.env["PWD"] + '/.static~/';

      var cata = cata;
      if(cata.includes("News")){
        cata = "News"
      }else if(cata.includes("Boss")){
        cata = "Boss"
      }else{
        //if no catagory is supplied, assume it's just news
        cata = "News"
      }
      posts.insert({_id: id, title: title, content: content, imgPath: '/files/' + id+".jpeg", date:date, cataSux:cata, date_created: new Date()})
      counts.update({_id:"data"}, {$inc:{postCount: 1}})
      fs.writeFile(path+id+'.jpeg', imageBuffer,
      function (err) {
        if (err) throw err;
        console.log('Done!');
      })
    }
  },
  'addRaid': (title, normS, heroS, mythS, bossName, bossStatN, bossStatH, bossStatM, addCC) =>{
    if(Meteor.user()){
      //okay, I'm posting each boss and it's stats in an array. I need to break it up to show it, but I'm sure I can do that Client side.
      raids.insert({title: title, normS: normS, heroS:heroS, mythS:mythS, bossName:bossName, bossStatN:bossStatN, bossStatH:bossStatH, bossStatM:bossStatM, length: addCC})
      counts.update({_id:"data"}, {$inc:{raidCount: 1}})
    }
  },
  'addQues': (ques, quesCount) =>{
    if(Meteor.user()){
      questions.remove({})
      questions.insert({ques:ques, quesCount:quesCount})
    }
  }
});

Meteor.methods({
  'updateSite': (specStatus, title, about) =>{
    if(Meteor.user()){
      var spec = ['dnB','dnU','dnF','dhH','dhV','drB','drF','drR','drG','huM','huS','huB','maF','maFr','maA','moM','moW','moB','paH','paR','paP','prS','prD','prH','roA','roS','roC','shE','shR','shEn','waA','waD','waDe','warA','warF','warP']

      //for loop wont work, as I can only assign the value and not the property
      siteDetails.update({_id: 'recruiting'}, {$set:{dnB: specStatus[0], dnU: specStatus[1], dnF: specStatus[2], dhH: specStatus[3], dhV: specStatus[4], drB: specStatus[5], drF: specStatus[6], drR: specStatus[7], drG: specStatus[8], huM: specStatus[9], huS: specStatus[10], huB: specStatus[11], maF: specStatus[12], maFr: specStatus[13], maA: specStatus[14], moM: specStatus[15], moW: specStatus[16], moB: specStatus[17], paH: specStatus[18], paR: specStatus[19], paP: specStatus[20], prS: specStatus[21], prD: specStatus[22], prH: specStatus[23], roA: specStatus[24], roS: specStatus[25], roC: specStatus[26], shE: specStatus[27], shR: specStatus[28], shEn: specStatus[29], waA: specStatus[30], waD: specStatus[31], waDe: specStatus[32], warA: specStatus[33], warF: specStatus[34], warP: specStatus[35]}})


      if(title != "" && title != undefined && title != null){
        siteDetails.update({_id:'title'}, {$set:{title: title}})
      }
      if(about != "" && about != undefined && about != null){
        siteDetails.update({_id:'about'}, {$set:{about: about}})
      }
    }
  },
  'updateRaid': (title, normS, heroS, mythS, bossName, bossStatN, bossStatH, bossStatM, addCC, target)=>{
    if(Meteor.user()){
      raids.update({_id:target}, {$set:{title: title, normS: normS, heroS:heroS, mythS:mythS, bossName:bossName, bossStatN:bossStatN, bossStatH:bossStatH, bossStatM:bossStatM, length: addCC}})
    }
  },
  'updatePost': (title, content, id) =>{
    if(Meteor.user()){
      posts.update({_id: id}, {$set: {title: title, content:content}})
    }
  }
})

Meteor.methods({
  'sendApp': (questions, resps, amt) =>{
    apps.insert({username: resps[0].replace("::", ""), questions: questions, resps:resps, amt:amt})
    counts.update({_id:"data"}, {$inc:{appCount: 1}})
  }
})

Meteor.methods({
  'deletePost': (post)=>{
    if(Meteor.user()){
      var filePath = process.env["PWD"] + '/.static~/'+post+'.jpeg';
      fs.unlinkSync(filePath);
      posts.remove({_id:post})
      counts.update({_id:"data"}, {$inc:{postCount: -1}})
    }
  },
  'deleteApp': (appId)=>{
    if(Meteor.user()){
      apps.remove({_id: appId})
      counts.update({_id:"data"}, {$inc:{appCount: -1}})
    }
  },
  'deleteRaid': (raidId)=>{
    if(Meteor.user()){
      raids.remove({_id: raidId})
      counts.update({_id:"data"}, {$inc:{raidCount: -1}})
    }
  }
})
