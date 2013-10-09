// Tests the manifest_helper.js from shared
'use strict';

requireApp('system/shared/js/manifest_helper.js');

suite('ManifestHelper', function() {
  test('All properties the same when no locales', function() {
    var data = {
      name: 'Built-in Keyboard',
      description: 'Built-in Keyboard',
      type: 'certified',
      role: 'keyboard'
    };
    var helper = new ManifestHelper(data);
    for (var prop in data) {
      assert.equal(helper[prop], data[prop], 'Value for ' + prop + 'matches');
    }
  });
  suite('Properties with locale overrides', function() {
    setup(function() {
      document.documentElement.lang = 'en-US';
      this.data = {
        name: 'Built-in Keyboard',
        description: 'Built-in Keyboard',
        type: 'certified',
        role: 'keyboard',
        test: 'none',
        sub: {
          test: 'none',
          overriden: 'false',
          locales: {
            en: {
              overriden: 'true'
            }
          }
        },
        locales: {
          'en-US': {
            test: 'en-US'
          },
          en: {
            name: 'English Keyboard',
            test: 'en'
          }
        }
      };
      this.helper = new ManifestHelper(this.data);
    });
    test('not overriden', function() {
      assert.equal(this.helper.description, this.data.description);
    });
    test('overriden with en-US', function() {
      assert.equal(this.helper.test, this.data.locales['en-US'].test);
    });
    test('overriden with en', function() {
      assert.equal(this.helper.name, this.data.locales.en.name);
    });
    test('sub properties inherit locale translation', function() {
      assert.equal(this.helper.sub.overriden, 'true');
    });
  });
});