/**
 * jquery-alphaindex
 * https://github.com/idlesign/jquery-alphaindex
 *
 * Distributed under BSD License.
 */

/*globals jQuery, console */


(function($) {
    'use strict';

    $.fn.makeAlphaIndex = function() {

        var indexList = this,

            prepareIndex = function($list) {
                var indexed = {};

                $.each($('li', $list), function(_, val){
                    var $item = $(val),
                        text = $item.text().replace(/\s+/g, ' ').trim(),
                        indexChar = text[0];

                    if (!indexChar) {
                        $item.remove();
                        return;
                    }

                    indexChar = indexChar.toLowerCase();

                    var known = indexed[indexChar];

                    $item.data('idxChar', indexChar);
                    $item.hide();

                    if (known === undefined) {
                        indexed[indexChar] = [$item];

                    } else {
                        known.push($item);
                    }

                });

                return indexed;
            },

            toggleItems = function(indexObj) {

                if (indexObj === undefined) {
                    $('li', indexList).toggle();
                    return;
                }

                if (typeof indexObj === 'boolean') {
                    $('li', indexList).toggle(indexObj);
                    return;
                }

                if (typeof indexObj === 'object') {
                    // event.target to index char
                    indexObj = $(indexObj).data('idxChar');
                }

                var targetShown = false;

                $.each($('li', indexList), function(_, item) {
                    var $item = $(item),
                        isTarget = $item.data('idxChar') === indexObj;

                    if (isTarget) {
                        $item.toggle();
                        targetShown = $item.is(':visible');

                    } else {
                        $item.hide();
                    }

                });

                $.each($('a', indexList.alphaIndexBar), function(_, item) {
                    var $item = $(item);

                    $item.removeClass('current');

                    if ($item.data('idxChar') === indexObj && targetShown) {
                        $item.addClass('current');
                    }
                });

            },

            initWidgets = function($list, indexed) {

                var indexChars = Object.keys(indexed).sort(),
                    $indexBar = $('<ul>');

                $list.before($indexBar);

                $.each(indexChars, function(_, indexChar) {
                    var $barItem = $('<a href="#">' + indexChar.toUpperCase() + '</a>');

                    $barItem.data('idxChar', indexChar);
                    $indexBar.append($barItem);

                    $barItem.wrap('<li></li>');
                });

                $indexBar.addClass('alpha-index-bar');

                $('a', $indexBar).on('click', function(e) {
                    toggleItems(e.target);
                });

                return $indexBar;
            };

        indexList.hide();  // Prevent flicker.

        var index = prepareIndex(indexList);

        indexList.addClass('alpha-index-list');
        indexList.alphaIndex = index;
        indexList.alphaIndexBar = initWidgets(indexList, index);
        indexList.alphaIndexToggle = toggleItems;

        indexList.show();

        return indexList;
    };

}(jQuery));
