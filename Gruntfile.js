module.exports = function(grunt) {
  grunt.initConfig({

    coffee: {
      compile: {
        files: {
          "threadwork.js": [
            "threadwork.coffee"
          ]
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      default: {
        files: {
          "threadwork.min.js": [
            "threadwork.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-coffee");

  grunt.registerTask("default", ["coffee", "uglify"]);
}
