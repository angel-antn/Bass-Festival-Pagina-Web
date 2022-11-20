const {src, dest, watch, parallel, } = require("gulp");

//scss
const sass = require("gulp-sass")(require('sass'));
const plumber = require("gulp-plumber");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps")

//img
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//js
const terser = require("gulp-terser-js")

function compile_sass(done){

    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));
    done();
}

function make_webp(done){

    const opciones = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest("build/img"));
    done();
}

function make_avif(done){

    const opciones = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest("build/img"));
    done();
}

function move_svg(done){
    src('src/img/svg/**/*.svg')
        .pipe(dest("build/img/svg/"));
    done();
}

function reduce_img(done){

    const opciones = {
        optimizationLevel: 3,
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));
    done();
}

function move_js(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js/"));
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', compile_sass);
    watch('src/js/**/*.js', move_js);
    done();
}

exports.compile_sass = compile_sass;
exports.make_webp = make_webp;
exports.make_avif = make_avif;
exports.reduce_img = reduce_img;
exports.move_js = move_js;
exports.dev = parallel(reduce_img, make_webp, make_avif, move_svg, move_js, dev);
