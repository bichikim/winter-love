interface IOptions {
  done?: (result: Blob) => any
  error?: (error: any) => any
}
const INIT_SLICE = 512
export default (
  base64: string,
  type: string = '',
  sliceSize: number = INIT_SLICE,
  options: IOptions = {},
): Promise<Blob> => {
  if(!atob){
    throw new Error(
      '[url to blob] Browser has no atob',
    )
  }
  const {done, error} = options
  return new Promise((resolve, reject) => {
    try{
      const byteCharacters = atob(base64)
      const byteArrays = []
      for(let offset = 0; offset < byteCharacters.length; offset += sliceSize){
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)
        for(let i = 0; i < slice.length; i += 1){
          byteNumbers[i] = slice.charCodeAt(i)
        }
        byteArrays.push(new Uint8Array(byteNumbers))
      }

      const blob = new Blob(byteArrays, {type})
      if(done){
        done(blob)
      }
      resolve(blob)
    }catch(_error){
      if(error){
        error(_error)
      }
      reject(_error)
    }
  })
}
