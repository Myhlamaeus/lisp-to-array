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
            dist: "dist"
        },
        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        standalone: "lispToArray"
                    }
                },
                files: {
                    "<%= config.dist %>/browser.js": "src/main.js"
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    screwIE8: true
                },
                files: {
                    "<%= config.dist %>/browser.min.js": "<%= config.dist %>/browser.js"
                }
            }
        },
        browserSync: {
            ghPages: {
                src : ["index.html", "dist/*"]
            },
            options: {
                server: {
                    baseDir: "./"
                }
            }
        }
    });

    grunt.task.registerTask("build", ["browserify:dist", "uglify:dist"]);
};
