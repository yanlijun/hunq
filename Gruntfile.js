'use strict';

module.exports = function(grunt) {
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        banner: '/* <%=pkg.name%> - v<%=pkg.version%> - <%=grunt.template.today("yyyy-mm-dd")%>\n' +
        '** Copyright (c) <%=grunt.template.today("yyyy")%> */\n',

        // Task configuration.
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            grunt: {
                src: 'Gruntfile.js'
            },
            main: {
                src: ['js/*.js', '!js/jweixin-1.0.0.js', '!js/*.min.js', '!js/main.js']
            }
        },

        concat: {
            options: {
                //separator: ';'
            },
            main: {
                src: '<%= jshint.main.src %>',
                dest: 'js/main.js'
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '<%=banner%>'
            },
            core: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['main.js'],
                    dest: 'js',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            script: {
                files: '<%= jshint.main.src %>',
                tasks: ['jshint:main', 'concat', 'uglify']
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default tasks.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);
};

