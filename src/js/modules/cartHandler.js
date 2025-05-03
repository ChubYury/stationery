
import { lS } from './localStorage.js';
import { isCartBtn } from './buttons.js';
import { counterHandler } from './counterHandler.js';
// import { createCartModal } from './createCartModal.js';

function isActiveCartBtn(prodItem, isActive) { 
  const [btn] = prodItem.getElementsByClassName('js-add-cart');
  if (!btn) return;
  else if (isActive) {
    btn.removeAttribute('disabled');
    btn.addEventListener('click', e => {
      e.preventDefault();

      location.replace('/cart.html');
    })
  } else btn.setAttribute('disabled', 'disabled');
};

function isSimilarItem(oldCartList, cartItemID) {
  const similarItem = oldCartList.findIndex(oldCartItem => oldCartItem.id === cartItemID);
  
  if (similarItem >= 0) return similarItem;
  else return undefined;
};



//*************************************************************************************

export function delCartItem(prodItem) {

  const delBtn = prodItem.querySelector('[data-del-id]');
  const delId = delBtn.dataset.delId;
  
  if (!delBtn ) return
  delBtn.addEventListener('click', e => {
    e.preventDefault();
    const cartBody = lS.get('cartObj');
    const cartList = cartBody.cartItems
    const delItemIndex = cartList.findIndex((cartEl) => cartEl.id === delId)
    
    if(delItemIndex < 0 ) return;
    cartList.splice(delItemIndex, 1);
    cartBody.cartItemsTotal = cartList.length;
    lS.set('cartObj',cartBody);
    
    if (cartBody.cartItems.length <= 0) lS.del('cartObj');
    prodItem.remove();
    isCartBtn();
  });
};

function zeroCartItem(prodObj) {
  const cartBody = lS.get('cartObj');
  const cartList = cartBody.cartItems
  const delItemIndex = cartList.findIndex((cartEl) => cartEl.id === prodObj.id);
  
  if (delItemIndex < 0 || prodObj.quant > 0) return;
  
  cartList.splice(delItemIndex, 1);
  cartBody.cartItemsTotal = cartList.length;
  lS.set('cartObj',cartBody);
  if (cartList.length === 0) lS.del('cartObj');
};

export function showCartItem() {
  const [tmplCartItem] = document.getElementsByClassName('js-card-item-template');
  const cart = lS.get('cartObj');

  if (!cart || !tmplCartItem) return;
  const wrapCartItems = tmplCartItem.parentElement;
  const cartItemList = cart.cartItems;
  
  cartItemList.forEach(cartItem => {
    const newItem = tmplCartItem.cloneNode(true);
    const delBtn = newItem.querySelector(`[data-del-id]`);
    
    newItem.classList.remove('js-card-item-template','is-hidden');
    newItem.classList.add('js-product-item')
    
    Object.keys(cartItem).forEach( key => {
      const item = newItem.querySelector(`[data-${key}]`);
      
      switch (key) {
        case 'id':
          delBtn.setAttribute('data-del-id', cartItem[key]);
          newItem.setAttribute('data-id', cartItem[key]);
          break;
        case 'name':
          const nameBody = item.querySelector('.js-product-name');
          
          item.dataset[key] = cartItem[key];
          nameBody.innerHTML = cartItem[key];
          break;
          case 'img':
            item.dataset[key] = cartItem[key]
            const nameImg = newItem.querySelector('.js-product-img');
          
            nameImg.setAttribute('src', cartItem[key]);
          break;
        case 'art':
          const artBody = item.firstChild;
          
          item.dataset[key] = cartItem[key];
          artBody.innerHTML = cartItem[key];
          break;
        case 'gr':
          const grBody = item.querySelector('.js-product-gr');
          
          item.dataset[key] = cartItem[key];
          grBody.innerHTML = cartItem[key];
          break;
        case 'pallet':
          const palletBody = item.lastChild;
          
          item.dataset[key] = cartItem[key];
          palletBody.innerHTML = cartItem[key];
          break;
        case 'quant':
          const countBody = item.firstChild.nextSibling;
          const numBody = countBody.firstChild.nextSibling.nextSibling;

          item.dataset.id = cartItem[key];
          countBody.dataset.num = cartItem[key];
          numBody.innerHTML = cartItem[key];
          break;
        default:
          break;
      };
    });
    delCartItem(newItem);
    wrapCartItems.insertAdjacentElement('beforeend', newItem)
  });
  initCart();
};

function resetProdItem(prodItem, btn) {
  const countBody = prodItem.querySelector('.js-counter');
  const countItems = [...countBody.children];
  const countMinus = countItems[0];
  const countNumEl = countItems[1];
  const dataNumElement = prodItem.querySelector('[data-num]');
  
  countNumEl.innerHTML = 0;
  dataNumElement.dataset.num = 0;
  countMinus.setAttribute('disabled', 'disabled');
  btn.setAttribute('disabled', 'disabled');
};

function createElementCart(prodItem) {
  const dataId = prodItem.dataset.prodId ? prodItem.dataset.prodId : prodItem.dataset.id;
  const dataName = prodItem.querySelector('[data-name]').dataset.name;
  const dataImg = prodItem.querySelector('[data-img]').dataset.img;
  const dataArt = prodItem.querySelector('[data-art]').dataset.art;
  const dataGr = prodItem.querySelector('[data-gr]').dataset.gr;
  const dataPallet = prodItem.querySelector('[data-pallet]').dataset.pallet;
  const dataNum = prodItem.querySelector('[data-num]').dataset.num;
  const newCartItem = {
    'id': dataId,
    'name': dataName,
    'img': dataImg,
    'art': dataArt,
    'gr': dataGr,
    'pallet': dataPallet,
    'quant': dataNum
  };
  
  const isBtn = newCartItem.quant > 0 ? true : false;
  console.log(isBtn);
  isActiveCartBtn(prodItem, isBtn);
  return newCartItem;
};



function setNewCartItem(prodItem) {
  const oldCart = lS.get('cartObj');
  const newCartItem = createElementCart(prodItem);
  let newCartObj = {};
  // isActiveCartBtn(prodItem, false);
  if (!oldCart) {
    newCartObj.cartItems = [newCartItem];
    newCartObj.cartItemsTotal = 1;
    lS.set('cartObj', newCartObj);
  } else {
    const oldCartList = oldCart.cartItems;
    let simItemIndex = isSimilarItem(oldCartList, newCartItem.id);
    
    if (simItemIndex !== undefined) {
      const oldQuantityVal = Number(oldCart.cartItems[simItemIndex].quant);
      const newQuantityVal = Number(newCartItem.quant);
      
      oldCart.cartItems[simItemIndex].quant = newQuantityVal
      oldCart.cartItemsTotal = oldCart.cartItems.length;
      lS.set('cartObj', oldCart);
      // isActiveCartBtn(prodItem, true);
    } else {
      oldCart.cartItems.push(newCartItem);
      oldCart.cartItemsTotal = oldCart.cartItems.length;
      lS.set('cartObj', oldCart);
      // isActiveCartBtn(prodItem, true);
    };
  };
  zeroCartItem(newCartItem);
  isCartBtn();
};

function getItemQuanty(prodItem) {
  const countBody = prodItem.querySelector('.js-counter');
  const oldCart = lS.get('cartObj');
  const prodItemID = prodItem.dataset.prodId ? prodItem.dataset.prodId : prodItem.dataset.id;
  
  if (!countBody || !oldCart) return;
  const countItems = [...countBody.children];
  const countNumEl = countItems[1];
  const cartBtn = countBody.nextElementSibling;
  const oldCartList = oldCart.cartItems
  const simItemIndex = isSimilarItem(oldCartList, prodItemID);
  
  if (simItemIndex === undefined || simItemIndex < 0) return;
  const itemQuanty = oldCart.cartItems[simItemIndex].quant;
  
  countNumEl.innerHTML = itemQuanty;
  if (itemQuanty) isActiveCartBtn(prodItem, true);
}


function changeCartItem(prodItem) {
  setNewCartItem(prodItem);
};


export function initCart() {
  const productList  = [...document.getElementsByClassName('js-product-item')];

  if (!productList) return;
  productList.forEach(prodItem => {
    
    getItemQuanty(prodItem);
    counterHandler(prodItem, changeCartItem);
  });
};