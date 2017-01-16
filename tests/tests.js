/*globals $, QUnit, console */


QUnit.test('test basic', function(assert) {
    'use strict';

    var $list = $('#alpha'),
        index = $list.makeAlphaIndex({activateFirstIndex: false});

    assert.equal($list.children(':visible').length, 0, 'items hidden');
    assert.equal($list.children().length, 7, 'all items in place');

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

QUnit.test('test options', function(assert) {
    'use strict';

    var makeList = function(html, options) {
            var $list = $(html);
            $('#alpha').after($list);

            var $bar = $list.makeAlphaIndex(options).alphaIndexBar;
            return [$list, $bar];
        },
        removeList = function($list) {
            var $bar = $list.alphaIndexBar;
            $list.remove();
            $bar.remove();
        };

    var [$list, $bar] = makeList('<ul><li>One</li><li>Two</li><li>Three</li></ul>'),
        sups = $('sup', $bar);

    assert.equal(parseInt($(sups[0]).text()), 1, 'count A');
    assert.equal(parseInt($(sups[1]).text()), 2, 'count T');
    assert.equal($('li:visible', $list).length, 1, 'first index active');

    removeList($list);

    var [$list, $bar] = makeList('<ul><li>One</li><li>Two</li></ul>', {showItemsCount: false});
    assert.equal($('sup', $bar).length, 0, 'no counts');
    removeList($list);


});