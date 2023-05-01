const fetchUrl = (url: number) => {
  console.log("fetching " + url);
};

export function debounce(callback: (url: number) => void, time: number) {
  const deleyTime = time;

  return (args: number) => {
    let timerDebounce = setTimeout(() => {
      callback(args);
    }, deleyTime);

    if (args < 5) {
      clearTimeout(timerDebounce);
    }
  };
}

const fetching = debounce(fetchUrl, 300);

fetching(1);
fetching(2);
fetching(3);
fetching(4);
fetching(5);
