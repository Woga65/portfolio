/* hide the document's body as soon as it appears in the DOM */
const observer = new MutationObserver(() => (document.body) ? (document.body.style.opacity = "0", observer.disconnect()) : false);
observer.observe(document.documentElement, {childList: true});


/* wait until all elements and external resources have been loaded */
window.addEventListener('load', () => {

  const smallHeaderHeight = "3.75";
  const largeHeaderHeight = "5.375";

  const body = document.querySelector('body');
  const menu = document.querySelector('.navigation .menu');
  const logo = document.querySelector('.navigation .logo');
  const menuToggle = document.querySelector('.navigation .menu-toggle');


  /* set the scroll margin according to the header's height */
  const root = document.querySelector(":root");
  root.style.setProperty("--scroll-margin", smallHeaderHeight);


  /* hide mobile navigation after a link has been clicked */
  menu.addEventListener('click', e => menuToggle.checked = false);
  logo.addEventListener('click', e => menuToggle.checked = false);


  /* shrink the header if the page has been scrolled by a certain amount */
  checkScrollPosition();
  window.addEventListener('scroll', checkScrollPosition);


  /* scroll to the top of the active section and let the body fade in */
  setTimeout(() => {
    document.querySelector(window.location.hash || '#top').scrollIntoView();
    body.style = 'opacity: 1; transition: opacity 350ms ease-in-out; -webkit-transition: opacity 350ms ease-in-out;';
  });


  function checkScrollPosition() {
    const scrollPosition = Math.round(window.scrollY);
    (scrollPosition > 100) ? shrinkHeader() : growHeader();
  }

  function shrinkHeader() {
    root.style.setProperty("--header-height", smallHeaderHeight);
  }

  function growHeader() {
    root.style.setProperty("--header-height", largeHeaderHeight);
  }

});
