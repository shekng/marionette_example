'use strict';

define(['jquery', 'underscore', 'marionette', 'view/header', 'view/main'],
function($, _, Mn, HeaderView, MainView) {
    var view = Mn.View.extend({
        el: "#containerRegion",  
        template: false,
        regions: {
            header: "#headerRegion",
            main: "#mainRegion"
        },
        initialize: function() {
            this.showChildView("header", new HeaderView());
            //this.showChildView("main", new MainView());
        },
        onRender: function() {
            
        }
        
    });
    
    return view;
});