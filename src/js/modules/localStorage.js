
function set(nameObj, newObj) {
  const bodyCookies = JSON.stringify(newObj)
  
  localStorage[nameObj] = bodyCookies;
};

function get(nameObj) {
  const strJson = localStorage[nameObj];
  if (!strJson) return undefined
  else return JSON.parse(strJson);
};

function del(nameObj) {localStorage.removeItem(nameObj);};

export const lS = {set, get, del}