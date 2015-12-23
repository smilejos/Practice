var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	nodemon = require('nodemon'),
	del = require('del'),
  	gls = require('gulp-live-server');
 

var source_paths = {
    js: './develop/assets/js/*.js',
    css: './develop/assets/css/*.css',
    sass: './develop/assets/scss/*.scss',
    imgs: './develop/assets/imgs/*',
    app: './develop/app.js'
};

var dest_paths = {
    js: './build/assets/js/',
    css: './build/assets/css/',
    sass: './build/assets/scss/',
    imgs: './build/assets/imgs/',
    main: './build/',
};

var watchConfig = [
    './develop/assets/**/*',
    './develop/app.js'
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
            { test: /\.jsx$/, loader: 'jsx-loader'},
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    node: {
        // make "fs" module as empty object "{}" 
        // since lokijs will require('fs') on browser environment
        fs: "empty"
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         "Promise": "bluebird"
    //     })
    // ],
    stats: {
        colors: true
    },
    watch: true,
    keepalive: true
};

var nodemonConfig = {
    script: './build/app.js',
    ext: 'js',
    watch: './build/*'
};

var path = dest_paths.main + 'app.js';
var server = gls.new(path);

gulp.task('webserver', function() {
    server.start();
});

gulp.task('copy', function() {
    gulp.src(source_paths.app).pipe(gulp.dest(dest_paths.main));
});

gulp.task('build', function() {
    del(dest_paths.main + '/**/*', function(){
        return gulp.src(source_paths.main)
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest(dest_paths.main));
    });
});

gulp.task('nodemon', function() {
    nodemon(nodemonConfig);
});


 /*
 gulp.task('livereload', function() {
    connect.server({
        root: paths.destDir,
        https: true,
        livereload: true
    });
    // client files changed will also trigger compass
    gulp.watch(watchConfig, ['compass', 'copy', 'reloadNow'])
});
*/

gulp.task('default', ['build', 'copy', 'nodemon']);
gulp.watch(watchConfig, ['build', 'copy']); //restart my server 