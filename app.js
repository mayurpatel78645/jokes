const request = new XMLHttpRequest();

const header = document.getElementById('anime-name');
const body = document.getElementById('anime-quote');
const subHeader = document.getElementById('anime-character');
const imageDiv = document.getElementById('image');

request.addEventListener('readystatechange', () => {
  if (request.readyState === 4 && request.status === 200) {
    const data = JSON.parse(request.responseText);
    const anime = data.anime;
    const character = data.character;
    const quote = data.quote;
    header.innerHTML = anime;
    body.innerHTML = quote;
    subHeader.innerHTML = character;
  }
});

request.open('GET', 'https://animechan.vercel.app/api/random');
request.send();
