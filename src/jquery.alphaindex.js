/**
 * jquery-alphaindex
 * https://github.com/idlesign/jquery-alphaindex
 *
 * Distributed under BSD License.
 */

/*globals jQuery, console */


(function($) {
    'use strict';

    $.fn.makeAlphaIndex = function(options) {

        var $indexList = this,
            settings = $.extend({}, $.fn.makeAlphaIndex.defaults, options),

            /**
             * Indexes items in target list by first letter
             * and returns that index.
             *
             * @param $list
             * @returns {{}}
             */
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
                    $item.hide();

                    indexChar = indexChar.toLowerCase();

                    var known = indexed[indexChar];

                    if (known === undefined) {
                        indexed[indexChar] = [$item];

                    } else {
                        known.push($item);
                    }

                });

                return indexed;
            },

            /**
             * Toggles items in target list which are index by indexObj.
             *
             * @param indexObj Could be a letter from index (e.g. `A`, `a`) or index
             *     bar letter object (DOM element).
             */
            toggleItems = function(indexObj) {

                if (indexObj === undefined) {
                    $('li', $indexList).toggle();
                    return;
                }

                if (typeof indexObj === 'boolean') {
                    $('li', $indexList).toggle(indexObj);
                    return;
                }

                if (typeof indexObj === 'object') {
                    // event.target to index char
                    indexObj = $(indexObj).data('idxChar');
                }

                var targetShown = false,
                    index = $indexList.alphaIndex,
                    known = index[indexObj];

                // This loop is here only to not to ruin semantics
                // of .alphaIndexToggle('a') like calls toggling letter.
                $.each(index, function (indexer, items) {
                    if (indexer !== indexObj) {
                        $.each(items, function (_, $item) {
                            $item.hide();
                        });
                    }
                });

                if (known) {
                    $.each(known, function (_, $item) {
                        $item.toggle();
                        targetShown = $item.is(':visible');
                    });
                }

                $.each($('a', $indexList.alphaIndexBar), function(_, item) {
                    var $item = $(item);

                    $item.removeClass('current');

                    if ($item.data('idxChar') === indexObj && targetShown) {
                        $item.addClass('current');
                    }
                });

            },

            /**
             * Initializes index bar.
             *
             * Returns index bar element.
             *
             * @param $list
             * @param indexed
             * @returns {*|HTMLElement}
             */
            initIndexBar = function($list, indexed) {

                var indexChars = Object.keys(indexed).sort(),
                    $indexBar = $('<ul>');

                $list.indexChars = indexChars;  // For further usage.

                $list.before($indexBar);

                $.each(indexChars, function(_, indexChar) {
                    var $barItem = $('<a href="#">' + indexChar.toUpperCase() + '</a>');

                    if (settings.showItemsCount) {
                        $barItem.append('<sup>' + indexed[indexChar].length + '</sup>');
                    }

                    $barItem.data('idxChar', indexChar);
                    $indexBar.append($barItem);

                    $barItem.wrap('<li></li>');
                });

                $indexBar.addClass('alpha-index-bar');

                $('a', $indexBar).on('click', function(e) {
                    toggleItems(e.target);
                });

                return $indexBar;
            },

            /**
             * Handles various options.
             *
             * @param $list
             */
            handleOptions = function($list) {

                if (settings.activateFirstIndex) {
                    var first = $list.indexChars[0];
                    if (first !== undefined) {
                        toggleItems(first);
                    }
                }
            };

        $indexList.hide();  // Prevent flicker.

        var index = prepareIndex($indexList),
            $indexBar = initIndexBar($indexList, index);

        $indexList.addClass('alpha-index-list');
        $indexList.alphaIndex = index;
        $indexList.alphaIndexBar = $indexBar;
        $indexList.alphaIndexToggle = toggleItems;

        $indexList.show();

        handleOptions($indexList);

        return $indexList;
    };

    $.fn.makeAlphaIndex.defaults = {
        activateFirstIndex: true,
        showItemsCount: true
    };

}(jQuery));
