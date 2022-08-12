export function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 *
 * @param {() => boolean} _callback 다음을 진행시킬지를 결정하는 true | false를 반환하는 함수 인자
 * @param {number} interverTime 인터벌 시간을 결정하는 Number 인자
 */
export function requestIntervalAnimationFrame(_callback, interverTime) {
  let lastTimestemp = new Date().getTime();

  const callback = () => {
    const currentTimestemp = new Date().getTime();
    if (currentTimestemp - lastTimestemp < interverTime) {
      requestAnimationFrame(callback);
    } else {
      lastTimestemp = currentTimestemp;
      const next = _callback();

      if (next) requestAnimationFrame(callback);
    }
  };

  requestAnimationFrame(callback);
}
