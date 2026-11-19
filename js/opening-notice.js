/* Marina Pizza — temporary opening-day order pause */
(function () {
  'use strict';
  var overlay = document.getElementById('openingNotice');
  var close = document.getElementById('openingClose');
  var ok = document.getElementById('openingOk');
  if (!overlay) return;
  function dismiss() {
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
  }
  close.addEventListener('click', dismiss);
  ok.addEventListener('click', dismiss);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) dismiss();
  });
  // لا نسمح بتنفيذ أي إجراء يرسل طلباً أو يضيف صنفاً إلى السلة.
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var blocked = target.closest('.pbtn, #openCart, #barWa, #sendWa, #quickChat, [data-call], a[href^="tel:"], a[href*="wa.me"]');
    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('submit', function (event) {
    if (event.target && event.target.id === 'orderForm') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  // تظهر النافذة عند كل زيارة جديدة، ويمكن إغلاقها لتصفح المنيو.
  overlay.hidden = false;
})();
