BlazeLayout.setRoot('body');

Deps.autorun( function(){Meteor.subscribe('posts', postLimitServer.get())});
Meteor.subscribe('posts');
Meteor.subscribe('raids');
Meteor.subscribe('questions');
Meteor.subscribe('apps');
Meteor.subscribe('siteDetails');
Meteor.subscribe('counts');
Meteor.subscribe("images");

var currentFilter = 0;
Meteor.newsFilter =({
  'change' : () =>{
    if(currentFilter == 0){
      newsFilter.set('Boss');
      currentFilter = 1;
    }else{
      newsFilter.set('News');
      currentFilter = 0;
    }
  }
})

addQU = 0
var firstQues
Meteor.addQues = ({
  'addQues': () =>{
    if(addQU == 0){
      addQU += 1
      firstQues = true
    }
    let thisQues = '"qu'+addQU+'"'
    $('.questions').append('<input class="quesName" placeholder="Question" id='+thisQues+'</input>')
    if(firstQues == true){
      firstQues = false
    }else{
      addQU += 1
    }
  },
  'remQues': () =>{
    var remNum = addQU - 1
    var ques = '#qu'+remNum
    $( ques ).remove();
    addQU -= 1
  },
  'postQues': ()=>{
    let ques = []
    var test = addQU
    for(var i = 0; i < test; i++){
      ques.push($('#qu'+[i]).val()+"::")
    }
    Meteor.call('addQues', ques, addQU)
    addQU = 0
    location.reload();
  }
})

addCC = 0
Meteor.addBoss = ({
  'addBoss': () =>{
    addCC += 1
    let bossCon = '"bossCon'+addCC+'"'
    let thisAbn = '"abn'+addCC+'"'
    let thisAbsN = '"absN'+addCC+'"'
    let thisAbsH = '"absH'+addCC+'"'
    let thisAbsM = '"absM'+addCC+'"'

    $('#bossCon').append('<div class="bosses" id='+bossCon+'><input class="bossName" placeholder="Boss Name" id='+thisAbn+'/> \
    <table> \
    <th>&nbsp;N&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;&nbsp;M</th> \
    <tr> \
    <td> \
    <input type="checkbox" id='+thisAbsN+'/> \
    <input type="checkbox" id='+thisAbsH+'/> \
    <input type="checkbox" id='+thisAbsM+'/> \
    </td> \
    </tr> \
    </table></div>')
  },
  'remBoss' : () =>{
    let bossCon = '#bossCon'+addCC
    $( bossCon ).remove();
    addCC -= 1
  },
  'postBoss': () =>{
    let title = $('.postTitle').val()
    let normS = $('.bcMain').val()
    let heroS = $('.bcHero').val()
    let mythS = $('.bcMyth').val()
    let bossName = []
    let bossStatN = []
    let bossStatH = []
    let bossStatM = []

    for(var i = 0; i < addCC+1; i++){
      bossName.push($('#abn'+[i]).val()+"::")
      if ($('#absN'+[i]).is(":checked"))
      {
        bossStatN.push('DEAD')
      }else{
        bossStatN.push('ALIVE')
      }
      if ($('#absH'+[i]).is(":checked"))
      {
        bossStatH.push('DEAD')
      }else{
        bossStatH.push('ALIVE')
      }
      if ($('#absM'+[i]).is(":checked"))
      {
        bossStatM.push('DEAD')
      }else{
        bossStatM.push('ALIVE')
      }
    }
    Meteor.call('addRaid', title, normS, heroS, mythS, bossName, bossStatN, bossStatH, bossStatM, addCC)
    location.reload();
  }
})

var addCE = 0 - 1
Meteor.editBoss = ({
  'addBoss': (target) =>{
    addCE += target
    addCE += 1
    let bossCon = '"editBossCon'+addCE+'"'
    let thisAbn = '"editAbn'+addCE+'"'
    let thisAbsN = '"editAbsN'+addCE+'"'
    let thisAbsH = '"editAbsH'+addCE+'"'
    let thisAbsM = '"editAbsM'+addCE+'"'

    $('#editBossCon').append('<div class="bosses" id='+bossCon+'><input class="bossName" placeholder="Boss Name" id='+thisAbn+'/> \
    <table> \
    <th>&nbsp;N&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;&nbsp;M</th> \
    <tr> \
    <td> \
    <input type="checkbox" id='+thisAbsN+'/> \
    <input type="checkbox" id='+thisAbsH+'/> \
    <input type="checkbox" id='+thisAbsM+'/> \
    </td> \
    </tr> \
    </table></div>')
    addCE -= target
  },
  'remBoss' : (target) =>{
    addCE += target
    let bossCon = '#editBossCon'+addCE
    $( bossCon ).remove();
    addCE -= target + 1
  },
  'postBoss': (target, num) =>{
    let title = $('#editBossTitle').val()
    let normS = $('#editBcMain').val()
    let heroS = $('#editBcHero').val()
    let mythS = $('#editBcMyth').val()
    let bossName = []
    let bossStatN = []
    let bossStatH = []
    let bossStatM = []

    if(addCE <= 0){
      count = num -1
    }else{
      count = addCE
    }
    for(var i = 0; i < count+1; i++){
      bossName.push($('#editAbn'+[i]).val()+"::")
      if ($('#editAbsN'+[i]).is(":checked"))
      {
        bossStatN.push('DEAD')
      }else{
        bossStatN.push('ALIVE')
      }
      if ($('#editAbsH'+[i]).is(":checked"))
      {
        bossStatH.push('DEAD')
      }else{
        bossStatH.push('ALIVE')
      }
      if ($('#editAbsM'+[i]).is(":checked"))
      {
        bossStatM.push('DEAD')
      }else{
        bossStatM.push('ALIVE')
      }
    }

    Meteor.call('updateRaid', title, normS, heroS, mythS, bossName, bossStatN, bossStatH, bossStatM, count, target)
    location.reload();
  }
})

Meteor.pushState ={
  pushState:(target) =>{
    window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    if(target == 'feed' || target == 'news' || target == 'apply' || target == 'about'){
      history.pushState('', document.title, target);
    }
    else{
      history.pushState('', document.title, "p/"+target);
    }
  }
}
