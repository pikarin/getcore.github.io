// Sticky
$(document).ready(function(){
    var sticky = $('.sticky'),
        stickyTwo = $('.sticky-two'),
        stickyLanding = $('.sticky-sub-landing'),
        stickyHeight = sticky.height();
    
    var scroll = false,
        scrollPrevious = 0,
        scrollCurrent = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    sticky.on('click', '.sticky-toggle', function(event){
        event.preventDefault();
        sticky.toggleClass('sticky-open');
        document.getElementById("stickyToggleActive").classList.toggle("sticky-toggle-active");
    });

    $(window).on('scroll', function(){
        if( !scroll ) {
            scroll = true;
            (!window.requestAnimationFrame)
                ? setTimeout(stickyHidden, 250)
                : requestAnimationFrame(stickyHidden);
        }
    });

    $(window).on('resize', function(){
        stickyHeight = sticky.height();
    });

    function stickyHidden() {
        var scrollCurrent = $(window).scrollTop();

        ( stickyLanding.length > 0 ) 
            ? stickyNavigation(scrollCurrent)
            : stickySimpleNavigation(scrollCurrent);

        scrollPrevious = scrollCurrent;
        scroll = false;
    }

    function stickySimpleNavigation(scrollCurrent) {
        if (scrollPrevious - scrollCurrent > scrollDelta) {
            sticky.removeClass('sticky-jump');
        } else if( scrollCurrent - scrollPrevious > scrollDelta && scrollCurrent > scrollOffset) {
            sticky.addClass('sticky-jump');
        }
    }

    function stickyNavigation(scrollCurrent) {
        var secondaryNavOffsetTop = stickyLanding.offset().top - stickyTwo.height() - sticky.height();
        
        if (scrollPrevious >= scrollCurrent ) {
            if( scrollCurrent < secondaryNavOffsetTop ) {
                sticky.removeClass('sticky-jump');
                stickyTwo.removeClass('sticky-fixed sticky-up');
                stickyLanding.removeClass('sticky-two-fixed');
            } else if( scrollPrevious - scrollCurrent > scrollDelta ) {
                sticky.removeClass('sticky-jump');
                stickyTwo.removeClass('sticky-up').addClass('sticky-fixed'); 
                stickyLanding.addClass('sticky-two-fixed');
            }
            
        } else {
            if( scrollCurrent > secondaryNavOffsetTop + scrollOffset ) {
                sticky.addClass('sticky-jump');
                stickyTwo.addClass('sticky-fixed sticky-up');
                stickyLanding.addClass('sticky-two-fixed');
            } else if( scrollCurrent > secondaryNavOffsetTop ) {
                sticky.removeClass('sticky-jump');
                stickyTwo.addClass('sticky-fixed').removeClass('sticky-up');
                stickyLanding.addClass('sticky-two-fixed');
            }
        }
    }
});

// Mega 
$(document).ready(function(){
    var mobile = 1170;
    moveNavigation();
    $(window).on('resize', function(){
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });
    $('.mega-nav-toggle').on('click', function(event){
        event.preventDefault();
        if( $('.mega-main-content').hasClass('mega-nav-visible') ) {
            closeNav();
            $('.mega-overlay').removeClass('mega-visible');
        } else {
            $(this).addClass('mega-nav-visible');
            $('.mega-primary-nav').addClass('mega-nav-visible');
            $('.mega-header').addClass('mega-nav-visible');
            $('.mega-main-content').addClass('mega-nav-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.mega-overlay').addClass('mega-visible');
        }
    });
    $('.mega-search-toggle').on('click', function(event){
        event.preventDefault();
        toggleSearch();
        closeNav();
    });
    $('.mega-overlay').on('swiperight', function(){
        if($('.mega-primary-nav').hasClass('mega-nav-visible')) {
            closeNav();
            $('.mega-overlay').removeClass('mega-visible');
        }
    });
    $('.mega-on-left .mega-overlay').on('swipeleft', function(){
        if($('.mega-primary-nav').hasClass('mega-nav-visible')) {
            closeNav();
            $('.mega-overlay').removeClass('mega-visible');
        }
    });
    $('.mega-overlay').on('click', function(){
        closeNav();
        toggleSearch('close')
        $('.mega-overlay').removeClass('mega-visible');
    });
    $('.mega-primary-nav').children('.mega-li').children('a').on('click', function(event){
        event.preventDefault();
    });
    $('.mega-li').children('a').on('click', function(event){
        if( !checkWindowWidth() ) event.preventDefault();
        var selected = $(this);
        if( selected.next('ul').hasClass('mega-hidden') ) {
            selected.addClass('selected').next('ul').removeClass('mega-hidden').end().parent('.mega-li').parent('ul').addClass('mega-out');
            selected.parent('.mega-li').siblings('.mega-li').children('ul').addClass('mega-hidden').end().children('a').removeClass('selected');
            $('.mega-overlay').addClass('mega-visible');
        } else {
            selected.removeClass('selected').next('ul').addClass('mega-hidden').end().parent('.mega-li').parent('ul').removeClass('mega-out');
            $('.mega-overlay').removeClass('mega-visible');
        }
        toggleSearch('close');
    });
    $('.mega-back').on('click', function(){
        $(this).parent('ul').addClass('mega-hidden').parent('.mega-li').parent('ul').removeClass('mega-out');
    });
    function closeNav() {
        $('.mega-nav-toggle').removeClass('mega-nav-visible');
        $('.mega-header').removeClass('mega-nav-visible');
        $('.mega-primary-nav').removeClass('mega-nav-visible');
        $('.mega-li ul').addClass('mega-hidden');
        $('.mega-li a').removeClass('selected');
        $('.mega-out').removeClass('mega-out');
        $('.mega-main-content').removeClass('mega-nav-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            $('body').removeClass('overflow-hidden');
        });
    }
    function toggleSearch(type) {
        if(type=="close") {
            $('.mega-search').removeClass('mega-visible');
            $('.mega-search-toggle').removeClass('mega-search-visible');
            $('.mega-overlay').removeClass('mega-search-visible');
        } else {
            $('.mega-search').toggleClass('mega-visible');
            $('.mega-search-toggle').toggleClass('mega-search-visible');
            $('.mega-overlay').toggleClass('mega-search-visible');
            if($(window).width() > mobile && $('.mega-search').hasClass('mega-visible')) $('.mega-search').find('input[type="search"]').focus();
            ($('.mega-search').hasClass('mega-visible')) ? $('.mega-overlay').addClass('mega-visible') : $('.mega-overlay').removeClass('mega-visible') ;
        }
    }

    function checkWindowWidth() {
        var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= mobile ) {
            return true;
        } else {
            return false;
        }
    }
    function moveNavigation(){
        var navigation = $('.mega-nav');
        var desktop = checkWindowWidth();
        if ( desktop ) {
            navigation.detach();
            navigation.insertBefore('.mega-toggles');
        } else {
            navigation.detach();
            navigation.insertAfter('.mega-main-content');
        }
    }
});

// Navoon
function toggleAside() {
    document.getElementById("navoonAside").classList.toggle("show-aside");
}

function toggleMenu() {
  document.getElementById("navoonMenu").classList.toggle("show-menu");
}

function openContent(event, tabContent) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" navoon-active", "");
    }
    document.getElementById(tabContent).style.display = "block";
    event.currentTarget.className += " navoon-active";
}
document.getElementById("defaultOpen").click();

function cToggle() {
    var c = document.getElementById("cNav");
    if (c.className === "nav") {
        c.className += " responsive";
    } else {
        c.className = "nav";
    }
}

function buttonNav1() {
    document.getElementById("contentNav1").classList.toggle("show-nav1");
    document.getElementById("activeNav1").classList.toggle("active-nav");
}
function buttonNav2() {
    document.getElementById("contentNav2").classList.toggle("show-nav2");
    document.getElementById("activeNav2").classList.toggle("active-nav");
}
function buttonNav3() {
    document.getElementById("contentNav3").classList.toggle("show-nav3");
    document.getElementById("activeNav3").classList.toggle("active-nav");
}
function buttonNav4() {
    document.getElementById("contentNav4").classList.toggle("show-nav4");
    document.getElementById("activeNav4").classList.toggle("active-nav");
}
function buttonNav5() {
    document.getElementById("contentNav5").classList.toggle("show-nav5");
    document.getElementById("activeNav5").classList.toggle("active-nav");
}
function buttonNav6() {
    document.getElementById("contentNav6").classList.toggle("show-nav6");
    document.getElementById("activeNav6").classList.toggle("active-nav");
}
function buttonNav7() {
    document.getElementById("contentNav7").classList.toggle("show-nav7");
    document.getElementById("activeNav7").classList.toggle("active-nav");
}
function buttonNav8() {
    document.getElementById("contentNav8").classList.toggle("show-nav8");
    document.getElementById("activeNav8").classList.toggle("active-nav");
}

function basicDropdown() {
    document.getElementById("basicDropdownContent").classList.toggle("basic-show-dropdown");
    document.getElementById("basicActiveDropdown").classList.toggle("basic-active-dropdown");
    document.getElementById("changeBasicToggle").classList.toggle("caret-up-circle");
    document.getElementById("changeBasicToggle").classList.toggle("caret-down-circle");
}

function fadeDropdown() {
    document.getElementById("fadeDropdownContent").classList.toggle("fade-show-dropdown");
    document.getElementById("fadeActiveDropdown").classList.toggle("fade-active-dropdown");
    document.getElementById("changeFadeToggle").classList.toggle("caret-up-circle");
    document.getElementById("changeFadeToggle").classList.toggle("caret-down-circle");
}

function dropdownSwing() {
    document.getElementById("dropdownContentSwing").classList.toggle("show-dropdown-swing");
    document.getElementById("activeDropdownSwing").classList.toggle("active-dropdown-swing");
    document.getElementById("changeSwingToggle").classList.toggle("caret-up-circle");
    document.getElementById("changeSwingToggle").classList.toggle("caret-down-circle");
}

// navbar
function toggleNavbar() {
    var c = document.getElementById("cNavbar");
    document.getElementById("activeToggleNavoid").classList.toggle("active-toggle-navoid");
    if (c.className === "navbar") {
        c.className += " navbar-responsive";
    } else {
        c.className = "navbar";
    }
}
// arsip
function toggleArsip() {
  document.getElementById("arsipMenu").classList.toggle("show-arsip");
  document.getElementById("arsipMenuActive").classList.toggle("arsip-active");
}

// nava
function toggleNava() {
  document.getElementById("navaAside").classList.toggle("show-nava");
  document.getElementById("navaAsideActive").classList.toggle("nava-active");
}
function toggleNavaMenu() {
  document.getElementById("navaMenu").classList.toggle("show-nava-menu");
  document.getElementById("navaMenuActive").classList.toggle("nava-active-menu");
}
function toggleNavaIcon1() {
  document.getElementById("navaIconContent1").classList.toggle("show-nava-icon-content");
  document.getElementById("navaIconActive1").classList.toggle("nava-active-icon");
}
function toggleNavaIcon2() {
  document.getElementById("navaIconContent2").classList.toggle("show-nava-icon-content");
  document.getElementById("navaIconActive2").classList.toggle("nava-active-icon");
}
function toggleNavaIcon3() {
  document.getElementById("navaIconContent3").classList.toggle("show-nava-icon-content");
  document.getElementById("navaIconActive3").classList.toggle("nava-active-icon");
}
function toggleNavaIcon4() {
  document.getElementById("navaIconContent4").classList.toggle("show-nava-icon-content");
  document.getElementById("navaIconActive4").classList.toggle("nava-active-icon");
}
function toggleNavaIcon5() {
  document.getElementById("navaIconContent5").classList.toggle("show-nava-icon-content");
  document.getElementById("navaIconActive5").classList.toggle("nava-active-icon");
}

// Navop
function myFunction() {
    var x = document.getElementById("cNavop");
    document.getElementById("activeNavop").classList.toggle("active-navop");

    if (x.className  === "navop") {
        x.className += " responsive-navop";
    } else {
        x.className = "navop";
    }
}   
