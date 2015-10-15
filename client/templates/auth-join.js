var ERRORS_KEY = 'joinErrors';

Template.join.onRendered(function() {
  var mainbodyHeight = $("body").height() - $(".share-with").outerHeight() - $(".bottom-menu").outerHeight()
  $(".main").height(mainbodyHeight);
});

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});

});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    var options = {
      email: email,
      username: email.substring(0, email.indexOf('@')),
      password: password,
      profile: {
          image: '/img/snapChanProfile.png'
      },
    };

    Accounts.createUser(options, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      Router.go('/');
    });
  }
});
