Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('todos', function(listId) {
  check(listId, String);

  return Todos.find({listId: listId});
});

Meteor.publish('currentChan', function() {
  return Channels.find({});
});


Meteor.publish('channels', function() {
  return Channels.find({});
});

Meteor.publish('snapRouter', function() {
  return SnapRouter.find({});
});

Meteor.publish('snaps', function() {
  return Snaps.find({});
});

Meteor.publish('directory', function(){
   return Meteor.users.find({}, {fields: {username: 1, profile: 1}});
})