import { Fancybox } from "@fancyapps/ui";

//*** Modal module ***

function showForm() {
  const openLogBtns = [...document.getElementsByClassName('js-open-form')];
  
  if (!openLogBtns) return;
  openLogBtns.forEach(openLogBtn => {
    openLogBtn.addEventListener('click', e => {
      e.preventDefault();
      const openContentId = openLogBtn.dataset.open;
      
      Fancybox.show([{ src: `#${openContentId}`, type: "inline" }]);
    });
  });
};

export function openModalInJs(openContentId) {
  Fancybox.show([{ src: `#${openContentId}`, type: "inline" }]);
}

export function initFancybox() {
  
  //*** Initial options ***
  const options = {
    // Navigation: {
      
    //   prevTpl:
    //     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
    //   nextTpl:
    //     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
    // },
    compact: false,
    idle: false,
    animated: false,
    showClass: false,
    hideClass: false,
    dragToClose: false,
    contentClick: false,
    Images: {
      // Disable animation from/to thumbnail on start/close
      zoom: false,
    },
    Toolbar: true,
    Thumbs: false
  };
  
  // Initial gallery
  Fancybox.bind('[data-fancybox="gallery"]', options);
  // initModal();
  showForm()
};

//******************************************************************************

// export function showLoginForm() {
//   const openLogBtns = [...document.getElementsByClassName('js-open-form')];
  
//   if (!openLogBtns) return;
//   openLogBtns.forEach(openLogBtn => {
//     openLogBtn.addEventListener('click', e => {
//       e.preventDefault();
//       const openContentId = openLogBtn.dataset.open;
      
//       Fancybox.show([{ src: `#${openContentId}`, type: "inline" }]);
//     });
//   });
// }

//******************************************************************************
