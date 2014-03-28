'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var BackboneProperty = require('../src/backbone-property');
var Backbone = require('backbone');
var _ = require('lodash');

describe('BackboneProperty', function () {

    describe('basic instantiation', function () {
        it('should be a constructor', function () {
            expect(new BackboneProperty({
                model: new Backbone.Model(),
                property: 'property'
            })).to.be.an.instanceof(BackboneProperty);
        });

        it('requires options', function () {
            expect(function () {
                new BackboneProperty();
            }).to.throw('An options hash must be passed to the constructor');
        });

        it('should require a model', function () {
            expect(function () {
                new BackboneProperty({
                    property: 'property'
                });
            }).to.throw('You must pass a Backbone Model as the \'model\' option');
        });

        it('should require a property name', function () {
            expect(function () {
                new BackboneProperty({
                    model: new Backbone.Model()
                });
            }).to.throw('You must pass a string as the \'property\' option');
        });
    });

    describe('get', function () {
        it('should get the property from the Backbone.Model', function () {
            var model = new Backbone.Model();
            sinon.spy(model, 'get');

            var property = new BackboneProperty({
                model: model,
                property: 'prop'
            });

            property.get();

            sinon.assert.calledWithExactly(model.get, 'prop');
        });
    });

    describe('set', function () {
        var model,
            property;

        beforeEach(function () {
            model = new Backbone.Model();
            sinon.spy(model, 'set');
            property = new BackboneProperty({
                model: model,
                property: 'prop'
            });
        });

        it('should call through to set on the model', function () {
            property.set('value');

            sinon.assert.calledWith(model.set, 'prop', 'value');
        });

        it('should pass options', function () {
            property.set('value', { silent: true });

            sinon.assert.calledWithExactly(model.set, 'prop', 'value', { silent: true });
        });
    });

    describe('when setting the model property', function () {
        var model,
            property,
            handler,
            listener;

        beforeEach(function () {
            model = new Backbone.Model();
            property = new BackboneProperty({
                model: model,
                property: 'foo'
            });

            handler = sinon.spy();
            listener = _.extend({}, Backbone.Events);
        });

        it('should fire a specific property change event when the property is set', function () {

            listener.listenTo(property, 'change:foo', handler);
            model.set('foo', 'abc', { test: 'def' });

            sinon.assert.calledWithExactly(handler, property, 'abc', { test: 'def' });
        });

        it('should fire a change event when the property is set', function () {

            listener.listenTo(property, 'change', handler);
            model.set('foo', 'abc', {
                something: 'def'
            });

            sinon.assert.calledWithExactly(handler, property, { something: 'def' });
        });

    });

    it('should exist in the Backbone namespace', function () {
        expect(Backbone.Property).to.equal(BackboneProperty);
    });
});