var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	nodemon = require('nodemon'),
	del = require('del'),
  	gls = require('gulp-live-server');
 

var paths = {
    js: './public/assets/js/*.js',
    css: './public/assets/css/',
    sass: './public/assets/scss/*.scss',
    imgs: './public/assets/imgs/*',
    main: './public/',
    app: './public/app.js'
};


var watchConfig = [
    './public/assets/**/*'
];

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx$/, 
                loader: 'babel',
                query: { presets:['react'] }
            },{ 
                test: /\.json$/, loader: 'json-loader'
            }
        ]
    },
    node: {
        fs: "empty"
    },
    stats: {
        colors: true
    },
    watch: true,
    keepalive: true
};

var nodemonConfig = {
    script: './public/server/app.js',
    ext: 'js',
    watch: 'public/server/app.js'
};

gulp.task('copy', function() {
    //gulp.src(source_paths.app).pipe(gulp.dest(dest_paths.main));
    //gulp.src(source_paths.components).pipe(gulp.dest(dest_paths.components));
});

gulp.task('build', function() {
    /*
    del(paths.main+"bundle.js", function(){
        return 
    });
    */
    gulp.src(paths.main+"**/*").pipe(webpack(webpackConfig)).pipe(gulp.dest(paths.main));    
});

gulp.task('nodemon', function() {
    nodemon(nodemonConfig);
});

gulp.task('default', ['build', 'nodemon']);
gulp.watch(watchConfig, ['build']); //restart my server 