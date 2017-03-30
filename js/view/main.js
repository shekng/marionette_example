'use strict';

define(['jquery', 'underscore', 'marionette', 'text!tmpl/main.html', 'view/list'],
function($, _, Mn, templateHTML, ListColView) {
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        ui: {
            txt: ".txtName"  
        },
        events: {
            "click .btn": "click",
            "click .addItem": "addItem",
            "click .removeItem": "removeItem"
        },
        regions: {
            list: ".listRegion"
        },
        onRender: function() {
            /*
            this.listColView = new ListColView({collection: this.collection});
            this.listColView.render();
            this.$el.append(this.listColView.$el);
            */
            
            this.showChildView("list", new ListColView({collection: this.collection}));
                                                        
            console.log('main - render');
        },
        onDestroy: function() {
            console.log('main - destroy');
        },
        click: function(event) {
            console.log("main - click!");
        },
        addItem: function(event) {
            this.collection.add({id: this.collection.length, name: this.ui.txt.val(), age: 30});
        },
        removeItem: function(event) {
            this.collection.pop();
        },
        onChildviewDeleteItem: function(childView) {
            alert(1)
            this.collection.remove(childView.model);
        }
    });
    
    return view;
});

