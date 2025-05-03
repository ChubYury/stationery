import { requestGlob } from "./request.js";
import { openModalInJs } from "./initFancybox.js";
import { lS } from './localStorage.js'
function ruleHandler(activeInp, rule) {
  const dataRules = {
    name: /^.*\w/g,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/g,
    password: /^(?=.{8,})(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g
  };
  
  return dataRules[rule].test(activeInp.value);
}

function errorChange(activeInp, isValid) {
  if (!isValid) activeInp.classList.add('not-valid');
  else activeInp.classList.remove('not-valid');
};

//------------------------------------------------------------------------------------------------

function grecaptchaHandler(form) {
  const [recBody] = form.getElementsByClassName('js-recaptcha');
  const recBodyId = Number(recBody.dataset.tabindex);
  const isGrecaptcha = grecaptcha.getResponse(recBodyId);
  
  if(isGrecaptcha.length == 0) return false
  else return true;
};

function grecaptchaReset(form) {
  const [recBody] = form.getElementsByClassName('js-recaptcha');
  const recBodyId = Number(recBody.dataset.tabindex);
  
  if (!recBody) return;
  grecaptcha.reset(recBodyId); 
};

//------------------------------------------------------------------------------------------------

function inpHandler(activeInp) {
  const dataRules = activeInp.dataset.req;
  const valueInp = String(activeInp.value);

  switch (dataRules) {
    case 'name':
      if (valueInp === '') errorChange(activeInp, 0);
      else errorChange(activeInp, 1);
      break;
    case 'email':
      if (!valueInp) errorChange(activeInp, 0);
      else errorChange(activeInp, ruleHandler(activeInp, dataRules));
      break;
    case 'password':
      if (!valueInp) errorChange(activeInp, 0);
      else errorChange(activeInp, ruleHandler(activeInp, dataRules));
      break;
    default:
      break;
  }
};

//**************************************************************************

function disabledEl(form) {
  const disElList = form.querySelectorAll("input, button");

  disElList.forEach(disEl => disEl.setAttribute("disabled", "disabled"));
}

function unDisabledEl(form) {
  const disElList = form.querySelectorAll('input, button');

  disElList.forEach(disEl => disEl.removeAttribute("disabled", "disabled"));
}

//**************************************************************************

function setMailTable() {
  const cartBody = lS.get('cartObj')
  const cartItemList = cartBody.cartItems;

  if (!cartBody && !cartItemList) return undefined;
  let tmpHeadTable = `<table>
  <thead style="background: #2C79D3">
    <tr>
      <th style="padding: 15px; font-size: 16px"> <span style="color: white"> Name </span> </th>
      <th style="padding: 15px; font-size: 16px"> <span style="color: white"> Art. </span> </th>
      <th style="padding: 15px; font-size: 16px"> <span style="color: white"> Gr. </span> </th>
      <th style="padding: 15px; font-size: 16px"> <span style="color: white"> Pcs/Pallet </span> </th>
      <th style="padding: 15px; font-size: 16px"> <span style="color: white"> Quant </span> </th>
    </tr>
  </thead>
  <tbody>`;
  const tmpFooterTable = `</tbody>
  </table>`;
                      
  cartItemList.forEach(cartItem => {
    const tmpStrTable = `<tr>
      <td style="padding: 15px; font-size: 16px; text-align: center"> <span> ${cartItem.name} </span> </td>
      <td style="padding: 15px; font-size: 16px; text-align: center"> <span> ${cartItem.art} </span> </td>
      <td style="padding: 15px; font-size: 16px; text-align: center"> <span> ${cartItem.gr} </span> </td>
      <td style="padding: 15px; font-size: 16px; text-align: center"> <span> ${cartItem.pallet} </span> </td>
      <td style="padding: 15px; font-size: 16px; text-align: center"> <span> ${cartItem.quant} </span> </td>
    </tr>`;
    tmpHeadTable = tmpHeadTable + tmpStrTable;
  });
  tmpHeadTable = tmpHeadTable + tmpFooterTable;
  return tmpHeadTable;
};


//**************************************************************************

function submitHandler(form) {
  const dataReqList = form.querySelectorAll("[data-req]");
  
  let isValidForm = 0;
  dataReqList.forEach(dataReqItem => {
    const dataRules = dataReqItem.dataset.req;
    const valueInp = String(dataReqItem.value);
    
    if (!valueInp) {
      errorChange(dataReqItem, 0);
      isValidForm = isValidForm + 1;
    } else if (!ruleHandler(dataReqItem, dataRules)) {
      errorChange(dataReqItem, ruleHandler(dataReqItem, dataRules));
      isValidForm = isValidForm + 1;
    } else {
      errorChange(dataReqItem, ruleHandler(dataReqItem, dataRules));
    };    
  });
  
  if (isValidForm <= 0) {
    const url = form.action;
    const method = form.method;
    const isCart = setMailTable();
    const idForm = form.getAttribute("id");
    const body = new FormData(form);
    const isOrderForm = idForm === 'order-form' ? true : false;
    
    if (isCart && isOrderForm) {
      const bodyTable = setMailTable();

      body.append('table', bodyTable)
      /*
       * view fields FormData
       *
       *  for (var pair of body.entries()) {
       *    console.log(pair[0]+ ', ' + pair[1]); 
       *  };
       */
    };
    
    if (!grecaptchaHandler(form)) return;
    
    disabledEl(form);
    requestGlob(url, method, body)
    .then(data => {
      
      if (isCart && isOrderForm){
        openModalInJs('modal-send-cart');
        setTimeout(() => {
          lS.del('cartObj');
          location.replace('/')
        }, 4000);

      };
      
      form.reset();
      grecaptchaReset(form);
      unDisabledEl(form);
    });
    isValidForm = 0;
  } else return;
};



export function initFormHandler() {
  const formList = [...document.getElementsByClassName('js-form')];
  
  if (!formList) return; 
  formList.forEach(form => {
    const dataReqList = form.querySelectorAll("[data-req]");
    dataReqList.forEach(validInpItem => {
      validInpItem.addEventListener('blur', e => {
        e.preventDefault();
        inpHandler(validInpItem);
      });
    });
  });

  formList.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      submitHandler(form);
    });
  });
};