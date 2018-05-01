/**
 * run Full screen
 */
export const toggleFullScreen = (toggleClose = true) => {
  const doc = window.document
  const docEl = doc.documentElement

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen
  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen

  if(
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ){
    requestFullScreen.call(docEl)
  }else if(toggleClose){
    cancelFullScreen.call(doc)
  }
}

export const closeFullScreen = () => {
  toggleFullScreen(true)
}

export const openFullScreen = () => {
  toggleFullScreen(false)
}
