/* 
 * This part answering for URL and filter saveting
 */

function createFilterURL(filterList, filterNumbers) {
  let filterURL = '';
  let strFilter = '';
  
  if (filterList.length === 0) filterURL = 'http://localhost:3000';
  else {
    filterList.forEach(filterItem => {
      const foundObj = filterNumbers.find(item => item.name === filterItem);
      strFilter === '' ? strFilter = foundObj.number : strFilter = strFilter + '-' + foundObj.number;
    });

    filterURL = '?filter=' + strFilter;
  };
  
  history.pushState('null', document.title, filterURL);
};

//*********** */

function getFilterURL() {
  const filterURL = window.location.search;

  if (!filterURL) return []; 
  const delimetrIndex = filterURL.indexOf('=');
  const filterValStr = filterURL.slice(delimetrIndex+1); 
  const filterValArr = filterValStr.split('-');
  
  return filterValArr;
};

function getFilterValList(numUrlArr, filterNumbers) {
  let filterValList = [];
  
  numUrlArr.forEach(numEl => {
    const foudEl = filterNumbers.find(item => item.number === numEl);
    if (!foudEl) filterValList = ['all']
    else filterValList.splice(0, 0, foudEl.name)
  });

  return filterValList;
};

//*********** */

function isActiveCatalogItem(filterValArr, filterCatList) {

  filterCatList.forEach(filterItem => {
    const catalogData = filterItem.dataset.filter;
    const foudEl = filterValArr.find(item => item === catalogData);

    if (filterValArr.length === 0 && catalogData === 'all') filterItem.classList.add('is-active');
    else if (foudEl) filterItem.classList.add('is-active');
  });
}

/* 
 * This part answering for interaction
 */

function showCards(filterValArr, filterItemList) {
  filterItemList.forEach(filterItem => {
    const categoryVal = filterItem.dataset.category;
    const index = filterValArr.indexOf(categoryVal);
    
    if (filterValArr.length === 0) filterItem.classList.remove('is-hidden');
    else if (index > -1) filterItem.classList.remove('is-hidden');
    else  filterItem.classList.add('is-hidden');
  });
};

//*********** */

function hiddenProdItem(prodItemList) {
  prodItemList.forEach(prodItem => {
    const isAttribute = prodItem.hasAttribute('href');

    if (isAttribute) prodItem.classList.add('is-hidden');
  });
};

//*********** */

function checkCatalogItem(catalogItem, filterCatList) {
  const catalogData = catalogItem.dataset.filter;
  
  filterCatList.forEach(filterCatItem => filterCatItem.classList.remove('is-active'));
  catalogItem.classList.toggle('is-active')
  if (catalogData === 'all') return [];
  else return [catalogData];
};

/* 
 * This start filter
 */

export function initFilter() {
  const filterNumbers = [
    { name: 'cottonProducts',
      number: '81108'
    },
    { name: 'dressingProducts',
      number: '12499'
    },
    { name: 'foodSupplement',
      number: '35570'
    },
    { name: 'other',
      number: '81231'
    }
  ];
  const [filterCatBox] = document.getElementsByClassName('js-cat-filter');
  const [filterBox] = document.getElementsByClassName('js-filter-box');
  
  if (!filterCatBox) return;
  else if (!filterBox) return;
  const filterCatList = [...filterCatBox.children,...filterBox.querySelectorAll("[data-filter]")];
  const filterItemList = [...filterBox.children];
  
  let filterValArr = [];
  hiddenProdItem(filterItemList)
  
  if (getFilterURL()) {
    const filterNbrList = getFilterURL();
    filterValArr = getFilterValList(filterNbrList, filterNumbers);

    isActiveCatalogItem(filterValArr, filterCatList);
    showCards(filterValArr, filterItemList);
  };

  filterCatList.forEach(filterCartItem => {
    filterCartItem.addEventListener('click', () => {
      const filterValArr = checkCatalogItem(filterCartItem, filterCatList);
      
      showCards(filterValArr, filterItemList);
      createFilterURL(filterValArr, filterNumbers);
    });
  });
};