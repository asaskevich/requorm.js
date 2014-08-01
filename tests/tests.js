// http://qunitjs.com/
// TODO rewrite tests

QUnit.test("Init", function (assert) {
    assert.ok(r != null, "r not null!");
});

QUnit.test("Init", function (assert) {
    var els = document.querySelectorAll("form > input, textarea");
    for (var j = els.length; j--;) {
        var checkrs = els[j].getAttribute("checkers");
        if (els[j].type != "button" && els[j].type != "submit") {
            assert.ok(checkrs != null, "Checkers not null!");
        }
    }
});

QUnit.test("Init", function (assert) {
    var els = document.querySelectorAll("form > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled != null, "Submits and buttons are disabled!");
        }
    }
});

QUnit.test(".ex-1", function (assert) {
    var els = document.querySelectorAll(".ex-1 > input, submit");
    for (var j = els.length; j--;) {
        if ((els[j].type != "button" && els[j].type != "submit")) {
            els[j].value = "Any"
        }
    }
    r.apply(".ex-1")
    var els = document.querySelectorAll(".ex-1 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled == null, "Submits and buttons are enabled!");
        }
    }
});

QUnit.test(".ex-2", function (assert) {
    var str = "";
    for (; str.length < 15; str += "A") {
        var els = document.querySelectorAll(".ex-2 > input, submit");
        for (var j = els.length; j--;) {
            if ((els[j].type != "button" && els[j].type != "submit")) {
                els[j].value = str
            }
        }
        r.apply(".ex-2")
        var els = document.querySelectorAll(".ex-2 > input, submit");
        for (var j = els.length; j--;) {
            var disabled = els[j].getAttribute("disabled");
            if (!(els[j].type != "button" && els[j].type != "submit")) {
                if (str.length >= 6 && str.length <= 10) assert.ok(disabled == null, "Submits and buttons are enabled!");
                else  assert.ok(disabled != null, "Submits and buttons are disabled!");
            }
        }
    }
});

QUnit.test(".ex-3", function (assert) {
    var els = document.querySelectorAll(".ex-3 > input, submit");
    els[0].value = "Any";
    els[1].value = "1234567"
    r.apply(".ex-3")
    var els = document.querySelectorAll(".ex-3 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled == null, "Submits and buttons are enabled!");
        }
    }
});

QUnit.test(".ex-4", function (assert) {
    var els = document.querySelectorAll(".ex-4 > input, submit");
    els[0].value = "user@server.com";
    r.apply(".ex-4")
    var els = document.querySelectorAll(".ex-4 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled == null, "Submits and buttons are enabled!");
        }
    }

    var els = document.querySelectorAll(".ex-4 > input, submit");
    els[0].value = "us@s.co";
    r.apply(".ex-4")
    var els = document.querySelectorAll(".ex-4 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled != null, "Submits and buttons are disabled!");
        }
    }
});

QUnit.test(".ex-5", function (assert) {
    var els = document.querySelectorAll(".ex-5 > input, submit");
    els[0].value = "Hello";
    r.apply(".ex-5")
    var els = document.querySelectorAll(".ex-5 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled == null, "Submits and buttons are enabled!");
        }
    }


    var els = document.querySelectorAll(".ex-5 > input, submit");
    els[0].value = "Hello World";
    r.apply(".ex-5")
    var els = document.querySelectorAll(".ex-5 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled != null, "Submits and buttons are disabled!");
        }
    }
});

QUnit.test(".ex-6", function (assert) {
    var els = document.querySelectorAll(".ex-6 > input, textarea, submit");
    els[0].value = "Excellent";
    els[1].value = "abcABC123";
    els[2].value = "A\nB\nC\nD\nE";
    r.apply(".ex-6")
    var els = document.querySelectorAll(".ex-3 > input, submit");
    for (var j = els.length; j--;) {
        var disabled = els[j].getAttribute("disabled");
        if (!(els[j].type != "button" && els[j].type != "submit")) {
            assert.ok(disabled == null, "Submits and buttons are enabled!");
        }
    }
});

QUnit.test("Checkers", function (assert) {
    assert.ok(r.checkers["notEmpty"] != null, "notEmpty not null!");
    assert.ok(r.checkers["minLength"] != null, "minLength not null!");
    assert.ok(r.checkers["maxLength"] != null, "maxLength not null!");
    assert.ok(r.checkers["email"] != null, "email not null!");
    assert.ok(r.checkers["equal"] != null, "equal not null!");
    assert.ok(r.checkers["alpha"] != null, "alpha not null!");
    assert.ok(r.checkers["numeric"] != null, "numeric not null!");
    assert.ok(r.checkers["alphanum"] != null, "alphanum not null!");
    assert.ok(r.checkers["len"] != null, "len not null!");
    assert.ok(r.checkers["null_checker"] == null, "null_checker is null!");
});

QUnit.test("Tooltips", function (assert) {
    assert.ok(r.tooltipMessages["notEmpty"] != null, "notEmpty tooltip not null!");
    assert.ok(r.tooltipMessages["notEmpty"] === "notEmpty", "notEmpty tooltip is equal to notEmpty!");
    r.setTooltip("notEmpty", "text")
    assert.ok(r.tooltipMessages["notEmpty"] === "text", "notEmpty tooltip is equal to text!");
});

