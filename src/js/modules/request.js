export async function requestGlob(url, method, body = null) {
  const respons = await fetch(url, {
    method: method,
    body: body
  });
  
  if (respons.ok) return await respons.json();
};