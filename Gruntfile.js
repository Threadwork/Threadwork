module.exports = function(grunt) {
  grunt.initConfig({

    babel: {
      options: {
        sourceMap: false,
        blacklist: ['strict']
      },
      dist: {
        files: {
          "dist/threadwork.js": "threadwork.es6",
          "dist/threadwork-ejs.js": "modules/ejs.es6",
        }
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      default: {
        files: {
          "dist/threadwork.min.js": [
            "dist/threadwork.js"
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-babel");

  grunt.registerTask("default", ["babel", "uglify"]);
}
