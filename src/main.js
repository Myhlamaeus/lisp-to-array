/* jshint browser: true */
/* global ace */

(function(document) {
    var lispToArray = require("lisp-to-array"),
        form = document.querySelector("form[name=\"lisp-to-array\"]"),
        inp = ace.edit(form.querySelector("[name=\"input\"]")),
        out = ace.edit(form.querySelector("[name=\"output\"]")),
        err = form.querySelector("[name=\"error\"]");

    inp.getSession().on("change", function() {
        var content;

        try {
            content = lispToArray(inp.getValue());
        } catch(e) {
            err.textContent = e.toString();
            out.setValue("");
        }

        if(content) {
            out.setValue(JSON.stringify(content).replace(/,\s*/g, ", "));
            err.textContent = "";
        }
    });

    [inp, out].forEach(function(editor) {
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/" + editor.container.dataset.mode);
        editor.setReadOnly("disabled" in editor.container.dataset);
    });

    inp.setValue(inp.getValue());
})(document);
