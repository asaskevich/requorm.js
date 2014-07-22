requorm.js
==========

JavaScript library for checking and validating HTML forms. If any of the fields in the form incorrectly filled, submit buttons will be disabled.

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
<input type="text" checkers="minlenght(8); maxlength(32);">
<input type="text" checkers="lenght(8, 32)">
<input type="text" checkers="equal(abacaba)">
```
Note, that list of arguments `10, 1.0f, true, abc abc` will be parsed as array of strings: `["10", "1.0f", "true", "abc abc"]`

#### Default checkers
- **notEmpty** - check, that field has any input
- **minlength(min)** - check, that field input has length greater or equal to `min`
- **maxlength(max)** - check, that field input has length less or equal to `max`
- **equal(input)** - check, that field input is equal to `input`
- **alpha** - check, that field input has only alphabetic characters
- **numeric** - check, that field input has only numeric characters
- **email** - check, that field input has valid e-mail form

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

#### TODO
* More checkers
* Unit tests
* Documentation
* Pretty argument parser
