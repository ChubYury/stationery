import * as flsFunctions from "./modules/webpTest.js";
import { initFancybox } from "./modules/initFancybox.js";
import { 
  showMenu,
  hiddenMenu,
  showPassword,
  scrolTop,
  isCartBtn,
  toggleQMessage } from "./modules/buttons.js";
import { initHeadMenu } from "./modules/headMenuHandler.js";
import { initCart,
         showCartItem } from "./modules/cartHandler.js"
import { initFilter } from "./modules/filter.js";
import { initTabs } from "./modules/tabs.js";
import { initFormHandler } from "./modules/formHandler.js";

document.addEventListener('DOMContentLoaded', () => {
  flsFunctions.isWebp();
  initFancybox();
  
  //--- My modules ------
  // showMenu();
  // hiddenMenu();
  initHeadMenu();
  showPassword();
  scrolTop();
  isCartBtn();
  toggleQMessage();
  initFilter();
  initTabs();
  initCart();
  showCartItem();
  initFormHandler();
})
