jquery-alphaindex
=================
https://github.com/idlesign/jquery-alphaindex

[![Github All Releases](https://img.shields.io/github/downloads/idlesign/jquery-alphaindex/total.svg)]()

[![npm](https://img.shields.io/npm/v/jquery-alphaindex.svg)](https://www.npmjs.com/package/jquery-alphaindex) [![npm](https://img.shields.io/npm/dt/jquery-alphaindex.svg)](https://www.npmjs.com/package/jquery-alphaindex)


Description
-----------

*jQuery plugin to create alphabetical indexes for your lists.*

An alphabetical index may help your users to navigate through a long list of items.


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
        indexBar = myIndex.alphaIndexBar;  // bar object, if you need it

    myIndex.alphaIndexToggle('a');  // show A indexed
    myIndex.alphaIndexToggle('a');  // hide A indexed
    myIndex.alphaIndexToggle(true);  // show all
    myIndex.alphaIndexToggle(false);  // hide all
    myIndex.alphaIndexToggle();  // toggle all
```

Demo
----

* Demo page is available in sources: demo/demo.html.
* Hosted demo: https://idlesign.github.io/jquery-alphaindex/demo/demo.html


Styling
-------

* List is marked with ``.alpha-index-list``.
* Index bar is marked with ``.alpha-index-bar``.
* Index bar current item is marked with ``.current``.
