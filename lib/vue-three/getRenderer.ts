import Three from 'three'
const able = () => {
  try{
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')),
    )
  }catch(e){
    return false
  }
}

export default (options) => {
  if(able()){
    return new Three.WebGLRenderer(options)
  }
  return new Three.CanvasRenderer(options)
}
