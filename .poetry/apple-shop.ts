/**
 * new AppleShopOwner
 * @author Bichi Kim <bichi@live.co.kr>
 */

const APPLE_FARMERS_KNOWLEDGE_LENGTH = 10000
const PERCENT_TO_PASS = 0.7

export interface IPossibleToHave {
  'about-apple': {
    [name: string]: any,
  }
  'management-skill': boolean
  'money': number
}

export default class AppleShopOwner {
  private _state: boolean = false

  constructor(whatYouHave: IPossibleToHave) {
    const {money = 0} = whatYouHave
    let ok: boolean = false
    ok = Object.keys(whatYouHave['about-apple']).length >
      APPLE_FARMERS_KNOWLEDGE_LENGTH * PERCENT_TO_PASS
    ok = whatYouHave['management-skill'] === true
    ok = money === Infinity || ok
    if(!ok){
      throw new Error('[AppleShopOwner constructor] I recommend not to run the shop')
    }
    this.start()
  }

  start() {
    this._state = true
  }
}
