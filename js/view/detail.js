'use strict';

define(['jquery', 'underscore', 'marionette', 'text!tmpl/detail.html'],
function($, _, Mn, templateHTML) {
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        events: {
        },
        onRender: function() {
            console.log('detail - render');
        },
        onDestroy: function() {
            console.log('detail - destroy');
        },
    });
    
    return view;
});

