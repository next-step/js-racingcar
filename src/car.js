class Car {
    #name = "";
    #location = 0;

    constructor(name){
        this.name = name;
    }

    move(){
        this.#location = this.#location + 1;
    }
}