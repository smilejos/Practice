var gulp = require('gulp'),
	gulpWebpack = require('gulp-webpack'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    webpack = require('webpack'),
	nodemon = require('nodemon'),
	del = require('del'),
  	gls = require('gulp-live-server');
 

var paths = {
    sass: './public/style/scss/',
    imgs: './public/style/imgs/',
    main: './public/',
    build: './build/',
    app: './public/app.js'
};


var watchConfig = {
    scss : './public/style/scss/*.scss',
    components : './public/components/*.jsx',
    server : './public/server/*.js'
};

var webpackConfig = {
    entry: './public/client/client.js',
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
    // sassLoader: {
    //     includePaths: paths.sass
    // },
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

gulp.task('compass', function() {
    gulp.src(paths.main)
        .pipe(compass({
            css: paths.build,
            sass: paths.sass,
            image: paths.imgs
        }));
        // .pipe(minifyCSS({
        //     noAdvanced: false,
        //     keepBreaks: true,
        //     cache: true // this add-on is gulp only
        // }))
        // .pipe(gulp.dest(paths.build));
});

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

gulp.task('default', ['build', 'compass', 'nodemon']);  //, 'nodemon'
gulp.watch(watchConfig.components, ['build']); //restart my server 
gulp.watch(watchConfig.scss, ['compass']); //restart my server 
