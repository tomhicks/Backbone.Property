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

    var _model = options.model,
        _property = options.property;

    this.get = function () {
        return _model.get(_property);
    };

    this.set = function (value, options) {
        _model.set(_property, value, options);
    };
}

Backbone.Property = BackboneProperty;
module.exports = BackboneProperty;