export default function findAttribute(
  name: string,
  value: string,
  nodeList?: NodeListOf<HTMLElement>,
): Element | undefined {
  if(!nodeList){return}
  const {length} = nodeList
  if(!nodeList.item) return
  for(let i = 0; i < length; i += 1){
    const node = nodeList.item(i)
    if(node.getAttribute && node.getAttribute(name) === value){
      return node
    }
  }
}
