/*jshint node:true*/

// Generated on <%= (new Date).toISOString().split("T")[0] %> using
// <%= pkg.name %> <%= pkg.version %>
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// If you want to recursively match all subfolders, use:
// "test/spec/**/*.js"

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require("time-grunt")(grunt);

    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        config: {
            main: "lisp-to-json",
            dist: "dist"
        },
        watch: {
            js: {
                files: [
                    "utf-8.js"
                ],
                tasks: ["jshint"]
            },
            jstest: {
                files: ["<%= config.main %>.js", "test/{,*/}*.js"],
                tasks: ["jshint", "mocha"]
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require("jshint-stylish")
            },
            all: [
                "Gruntfile.js"
            ],
            test: {
                files: {
                    src: ["test/{,*/}*.js"]
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    captureFile: "errors.txt"
                },
                src: ["test/{,*/}*.js"]
            }
        },
        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        standalone: "lispToJson"
                    }
                },
                files: {
                    "<%= config.dist %>/browser.js": "<%= config.dist %>/<%= config.main %>.js"
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    screwIE8: true
                },
                files: {
                    "<%= config.dist %>/<%= config.main %>.min.js": "<%= config.dist %>/<%= config.main %>.js"
                }
            },
            distBrowser: {
                files: {
                    "<%= config.dist %>/browser.min.js": "<%= config.dist %>/browser.js"
                }
            }
        },
        jison: {
            options: {
                moduleType: "commonjs"
            },
            dist: {
                files: {
                    "<%= config.dist %>/<%= config.main %>.js": "<%= config.main %>.jison"
                }
            }
        }
    });

    grunt.task.registerTask("cleanupExports:dist", function() {
        var done = this.async(),
            fs = require("fs");

        fs.readFile("dist/lisp-to-json.js", function(err, data) {
            if(err) {
                grunt.fail.warn(err);
                done();
                return;
            }

            var content = String(data).split("if (typeof require !== 'undefined' && typeof exports !== 'undefined')")[0] + "module.exports=parser.parse.bind(parser);";

            fs.writeFile("dist/lisp-to-json.js", content, function(err) {
                if(err) {
                    grunt.fail.warn(err);
                }
                done();
            });
        });
    });

    grunt.task.registerTask("test", ["jshint:all", "jshint:test", "mochaTest"]);

    grunt.task.registerTask("build", ["jison:dist", "cleanupExports:dist", "uglify:dist"]);
    grunt.task.registerTask("build:browser", ["jison:dist", "cleanupExports:dist", "browserify:dist", "uglify:distBrowser"]);
};
