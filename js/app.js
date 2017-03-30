'use strict';

//Configure require.js
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }, 
    marionette: {
        deps: [
            'jquery',
            'underscore',
            'backbone',
            'underscore',
            'backbone.radio'
        ],
        exports: 'Mn'
    }
  },
  paths: {
      jquery: 'libs/jquery-2.0.3.min',
      underscore: 'libs/underscore-min',
      backbone: 'libs/backbone-min',
      text: 'libs/text',
      'backbone.radio': 'libs/backbone.radio',
      marionette: 'libs/backbone.marionette'
  }
});

//Start up our App
require([
    'marionette',
    'backbone.radio',
    'collection/users',
    'view/app',
    'view/main',
    'view/about',
    'view/detail'
], 
function (Mn, Radio, UserCollection, AppView, MainView, AboutView, DetailView) {
    var colUser = new UserCollection([{id:0, name:'mike', age:10}, {id:1, name:'tony', age:20}]);
window.users = colUser;
    var AppRouter = Mn.AppRouter.extend({
        routes: {
            "": "home",
            "about": "about",
            "contact": "contact",
            "user/:id": "detail"
        },
        initialize: function() {
            this.app = this.options.app;
            this.mainRegion = this.app.getRegion().currentView.getRegion("main");
        },
        home: function() {
            this.mainRegion.show(new MainView({collection: colUser}));
            
            //console.log("home");
        },
        about: function() {
            this.mainRegion.show(new AboutView({collection: colUser}));
            
            //console.log("about");
        },
        contact: function() {
            //console.log("contact");
        },
        detail: function(id) {
            this.mainRegion.show(new DetailView({model: colUser.get(id)}));
        }
    });
    
    var App = Mn.Application.extend({
        region: "#appRegion",
        onBeforeStart: function() {
            var channel = Radio.channel("basic");            
            channel.on("some:event", function(oParam){
                console.log("something happen! - " + oParam.type);
                //channel.off('some:event');
                return "aaaaaa";
            })
            
            var channelNotify = Radio.channel("notify");        
            channelNotify.reply("show:error", this.showError);
        },
        showError: function(msg) {
            console.log("showError - " + msg);  
            return "err-101";
        },
        showError2: function(msg) {
            console.log("showError2 - " + msg);  
            return "err-102";
        },
        onStart: function() {
            this.showView(new AppView());
            this.router = new AppRouter({"app": this});
            Backbone.history.start();
            
            var channel = Radio.channel("basic");
            
            /*
            this.listenTo(channel, 'some:event', function(oParam){
                console.log("listen to something happen! - " + oParam.type);
            });
            */
            var channelNotify = Radio.channel("notify");        
            channelNotify.reply("show:error", this.showError2);
        }
    });
    
    var app = new App();
    app.start();
});