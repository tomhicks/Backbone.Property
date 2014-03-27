'use strict';

module.exports = function(grunt) {

    // Catch unhandled exceptions and show the stack trace. This is most
    // useful when running the jasmine specs.
    process.on('uncaughtException',function(e) {
      grunt.log.error('Caught unhandled exception: ' + e.toString());
      grunt.log.error(e.stack);
    });

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
      // Configure a mochaTest task
      mochaTest: {
        test: {
          options: {
            reporter: 'spec'
          },
          src: ['test/**/*.js']
        }
      },
      watch: {
        scripts: {
          files: ['test/**/*.js', 'src/**/*.js'],
          tasks: ['test']
        },
      },
      exec: {
        cover: {
            command: 'istanbul cover ./node_modules/mocha/bin/_mocha --report html -- -R spec'
        }
      }
    });

    grunt.registerTask('test', 'mochaTest:test');
    grunt.registerTask('test-watch', ['test', 'watch']);

    grunt.registerTask('watch-force', 'runs my tasks', function () {
        var tasks = ['watch'];

        // always use force when watching
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('cover', ['exec:cover']);

};