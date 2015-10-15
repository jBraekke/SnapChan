var SNAP_PROFILE = 'snapProfileImg';
Session.setDefault(SNAP_PROFILE, "");


Template.profile.onRendered(function() {
  //resizing app
  var mainbodyHeight = $("body").height() - $(".share-with").outerHeight() - $(".bottom-menu").outerHeight()
  $(".main").height(mainbodyHeight);
  
  Session.set(SNAP_PROFILE, Meteor.user().profile.image);

});

Template.profile.helpers({
  photo: function() {
    return Session.get(SNAP_PROFILE);
  },
  profile: function(){
    if(Meteor.user().profile.username)
      return Meteor.user().profile.username
    else
      return Meteor.user().username
  }
});

Template.profile.events({
  
  'click .take-picture': function(e){
      $('input#takePictureField').trigger('click');
  },
  'change #takePictureField': function(event){
    console.warn("changing!");
    if(event.target.files.length == 1 && 
      event.target.files[0].type.indexOf("image/") == 0) {
        var file = event.target.files[0];
        canvasResize(file, {
        width: 150,
        height: 150,
        crop: true,
        quality: 100,
        rotate: 0,
        callback: function(data, width, height) {
            Session.set(SNAP_PROFILE, data);
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.image" : data}})
          }
        });
      }
  },

  'blur input[name="username"]' : function(e){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.username" : e.target.value}})
  },
  'click .back-js': function(){
    Router.go('main');
  }
});
