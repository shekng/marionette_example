'use strict';

define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'view/item'], 
function($, _, Bb, Mn, Radio, ItemView){
    var view = Mn.CollectionView.extend({
        tagName: "ul",
        //collection: new Bb.Collection(),
        childView: ItemView,        
        onRender: function() {
            console.log('ul - render');
        },
        onDestroy: function() {
            console.log('ul - destroy');
        },
        onChildviewDeleteItem: function(childView) {
            var basicChannel = Radio.channel("basic");
            basicChannel.trigger("some:event", {type: "1"});
                        
            this.collection.remove(childView.model);
        }
    });
    
    return view;
});
