#!/usr/bin/env node
/* jshint node: true */

var cli = require("cli"),
    lispToJson = require("./"),
    fs = require("fs"),
    m = require("mal.json/miniMAL-node")();

cli.parse({
    output: ["o", "File to save output to", "file"]
});

cli.setUsage("lisptojson [OPTIONS] FILE");

cli.main(function(args, options) {
    if(args.length) {
        if(args.length !== 1) {
            cli.error("Exactly 1 input file must be supplied");
            cli.getUsage();
        }
        fs.readFile(args[0], function(err, content) {
            var out;

            if(err) {
                console.log(err);
                cli.fatal("An error occured while reading '" + args[0] + "'");
            }

            out = JSON.stringify(lispToJson.parse(String(content)));
            if(options.output) {
                fs.writeFile(options.output, out, function(err) {
                    if(err) {
                        console.log(err);
                        cli.fatal("An error occured while reading '" + options.output + "'");
                    }
                });
            } else {
                console.log(out);
            }
        });
    } else {
        if(options.output || options.exec) {
            cli.fatal("--output and --exec can't be used in REPL mode");
        }

        require("repl").start({
            eval: function(cmd, context, filename, callback) {
                try {
                    callback(JSON.stringify(m.eval(lispToJson.parse(cmd))));
                } catch(e) {
                    callback(e);
                    return;
                }
            }
        }).on("exit", function() {
            process.exit();
        });
    }
});
