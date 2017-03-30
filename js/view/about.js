'use strict';

define(['jquery', 'underscore', 'marionette', 'text!tmpl/about.html'],
function($, _, Mn, templateHTML){
    var view = Mn.View.extend({
        template: templateHTML,
        events: {
          "click .btn": "click" 
        },
        onRender: function() {
            console.log('about - render');
        },
        onDestroy: function() {
            console.log('about - destroy');
        },
        click: function(event) {
            console.log("about - click!");
        }
    });
    
    return view;
});