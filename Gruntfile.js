module.exports = function(grunt) {
    grunt.initConfig({
    	jshint: {
    		src: 'src/fScrollspy.js'
    	},

    	copy: {
    		main: {
    			src: 'src/fScrollspy.js',
    			dest: 'dist/fScrollspy.js'
    		}
    	},

    	uglify: {
    		file: {
    			src: 'src/fScrollspy.js',
    			dest: 'dist/fScrollspy.min.js'
    		}
    	}
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('js', ['copy', 'uglify']);
    grunt.registerTask('default', ['js']);
}
