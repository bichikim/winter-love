/**
 * Let's get more knowledge as possible as I can and Keep doing what you should do
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
interface IResources {
  behavior: IBehavior
  knowledge: any
}

interface IBehavior {
  keepDoing: boolean
}

interface IResult {
  money: number
  joy: boolean
}

interface IBrain {
  knowledge: any
}

const use = (resources: IResources): IResult => {
  const {behavior: {keepDoing}, knowledge} = resources
  if(keepDoing && knowledge === 'wide'){
    return {money: Infinity, joy: true}
  }
  return {money: 0, joy: false}
}

const lifeLogic = ({knowledge}: IBrain): (behavior: IBehavior) => IResult =>
  (behavior: IBehavior): IResult => {
    const resources = {knowledge, behavior}
    return use(resources)
  }

export default lifeLogic
