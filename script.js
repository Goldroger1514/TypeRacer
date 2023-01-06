const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
console.log(RANDOM_QUOTE_API_URL);
let text = document.querySelector('.text');
let input = document.querySelector('#input');
let time = document.querySelector('.time');
let interval;
//fetch data
function fetchData() {
  fetch(RANDOM_QUOTE_API_URL).then(
    (response) => {
      let promise = response.json();
      return promise;
    }
  ).then(
    (data) => {
      showText(data.content);
      input.addEventListener('input', onTyping);
      input.onpaste = function () {
        return false;
      }
      counter(100);
    }
  )
}
fetchData();
//show data
function showText(data) {
  for (let i = 0; i < data.length; i++){
    let span = document.createElement('span');
    span.textContent = data[i];
    text.append(span);
  }
}
function onTyping() {
  let spans = document.querySelectorAll('.text span');
  // for (let i = 0; i < input.value.length; i++){
  //   spans.forEach((ele, index) => {
  //     if (i == index)
  //       if (ele.textContent == input.value[i])
  //         ele.classList = 'true';
  //       else
  //         ele.classList = 'false';
  //   })
  // }
  input.value.split("").forEach((ele, index) => {
    spans.forEach((ele) => {
      ele.classList.remove('on');
    })
    spans[index].classList.add('on');
    if (ele == spans[index].textContent) {
      spans[index].classList.add('true');
      spans[index].classList.remove('false');
    }
    else
    {
      if (spans[index].textContent == ' ')
      {
        spans[index].textContent = '_';
        console.log(spans[index].textContent);
      }
      spans[index].classList.add('false');
      spans[index].classList.remove('true');
    }
  })
  for (let i = input.value.length; i < spans.length; i++)
  {
    spans[i].classList = '';
      if (spans[i].textContent == '_')
        spans[i].textContent = ' ';
    }
  if (input.value.length == spans.length) {
    input.blur();
    text.innerHTML = '';
    input.value = '';
    clearInterval(interval);
    fetchData();
    input.focus();
  }
}
//counter
function counter(duration) {
  interval = setInterval(() => {
  let min = parseInt(duration / 60);
  let sec = duration % 60;
  let minutes = min < 10 ? `0${min}` : min;
  let seconds = sec < 10 ? `0${sec}` : sec;
    if(duration>=0)
    {
      time.innerHTML = `${minutes}:${seconds}`;
      duration--;
    }
    else {
      clearInterval(interval);
      text.innerHTML = '';
      input.value = '';
      input.blur();
      fetchData();
      input.focus();
    }
  },1000)
}