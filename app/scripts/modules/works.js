define(["jquery"], function ($) {
   var  works = {};

   //Work id, needed when switching images
   works.curWorkId = 1;

   works.$worksPresentBlock = $('.work-present-block');
   works.worksNames = [
        "Интернет-магазин \"Гир-Авто\"",
        "ООО \"Новый Взгляд\"",
        "Сайт на конкурс \"О детстве\""
   ];
   works.imagesPaths = [
       "app/images/websites/gear_",
       "app/images/websites/noviy_vzglyad_",
       "app/images/websites/ch_"
   ];
   works.logoPaths = [
       "app/images/websites/gear_logo.png",
       "app/images/websites/noviy_vzglyad_logo.ico",
       "app/images/websites/ch_logo.ico"
   ];
   works.descriptTexts = [
       "Мы разработали дизайн этого интернет-магазина и сверстали главную страницу и страницы каталога и авторизации, а также адаптировали его под мобильные.",
       "Сайт для агентства «Новый Взгляд» сделали «под ключ» - на нас лежала разработка дизайна, верстка, наполнение контентом и постановка на хостинг.",
       "Мы разработали этот сайт в качестве работы на краевой конкурс. К счастью, наши труды вознаградились золотой медалью в номинации \"Веб-сайт\"."
   ];

   works.projectsImagesNums = [4, 3, 4];
   works.numOfWorks = works.worksNames.length;

   //Triggers when changing a work
   works.setWorksContent = function(event) {
       var $targetArrow = $(event.target);
       if (!$(event.target).hasClass(".work-arrow-circle")) {
           $targetArrow = $(event.target).closest(".work-arrow-circle");
       }

       var targetWorkId = +$targetArrow.attr("data-target"),
           curImageRawPath = works.imagesPaths[targetWorkId - 1] + "1.png",
           inactiveImagePath = "url(\"" + works.imagesPaths[targetWorkId - 1] + "2.png\")",
           curImagePath = "url(\"" + curImageRawPath + "\")";

       works.curWorkId = targetWorkId;

       works.$worksPresentBlock.find(".work-image").css("background-image", curImagePath);
       works.$worksPresentBlock.find('.work-image').attr("href", curImageRawPath);

       //Switcher images

       works.$worksPresentBlock.find("#images-switcher-active-image").css("background-image", curImagePath);
       works.$worksPresentBlock.find("#images-switcher-inactive-image").css("background-image", inactiveImagePath);
       works.$worksPresentBlock.find("#images-switcher-left-arrow").attr("data-target", works.projectsImagesNums[targetWorkId - 1]);
       works.$worksPresentBlock.find("#images-switcher-right-arrow").attr("data-target", 2);

       //Setting description data

       works.$worksPresentBlock.find(".work-text-icon").attr("src", works.logoPaths[targetWorkId - 1]);
       works.$worksPresentBlock.find(".work-text-name").html(works.worksNames[targetWorkId - 1]);
       works.$worksPresentBlock.find(".work-text-article").html(works.descriptTexts[targetWorkId - 1]);
   };

   //Triggers when switching images
   works.switchActiveImage = function(event) {
       var $targetArrow = $(event.target);

       if (!$targetArrow.hasClass("images-switcher-arrow-wrapper"))
           $targetArrow = $(event.target).closest(".images-switcher-arrow-wrapper");

       var leftArrow = works.$worksPresentBlock.find("#images-switcher-left-arrow"),
           rightArrow = works.$worksPresentBlock.find("#images-switcher-right-arrow"),
           leftArrowDataId = +leftArrow.attr("data-target"),
           rightArrowDataId = +rightArrow.attr("data-target"),
           newLeftArrowDataId, newRightArrowDataId,
           curWorkImagesNum = works.projectsImagesNums[works.curWorkId - 1],

           miniActiveImage = works.$worksPresentBlock.find("#images-switcher-active-image"),
           miniInactiveImage = works.$worksPresentBlock.find("#images-switcher-inactive-image"),
           bigActiveImage = works.$worksPresentBlock.find(".work-image"),
           miniActiveUrl, miniInactiveUrl, activeRawUrl;

       // __________SETTING ARROWS DATA TARGETS

       if ($targetArrow.attr("id") === "images-switcher-left-arrow") {
           newLeftArrowDataId = (leftArrowDataId + curWorkImagesNum - 1) % curWorkImagesNum;
           newRightArrowDataId = (rightArrowDataId + curWorkImagesNum - 1) % curWorkImagesNum;

           miniActiveUrl = "url(\"" + works.imagesPaths[works.curWorkId - 1] + leftArrowDataId + ".png\")";
           miniInactiveUrl = miniActiveImage.css("background-image");
           activeRawUrl = works.imagesPaths[works.curWorkId - 1] + leftArrowDataId + ".png";
       }
       else {
           newLeftArrowDataId = (leftArrowDataId + 1) % curWorkImagesNum;
           newRightArrowDataId = (rightArrowDataId + 1) % curWorkImagesNum;

           //Это повторяется дальше, но это нужно здесь, чтобы не переносить дальше определение miniInactiveId
           if (newRightArrowDataId == 0)
               newRightArrowDataId = curWorkImagesNum;

           miniActiveUrl = miniInactiveImage.css("background-image");
           miniInactiveUrl = "url(\"" + works.imagesPaths[works.curWorkId - 1] + newRightArrowDataId + ".png\")";

           activeRawUrl = works.imagesPaths[works.curWorkId - 1] + rightArrowDataId + ".png";
       }

       //Нулевые data-target нам тоже не нужны, т.к. нахуя. Это должны быть n
       if (newLeftArrowDataId == 0)
           newLeftArrowDataId = curWorkImagesNum;
       if (newRightArrowDataId == 0)
           newRightArrowDataId = curWorkImagesNum;

       leftArrow.attr("data-target", newLeftArrowDataId);
       rightArrow.attr("data-target", newRightArrowDataId);

       miniActiveImage.css("background-image", miniActiveUrl);
       miniInactiveImage.css("background-image", miniInactiveUrl);

       bigActiveImage.css("background-image", miniActiveUrl);
       bigActiveImage.attr("href", activeRawUrl);
   };

   //Also, when changing a work
   works.setWorksName = function (event) {
       var $targetArrow = $(event.target);
       if (!$(event.target).hasClass(".work-arrow-circle")) {
           $targetArrow = $(event.target).closest(".work-arrow-circle");
       }

       var targetDataId = +$targetArrow.attr("data-target");

       //Arrows
       works.$leftArrow = works.$worksPresentBlock.find("#work-left-arrow");
       works.$rightArrow = works.$worksPresentBlock.find("#work-right-arrow");
       works.$leftArrowDataId = +works.$leftArrow.attr("data-target");
       works.$rightArrowDataId = +works.$rightArrow.attr("data-target");

       var newLeftArrowDataId, newRightArrowDataId;

       if ($targetArrow.attr("id") === "work-left-arrow") {  //если нажали на левую стрелку

           //Левый поворот это как (numOfWorks - 1) правых поворотов. Если новый id это 0, то это должно быть n

           newLeftArrowDataId = (works.$leftArrowDataId + works.numOfWorks - 1) % works.numOfWorks;
           newRightArrowDataId = (works.$rightArrowDataId + works.numOfWorks - 1) % works.numOfWorks;
       }
       else {
           newLeftArrowDataId = (works.$leftArrowDataId + 1) % works.numOfWorks;
           newRightArrowDataId = (works.$rightArrowDataId + 1) % works.numOfWorks;
       }

       //Нулевые data-target нам тоже не нужны, т.к. нахуя. Это должны быть n
       if (newLeftArrowDataId == 0)
           newLeftArrowDataId = works.numOfWorks;
       if (newRightArrowDataId == 0)
           newRightArrowDataId = works.numOfWorks;

       works.$leftArrow.attr("data-target", "" + newLeftArrowDataId);
       works.$rightArrow.attr("data-target", "" + newRightArrowDataId);

       works.$worksPresentBlock.find(".work-name").html(works.worksNames[targetDataId - 1]);
       works.$worksPresentBlock.find('.work-number').html(targetDataId + "/" + works.numOfWorks);
   };

   return works;
});