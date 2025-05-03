import { lS } from "./localStorage.js";


export function showPassword() {
  const passLabelList = [...document.getElementsByClassName('js-label-pass')];

  if (!passLabelList) return;
  passLabelList.forEach(labelItem => {
    const [showPassBtn] = labelItem.getElementsByClassName('js-show-pass');
    const changeInp = labelItem.nextElementSibling;
    
    showPassBtn.addEventListener('click', e => {
      e.preventDefault();
      
      if (showPassBtn.dataset.show === 'false') {
        showPassBtn.dataset.show = 'true';  
        changeInp.setAttribute("type", "text");
      } else {
        showPassBtn.dataset.show = 'false';
        changeInp.setAttribute("type", "password");
      };
    });
  });
};

//******************************************************************************

export function scrolTop() {
  document.addEventListener('scroll', () => {
    const [topBtn] = document.getElementsByClassName('js-btn-up');
    const [styleHead] = document.getElementsByClassName('js-head-scroll');
    let scroll = window.scrollY;
    if (!topBtn) return;
    if (scroll > 0) {
      topBtn.classList.add('btn-top_body--active');
      styleHead.style.setProperty('--opacity', '1');
    }
    else {
      topBtn.classList.remove('btn-top_body--active');
      styleHead.style.setProperty('--opacity', '0');
    }

    topBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  });
};

//********************************************************************************

export function isCartBtn() {
  const isCart = lS.get('cartObj');
  const [headCartBtn] = document.getElementsByClassName('js-head-cart-btn');
  
  if (!headCartBtn) return
  headCartBtn.classList.remove('is-active');
  headCartBtn.removeAttribute("href");
  
  if (!isCart) return
  const [numBtn] = headCartBtn.getElementsByClassName('js-head-cart-num');
  const valTotal = isCart.cartItemsTotal;
  
  numBtn.innerHTML = valTotal;
  headCartBtn.classList.add('is-active');
  headCartBtn.setAttribute("href", "cart.html");
};

//********************************************************************************

export function toggleQMessage() {
  const [qMessBtn] = document.getElementsByClassName('js-close-quick-mess');
  
  if (!qMessBtn) return;
  const qMesseBody = qMessBtn.parentElement;

  qMessBtn.addEventListener('click', e => {
    e.preventDefault();

    qMesseBody.classList.toggle('is-open');
  })
}