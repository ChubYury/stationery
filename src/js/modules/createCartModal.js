import { lS } from './localStorage.js';
import { isCartBtn } from './buttons.js';


function delItemsCartModal(modalCartBody) {
  const [tmpCartItem] = modalCartBody.getElementsByClassName('js-cart-item-tmp');
  const cartItemsWrap = tmpCartItem.parentElement;
  const itemList = [...cartItemsWrap.children];

  itemList.forEach(cartItem => {
    const isTmpItem = cartItem.classList.contains('js-cart-item-tmp');

    if(!isTmpItem) cartItem.remove();
  });
};

function closeCartModal(modalCartBody) {
  const closeBtnList = [...modalCartBody.getElementsByClassName('js-cart-modal-close')];

  closeBtnList.forEach(closeBtn => {
    closeBtn.addEventListener('click', e => {
      modalCartBody.classList.remove('is-active');
    });
  });
};

function delItemCartModal(modalCartBody) {
  const [tmpCartItem] = modalCartBody.getElementsByClassName('js-cart-item-tmp');
  const cartItemsWrap = tmpCartItem.parentElement;
  const itemList = [...cartItemsWrap.children];
  
  itemList.forEach(item => {
    const isTmpItem = item.classList.contains('js-cart-item-tmp');
    
    if(!isTmpItem) { 
      const [btnDel] = item.getElementsByClassName('js-del-btn-cart-modal');
      
      btnDel.addEventListener('click', e => {
        e.preventDefault();
        const delId = item.dataset.id;
        const modCartBody = lS.get('cartObj');
        const delItemIndex = modCartBody.cartItems.findIndex((cartEl) => cartEl.id === delId);
        
        if(delItemIndex < 0 ) return;       
        
        modCartBody.cartItems.splice(delItemIndex, 1)
        modCartBody.cartItemsTotal = modCartBody.cartItems.length;
        lS.set('cartObj',modCartBody);

        if (modCartBody.cartItems.length <= 0) {
          lS.del('cartObj')
          modalCartBody.classList.remove('is-active');
        };
        item.remove();
        isCartBtn();
      });
    };
  });
};

function setItemCartModal(modalCartBody) {
  const [tmpCartItem] = modalCartBody.getElementsByClassName('js-cart-item-tmp');
  const cartItemsWrap = tmpCartItem.parentElement;
  const cartItemList = lS.get('cartObj').cartItems;

  cartItemList.forEach(cartItem => {
    const newItem = tmpCartItem.cloneNode(true);
    
    newItem.classList.remove('js-cart-item-tmp');
    Object.keys(cartItem).forEach( key => {
      const item = newItem.querySelector(`[data-${key}]`);
      
      switch (key) {
        case 'id':
          newItem.setAttribute('data-prod-id', cartItem[key]);
          break;
        case 'name':
          item.innerHTML = cartItem[key];
          break;
          case 'img':
            item.setAttribute('src', cartItem[key]);
          break;
        case 'art':
          item.dataset[key] = cartItem[key];
          item.innerHTML = cartItem[key];
          break;
        case 'quant':
          item.dataset[key] = cartItem[key];
          item.innerHTML = cartItem[key];
          break;
        default:
          break;
      };
    });
    cartItemsWrap.insertAdjacentElement('beforeend', newItem)
  });

  delItemCartModal(modalCartBody)
}

export function createCartModal() {
  const [modalCartBody] = document.getElementsByClassName('js-modal-cart');

  if (!modalCartBody) return;
  delItemsCartModal(modalCartBody)
  setItemCartModal(modalCartBody);
  modalCartBody.classList.add('is-active');
  delItemCartModal(modalCartBody)
  closeCartModal(modalCartBody)
};