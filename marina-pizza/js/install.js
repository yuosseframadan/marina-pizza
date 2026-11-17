/* PWA install experience — Marina Pizza */
(function () {
  'use strict';
  var promptEvent = null;
  var overlay = document.getElementById('installPrompt');
  if (!overlay) return;
  var iosBox = document.getElementById('installIos');
  var help = document.getElementById('installHelp');
  var action = document.getElementById('installAction');
  var close = document.getElementById('installClose');
  var later = document.getElementById('installLater');
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    navigator.standalone === true;

  // لا تعرض دعوة التثبيت إطلاقاً عند التشغيل من الأيقونة المثبتة.
  if (isStandalone) {
    overlay.hidden = true;
    return;
  }

  function show() { overlay.hidden = false; }
  function hide() { overlay.hidden = true; }
  close.addEventListener('click', hide);
  later.addEventListener('click', hide);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) hide(); });

  if (isIOS) {
    iosBox.hidden = false;
    action.textContent = 'فهمت، هثبّت التطبيق';
    action.addEventListener('click', hide);
  } else {
    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      promptEvent = e;
      action.textContent = 'تثبيت التطبيق';
    });
    action.addEventListener('click', async function () {
      if (!promptEvent) {
        help.hidden = false;
        help.textContent = 'لو زر التثبيت مش ظاهر، افتح قائمة المتصفح ⋮ ثم اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية». تأكد إنك فاتح الموقع من Chrome أو متصفح يدعم التثبيت.';
        return;
      }
      promptEvent.prompt();
      try { await promptEvent.userChoice; } catch (e) {}
      promptEvent = null;
      hide();
    });
  }

  // كل زيارة من المتصفح تعرض الدعوة؛ إغلاقها يخفيها لهذه الصفحة فقط.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show, { once: true });
  } else {
    show();
  }

  window.addEventListener('appinstalled', hide);
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js').catch(function (err) {
        console.warn('Service worker registration failed:', err);
      });
    });
  }
})();
