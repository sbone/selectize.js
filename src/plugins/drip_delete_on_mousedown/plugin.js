/**
 * Plugin: "drip_delete_on_mousedown" (selectize.js)
 *
 * Adds condition to onMouseDown that allows for item
 * deletion when using the custom 'item' markup on
 * drip_option_template
 *
 */

Selectize.define('drip_delete_on_mousedown', function(options) {
  var self = this;
  var original = self.onMouseDown;

  this.onMouseDown = (function(e) {
    var $target = $(e.target);
    if ($target.hasClass('remove-item')) {
      var value = $target.parents('.item').data('value');
      self.removeItem(value);
    }

    original.apply(self, arguments);
  });

});

