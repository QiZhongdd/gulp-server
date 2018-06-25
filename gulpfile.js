var gulp=require('gulp'),
	cssmin=require('gulp-clean-css'),
	concat=require('gulp-concat'),
	connect=require('gulp-connect'),
	htmlmin=require('gulp-htmlmin'),
	imagemin=require('gulp-imagemin'),
	rename=require('gulp-rename'),
	sass=require('gulp-ruby-sass'),
	uglify=require('gulp-uglify');

//编译sass文件并压缩
gulp.task('minfyCss',function(){
	return sass('./src/sass/*.scss',function(){
		style:'compressed'
	}).pipe(concat('main.css'))
	.pipe(gulp.dest('./dist/style/'));
});
//压缩js
gulp.task('minfyJs',function(){
	return gulp.src('./src/js/*.js')
			.pipe(uglify())
			.pipe(concat('main.js'))
			.pipe(gulp.dest('./dist/js/'));
});
//压缩html的任务
gulp.task('minfyHtml',function(){
	return gulp.src('./src/*.html')
			.pipe(htmlmin({collapseWhitespace:true}))
			.pipe(gulp.dest('./dist/'))
});
//压缩图片
gulp.task('minfyImage',function(){
	return gulp.src('./src/images/*')
			.pipe(imagemin())
			.pipe(gulp.dest('./dist/images'))
})
//开启及时刷新浏览器任务
gulp.task('reload',['minfyCss','minfyJs','minfyHtml','minfyImage'],function(){
	return gulp.src('./src/*.html')
			.pipe(connect.reload())
})

//开启自动刷新任务
gulp.task('default',['reload'],function(){
	connect.server({
		livereload:true
	})
	gulp.watch('./src/sass/*.scss',['reload'])
	gulp.watch('./src/js/*.js',['reload'])
	gulp.watch('./src/*.html',['reload'])
	gulp.watch('./src/images/*',['reload'])
})