// Author Alex Saskevich
'use strict';

(function() {
    window.requorm = function requorm(attribute, validClass, invalidClass) {
        this.version = '0.1.1';
        this.author = "Alex Saskevich";
        this.attribute = "checkers" || attribute;
        this.validClass = 'valid-input' || validClass;
        this.invalidClass = 'invalid-input' || invalidClass;
        this.checkers = [];
        this.tooltipMessages = [];
        this.useTooltips = false;
        this.setTooltip = function (checkerName, tooltip) {
            this.tooltipMessages[checkerName] = tooltip;
        };
        this.addChecker = function (checkerName, func) {
            this.checkers[checkerName] = func;
            this.setTooltip(checkerName, checkerName);
        };
        this.setTooltipUsing = function (flag) {
            this.useTooltips = flag;
        };
        this.apply = function (form) {
            var that = this;
            function callback() {
                function hasClass(cls, ele) {
                    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
                }

                function addClass(cls, ele) {
                    if (!hasClass(cls, ele)) ele.className += " " + cls;
                }

                function removeClass(cls, ele) {
                    if (hasClass(cls, ele)) {
                        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                        ele.className = ele.className.replace(reg, ' ');
                    }
                }

                var enabled = true;
                for (var n = inputs.length; n--;) {
                    var checks = [];
                    if (inputs[n].getAttribute(that.attribute) != null) {
                        var allCheckers = inputs[n].getAttribute(that.attribute);
                        checks = inputs[n].getAttribute(that.attribute).split(/\s*;\s*/);
                        var inCheckResult = true,
                            tooltipMessage = "";
                        if (allCheckers.indexOf("/") == 0 && allCheckers.lastIndexOf("/") == allCheckers.length - 1) {
                            var regexp = new RegExp(allCheckers.substr(1, allCheckers.length - 2));
                            tooltipMessage = "RegExp " + allCheckers.substr(1, allCheckers.length - 2)
                            inCheckResult = regexp.test(inputs[n].value);
                            enabled = enabled && regexp.test(inputs[n].value);
                        } else {
                            for (var m = checks.length; m--;) {
                                var checker = checks[m];
                                var leftBrake = checker.indexOf("(");
                                var rightBrake = checker.indexOf(")");
                                var args = [];
                                var checkResult = true;
                                if (leftBrake != -1 && leftBrake < rightBrake) {
                                    args = checker.substr(leftBrake + 1, rightBrake - leftBrake - 1).split(/,\s*/);
                                    checker = checker.substr(0, leftBrake);
                                }
                                if (checkers[checker] != null) {
                                    checkResult = checkers[checker](inputs[n], args);
                                    if (!checkResult) tooltipMessage += " [" + tooltips[checker] + "]";
                                }
                                enabled = enabled && checkResult
                                inCheckResult = inCheckResult && checkResult
                            }
                        }
                        if (inCheckResult) {
                            addClass(that.validClass, inputs[n]);
                            removeClass(that.invalidClass, inputs[n]);
                            inputs[n].removeAttribute("rel");
                            inputs[n].removeAttribute("data-original-title");
                        }
                        else {
                            addClass(that.invalidClass, inputs[n]);
                            removeClass(that.validClass, inputs[n]);
                            if (useTooltips) {
                                inputs[n].setAttribute("rel", "tooltip");
                                inputs[n].setAttribute("data-original-title", tooltipMessage);
                            }
                        }

                    }
                    else addClass(that.validClass, inputs[n]);
                }
                for (var n = buttons.length; n--;)
                    buttons[n].disabled = !enabled;


                if (useTooltips && (typeof($) == "function")) {
                    if (typeof($("[rel=tooltip]").tooltip) == "function") $("[rel=tooltip]").tooltip();
                }
            }

            var forms = document.querySelectorAll(form),
                checkers = this.checkers,
                tooltips = this.tooltipMessages,
                useTooltips = this.useTooltips,
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
            this.addChecker("len", function (element, args) {
                return (args.length > 1) && (element.value.length >= parseInt(args[0]))
                    && (element.value.length <= parseInt(args[1]))
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
            this.addChecker("alphanum", function (element, args) {
                return /^[a-zA-Z0-9]+$/.test(element.value)
            });
        }
    }
})();