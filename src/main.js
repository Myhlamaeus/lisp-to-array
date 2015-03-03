(function(document) {
    var lispToArray = require("lisp-to-array"),
        form = document.querySelector("form[name=\"lisp-to-array\"]"),
        inp = form.querySelector("[name=\"input\"]"),
        out = form.querySelector("[name=\"output\"]"),
        err = form.querySelector("[name=\"error\"]");

    inp.addEventListener("keyup", function() {
        var content;

        try {
            content = lispToArray(this.value);
        } catch(e) {
            err.textContent = e.toString();
            out.textContent = "";
        }

        if(content) {
            out.textContent = JSON.stringify(content);
            err.textContent = "";
        }
    });

    inp.dispatchEvent(new CustomEvent("keyup"));
})(document);
