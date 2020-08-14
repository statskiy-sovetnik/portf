define(['jquery', 'utiljs', /*'fontAw',*/ 'menus', 'works', 'calc', 'mail', 'tooltip'], function ($, util, /*fontAw,*/ menus, works, calc, mail, tooltip) {


    /* _______ ВСЕ ЧТО СВЯЗАНО С МЕНЮ _________*/


    $('.tooltip').tooltipster({
        theme: 'tooltipster-borderless'
    });


    /*Боковое меню*/

    menus.setSideMenuSticky();
    $(window).on("resize", menus.setSideMenuSticky);

    $(".menu-nav-works-point").on("click", {type: "screen-menu"}, menus.goToWorkTrigger);
    $(".menu-nav-nav-point").on("click", {type: "screen-menu"}, menus.goToContentTrigger);


    /*Мобильное боковое меню*/

    var mobSideMenu = new Mmenu("#my-menu", {
        navbar: {
            //add: false
            title: "Меню"
        },

        onClick: {
            close: true,
            setSelected: false
        },

        slidingSubmenus: true,
        "extensions": [
            "fx-listitems-drop",
            "fullscreen",
            "position-front"
        ]
    }, {
        classNames: {
            panel: "main-panel",
            inset: "mob-menu-nav-list"
        }
    });

    var mmenuApi = mobSideMenu.API;

    $("#mob-trigger-link").on("click", function (event) {
        console.log("Huli");
        event.preventDefault();

        mmenuApi.open();
    });
    $("#mob-trigger-back-link").on("click", function (event) {
        event.preventDefault();

        mmenuApi.close();
    });

    $(".mob-menu-nav-list-point").on("click", function () {
        console.log("Closed");
        mmenuApi.close();
    });
    $(".mob-menu-nav-works-point").on("click", {type: "mob-menu"},menus.goToWorkTrigger);
    $(".mob-menu-nav-nav-point").on("click", {type: "mob-menu"}, menus.goToContentTrigger);


    /*Прелоадер*/

    var pcAndroidImage = new Image();
    pcAndroidImage.src = "app/images/desktop-and-android.png";
    pcAndroidImage.onload = pageOnload;
    pcAndroidImage.onerror = pageOnload;

    var logoMenu = new Image();
    logoMenu.src = "app/images/logo_text.png";
    logoMenu.onload = pageOnload;
    logoMenu.onerror = pageOnload;

    function pageOnload() {

        //Ждем хотя бы секунду, прежде чем убрать экран загрузки

        setTimeout(function () {
            $("#preloader").addClass("done");

            //После анимации:

            setTimeout(function () {
                $("#preloader").addClass("hidden");
            }, 500);
        }, 1000);
    }

    /* Активируем кнопки перехода к контенту */

    $(".scroll-btn").on("click", {type: "content-buttons"}, menus.goToContentTrigger);




    /* _________________ GUARANTEES BLOCK SHIT (don't want to add a module for that) ______*/

    var $guarantTabs = $(".guarant-tab");

    function activateTab(event) {
        $(".guarant-text-section").css("display", "none");
        $(".guarant-tab").removeClass('active-tab');

        var tab = $(event.target).hasClass("guarant-tab") ? event.target : event.target.parentNode; //иногда событие срабатывает на дочернем элементе
        $(tab).addClass('active-tab');

        var curDataTarget = $(tab).attr("data-target");
        $(curDataTarget).css("display", "flex");
    }

    $guarantTabs.on('mouseenter', event, activateTab);

    $guarantTabs.on("click", function (event) {
        event.preventDefault();
    });


    /* ____________________ WORKS SECTION ______________________*/

    //Setting the initial work name and number. Also the main image here
    var imageRawPath = works.imagesPaths[0] + "1.png";
    var imageSPath = "url(\"" + imageRawPath + "\")";

    works.$worksPresentBlock.find(".work-name").html(works.worksNames[0]);
    works.$worksPresentBlock.find('.work-image').css("background-image", imageSPath);
    works.$worksPresentBlock.find('.work-image').attr("href", imageRawPath);

    var $workArrows = $('.work-present-block div.work-arrow-circle');
    works.$worksPresentBlock.find("#work-left-arrow").attr("data-target", "" + works.numOfWorks);
    works.$worksPresentBlock.find("#work-right-arrow").attr("data-target", "2");

    //When changing a work
    $workArrows.on('click', works.setWorksContent);
    $workArrows.on('click', works.setWorksName);

    //Setting the initial images of the switcher
    var firstImgPath = "url(\"" + works.imagesPaths[0] + "1.png\")",
        secondImgPath = "url(\"" + works.imagesPaths[0] + "2.png\")";

    works.$worksPresentBlock.find("#images-switcher-active-image").css("background-image", firstImgPath);
    works.$worksPresentBlock.find("#images-switcher-inactive-image").css("background-image", secondImgPath);
    works.$worksPresentBlock.find("#images-switcher-left-arrow").attr("data-target", works.projectsImagesNums[0]);
    works.$worksPresentBlock.find("#images-switcher-right-arrow").attr("data-target", 2);

    //Setting description name and article
    works.$worksPresentBlock.find(".work-text-icon").attr("src", works.logoPaths[0]);
    works.$worksPresentBlock.find(".work-text-name").html(works.worksNames[0]);
    works.$worksPresentBlock.find(".work-text-article").html(works.descriptTexts[0]);

    //When switching images

    $(".images-switcher-arrow-wrapper").on("click", works.switchActiveImage);


    /* ____________________ CALCULATOR ______________________*/

    var $calcWrapper = $(".calc-calc-wrapper");

    //Toggling options

    $calcWrapper.find('.calc-calc-option').on('click', calc.setActiveRadio);
    $calcWrapper.find('.calc-calc-option').on('click', calc.toggleCheckbox);

    //Setting prices

    calc.setCalcPrice();
    $calcWrapper.find('.calc-calc-option').on('click', calc.setCalcPrice);

    //Optionsets

    $('.calc-calc-optionset-wrapper').on('click', calc.triggerOptionset);
    $calcWrapper.find(".optionset-list-option").on("click", calc.setOptionsetContent);


    // APPLICATION WINDOW

    var $appSubmit = $("#app-submit-btn");
    $appSubmit.on("click", function (event) {
        event.preventDefault();

        var userMail = $("#app-mail-data").val(),
            userName = $("#app-name-data").val(),
            userDescr = $("#app-descr-input").val();

        if(mail.is_mail_valid(userMail)) {
            $.ajax(
                "../app/email.php",

                //settings:
                {
                    method: "POST",
                    data: {name: userName, descr: userDescr, email: userMail},
                    complete: function (jqXHR, res) {
                        if(res === "success") {
                            $("#app-success-message").removeClass("invis");
                        }
                        else {
                            alert("Возникла ошибка при отправке данных: " + res);
                        }
                    }
                }
            )
        }
    })
});