Template.channel.onRendered(function() {
  var mainbodyHeight = $("body").height() - $(".share-with").outerHeight();
  $(".main").height(mainbodyHeight);
  $(".chans-view").css("padding-top", $(".share-with").outerHeight())
});

var snaps = function(snapId){

}

Template.channel.helpers({
  'channel' : function(){
    return Router.current().data().title.toLowerCase();
  },
  'snaps': function(){
  	var snaps = SnapRouter.find({chanID : Router.current().data()._id}, {sort : {createdAt: -1}, limit: 10});
    return snaps;
  },
  'getSnap': function(snapID){
  	var snapObj = Snaps.findOne({_id : snapID})
  	if(snapObj === undefined)
    return
    else
    return snapObj.image;
  },
  'getSnapMessage' : function(snapID){
    var snapObj = Snaps.findOne({_id : snapID})
    if(snapObj === undefined)
    return
    else
    return snapObj.message;
  },
  'getSnapOwnerImg' : function(snapID){
   var snapObj = Snaps.findOne({_id: snapID})
   if(snapObj === undefined)
    return
    else
   var owner = Meteor.users.findOne({_id: snapObj.createdBy});
   if(owner !== undefined)
   return owner.profile.image; 
  },
  //lookup owner of snap
  'getSnapOwnerName' : function(snapID){
   var snapObj = Snaps.findOne({_id: snapID})
   if(snapObj === undefined)
    return
    else
   var owner = Meteor.users.findOne({_id: snapObj.createdBy});
   if(owner !== undefined)
   return owner.profile.username === undefined ? owner.username : owner.profile.username; 
  },
  'postedAgo' : function(date){
    return moment(date).fromNow();
  }
});


Template.channel.events({
  'click .channel': function(e){
    $('input#takePictureField').trigger('click');
  },
  'click .back-js' : function(){
  	Router.go('chans');
  }
});
