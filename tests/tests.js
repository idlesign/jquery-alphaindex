/*globals $, QUnit, console */


QUnit.test('test basic', function(assert) {
    'use strict';

    var $list = $('#alpha');

    assert.equal($list.children(':visible').length, 0, 'items hidden');
    assert.equal($list.children().length, 7, 'all items in place');

    var index = window.alphaIndex;

    assert.ok(index !== undefined, 'global var is set');

    assert.ok(index.alphaIndexToggle !== undefined, 'alphaIndexToggle attr is set');

    index.alphaIndexToggle('a');
    assert.equal($list.children(':visible').length, 1, 'visible a');

    index.alphaIndexToggle('a');
    assert.equal($list.children(':visible').length, 0, 'toggle a');

    index.alphaIndexToggle('и');
    assert.equal($list.children(':visible').length, 2, 'visible и');

    index.alphaIndexToggle(true);
    assert.equal($list.children(':visible').length, 7, 'show all');

    index.alphaIndexToggle(false);
    assert.equal($list.children(':visible').length, 0, 'hide all');

    index.alphaIndexToggle();
    assert.equal($list.children(':visible').length, 7, 'toggle show all');

    index.alphaIndexToggle();
    assert.equal($list.children(':visible').length, 0, 'toggle hide all');

    var bar = index.alphaIndexBar;

    assert.ok(bar !== undefined, 'alphaIndexBar attr is set');

    index.alphaIndexToggle('и');
    assert.equal($('a', bar).filter('.current').length, 1, 'current single');
    index.alphaIndexToggle('и');
    assert.equal($('a', bar).filter('.current').length, 0, 'current zero');

});
