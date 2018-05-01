/**
 * using ChildNode.prototype.remove for ie9 and iso safari
 */
(function(arr) {
  arr.forEach(function(item) {
    // eslint-disable-next-line no-prototype-builtins
    if(item.hasOwnProperty('remove')){
      return
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this)
      },
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])
