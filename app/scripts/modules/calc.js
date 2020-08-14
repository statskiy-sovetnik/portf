define(['jquery'], function ($) {
    var calc = {};

    calc.$calcCalcWrapper = $(".calc-calc-wrapper");
    calc.indDesignCoefs = [
        1.5,  //users interaction zones
        1.5,  //sophist-elems
        1.5,  //"content-fill-option
        2.5,  // "auth-page-option"
        2,  //"anim-option":
        1,  //"counter-option":
        2,  //"video-option":
        2   //"audio-option":
    ];
    calc.initialSums = [
        550,  //users interaction zones
        400,  //sophist-elems
        300,  //"content-fill-option
        650,  // "auth-page-option"
        200,   //"anim-option":
        100,   //"counter-option":
        300,  //"video-option":
        400   //"audio-option":
    ];
    calc.adaptCoefs = [
        2,  //users interaction zones
        2,  //sophist-elems
        1, //"content-fill-option":
        1.5,  //"auth-page-option":
        1,  //"anim-option":
        1,  //"counter-option":
        1.5,  //"video-option":
        1.5   //"audio-option"
    ];
    calc.pageCoefs = [
        0,  //users interaction zones
        1,  //"sophist-elems-option":
        1,  //"content-fill-option":
        1,  //"auth-page-option":
        0,  //"anim-option":
        0,  //"counter-option":
        0,  //"video-option":
        0   //"audio-option":
    ];
    calc.supportPrices = [
        200,  //подключение поисковых систем
        100  //хостинг на месяц
    ];
    calc.initialModifSums = [
        500,
        1000,
        800
    ];

    calc.setActiveRadio = function (event) {
        var $targetListPoint = $(event.target).hasClass("calc-calc-option") ? $(event.target) : $(event.target).closest(".calc-calc-option"),
            $targetList = $targetListPoint.closest('ul');

        $targetList.find('.calc-calc-radio').removeClass('active-radio');
        $targetListPoint.find(".calc-calc-radio").addClass("active-radio");
    };

    calc.toggleCheckbox = function () {
        var $targetListPoint = $(event.target).hasClass("calc-calc-option") ? $(event.target) : $(event.target).closest(".calc-calc-option");

        $targetListPoint.find(".calc-calc-checkbox").toggleClass("checked");
    };

    calc.triggerOptionset = function (event) {

        var $tar = $(event.target),
            $optionSet = $tar.hasClass('calc-calc-optionset-wrapper') ? $tar : $tar.closest(".calc-calc-optionset-wrapper");

        calc.$calcCalcWrapper.find(".calc-calc-optionset-wrapper").each(function (i, elem) {
            if ($(elem).attr("id") !== $optionSet.attr("id"))
                $(elem).removeClass("opened");
        });

        $optionSet.toggleClass("opened");
    };

    calc.setOptionsetContent = function (event) {
        var targetValue = $(event.target).html();

        $(event.target).closest(".calc-calc-optionset-wrapper").find(".calc-calc-optionset-text").html(targetValue);
    };

    calc.setCalcPrice = function () {

        var activeRadio = calc.$calcCalcWrapper.find("#calc-design-list .active-radio"),
            indDesignMarker = +(activeRadio.closest(".calc-calc-option").attr("id") === "indiv-option"),
            initialDesignSum,
            adaptOption = $("#calc-dev-options-block #adaptive-option"),
            adaptMarker = +adaptOption.find(".calc-calc-checkbox").hasClass("checked"),
            initialAdaptSum,
            $sumOptions = $("#calc-third-options-box .calc-calc-sum-option"),
            totalSum = 0,
            hostingSum = 0,
            curOptionChecked,
            curOptionSum,
            pageNum = calc.$calcCalcWrapper.find("#pages-num-option .calc-calc-optionset-text").html();

        pageNum = (pageNum === "8+") ? 8 : +pageNum;

        //Running through "sum options" (those which are dependent from modificators)

        initialDesignSum = indDesignMarker ? calc.initialModifSums[1] : calc.initialModifSums[0];
        initialAdaptSum = adaptMarker ? calc.initialModifSums[2] : 0;
        totalSum += initialDesignSum + initialAdaptSum;

        $sumOptions.each(function (i, elem) {
            //If it's an optionset, curOptionChecked multiplies it to an option number
            var elemIsOptionset = $(elem).hasClass("calc-calc-optionset-option"),
                optionsetContentNum = +$(elem).find(".calc-calc-optionset-text").html(),
                isChecked = +$(elem).find(".calc-calc-checkbox").hasClass("checked");

            curOptionChecked = elemIsOptionset ? optionsetContentNum : isChecked;
            //curOptionId = "" + elem.attr("id");

            curOptionSum = calc.initialSums[i] * curOptionChecked * pageNum * (calc.pageCoefs[i] ? calc.pageCoefs[i] : 1/pageNum );

            if (indDesignMarker)
                curOptionSum *= calc.indDesignCoefs[i];

            if (adaptMarker)
                curOptionSum *= calc.adaptCoefs[i];

            totalSum += curOptionSum;
        });

        //Adding sums from support block

        var supportBlock = $("#calc-second-options-box"),
            curDomainText = supportBlock.find("#domain-option .calc-calc-optionset-text").html();

        supportBlock.find("#domain-option .optionset-list-option").each(function (i, elem) {
            if ($(elem).html() === curDomainText)
                hostingSum += +$(elem).attr("data-content");

        });

        //Последний элемент в supportPrices зачисляется в цену хостинга и домена

        supportBlock.find(".calc-calc-sum-option").each(function (i, elem) {
            if ($(elem).find(".calc-calc-checkbox").hasClass("checked"))
                if (i !== calc.supportPrices.length - 1)
                    totalSum += calc.supportPrices[i];
                else
                    hostingSum += calc.supportPrices[i];

        });

        //Setting prices

        calc.$calcCalcWrapper.find(".calc-calc-price").html(totalSum + "₽");
        calc.$calcCalcWrapper.find(".calc-calc-domain-price").html(hostingSum);
    };

    return calc;
});