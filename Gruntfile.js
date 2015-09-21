module.exports = function(grunt) {
  grunt.initConfig({

    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          "threadwork.js": "threadwork-es6.js"
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
  grunt.loadNpmTasks("grunt-babel");

  grunt.registerTask("default", ["babel", "uglify"]);
}
