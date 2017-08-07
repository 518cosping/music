var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less")


// 转换HTML文件路径位置
gulp.task("html",function(){
    gulp.src("./src/index.html")
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload())
})

// 转换less语法
gulp.task("less",function(){
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
})
// 转义PNG图片
gulp.task('png',function(){
    gulp.src("./img/*.png")
        .pipe(gulp.dest("./dist/img"))
        .pipe(connect.reload())
})
// 转移JSON文件（假数据）
gulp.task("json",function(){
    gulp.src("./mock/*.json")
        .pipe(gulp.dest("./dist/mock"))
        .pipe(connect.reload())
})
// 转移js文件
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload())
})
// 转移source文件
gulp.task("jpg",function(){
    gulp.src("./source/*.jpg")
        .pipe(gulp.dest("./dist/source"))
        .pipe(connect.reload())
})
gulp.task("jpg",function(){
    gulp.src("./source/*.mp3")
        .pipe(gulp.dest("./dist/source"))
        .pipe(connect.reload())
})


// 开服务器
gulp.task("server", function(){
    connect.server({
        port : 8090,
        root : "./dist",
        livereload : {
            port : 35728
        }
    })
})


// 监听文件
gulp.task("watch", function(){
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/css/*.less",["less"]);
    gulp.watch("./src/js/*.js", ["js"])
})
// gulp.task("watch",function(){
//     gulp.watch("./src/index.css")
// })
gulp.task("default",["watch", "html","json","jpg","less","js","png","server"]);