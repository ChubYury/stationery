function multitabHandle(tabBtn) {
  const dataTab = tabBtn.dataset.multiTab;
  const contentTabList = [...document.getElementsByClassName('js-tabs-content')];

  if (!contentTabList) return;
  const contentTabBox  = contentTabList.find(item => item.dataset.tabContent === dataTab);

  if (!contentTabBox) return;
  const contentTabItems = [...contentTabBox.children];
  const idContentItem = tabBtn.dataset.id;
  const tabContent = contentTabItems[Number(idContentItem)];
  
  contentTabItems.forEach(contentItem => contentItem.classList.remove('is-active'))
  tabContent.classList.add('is-active');
};

function startMultiTab(prodTabBtns) {
  const contentTabList = [...document.getElementsByClassName('js-tabs-content')];
  
  prodTabBtns.forEach(tabBtn => {
    const dataBtn = tabBtn.dataset.multiTab;

    if (!dataBtn) return;
    const contentTabBox  = contentTabList.find(item => item.dataset.tabContent === dataBtn);
    const contentTabItems = [...contentTabBox.children]
    const firstTabBtn = prodTabBtns[0];
    const firstTabContent = contentTabItems[0];
    
    firstTabBtn.classList.add('is-active');
    firstTabContent.classList.add('is-active');
  });


}

function isActiveBtn(activeBtn, btnList) {
  btnList.forEach(btn => btn.classList.remove('is-active'));

  activeBtn.classList.add('is-active');
};

export function initTabs() {
  const prodTabBtns = [...document.getElementsByClassName('js-btn-tab')];

  if (!prodTabBtns) return;
  startMultiTab(prodTabBtns)
  prodTabBtns.forEach(tabBtn => {
    tabBtn.addEventListener('click', e => {
      e.preventDefault();

      isActiveBtn(tabBtn, prodTabBtns);
      multitabHandle(tabBtn);
    })
  });
};