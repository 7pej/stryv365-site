/* STRYV365
   Shared behavior: header shadow, banner rotator, story rotator. */

document.addEventListener('DOMContentLoaded', function () {

  /* Drop a shadow under the header once the page moves. Keeps the
     header flush against the banner at the top of the page. */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    });
  }

  /* Rotator.
     slides  - elements that take .active
     dots    - indicator buttons, pass [] if there are none
     prev    - back button or null
     next    - forward button or null
     delay   - ms between auto-advances */
  function rotator(slides, dots, prev, next, delay) {
    if (!slides.length) return;

    var index = 0;
    var timer;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    function start() {
      timer = setInterval(function () { show(index + 1); }, delay);
    }

    function restart() {
      clearInterval(timer);
      start();
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(index + 1); restart(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); restart(); });
    });

    start();
  }

  function all(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  rotator(
    all('#banner .slide'),
    all('#banner-dots .dot'),
    document.getElementById('banner-prev'),
    document.getElementById('banner-next'),
    6000
  );

  rotator(
    all('#stories .story-slide'),
    [],
    document.getElementById('story-prev'),
    document.getElementById('story-next'),
    7500
  );

  /* Photo frame in News & Events. One image at a time, sliding upward.
     No controls by design, it just runs.

     items  - the .feed-item elements
     delay  - ms each photo stays put
     travel - ms the slide itself takes, must match the CSS transition */
  function photoFrame(items, delay, travel) {
    if (items.length < 2) return;

    var index = 0;

    setInterval(function () {
      var current = items[index];
      var next = items[(index + 1) % items.length];

      current.classList.replace('active', 'leaving');
      next.classList.add('active');

      // Once it has slid off the top, drop it back below the frame so it
      // can come around again. Transitions are off for that reset,
      // otherwise the photo visibly falls back down.
      setTimeout(function () {
        current.style.transition = 'none';
        current.classList.remove('leaving');
        void current.offsetHeight;
        current.style.transition = '';
      }, travel);

      index = (index + 1) % items.length;
    }, delay);
  }

  photoFrame(all('#feed .feed-item'), 4500, 850);

});
