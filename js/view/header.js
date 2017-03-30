'use strict';

define([
    'jquery',
    'underscore',
    'marionette',
    'text!tmpl/header.html'
], function($, _, Mn, templateHTML){
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        onRender: function() {
            console.log('header - render');
        },
        onDestroy: function() {
            console.log('header - destroy');
        }
    });
    
    return view;
});