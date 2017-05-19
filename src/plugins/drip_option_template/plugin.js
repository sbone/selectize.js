/**
 * Plugin: "drip_option_template" (selectize.js)
 *
 * Handles Drip's previous <select> markup where
 * <option>s that had a secondary line in their
 * UI would be rendered with `data-description`
 * attributes.
 *
 * This plugin checks for `data-description` on
 * <option>s and replaces the default 'option'
 * template with one that shows the description text
 *
 */

Selectize.define('drip_option_template', function(options) {
  var self = this;
  var original = self.setupTemplates;
  var selectOptions = self.$input[0].options;
  var data_attrs;

  // If any `data-attrs` are present on the source `option` els,
  // pass them through to Selectize
  for (var i = 0; i < selectOptions.length; i++) {
		if (Object.keys(selectOptions[i].dataset).length > 0) {
      data_attrs = Object.keys(selectOptions[i].dataset);
      for (var j = 0; j < data_attrs.length; j++) {
        this.options[selectOptions[i].value][data_attrs[j]] = selectOptions[i].dataset[data_attrs[j]];
      }
    }
  }

  // add custom template to available option templates
  this.setupTemplates = (function() {
    var templates = {
      'option': function(data, escape) {
        return ('<div class="option">' +
          escape(data[self.settings.labelField]) +
          (data.description ? '<div class="desc">' + data.description + '</div>' : '') +
          '</div>');
      }
    };

    self.settings.render = $.extend({}, templates, self.settings.render);
    original.apply(self, arguments);
  });

});

