// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Channels.find().count() === 0) {
    
    var channels = [
      {title: "EveryOne"},
      {title: "snapChan"},
      {title: "Awesome"}
    ]

    var timestamp = (new Date()).getTime();

    _.each(channels, function(channel){
      var channelID = Channels.insert({
        title : channel.title,
        createdAt: new Date(timestamp)
      })
      timestamp += 1; // ensure unique timestamp
    });
  }
});
