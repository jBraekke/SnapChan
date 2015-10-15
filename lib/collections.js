Lists = new Mongo.Collection('lists');

Channels = new Mongo.Collection('Channels');

Snaps = new Mongo.Collection('Snaps');

SnapRouter = new Mongo.Collection('SnapRouter');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};

Todos = new Mongo.Collection('todos');


//Allow users to write directly to this collection from client code, subject to limitations you define.
if (Meteor.isServer) {

    Channels.allow({

        insert : function() {
            return true;
        },
        update : function() {
            return true;
        },
        remove : function() {
            return false;
        }
    });
}
