/* --------- plugins --------- */

var
	gulp = require('gulp'),
    postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
    nested = require('postcss-nested'),
    stylelint = require('stylelint'),
    config = require('./stylelintrc.js'),
    reporter = require('postcss-browser-reporter'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    del = require('del'), 
    cache = require('gulp-cache'),
    spritesmith = require("gulp.spritesmith");
    
    
	
  
/*----------------post-css------------------*/

gulp.task('css', function () {
    var processors = [
        stylelint(config),
        autoprefixer({browsers: ['last 3 version']}),
        nested,
        
        reporter({
            'selector' : 'body:before'
        }),
    ];
    return gulp.src('app/post_css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/css/'));
});

/*----------------jade------------------*/
gulp.task('jade', function() {
    return gulp.src('app/jade/index.jade')
     .pipe(plumber())
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('app'))
});
 
/*----------------browser-sync------------------*/
gulp.task('browser-sync', function () {
    browserSync.init({
        server:'app'
    });

browserSync.watch('app/**/*.*').on('change',browserSync.reload);
});

/*-------------------sprite-------------------*/
gulp.task('sprites', function() {
  var spriteData = gulp.src('app/img/sprite/*.png').pipe(
    spritesmith({
      imgName: '../img/sprite.png',
      cssName: 'sprite.css',
      padding: 70,
    })
  );
  spriteData.css.pipe(gulp.dest('app/css'));
  return spriteData.img.pipe(gulp.dest('app/img'));
});
/*----------------watch------------------*/
gulp.task('watch',['css','jade','browser-sync','sprites'],function(){
    gulp.watch('app/post_css/*.css',['css']);
    gulp.watch('app/jade/*.jade',['jade']);
    gulp.watch('app/*.html');
    gulp.watch('app/js/**/*.js');
    gulp.watch('app/img/sprite/**/*.png')['sprites'];
});


/*----------------in production------------------*/
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'jade', 'css'], function() {

    var buildCss = gulp.src('app/post_css/*')
    .pipe(gulp.dest('dist/css'))


    var buildFonts = gulp.src('app/font/*') 
    .pipe(gulp.dest('dist/font'))

    var buildJs = gulp.src('app/js/*') 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));
    

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
