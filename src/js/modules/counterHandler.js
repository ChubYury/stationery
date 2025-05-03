function isActiveCartBtn(btn, isActive) { 
  if (!btn) return
  isActive ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', 'disabled');
};

function setDataAttr(prodItem, dataNum) {
  const dataNumElement = prodItem.querySelector('[data-num]');

  dataNumElement.dataset.num = dataNum;
};

function minusNumber(countItems) {
  const countMinus = countItems[0];
  const countNumEl = countItems[1];
  let countNumData = Number(countNumEl.innerHTML);

  countNumData = Number(countNumEl.innerHTML);
  countNumData = countNumData - 1;
  
  if (countNumData <= 0) {
    countNumData = 0;
    countNumEl.innerHTML = 0;
    countMinus.setAttribute('disabled', 'disabled');
  } else { countNumEl.innerHTML = countNumData };
  return countNumData;
};

function plusNumber(countItems) {
  const countMinus = countItems[0];
  const countNumEl = countItems[1];
  let countNumData = Number(countNumEl.innerHTML);

  countNumData = Number(countNumEl.innerHTML)
  countNumData = countNumData + 1;
  countNumEl.innerHTML = countNumData;
  countMinus.removeAttribute('disabled');
  return countNumData
};

export function counterHandler(prodItem, setCart) {
  const countBody = prodItem.querySelector('.js-counter');
  
  if (!countBody) return;
  const countItems = [...countBody.children];
  const countMinus = countItems[0];
  const countNumEl = countItems[1];
  const countPlus = countItems[2];
  let countNumData = Number(countNumEl.innerHTML);
  const cartBtn = countBody.nextElementSibling;
  

  if (countNumData > 0) countMinus.removeAttribute('disabled');
  countMinus.addEventListener('click', () => {
    countNumData = minusNumber(countItems);
    isActiveCartBtn(cartBtn, countNumData);
    setDataAttr(prodItem, countNumData);
    setCart(prodItem)
  });
  
  countPlus.addEventListener('click', () => {
    countNumData = plusNumber(countItems);
    setDataAttr(prodItem, countNumData);
    isActiveCartBtn(cartBtn, true);
    setCart(prodItem)
  });
};
