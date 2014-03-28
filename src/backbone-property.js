var Backbone = require('backbone'),
    _ = require('lodash');

function BackboneProperty (options) {
    'use strict';

    if (!_.isObject(options)) {
        throw new Error('An options hash must be passed to the constructor');
    }

    if (!_.isObject(options.model)) {
        throw new Error('You must pass a Backbone Model as the \'model\' option');
    }

    if (!_.isString(options.property)) {
        throw new Error('You must pass a string as the \'property\' option');
    }

    _.extend(this, {}, Backbone.Events);

    var _model = options.model,
        _property = options.property,
        _this = this;

    function generateTrigger(event) {
        return function () {
            _this.trigger.apply(this, [event, _this].concat(Array.prototype.slice.call(arguments, 1)));
        };
    }

    this.get = function () {
        return _model.get(_property);
    };

    this.set = function (value, options) {
        _model.set(_property, value, options);
    };

    this.listenTo(_model, 'change:' + _property , generateTrigger('change:' + _property));
    this.listenTo(_model, 'change', generateTrigger('change'));
}

Backbone.Property = BackboneProperty;
module.exports = BackboneProperty;