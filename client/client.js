BlazeLayout.setRoot('body');

Meteor.subscribe('posts');
Meteor.subscribe('raids');
Meteor.subscribe('questions');
Meteor.subscribe('apps');
Meteor.subscribe('siteDetails');
Meteor.subscribe('counts');

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
Meteor.addQues = ({
  'addQues': () =>{
    addQU += 1
    let thisQues = '"qu'+addQU+'"'
    $('.questions').append('<input class="quesName" placeholder="Question" id='+thisQues+'</input>')
  },
  'remQues': () =>{
    let ques = '#qu'+addQU
    $( ques ).remove();
    addQU -= 1
  },
  'postQues': ()=>{
    let ques = []
    for(var i = 0; i < addQU+1; i++){
      ques.push($('#qu'+[i]).val()+"::")
    }
    Meteor.call('addQues', ques, addQU)
    addQU = 0
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
  }
})
