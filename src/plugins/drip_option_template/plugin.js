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
      this.options[selectOptions[i].value]['data'] = {};
      data_attrs = Object.keys(selectOptions[i].dataset);
      for (var j = 0; j < data_attrs.length; j++) {
        this.options[selectOptions[i].value].data[data_attrs[j]] = selectOptions[i].dataset[data_attrs[j]];
      }
    }
  }

  // add custom template to available option templates
  this.setupTemplates = (function() {
    var templates = {
      'option': function(data, escape) {
        return ('<div class="option">' +
          escape(data[self.settings.labelField]) +
          (data.data && data.data.description ? '<div class="desc">' + data.data.description + '</div>' : '') +
          '</div>');
      },
      'item': function(data, escape) {
        return '<div class="item">' +
          escape(data[self.settings.labelField]) +
          (this.settings.mode === 'multi' ? '<button class="remove-item"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1"><g id="Octicons" stroke="none" stroke-width="1" fill="none"><g transform="translate(0.000000, -2.000000)"><polygon id="Shape" points="7.48 8 11.23 11.75 9.75 13.23 6 9.48 2.25 13.23 0.77 11.75 4.52 8 0.77 4.25 2.25 2.77 6 6.52 9.75 2.77 11.23 4.25"></polygon></g></g></svg></button>' : '') +
          '</div>';
      }
    };

    self.settings.render = $.extend({}, templates, self.settings.render);
    original.apply(self, arguments);
  });

});

