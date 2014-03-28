'use strict';

module.exports = function(grunt) {

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
      // Configure a mochaTest task
      mochaTest: {
        test: {
          options: {
            reporter: 'spec',
            // Require blanket wrapper here to instrument other required
            // files on the fly. 
            //
            // NB. We cannot require blanket directly as it
            // detects that we are not running mocha cli and loads differently.
            //
            // NNB. As mocha is 'clever' enough to only run the tests once for
            // each file the following coverage task does not actually run any
            // tests which is why the coverage instrumentation has to be done here
            require: 'test/blanket'
          },
          src: ['test/**/*.js']
        },
        coverage: {
          options: {
            reporter: 'html-cov',
            // use the quiet flag to suppress the mocha console output
            quiet: true,
            // specify a destination file to capture the mocha
            // output (the quiet option does not suppress this)
            captureFile: 'coverage.html'
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
        istanbul: {
            command: 'istanbul cover ./node_modules/mocha/bin/_mocha --report html -- -R spec'
        }
      }
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('test-watch', ['test', 'watch']);

    grunt.registerTask('watch-force', 'runs my tasks', function () {
        var tasks = ['watch'];

        // always use force when watching
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('istanbul', ['exec:istanbul']);

};