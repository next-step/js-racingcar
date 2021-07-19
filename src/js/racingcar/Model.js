import Model from "../core/Model.js"


export default class RacingModel extends Model{
    constructor() {
        super()
        this.state = {
            cars :{ value: undefined, disabled: false ,hidden:false},
            rounds: { value: undefined, disabled: false :hidden:true},
            gameFootprints: {gameMatrix:[], footprints: [], candidates: [], round: 0, hidden: true },
            gameResults:{winners:'', hidden:true}
        }
    }
    /**
     * @param value typeof string|undefined
     * @param disabled typeof boolean
     * @param hideen typeof boolean
    */
    setCars = (cars) => {
        this.state = {...this.state, cars}
    }
     /**
     * @param value typeof number|undefined
     * @param disabled typeof boolean
     * @param hideen typeof boolean
    */
    rounds = (rounds) => {
        this.state = {...this.state, cars}
    }
      /**
     * @param gameMatrix typeof number[][]
     * @param footprints typeof string[]
     * @param candidates typeof string[]
     * @param round typeof number
     * @param hideen typeof boolean
    */
    gameFootprints = (gameFootprints) => {
        this.state = {...this.state, cars}
    }
     /**
     * @param winner typeof string
     * @param hideen typeof boolean
    */
    gameResults = (gameResults) => {
        this.state = {...this.state, cars}
    }

}