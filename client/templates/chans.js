Template.chans.onRendered(function() {
  var mainbodyHeight = $("body").height() - $(".share-with").outerHeight() - $(".bottom-menu").outerHeight()
  $(".main").height(mainbodyHeight);
});

Template.chans.helpers({
  'chans' : function(){
    return Channels.find({});
  }
});


Template.chans.events({

  'click .channel': function(e){
    $('input#takePictureField').trigger('click');
  },
  'click .back-js' : function(){
  	Router.go('/');
  }
});
