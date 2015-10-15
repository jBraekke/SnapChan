var SNAP_KEY = 'hasSnapped';
Session.setDefault(SNAP_KEY, 0);

var SNAP_IMAGE = 'snapImg';
Session.setDefault(SNAP_IMAGE, "");

var SNAP_DESC = 'snapDesc';
Session.setDefault(SNAP_IMAGE, "");

var SNAP_RENDER = 'renderingSnap';
Session.setDefault(SNAP_RENDER, false);

//selected Chans
var selectedChans = []

Template.main.onRendered(function() {
  var mainbodyHeight = $("body").height() - $(".share-with").outerHeight() - $(".bottom-menu").outerHeight()
  //console.log(mainbodyHeight);
  $(".main").height(mainbodyHeight);
});

Template.main.helpers({
  'snapped' : function(){
    return Session.get(SNAP_KEY);
  },
  'snapImg' : function(){
    return Session.get(SNAP_IMAGE);
  },
  'equals' : function(a,b){
    return (a === b);
  },
  'chans' : function(){
    return Channels.find({});
  },
  'snapRendering' : function(){
    return Session.get(SNAP_RENDER);
  }
});


Template.main.events({

  'click .snap-button': function(e){
      $('input#takePictureField').trigger('click');
  },
  'change #takePictureField': function(event){
    Session.set(SNAP_RENDER, true);
    if(event.target.files.length == 1 && 
      event.target.files[0].type.indexOf("image/") == 0) {
        var file = event.target.files[0];
        canvasResize(file, {
        width: 375,
        height: 0,
        crop: false,
        quality: 100,
        rotate: 0,
        callback: function(data, width, height) {
            Session.set(SNAP_RENDER, false);
            Session.set(SNAP_IMAGE, data);
            Session.set(SNAP_KEY, 1);
          }
        });
    }
  },

  'keyup .current-snap-txt' : function(event){
    Session.set(SNAP_DESC, event.target.value)
  },

  'click .snap-exit' : function(){
    Session.set(SNAP_KEY, 0);
    Session.set(SNAP_IMAGE, "");
    Session.set(SNAP_DESC, "")
    selectedChans = [];
  },

  'click .snap-send' : function(e){

    Session.set(SNAP_KEY, 2);
    var mainbodyHeight = $("body").height() - $(".share-with").outerHeight() - $(".bottom-menu").outerHeight()
    $(".chans").height(mainbodyHeight);
  },

  'click .channel' : function(event){
    var $event = $(event.target).closest("li");
    if($event.hasClass("selected")){
      $event.removeClass("selected");
      var index = selectedChans.indexOf($event.attr('value').toString())
      selectedChans.pop(index);
      console.log(selectedChans);
    } else{
      $event.addClass("selected");
      selectedChans.push($event.attr('value').toString());
      console.warn(selectedChans);
    }
  },
  'click .snap-share-js' : function(){
    var snap = Snaps.insert({
          image: Session.get(SNAP_IMAGE),
          message: Session.get(SNAP_DESC),
          createdBy: Meteor.userId(),
          createdAt: Date.now()
    });

    //foreach selected channel
    selectedChans.forEach(function(channel){
      SnapRouter.insert({
        snapId : snap,
        chanID : channel,
        createdAt: Date.now()
      })
    });

    Session.set(SNAP_KEY, 0);
    Session.set(SNAP_IMAGE, "");
    Session.set(SNAP_DESC, "")
    selectedChans = [];

  },
  'click .snap-menu' : function(){
    Router.go('chans');
  },
  'click .my-profile' : function(){
    Router.go('profile');
  }
});
