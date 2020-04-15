const sass = require('sass');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            theme: {
                tsconfig: './tsconfig.json',
                options: {
                    // Required because of https://github.com/TypeStrong/grunt-ts/issues/432
                    // Wouldn't be needed if lunr fixed https://github.com/olivernn/lunr.js/issues/324
                    additionalFlags: '--alwaysStrict false'
                }
            }
        },
        uglify: {
            theme: {
                options: {
                    mangle: false
                },
                files: {
                    'dist/assets/js/main.js': [
                        'src/assets/js/main.js'
                    ]
                }
            }
        },
        sass: {
            options: {
                implementation: sass,
                style: 'compact',
                unixNewlines: true
            },
            theme: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/css',
                    src: '**/*.sass',
                    dest: 'dist/assets/css',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            options: {
                cascade: false
            },
            theme: {
                expand: true,
                src: 'dist/**/*.css',
                dest: './'
            }
        },
        copy: {
            plugin: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.js'],
                    dest: 'dist'
                }]
            },
            theme: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.hbs', '**/*.png'],
                    dest: 'dist'
                }]
            }
        },
        watch: {
            js: {
                files: ['src/assets/js/src/**/*.ts'],
                tasks: ['js']
            },
            css: {
                files: ['src/assets/css/**/*'],
                tasks: ['css']
            },
            default: {
                files: ['src/**/*.hbs'],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['ts:theme', 'uglify']);
    grunt.registerTask('default', ['copy', 'css', 'js']);
};
