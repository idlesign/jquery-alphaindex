jquery-alphaindex
=================
https://github.com/idlesign/jquery-alphaindex

[![npm](https://nodei.co/npm/jquery-alphaindex.png?downloads=true&stars=true)](https://nodei.co/npm/jquery-alphaindex/)


Description
-----------

*jQuery plugin to create alphabetical indexes for your lists.*

An alphabetical index may help your users to navigate through a long list of items.


Demo
----

* Demo page is available in sources: demo/demo.html.
* Hosted demo: https://idlesign.github.io/jquery-alphaindex/demo/demo.html


Usage
-----

1. Include ``jQuery``.

2. Include ``jquery.alphaindex.js`` or ``jquery.alphaindex.min.js``.

3. Make a list:

```html
    <ul id="my-list">
        <li>Joker James</li>
        <li>Anderson Ann</li>
        <li>Johnson John</li>
    </ul>
```

4. Initialize an index:

```javascript
    var myIndex = $('#my-list').makeAlphaIndex(),
        $indexBar = myIndex.alphaIndexBar;  // bar object, if you need it

    myIndex.alphaIndexToggle('a');  // toggle A indexed
    myIndex.alphaIndexToggle(true);  // show all
    myIndex.alphaIndexToggle(false);  // hide all
    myIndex.alphaIndexToggle();  // toggle all
```


Options
-------

* showItemsCount - Show number of items over each letter in index bar. Default: true.
* activateFirstIndex - Show list item belonging to the first letter in index bar after load. Default: true.


Styling
-------

* List is marked with ``.alpha-index-list``.
* Index bar is marked with ``.alpha-index-bar``.
* Index bar current item is marked with ``.current``.
