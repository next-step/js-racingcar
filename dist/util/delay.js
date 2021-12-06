export const promiseDelay = (delay = 0) => {
    let st = null;
    return new Promise(resolve => {
        const step = timestamp => {
            if (!st)
                st = timestamp;
            if (timestamp - st < delay) {
                window.requestAnimationFrame(step);
            }
            else {
                resolve(true);
            }
        };
        window.requestAnimationFrame(step);
    });
};
export const abortableDelay = () => {
    const abortController = new AbortController();
    let frameId;
    return {
        setDelay(cb, delay = 0) {
            let st = null;
            return new Promise(resolve => {
                const step = timestamp => {
                    if (!st)
                        st = timestamp;
                    if (timestamp - st < delay) {
                        frameId = window.requestAnimationFrame(step);
                    }
                    else {
                        resolve(cb());
                    }
                };
                frameId = window.requestAnimationFrame(step);
                abortController.signal.addEventListener('abort', () => {
                    window.cancelAnimationFrame(frameId);
                });
            });
        },
        abortDelay: () => abortController.abort(),
    };
};
export default promiseDelay;
//# sourceMappingURL=delay.js.map