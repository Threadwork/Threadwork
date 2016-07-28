module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
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

  grunt.registerTask("default", ["uglify"]);
}
