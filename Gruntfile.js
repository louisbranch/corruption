/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    regarde: {
      app: {
        files: ['client/**/*.js', '!client/**/*.js.swp'],
        tasks: ['requirejs', 'livereload']
      }
    },
    livereload: {
      options: {
        port: 35729,
        middleware: function(connect, options) {
          return [lrSnippet, folderMount(connect, '.')]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'client',
          name: 'main',
          mainConfigFile: 'client/main.js',
          out: 'server/public/javascripts/client.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['livereload-start', 'regarde']);

  // Load Dependencies
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
