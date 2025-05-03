
function clickMenuBtn(htmlBody, menuBtn, menuContent) {
  const menuNav = menuContent.firstChild.nextSibling;

  htmlBody.classList.toggle('not-scroll');
  menuBtn.classList.toggle('is-active');
  menuContent.classList.toggle('is-active');
  menuNav.classList.toggle('is-active');
};

function hiddenMenu(htmlBody, menuBtn, menuContent) {
  const menuNav = menuContent.firstChild.nextSibling;
  
  htmlBody.classList.remove('not-scroll');
  menuBtn.classList.remove('is-active');
  menuContent.classList.remove('is-active');
  menuNav.classList.remove('is-active');
};

function menuScrollHandler(link) {
  const [headerBody] = document.getElementsByClassName('header-wrap');
  const linkURL = link.dataset.goto;
  const gotoBlock = linkURL ? document.getElementById(linkURL) : false;
  
  if (!gotoBlock) return;
  const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - headerBody.offsetHeight;
  
  window.scrollTo({
    top: gotoBlockValue,
    behavior: "smooth"
  });
};

export function initHeadMenu() {
  const htmlBody = document.body;
  const [menuBtn] = document.getElementsByClassName('js-btn-menu');
  const [menuContent] = document.getElementsByClassName('js-menu-content');
  const linkList = [...menuContent.querySelectorAll('[data-goto]'), ...document.getElementsByClassName('js-goto-link')];
  
  menuBtn.addEventListener('click', () => clickMenuBtn(htmlBody, menuBtn, menuContent));

  linkList.forEach(activeLink => {
    activeLink.addEventListener('click', () => {
      
      menuScrollHandler(activeLink);
      hiddenMenu(htmlBody, menuBtn, menuContent);
    });
  });
};