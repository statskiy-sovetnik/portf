"use strict";

requirejs.config({
    baseUrl: 'app/scripts',
    paths: {
        jquery: 'lib/jquery.min',
        utiljs: 'lib/util.min',
        main: 'modules/main',
        mail: 'modules/mail',
        fontAw: 'lib/all.min', //в итоге его не подключаем (мегабайт, шутка ли нахуй)
        mmenu_lib: 'lib/mmenu',
        tooltip: 'lib/tooltipster.bundle.min',
        es5Shim: 'lib/es5-shim.min',
        es6Shim: 'lib/es6-shim.min',
        menus: 'modules/menus',
        works: 'modules/works',
        calc: 'modules/calc'
    }
});

/*___________ Load the first module, that load another ones and defines the project logic ___________*/

require(['main'], function (main) {

});

