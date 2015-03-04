/* jshint browser: true */
/* global ace */

(function(document) {
    var lispToArray = require("lisp-to-array"),
        form = document.querySelector("form[name=\"lisp-to-array\"]"),
        inp = ace.edit(form.querySelector("[name=\"input\"]")),
        out = ace.edit(form.querySelector("[name=\"output\"]")),
        err = form.querySelector("[name=\"error\"]");

    inp.getSession().on("change", function() {
        var content, errContent;

        try {
            content = lispToArray(inp.getValue());
        } catch(e) {
            err.textContent = e.toString();
            errContent = e.toString().split(/on line /)[1].split(":");
            inp.getSession().setAnnotations([{
                row: Number(errContent[0].match(/\d+$/)[0]) - 1,
                column: 0,
                text: errContent.slice(1).join(":").trim().slice(1).trim(),
                type: "error"
            }]);
        }

        if(content) {
            inp.getSession().setAnnotations([]);
            out.setValue(JSON.stringify(content).replace(/,\s*/g, ", "), -1);
            err.textContent = "";
        }
    });

    [inp, out].forEach(function(editor) {
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/" + editor.container.dataset.mode);
        editor.setReadOnly("disabled" in editor.container.dataset);
    });

    inp.setValue(inp.getValue(), 1);
})(document);
