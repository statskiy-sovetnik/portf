define(['jquery', 'mmenu_lib'], function ($, mmenu_lib) {
    var menus = {};
    menus.$allContentBlock = $("#all-content-block");
    menus.$mainFlexWrapper = $("#main-flex-wrapper");


    //A handler for a side-menu works links

    menus.goToWorkTrigger = function(event) {
        event.preventDefault();
        var $target,
            workId;

        switch (event.data.type) {
            case "screen-menu":
                $target = $(event.target).hasClass(".menu-nav-works-point") ? $(event.target) : $(event.target).closest(".menu-nav-works-point");
                workId = +$target.attr("data-target");
                break;
            case "mob-menu":
                $target = $(event.target).hasClass(".mob-menu-nav-works-point") ? $(event.target) : $(event.target).closest(".mob-menu-nav-works-point");
                workId = +$target.attr("data-target");
        }

        var rightArrowNeedId = (workId === 3) ? 1 : workId + 1,
            sectionOffsetTop = $("#works-section-heading").offset().top + 50,
            $rightArrow = $("#work-right-arrow");

        console.log("Work id: " + workId + "; Arrow: " + rightArrowNeedId);
        $("html, body").animate({scrollTop: sectionOffsetTop}, 600);


        // Переключаем, пока не дойдем до нужной работы

        var counter = 0;
        while (+($rightArrow.attr("data-target")) != rightArrowNeedId) {
            $rightArrow.trigger("click");
            console.log("switched " + counter);
            counter++;
        }
    };

    menus.goToContentTrigger = function (event) {
        event.preventDefault();
        var cur_id = "",
            $target;

        switch (event.data.type) {
            case "content-buttons":
                $target = $(event.target).hasClass(".scroll-btn") ? $(event.target) : $(event.target).closest(".scroll-btn");
                cur_id = $target.attr("data-target");
                break;
            case "screen-menu":
                $target = $(event.target).hasClass(".menu-nav-nav-point") ? $(event.target) :
                    $(event.target).closest(".menu-nav-nav-point");
                cur_id = $target.attr("data-target");
                break;
            case "mob-menu":
                $target = $(event.target).hasClass(".mob-menu-nav-nav-point") ? $(event.target) :
                    $(event.target).closest(".mob-menu-nav-nav-point");
                cur_id = $target.attr("data-target");
        }

        var dist_from_top = $("#" + cur_id).offset().top - 50;
        $("html, body").animate({ scrollTop: dist_from_top }, 600)
    };

    menus.setSideMenuSticky = function() {
        var $menu = $("#main-menu-content"),
            $menuWrapper = $("#main-menu-section"),
            menuContentHeight = $menu.outerHeight(true),
            windowVertSize = document.documentElement.clientHeight,
            bodyVertSize = document.documentElement.scrollHeight,
            hiddentContentHight = menuContentHeight - windowVertSize;

        $menuWrapper.css({"height": bodyVertSize});
        hiddentContentHight = (hiddentContentHight >= 0) ? hiddentContentHight : 0;


        //Баг с документом:


        $menu.css({"top": -hiddentContentHight});
    };


    return menus;
});