import cvs from '~/console-version-writer'

export default ({env}) => {
  console.log(env)
  cvs()
}
