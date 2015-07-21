/**
 * Created by james on 7/20/15.
 */
function startExpress() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname));
    app.listen(8080);
}

var lr;
function startLivereload() {
    lr = require('tiny-lr')();
    lr.listen(35729);
}

function notifyLivereload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('default', function() {
    startExpress();
    startLivereload();
    gulp.watch(['*.html', 'css/*.css'], notifyLivereload);
});