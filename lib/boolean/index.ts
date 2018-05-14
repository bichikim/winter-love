export default function boolean(data) {
  switch(data){
    case 'false':
      return false
    default:
      return Boolean(data)
  }
}
