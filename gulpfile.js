var gulp = require('gulp'),
	gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack'),
	nodemon = require('nodemon'),
	del = require('del'),
  	gls = require('gulp-live-server');
 

var paths = {
    js: './public/assets/js/*.js',
    css: './public/assets/css/',
    sass: './public/assets/scss/*.scss',
    imgs: './public/assets/imgs/*',
    main: './public/',
    build: './build/',
    app: './public/app.js'
};


var watchConfig = [
    './public/assets/js/*.js'
];

var webpackConfig = {
    entry: './public/assets/js/client.js',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.jsx$/,  loader: 'babel', query: { presets:['react'] }
            },{ 
                test: /\.js$/,  loader: 'babel', query: { presets:['react'] }
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
    keepalive: true,
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: { warnings: false },
        // })
    ]
};

var nodemonConfig = {
    execMap: {
        js: 'babel-node'
    },
    script: './public/server/app.js',
    ext: 'js',
    watch: 'public/server/app.js'
};

gulp.task('copy', function() {
    //gulp.src(source_paths.app).pipe(gulp.dest(dest_paths.main));
    //gulp.src(source_paths.components).pipe(gulp.dest(dest_paths.components));
});

gulp.task('build', function() {
    gulp.src(paths.main+"**/*").pipe(gulpWebpack(webpackConfig)).pipe(gulp.dest(paths.build));    
});

gulp.task('nodemon', function() {
    nodemon(nodemonConfig);
});

gulp.task('default', ['build', 'nodemon']);  //, 'nodemon'
gulp.watch(watchConfig, ['build', 'nodemon']); //restart my server 