requorm.js
==========

JavaScript library for checking and validating HTML forms. If any of the fields in the form incorrectly filled, submit buttons will be disabled. [![NPM version](https://badge.fury.io/js/requorm.js.svg)](http://badge.fury.io/js/requorm.js)

#### Content
* [Examples](#examples)
* [Installation](#install)
* [Usage](#usage)
* [Addition checkers to DOM element](#addition-checkers-to-dom-element)
* [Default checkers](#default-checkers)
* [Regular Expressions](#regular-expressions)
* [Addition own checkers](#addition-own-checkers)
* [Using CSS](#using-css)
* [Using Tooltips](#using-tooltips)
* [Contribution](#contribution)

#### Examples
Watch examples [here](http://asaskevich.github.io/requorm.js)

#### Installation
You can download library directly from GitHub. Alternatively, you can use **npm** or **bower**:
```shell
$ npm install requorm.js
$ bower install requorm.js
```

#### Usage
First of all, include `requorm.js` (or minified `requorm.min.js`) to your HTML file:
```html
<head>
    <meta charset="UTF-8">
    ...
    <link rel="stylesheet" type="text/css" href="requorm.css">
    <script src="requorm.js"></script>
</head>
```
Create any form with some class name:
```html
<form class="myform">
        <input type="text" placeholder="Name">
        <input type="text" placeholder="Email">
        <input type="submit" class="button" value="Submit">
</form>
```
Init library, init default checkers and(or) add own checkers and apply to our form with class name "myform":
```html
<script>
    var r = new requorm()
    r.initDefCheckers()
    // Here we can add own checkers
    // Here we can add own tooltips
    // After all we can call "apply" method
    r.apply(".myform")
</script>
```

#### Addition checkers to DOM element
Library use attribure `checkers` for following tags:
* `input`
* `textarea`
* `select`

For example:
```html
<input type="text" checkers="notEmpty">
```
If the attribute is not specified, element will be ignored. One element can have multiple checkers:
```html
<input type="text" checkers="notEmpty; email()">
```
Checkers in attribute are separated by semicolon. If checker recieve any const arguments, you can point them like this:
```html
<input type="text" checkers="minLength(8); maxLength(32);">
<input type="text" checkers="length(8, 32)">
<input type="text" checkers="equal(abacaba)">
```
Note, that list of arguments `10, 1.0f, true, abc abc` will be parsed as array of strings: `["10", "1.0f", "true", "abc abc"]`
You can change used attribute by passing new attribute value to constructor:
```js
var r = new requorm('same-attribute');
```

#### Default checkers
- **notEmpty** - check, that field has any input
- **minLength(min)** - check, that field input has length greater or equal to `min`
- **maxLength(max)** - check, that field input has length less or equal to `max`
- **equal(input)** - check, that field input is equal to `input`
- **alpha** - check, that field input has only alphabetic characters
- **numeric** - check, that field input has only numeric characters
- **email** - check, that field input has valid e-mail form
- **len(min, max)** - check, that field input has length between `min` and `max`
- **alphanum** - check, that field input has only alphabetic and numeric characters

#### Regular expressions
Also you can use regular expressions instead checkers. Just put your regexp between slashes:
````html
<input type="text" checkers="/^[a-zA-Z0-9]*$/">
````

#### Addition own checkers
For creating new checker, call `requorm.addChecker(name, func)`, where `name` is name of checker and `func` is function, that take DOM element and array of arguments and return `true|false`. Following code create new checker with name `equal`:
```javascript
var r = new requorm()
r.addChecker("equal", function(element, args) {
  return (args.length > 0) && (element.value == args[0])
})
```
After it you can use checker in html:
```html
<input type="text" checkers="equal(abacaba)">
```

#### Using CSS
If you want to mark invalid and valid fields visually, use in your CSS file following selectors:
* `.invalid-input`
* `.valid-input`
* `.button[disabled]`
* `.button`
You can change `.invalid-input .valid-input` to your CSS classes:
```js
var r = new requorm('checkers', 'validField', 'invalidField');
```

#### Using Tooltips
You can use tooltips for invalid fields. First of all, include all necessary jQuery and Bootstrap files. After it include plugin `Bootstrap Tooltips`. Tell the library that you want to use tooltips:
```javascript
var r = new requorm();
...
r.setTooltipUsing(true); // By default this flag set to false
...
r.apply(".myform");
```
**Note:** Call `setTooltipUsing` **always** before `apply`, otherwise there is no effect!

You can include all necessary files by this snippet (I use it in my examples):
```html
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
```
By default tooltip message looks like:
```
[CheckerName 1 that throw error]
[CheckerName 2 that throw error]
...
[CheckerName N that throw error]
```
You can make it looks better by using function `setTooltip (checkerName, tooltipMessage)`.
**Note:** Call `setTooltip` **always** before `apply`, otherwise there is no effect!

After execution this code:
```javascript
var r = new requorm();
...
r.setTooltipUsing(true); 
r.setTooltip("email", "Value is not valid email!");
...
r.apply(".myform");
```
our tooltip for checker `email` will be look like `[Value is not valid email!]`.

#### TODO
* More checkers
* Unit tests
* Documentation
* Pretty argument parser
* Your ideas?

#### Contribution
If you do have a contribution for the package feel free to put up a Pull Request or open Issue.

[![NPM](https://nodei.co/npm/requorm.js.png?downloads=true)](https://nodei.co/npm/requorm.js/)
