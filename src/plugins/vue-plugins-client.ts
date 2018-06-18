import cvs from '~/console-version-writer'

export default ({env}: any) => {
  if(env && env.version){
    cvs({version: env.version})
  }
}
