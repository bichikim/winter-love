import cvs from '~/console-version-writer'

export default ({env}) => {
  if(env && env.version){
    cvs({version: env.version})
  }
}
