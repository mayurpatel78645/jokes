const request = new XMLHttpRequest();

const joke = document.querySelector('.joke');

function getData(endpoint, callback) {
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      console.log(data);
      callback(undefined, data);
    }
    if (request.readyState === 4 && request.status !== 200) return callback(request.status, undefined);
  });
  request.open('GET', endpoint);
  request.send();
}

function getWarning(data) {
  let str = '';
  for (let key in data.flags) {
    if (data.flags[key]) {
      str += `${key}, `;
    }
  }
  return str;
}

function render(data) {
  joke.insertAdjacentHTML('beforeend',
    `
    <div class="joke">${data.setup}</div>
    <br>
    <div class="joke">${data.delivery}</div>
    `
  );
}

function getAnswer(data) {
  const answer =  confirm(`This joke is ${getWarning(data) === "" ? 'might be offensive' : getWarning(data)} PROCEED ?`);
  return answer;
}

getData('https://v2.jokeapi.dev/joke/Programming,Dark', (err, data) => {
  if (err) return `status: ${err}`;
  if (!data.safe) {
    const answer = getAnswer(data);
    if (!answer) return;
  }
  if (data.type === "single") {
    joke.innerHTML = data.joke;
  }else if (data.type === "twopart") {
    render(data);
  }
});