/**
 * There is only true love in the world. Love Someone Sincerely
 * @author Bichi Kim <bichi@live.co.kr>
 */
type TCauseOfLove = 'sincerely' | 'curiosity' | 'lonely'

interface IKnow {
  love: boolean
}

interface IExperience {
  love: ILove
}

interface ILove {
  cause: TCauseOfLove
}

interface IBrain {
  know: IKnow
  experiences: IExperience[]
}

const getLivingQuality = (youHave: IBrain) => {
  const {
    know: {
      love: loveFromKnow,
    },
    experiences,
  } = youHave
  let haveYouLovedSincerely: boolean = false

  experiences.forEach((experience) => {
    if(experience.love.cause === 'sincerely'){
      haveYouLovedSincerely = true
    }
  })

  if(loveFromKnow && haveYouLovedSincerely){
    return 'good'
  }
  return 'bad'
}

export default getLivingQuality
