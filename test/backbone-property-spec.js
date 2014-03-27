'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var BackboneProperty = require('../src/backbone-property');
var Backbone = require('backbone');

describe('BackboneProperty', function () {

    describe('basic instantiation', function () {
        it('should be a constructor', function () {
            expect(new BackboneProperty({
                model: new Backbone.Model(),
                property: 'property'
            })).to.be.an.instanceof(BackboneProperty);
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
            var model = {
                get: sinon.spy()
            };

            var property = new Backbone.Property({
                model: model,
                property: 'prop'
            });

            property.get();

            expect(model.get.calledWith('prop')).to.be.true;
        });
    });

    describe('set', function () {
        var model,
            property;

        beforeEach(function () {
            model = { set: sinon.spy() };
            property = new BackboneProperty({
                model: model,
                property: 'prop'
            });
        });

        it('should call through to set on the model', function () {
            property.set('value');

            expect(model.set.calledWith('value'));
        });

        it('should pass options', function () {
            property.set('value', { silent: true });

            expect(model.set.calledWith('value', { silent: true }));
        });
    });

    it('should exist in the Backbone namespace', function () {
        expect(Backbone.Property).to.equal(BackboneProperty);
    });
});