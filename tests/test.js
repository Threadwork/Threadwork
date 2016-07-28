const threadMethod = (event) => {
  /* Do something... e.g. calc pi. */
  let Pi = 0;
  let n = 1;
  for (let i = 0; i <= event.data.iters; i++) {
    Pi += (1 / n) - (1 / (n + 2));
    n += 4;
    postMessage(4 * Pi);
  }
}

const args = {
  iters: 1000
};

new Thread(args, threadMethod, event => {
  document.getElementById('result').innerHTML += `<div>${JSON.stringify(event)}</div>`;
});
