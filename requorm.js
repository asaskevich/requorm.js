// Author Alex Saskevich
'use strict';

function requorm() {
    this.version = '0.0.1';
    this.checkers = [];
    this.addChecker = function (checkerName, func) {
        this.checkers[checkerName] = func;
    };
    this.apply = function (form) {
        function callback() {
            var enabled = true;
            for (var n = inputs.length; n--;) {
                var checks = [];
                if (inputs[n].getAttribute("checkers") != null) {
                    checks = inputs[n].getAttribute("checkers").split(/[\s*;|\s*]/);
                    var inCheckResult = true,
                        checkResult = true
                    for (var m = checks.length; m--;) {
                        var checker = checks[m];
                        var leftBrake = checker.indexOf("(");
                        var rightBrake = checker.indexOf(")");
                        var args = [];
                        if (leftBrake != -1 && leftBrake < rightBrake) {
                            args = checker.substr(leftBrake + 1, rightBrake - leftBrake - 1).split(/,\s*/);
                            checker = checker.substr(0, leftBrake);
                        }
                        if (checkers[checker] != null)
                            checkResult = checkers[checker](inputs[n], args)
                        enabled = enabled && checkResult
                        inCheckResult = inCheckResult && checkResult
                    }
                    if (inCheckResult) {
                        inputs[n].classList.add('valid-input');
                        inputs[n].classList.remove('invalid-input');
                    }
                    else {
                        inputs[n].classList.add('invalid-input');
                        inputs[n].classList.remove('valid-input');
                    }

                }
                else inputs[n].classList.add('valid-input');
            }
            for (var n = buttons.length; n--;)
                buttons[n].disabled = !enabled;
        }

        var forms = document.querySelectorAll(form),
            checkers = this.checkers,
            inputs = [],
            buttons = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                if (els[j].type != "button" && els[j].type != "submit") {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", callback, false);
                }
                else if (els[j].type == "button" || els[j].type == "submit") {
                    buttons.push(els[j])
                }
            }
        }
        callback();
    }
    this.initDefCheckers = function () {
        this.addChecker("notEmpty", function (element, args) {
            return element.value
        });
        this.addChecker("minLength", function (element, args) {
            return (args.length > 0) && (element.value.length >= parseInt(args[0]))
        });
        this.addChecker("maxLength", function (element, args) {
            return (args.length > 0) && (element.value.length <= parseInt(args[0]))
        });
        this.addChecker("equal", function (element, args) {
            return (args.length > 0) && (element.value == args[0])
        });
        this.addChecker("alpha", function (element, args) {
            return /^[a-zA-Z]+$/.test(element.value)
        });
        this.addChecker("numeric", function (element, args) {
            return /^-?[0-9]+$/.test(element.value)
        });
        this.addChecker("email", function (element, args) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(element.value)
        });
    }
}