export const Store = function() {
    const self = this;
    return new Proxy({
        carList : [],
        step : 0,
        repeatCnt : 0
    }, {
        get(target, prop) {
            if(prop in target) {
                return target[prop];
            }
        },
        set(target, prop, value) {
            if(prop === 'carList' && Array.isArray(value)) {
                target['carList'] = value;
                return true;
            } else if(prop === 'step') {
                if(value === 0) {
                    self.carInput.component.style.display = "";
                    self.repeatInput.component.style.display = "none";
                    self.racing.component.style.display = "none";
                    self.result.component.style.display = "none";
                    self.carInput.init();
                } else if(value === 1) {
                    self.carInput.component.style.display = "";
                    self.repeatInput.component.style.display = "";
                    self.racing.component.style.display = "none";
                    self.result.component.style.display = "none";
                    self.repeatInput.init();
                } else if (value === 2) {
                    self.carInput.component.style.display = "";
                    self.repeatInput.component.style.display = "";
                    self.racing.component.style.display = "";
                    self.result.component.style.display = "none";
                    self.raceStart();
                } else if (value === 3) {
                    self.carInput.component.style.display = "";
                    self.repeatInput.component.style.display = "";
                    self.racing.component.style.display = "";
                    self.result.component.style.display = "";
                }
                return true;
            } else if(prop === 'repeatCnt') {
                target['repeatCnt'] = +value;
                return true;
            }
            return false;
        }

    });
};