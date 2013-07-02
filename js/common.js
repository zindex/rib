// page init
jQuery(function(){
    initSameHeight();
});

$(function()
{
    // Quick navigation fixed
    $(window).scroll(function() {
        if ($(window).scrollTop() > 206) {
            $('.quick-nav__block').stop().animate({
                top:$(window).scrollTop()+37
            }, 0);
        } else {
            $('.quick-nav__block').stop().animate({
                top: 243
            }, 0);
        }
    });
    // Topbar fixed
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.topbar').stop().animate({
                top:$(window).scrollTop()
            }, 0);
        } else {
            $('.topbar').stop().animate({
                top: 0
            }, 0);
        }
    });

    $(".datepicker", "").datepicker({
        "format": "dd-mm-yyyy",
        "weekStart": 1,
        "autoclose": true
    });
    $('.form__add-on').click(function(){
        $(this).prevAll('.datepicker').datepicker('show');
    });
    // Hide datepicker on scroll and resize
    var dtPckr = $('#datepicker');
    $(window).scroll(function() {
        dtPckr.datepicker('hide');
    });
    $(window).resize(function() {
        dtPckr.datepicker('hide');
    });



    // Tabs
    var tabContainers = $('.tab__content > .tab');
    $('.tabset__link').click(function(e){
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('.tabset__link').removeClass('tabset__link_active');
        $(this).addClass('tabset__link_active');
        e.preventDefault();

    }).eq(0).click();
    tabContainers.hide().eq(0).show();


    // Login Button
    $('#jsLoginBtn').click(function(e){
        $(this).parents('.login-holder').addClass('login-holder_open');
        $(this).nextAll('.login-box').slideDown();
    });
    $('#jsLoginClose').click(function(e){
        $(this).parents('.login-holder').removeClass('login-holder_open');
        $(this).parents('.login-box').slideUp();
    });

    // Tooltip vertical align center
        $('.quick-nav__item').hover(function(){
        var tooltipHeight = 0;
        tooltipHeight = $(this).children('.quick-nav__tooltip').height();
        if (tooltipHeight > 20 ) {
            $(this).children('.quick-nav__tooltip').css("margin-top", -20);
        }
        tooltipHeight = 0;
    });

    // Open/Close Box
    $('.jsOpenBoxOpener').click(function(e){
        $(this).parents('.jsOpenBoxConatiner').children('.jsOpenBox').slideToggle(500);
        $(this).parents('.jsOpenBoxConatiner').toggleClass('jsBoxContainerOpen');
		if ($(this).hasClass('add-button')){
			$(this).hide();
		}
        e.preventDefault();
    });

    // Open/Close recover form
    $('.jsRecoverLink').click(function(e){
        $('#login-form').slideUp(500);
        $('#recover-form').slideDown(500);
        e.preventDefault();
    });

    // gender select

    $('#gender-personal').change(function() {
        var genderVal = ($('#gender-personal').val());
        console.log(genderVal);
        if (genderVal == 'male'){
            $('#avatar-personal > .img-male').show();
            $('#avatar-personal > .img-female').hide();
        }
        if (genderVal == 'female'){
            $('#avatar-personal > .img-male').hide();
            $('#avatar-personal > .img-female').show();
        }
    });

//	//equilize height columns
//	$.fn.equalizeHeights = function() {
//		var maxHeight = this.map(function(i,e) {
//			return $(e).height();
//		}).get();
//		return this.height( Math.max.apply(this, maxHeight) );
//	};

//	$('.features-items').each(function(){
//		$(".features-item__wrap",this).equalizeHeights();
//	});
//	$(window).resize(function() {
//		$('.features-items').each(function(){
//			$(".features-item__cnt",this).equalizeHeights();
//		});
//	});






});

$(window).load(function(){

    $('.person-list__pic').BlackAndWhite({
        hoverEffect : true, // default true
        // set the path to BnWWorker.js for a superfast implementation
        webworkerPath : false,
        // for the images with a fluid width and height
        responsive:true,
        speed: { //this property could also be just speed: value for both fadeIn and fadeOut
            fadeIn: 200, // 200ms for fadeIn animations
            fadeOut: 800 // 800ms for fadeOut animations
        }
    });
});





// align blocks height
function initSameHeight() {
    jQuery('.jsSameHeightHolder').sameHeight({
        elements: '.jsSameHeight',
        flexible: true
    });
}

/*
 * jQuery SameHeight plugin
 */
;(function($){
    $.fn.sameHeight = function(opt) {
        var options = $.extend({
            skipClass: 'same-height-ignore',
            leftEdgeClass: 'same-height-left',
            rightEdgeClass: 'same-height-right',
            elements: '>*',
            flexible: false,
            multiLine: true,
            useMinHeight: true,
            biggestHeight: false
        },opt);
        return this.each(function(){
            var holder = $(this), postResizeTimer, ignoreResize;
            var elements = holder.find(options.elements).not('.' + options.skipClass);
            if(!elements.length) return;

            // resize handler
            function doResize() {
                elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
                if(options.multiLine) {
                    // resize elements row by row
                    resizeElementsByRows(elements, options);
                } else {
                    // resize elements by holder
                    resizeElements(elements, holder, options);
                }
            }
            doResize();

            // handle flexible layout / font resize
            var delayedResizeHandler = function() {
                if(!ignoreResize) {
                    ignoreResize = true;
                    doResize();
                    clearTimeout(postResizeTimer);
                    postResizeTimer = setTimeout(function() {
                        doResize();
                        setTimeout(function(){
                            ignoreResize = false;
                        }, 10);
                    }, 100);
                }
            };

            // handle flexible/responsive layout
            if(options.flexible) {
                $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
            }

            // handle complete page load including images and fonts
            $(window).bind('load', delayedResizeHandler);
        });
    };

    // detect css min-height support
    var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

    // get elements by rows
    function resizeElementsByRows(boxes, options) {
        var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
        boxes.each(function(ind){
            var curItem = $(this);
            if(curItem.offset().top === firstOffset) {
                currentRow = currentRow.add(this);
            } else {
                maxHeight = getMaxHeight(currentRow);
                maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
                currentRow = curItem;
                firstOffset = curItem.offset().top;
            }
        });
        if(currentRow.length) {
            maxHeight = getMaxHeight(currentRow);
            maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        }
        if(options.biggestHeight) {
            boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
        }
    }

    // calculate max element height
    function getMaxHeight(boxes) {
        var maxHeight = 0;
        boxes.each(function(){
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
        });
        return maxHeight;
    }

    // resize helper function
    function resizeElements(boxes, parent, options) {
        var calcHeight;
        var parentHeight = typeof parent === 'number' ? parent : parent.height();
        boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
            var element = $(this);
            var depthDiffHeight = 0;

            if(typeof parent !== 'number') {
                element.parents().each(function(){
                    var tmpParent = $(this);
                    if(this === parent[0]) {
                        return false;
                    } else {
                        depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
                    }
                });
            }
            calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
            if(calcHeight > 0) {
                element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
            }
        });
        boxes.filter(':first').addClass(options.leftEdgeClass);
        boxes.filter(':last').addClass(options.rightEdgeClass);
        return calcHeight;
    }
}(jQuery));


// custom select module
jcf.addModule({
    name:'select',
    selector:'select',
    defaultOptions: {
        hideDropOnScroll: true,
        showNativeDrop: false,
        handleDropPosition: true,
        selectDropPosition: 'bottom', // or 'top'
        wrapperClass:'select-area',
        focusClass:'select-focus',
        dropActiveClass:'select-active',
        selectedClass:'item-selected',
        currentSelectedClass:'current-selected',
        disabledClass:'select-disabled',
        valueSelector:'span.center',
        optGroupClass:'optgroup',
        openerSelector:'a.select-opener',
        selectStructure:'<span class="left"></span><span class="center"></span><a class="select-opener"><i class="ico ico-select"></i></a>',
        classPrefix:'select-',
        dropMaxHeight: 200,
        dropFlippedClass: 'select-options-flipped',
        dropHiddenClass:'options-hidden',
        dropScrollableClass:'options-overflow',
        dropClass:'select-options',
        dropClassPrefix:'drop-',
        dropStructure:'<div class="drop-holder"><div class="drop-list"></div></div>',
        dropSelector:'div.drop-list'
    },
    checkElement: function(el){
        return (!el.size && !el.multiple);
    },
    setupWrapper: function(){
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        this.fakeElement.innerHTML = this.options.selectStructure;
        this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

        // show native drop if specified in options
        if(jcf.isTouchDevice && jcf.baseOptions.useNativeDropOnMobileDevices) {
            this.options.showNativeDrop = true;
        }
        if(this.options.showNativeDrop) {
            this.fakeElement.appendChild(this.realElement);
            jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
            jcf.lib.setStyles(this.realElement, {
                top:0,
                left:0,
                margin:0,
                padding:0,
                opacity:0,
                border:'none',
                position:'absolute',
                width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
                height: jcf.lib.getInnerHeight(this.fakeElement) - 1
            });
            jcf.lib.event.add(this.realElement, 'touchstart', function(){
                this.realElement.title = '';
            }, this)
        }

        // create select body
        this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
        this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
        jcf.lib.disableTextSelection(this.valueText);
        this.opener.jcf = this;

        if(!this.options.showNativeDrop) {
            this.createDropdown();
            this.refreshState();
            this.onControlReady(this);
            this.hideDropdown(true);
        } else {
            this.refreshState();
        }
        this.addEvents();
    },
    addEvents: function(){
        if(this.options.showNativeDrop) {
            jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
        } else {
            jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
        }
        jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
    },
    onFakeClick: function() {
        // do nothing (drop toggles by toggleDropdown method)
    },
    onFocus: function(){
        jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
        if(!this.options.showNativeDrop) {
            // Mac Safari Fix
            if(jcf.lib.browser.safariMac) {
                this.realElement.setAttribute('size','2');
            }
            jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
            if(jcf.activeControl && jcf.activeControl != this) {
                jcf.activeControl.hideDropdown();
                jcf.activeControl = this;
            }
        }
    },
    onBlur: function(){
        if(!this.options.showNativeDrop) {
            // Mac Safari Fix
            if(jcf.lib.browser.safariMac) {
                this.realElement.removeAttribute('size');
            }
            if(!this.isActiveDrop() || !this.isOverDrop()) {
                jcf.modules[this.name].superclass.onBlur.apply(this);
                if(jcf.activeControl === this) jcf.activeControl = null;
                if(!jcf.isTouchDevice) {
                    this.hideDropdown();
                }
            }
            jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
        } else {
            jcf.modules[this.name].superclass.onBlur.apply(this);
        }
    },
    onChange: function() {
        this.refreshState();
    },
    onKeyDown: function(e){
        this.dropOpened = true;
        jcf.tmpFlag = true;
        setTimeout(function(){jcf.tmpFlag = false},100);
        var context = this;
        context.keyboardFix = true;
        setTimeout(function(){
            context.refreshState();
        },10);
        if(e.keyCode == 13) {
            context.toggleDropdown.apply(context);
            return false;
        }
    },
    onResizeWindow: function(e){
        if(this.isActiveDrop()) {
            this.hideDropdown();
        }
    },
    onScrollWindow: function(e){
        if(this.options.hideDropOnScroll) {
            this.hideDropdown();
        } else if(this.isActiveDrop()) {
            this.positionDropdown();
        }
    },
    onOptionClick: function(e){
        var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
        if(opener) {
            this.dropOpened = true;
            this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
            if(jcf.isTouchDevice) {
                this.onFocus();
            } else {
                this.realElement.focus();
            }
            this.refreshState();
            this.hideDropdown();
            jcf.lib.fireEvent(this.realElement, 'change');
        }
        return false;
    },
    onClickOutside: function(e){
        if(jcf.tmpFlag) {
            jcf.tmpFlag = false;
            return;
        }
        if(!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
            this.hideDropdown();
        }
    },
    onDropHover: function(e){
        if(!this.keyboardFix) {
            this.hoverFlag = true;
            var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
            if(opener) {
                this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
                this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
            }
        } else {
            this.keyboardFix = false;
        }
    },
    onDropLeave: function(){
        this.hoverFlag = false;
    },
    isActiveDrop: function(){
        return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
    },
    isOverDrop: function(){
        return this.hoverFlag;
    },
    createDropdown: function(){
        // remove old dropdown if exists
        if(this.selectDrop) {
            this.selectDrop.parentNode.removeChild(this.selectDrop);
        }

        // create dropdown holder
        this.selectDrop = document.createElement('div');
        this.selectDrop.className = this.options.dropClass;
        this.selectDrop.innerHTML = this.options.dropStructure;
        jcf.lib.setStyles(this.selectDrop, {position:'absolute'});
        this.selectList = jcf.lib.queryBySelector(this.options.dropSelector,this.selectDrop)[0];
        jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
        document.body.appendChild(this.selectDrop);
        this.selectDrop.jcf = this;
        jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
        jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
        jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
        this.buildDropdown();
    },
    buildDropdown: function() {
        // build select options / optgroups
        this.buildDropdownOptions();

        // position and resize dropdown
        this.positionDropdown();

        // cut dropdown if height exceedes
        this.buildDropdownScroll();
    },
    buildDropdownOptions: function() {
        this.resStructure = '';
        this.optNum = 0;
        for(var i = 0; i < this.realElement.children.length; i++) {
            this.resStructure += this.buildElement(this.realElement.children[i], i) +'\n';
        }
        this.selectList.innerHTML = this.resStructure;
    },
    buildDropdownScroll: function() {
        if(this.options.dropMaxHeight) {
            if(this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
                this.selectList.style.height = this.options.dropMaxHeight+'px';
                this.selectList.style.overflow = 'auto';
                this.selectList.style.overflowX = 'hidden';
                jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
            }
        }
        jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
    },
    parseOptionTitle: function(optTitle) {
        return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
    },
    buildElement: function(obj, index){
        // build option
        var res = '', optImage;
        if(obj.tagName.toLowerCase() == 'option') {
            if(!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
                res += '<ul>';
            }

            optImage = this.parseOptionTitle(obj.title);
            res += '<li rel="'+(this.optNum++)+'" class="'+(obj.className? obj.className + ' ' : '')+(index % 2 ? 'option-even ' : '')+'jcfcalc"><a href="#">'+(optImage ? '<img src="'+optImage+'" alt="" />' : '')+'<span>' + obj.innerHTML + '</span></a></li>';
            if(!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
                res += '</ul>';
            }
            return res;
        }
        // build option group with options
        else if(obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
            res += '<div class="'+this.options.optGroupClass+'">';
            res += '<strong class="jcfcalc"><em>'+(obj.label)+'</em></strong>';
            for(var i = 0; i < obj.children.length; i++) {
                res += this.buildElement(obj.children[i], i);
            }
            res += '</div>';
            return res;
        }
    },
    positionDropdown: function(){
        var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
        var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;


        if((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
            this.selectDrop.style.top = (ofs.top - selectDropHeight)+'px';
            jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
        } else {
            this.selectDrop.style.top = (ofs.top + selectAreaHeight)+'px';
            jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
        }
        this.selectDrop.style.left = ofs.left+'px';
        this.selectDrop.style.width = this.fakeElement.offsetWidth+'px';
    },
    showDropdown: function(){
        document.body.appendChild(this.selectDrop);
        jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
        jcf.lib.addClass(this.fakeElement,this.options.dropActiveClass);
        this.positionDropdown();

        // highlight current active item
        var activeItem = this.getFakeActiveOption();
        this.removeClassFromItems(this.options.currentSelectedClass);
        jcf.lib.addClass(activeItem, this.options.currentSelectedClass);

        // show current dropdown
        jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
        jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
        jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
        this.positionDropdown();
    },
    hideDropdown: function(partial){
        if(this.selectDrop.parentNode) {
            if(this.selectDrop.offsetWidth) {
                this.selectDrop.parentNode.removeChild(this.selectDrop);
            }
            if(partial) {
                return;
            }
        }
        if(typeof this.origSelectedIndex === 'number') {
            this.realElement.selectedIndex = this.origSelectedIndex;
        }
        jcf.lib.removeClass(this.fakeElement,this.options.dropActiveClass);
        jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
        jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
        jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
        jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
        if(jcf.isTouchDevice) {
            this.onBlur();
        }
    },
    toggleDropdown: function(){
        if(!this.realElement.disabled) {
            if(jcf.isTouchDevice) {
                this.onFocus();
            } else {
                this.realElement.focus();
            }
            if(this.isActiveDrop()) {
                this.hideDropdown();
            } else {
                this.showDropdown();
            }
            this.refreshState();
        }
    },
    scrollToItem: function(){
        if(this.isActiveDrop()) {
            var dropHeight = this.selectList.offsetHeight;
            var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
            var sTop = this.selectList.scrollTop;
            var oHeight = this.getFakeActiveOption().offsetHeight;
            //offsetTop+=sTop;

            if(offsetTop >= sTop + dropHeight) {
                this.selectList.scrollTop = offsetTop - dropHeight + oHeight;
            } else if(offsetTop < sTop) {
                this.selectList.scrollTop = offsetTop;
            }
        }
    },
    getFakeActiveOption: function(c) {
        return jcf.lib.queryBySelector('li[rel="'+(typeof c === 'number' ? c : this.realElement.selectedIndex) +'"]',this.selectList)[0];
    },
    calcOptionOffset: function(fake) {
        var h = 0;
        var els = jcf.lib.queryBySelector('.jcfcalc',this.selectList);
        for(var i = 0; i < els.length; i++) {
            if(els[i] == fake) break;
            h+=els[i].offsetHeight;
        }
        return h;
    },
    childrenHasItem: function(hold,item) {
        var items = hold.getElementsByTagName('*');
        for(i = 0; i < items.length; i++) {
            if(items[i] == item) return true;
        }
        return false;
    },
    removeClassFromItems: function(className){
        var children = jcf.lib.queryBySelector('li',this.selectList);
        for(var i = children.length - 1; i >= 0; i--) {
            jcf.lib.removeClass(children[i], className);
        }
    },
    setSelectedClass: function(c){
        jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
    },
    refreshSelectedClass: function(c){
        if(!this.options.showNativeDrop) {
            this.removeClassFromItems(this.options.selectedClass);
            this.setSelectedClass(c);
        }
        if(this.realElement.disabled) {
            jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
            }
        }
    },
    refreshSelectedText: function() {
        if(!this.dropOpened && this.realElement.title) {
            this.valueText.innerHTML = this.realElement.title;
        } else {
            if(this.realElement.options[this.realElement.selectedIndex].title) {
                var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
                this.valueText.innerHTML = (optImage ? '<img src="'+optImage+'" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
            } else {
                this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
            }
        }
    },
    refreshState: function(){
        this.origSelectedIndex = this.realElement.selectedIndex;
        this.refreshSelectedClass();
        this.refreshSelectedText();
        if(!this.options.showNativeDrop) {
            this.positionDropdown();
            if(this.selectDrop.offsetWidth) {
                this.scrollToItem();
            }
        }
    }
});


// custom upload field module
jcf.addModule({
    name: 'file',
    selector: 'input[type="file"]',
    defaultOptions: {
        buttonWidth: 30,
        bigFontSize: 200,
        buttonText:'Прикрепить файл',
        wrapperClass:'file-area',
        focusClass:'file-focus',
        disabledClass:'file-disabled',
        opacityClass:'file-input-opacity',
        noFileClass:'no-file',
        extPrefixClass:'extension-',
        uploadStructure:'<div class="jcf-input-wrapper"><div class="jcf-wrap"></div><label class="jcf-fake-input"><span><em></em></span></label><a class="jcf-upload-button"><span></span></a></div>',
        uploadFileNameSelector:'label.jcf-fake-input span em',
        uploadButtonSelector:'a.jcf-upload-button span',
        inputWrapper: 'div.jcf-wrap'
    },
    setupWrapper: function(){
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.fakeElement.innerHTML = this.options.uploadStructure;
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        this.fileNameInput = jcf.lib.queryBySelector(this.options.uploadFileNameSelector ,this.fakeElement)[0];
        this.uploadButton = jcf.lib.queryBySelector(this.options.uploadButtonSelector ,this.fakeElement)[0];
        this.inputWrapper = jcf.lib.queryBySelector(this.options.inputWrapper ,this.fakeElement)[0];

        this.origTitle = this.realElement.title;
        this.fileNameInput.innerHTML = this.realElement.title || '';
        this.uploadButton.innerHTML = this.options.buttonText;
        this.realElement.removeAttribute('title');
        this.fakeElement.style.position = 'relative';
        this.realElement.style.position = 'absolute';
        this.realElement.style.zIndex = 100;
        this.inputWrapper.appendChild(this.realElement);
        this.oTop = this.oLeft = this.oWidth = this.oHeight = 0;

        jcf.lib.addClass(this.realElement, this.options.opacityClass);
        jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
        this.inputWrapper.style.width = this.inputWrapper.parentNode.offsetWidth+'px';

        this.shakeInput();
        this.refreshState();
        this.addEvents();
    },
    addEvents: function(){
        jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
        if(!jcf.isTouchDevice) {
            jcf.lib.event.add(this.fakeElement, 'mousemove', this.onMouseMove, this);
            jcf.lib.event.add(this.fakeElement, 'mouseover', this.recalcDimensions, this);
        }
    },
    onMouseMove: function(e){
        this.realElement.style.top = Math.round(e.pageY - this.oTop - this.oHeight/2) + 'px';
        this.realElement.style.left = (e.pageX - this.oLeft - this.oWidth + this.options.buttonWidth) + 'px';
    },
    onChange: function(){
        this.refreshState();
    },
    getFileName: function(){
        return this.realElement.value.replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, "$1");
    },
    getFileExtension: function(){
        return this.realElement.value.lastIndexOf('.') < 0 ? false : this.realElement.value.substring(this.realElement.value.lastIndexOf('.')+1).toLowerCase();
    },
    updateExtensionClass: function(){
        var currentExtension = this.getFileExtension();
        if(currentExtension) {
            this.fakeElement.className = this.fakeElement.className.replace(new RegExp('(\\s|^)'+this.options.extPrefixClass+'[^ ]+','gi'),'')
            jcf.lib.addClass(this.fakeElement, this.options.extPrefixClass+currentExtension)
        }
    },
    shakeInput: function() {
        // make input bigger
        jcf.lib.setStyles(this.realElement, {
            fontSize: this.options.bigFontSize,
            lineHeight: this.options.bigFontSize,
            heigth: 'auto',
            top: 0,
            left: this.inputWrapper.offsetWidth - this.realElement.offsetWidth
        });
        // IE styling fix
        if((/(MSIE)/gi).test(navigator.userAgent)) {
            this.tmpElement = document.createElement('span');
            this.inputWrapper.insertBefore(this.tmpElement,this.realElement);
            this.inputWrapper.insertBefore(this.realElement,this.tmpElement);
            this.inputWrapper.removeChild(this.tmpElement);
        }
    },
    recalcDimensions: function() {
        var o = jcf.lib.getOffset(this.fakeElement);
        this.oTop = o.top;
        this.oLeft = o.left;
        this.oWidth = this.realElement.offsetWidth;
        this.oHeight = this.realElement.offsetHeight;
    },
    refreshState: function(){
        jcf.lib.setStyles(this.realElement, {opacity: 0});
        this.fileNameInput.innerHTML = this.getFileName() || this.origTitle || '';
        if(this.realElement.disabled) {
            jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
            }
        }
        if(this.realElement.value.length) {
            jcf.lib.removeClass(this.fakeElement, this.options.noFileClass);
        } else {
            jcf.lib.addClass(this.fakeElement, this.options.noFileClass);
        }
        this.updateExtensionClass();
    }
});


// custom checkbox module
jcf.addModule({
    name:'checkbox',
    selector:'input[type="checkbox"]',
    defaultOptions: {
        wrapperClass:'chk-area',
        focusClass:'chk-focus',
        checkedClass:'chk-checked',
        labelActiveClass:'chk-label-active',
        uncheckedClass:'chk-unchecked',
        disabledClass:'chk-disabled',
        chkStructure:'<span></span>'
    },
    setupWrapper: function(){
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.fakeElement.innerHTML = this.options.chkStructure;
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        jcf.lib.event.add(this.realElement, 'click', this.onRealClick, this);
        this.refreshState();
    },
    isLinkTarget: function(target, limitParent) {
        while(target.parentNode || target === limitParent) {
            if(target.tagName.toLowerCase() === 'a') {
                return true;
            }
            target = target.parentNode;
        }
    },
    onFakePressed: function() {
        jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments);
        if(!this.realElement.disabled) {
            this.realElement.focus();
        }
    },
    onFakeClick: function(e) {
        jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments);
        this.tmpTimer = setTimeout(jcf.lib.bind(function(){
            this.toggle();
        },this),10);
        if(!this.isLinkTarget(e.target, this.labelFor)) {
            return false;
        }
    },
    onRealClick: function(e) {
        setTimeout(jcf.lib.bind(function(){
            this.refreshState();
        },this),10);
        e.stopPropagation();
    },
    toggle: function(e){
        if(!this.realElement.disabled) {
            if(this.realElement.checked) {
                this.realElement.checked = false;
            } else {
                this.realElement.checked = true;
            }
        }
        this.refreshState();
        return false;
    },
    refreshState: function(){
        if(this.realElement.checked) {
            jcf.lib.addClass(this.fakeElement, this.options.checkedClass);
            jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass);
            if(this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelActiveClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.checkedClass);
            jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass);
            if(this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass);
            }
        }
        if(this.realElement.disabled) {
            jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
            }
        } else {
            jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            if(this.labelFor) {
                jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
            }
        }
    }
});


// custom radio module
jcf.addModule({
    name:'radio',
    selector: 'input[type="radio"]',
    defaultOptions: {
        wrapperClass:'rad-area',
        focusClass:'rad-focus',
        checkedClass:'rad-checked',
        uncheckedClass:'rad-unchecked',
        disabledClass:'rad-disabled',
        radStructure:'<span></span>'
    },
    getRadioGroup: function(item){
        var name = item.getAttribute('name');
        if(name) {
            return jcf.lib.queryBySelector('input[name="'+name+'"]', jcf.lib.getParent('form'));
        } else {
            return [item];
        }
    },
    setupWrapper: function(){
        jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
        this.fakeElement.innerHTML = this.options.radStructure;
        this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
        this.refreshState();
        this.addEvents();
    },
    addEvents: function(){
        jcf.lib.event.add(this.fakeElement, 'click', this.toggleRadio, this);
        if(this.labelFor) {
            jcf.lib.event.add(this.labelFor, 'click', this.toggleRadio, this);
        }
    },
    onFocus: function(e) {
        jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
        setTimeout(jcf.lib.bind(function(){
            this.refreshState();
        },this),10);
    },
    toggleRadio: function(){
        if(!this.realElement.disabled) {
            this.realElement.checked = true;
        }
        this.refreshState();
    },
    refreshState: function(){
        var els = this.getRadioGroup(this.realElement);
        for(var i = 0; i < els.length; i++) {
            var curEl = els[i].jcf;
            if(curEl) {
                if(curEl.realElement.checked) {
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.checkedClass);
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.uncheckedClass);
                    if(curEl.labelFor) {
                        jcf.lib.addClass(curEl.labelFor, curEl.options.labelActiveClass);
                    }
                } else {
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.checkedClass);
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.uncheckedClass);
                    if(curEl.labelFor) {
                        jcf.lib.removeClass(curEl.labelFor, curEl.options.labelActiveClass);
                    }
                }
                if(curEl.realElement.disabled) {
                    jcf.lib.addClass(curEl.fakeElement, curEl.options.disabledClass);
                    if(curEl.labelFor) {
                        jcf.lib.addClass(curEl.labelFor, curEl.options.labelDisabledClass);
                    }
                } else {
                    jcf.lib.removeClass(curEl.fakeElement, curEl.options.disabledClass);
                    if(curEl.labelFor) {
                        jcf.lib.removeClass(curEl.labelFor, curEl.options.labelDisabledClass);
                    }
                }
            }
        }
    }
});