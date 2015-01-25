/**
 * parse-github-short-url <https://github.com/tunnckoCore/parse-github-short-url>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var parseUrl = require('./index');

describe('parse-github-short-url:', function() {
  describe('should throw', function() {
    it('Error when no arguments', function(done) {
      assert.throws(parseUrl, Error);
      done()
    });

    it('Error when empty string given', function(done) {
      function fixture() {
        parseUrl('')
      }
      assert.throws(fixture, Error);
      done();
    });

    it('TypeError when first argument not String given', function(done) {
      function fixture() {
        parseUrl({})
      }
      assert.throws(fixture, TypeError);
      done();
    });
  });

  describe('should return object with empty fields for missing properties', function(done) {
    it('when string not contain possible pattern', function(done) {
      var expected = {
        user: '',
        username: '',
        org: '',
        organization: '',
        repo: '',
        repository: '',
        branch: ''
      };
      var actual = parseUrl('some string');

      assert.deepEqual(actual, expected);
      done();
    });

    it('when string not a valid `user/repo` pattern', function(done) {
      var expected = {
        user: '',
        username: '',
        org: '',
        organization: '',
        repo: '',
        repository: '',
        branch: ''
      };
      var actual = parseUrl('some tunnckoCore!glob2fp#feature string');

      assert.deepEqual(actual, expected);
      done();
    });
  });

  describe('should work and', function() {
    it('should return object with `user`, `repo` and `branch`', function(done) {
      var expected = {
        user: 'tunnckoCore',
        username: 'tunnckoCore',
        org: 'tunnckoCore',
        organization: 'tunnckoCore',
        repo: 'glob2fp',
        repository: 'glob2fp',
        branch: 'feature'
      };
      var actual = parseUrl('tunnckoCore/glob2fp#feature');

      assert.deepEqual(actual, expected);
      done()
    });

    it('should return object with `user` and `repo` properties only', function(done) {
      var expected = {
        user: 'tunnckoCore',
        username: 'tunnckoCore',
        org: 'tunnckoCore',
        organization: 'tunnckoCore',
        repo: 'glob2fp',
        repository: 'glob2fp',
        branch: ''
      };
      var actual = parseUrl('tunnckoCore/glob2fp');

      assert.deepEqual(actual, expected);
      done();
    });

    it('should returned be object and have .constructor.name', function(done) {
      var expected = {
        user: 'tunnckoCore',
        username: 'tunnckoCore',
        org: 'tunnckoCore',
        organization: 'tunnckoCore',
        repo: 'glob2fp',
        repository: 'glob2fp',
        branch: 'feature'
      };
      var actual = parseUrl('tunnckoCore/glob2fp#feature');

      assert.deepEqual(actual, expected);
      assert.strictEqual(typeof actual, 'object');
      assert(actual.constructor);
      assert(actual.constructor.name);
      done()
    });

    it('should .constructor.name be `ParseGithubShorthand`', function(done) {
      var expected = {
        user: 'tunnckoCore',
        username: 'tunnckoCore',
        org: 'tunnckoCore',
        organization: 'tunnckoCore',
        repo: 'homepage',
        repository: 'homepage',
        branch: 'bigfix'
      };
      var actual = parseUrl('tunnckoCore/homepage#bigfix');

      assert.deepEqual(actual, expected);
      assert.strictEqual(typeof actual, 'object');
      assert.strictEqual(actual.constructor.name, 'ParseGithubShorthand');
      done();
    });

    it('should have static method .test', function(done) {
      var expected = {
        user: 'jadejs',
        username: 'jadejs',
        org: 'jadejs',
        organization: 'jadejs',
        repo: 'doctypes',
        repository: 'doctypes',
        branch: 'refactor'
      };
      var actual = parseUrl('jadejs/doctypes#refactor');

      assert.deepEqual(actual, expected);
      assert.strictEqual(typeof actual, 'object');
      assert.strictEqual(typeof parseUrl.test, 'function');
      assert.strictEqual(parseUrl.test(actual), true);
      done();
    });
  });

  describe('`.test` method', function() {
    it('should return `true` if given is valid `ParseGithubShorthand` object', function(done) {
      var expected = {
        user: 'visionmedia',
        username: 'visionmedia',
        org: 'visionmedia',
        organization: 'visionmedia',
        repo: 'expressjs',
        repository: 'expressjs',
        branch: 'wantfix'
      };
      var actual = parseUrl('visionmedia/expressjs#wantfix');

      assert.deepEqual(actual, expected);
      assert.strictEqual(parseUrl.test(actual), true);
      done();
    });


    it('should return `false` if given is not valid object', function(done) {
      var fixture = {
        username: 'tunnckoCore',
        repo: 'glob2fp'
      };

      assert.strictEqual(parseUrl.test(fixture), false);
      done();
    });
  });
});
