export default (app) => new Proxy({
        carList : [],
        step : 0,
        repeatCnt : 0
    }, {
        get(target, prop) {
            return prop in target ? target[prop] : new Error(`${prop} 프로퍼티가 존재하지 않습니다.`);
        },
        set(target, prop, value) {
            if(prop === 'carList' && Array.isArray(value)) {
                target['carList'] = value;
                return true;
            } else if(prop === 'step') {
                if(target['step'] === 3) {
                    target['step'] = 0;
                    target['carList'] = [];
                    target['repeatCnt'] = 0;
                } else {
                    target['step'] = target['step'] + 1;
                }
                value();
                return true;
            } else if(prop === 'repeatCnt') {
                target['repeatCnt'] = +value;
                return true;
            }
            return false;
        }

    });