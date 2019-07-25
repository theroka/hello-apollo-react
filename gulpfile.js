const gulp = require("gulp");
const ts = require("gulp-typescript");
const browserify = require("gulp-browserify");
const rename = require("gulp-rename");

let project = ts.createProject("tsconfig.json");

// transpile Ts to ES5 / CommonJS
gulp.task("build", function() {
  return project.src()
    .pipe(project())
    .js.pipe(gulp.dest("build"))
});

// bundle ES5 / CommonJS into single UMD for browser
gulp.task("bundle", function() {
  return gulp.src("build/index.js")
    .pipe(browserify())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("dist"))
})

// copy static assets to dist folder
gulp.task("assets", function() {
  return gulp.src([
    "src/index.html",
    "src/styles.css",
  ])
    .pipe(gulp.dest("dist"))
})

gulp.task("default", gulp.series("build", "bundle", "assets"));
