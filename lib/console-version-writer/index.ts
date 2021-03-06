import bowser from 'bowser'
const {
  msie = false,
  msedge = false,
  firefox = false,
  mobile = false,
} = bowser
const consoleNameStyle = [
  'color: white',
  'background: linear-gradient(#696969, #070707)',
  'border-radius: 3px 0 0 3px',
  'text-align: center',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset,' +
  '0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
  'padding: 2px 3px 2px 10px',
  'margin: 0;',
].join(';')
const consoleVersionStyle = (options: ICVWOptions = {}): string => {
  const {color: [color1, color2] = ['#8BC34A', '#2E7C32']} = options
  return [
    'color: white',
    `background: linear-gradient(${color1}, ${color2})`,
    msedge ? 'border-radius: 3px' : 'border-radius: 0 3px 3px 0',
    'text-align: center',
    'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
    'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset,' +
    '0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
    'padding: 4px 10px 2px 8px',
    firefox? 'margin-left: -7px;' : '',
  ].join(';')
}

interface ICVWOptions {
  version?: string
  name?: string
  nameStyle?: string[]
  versionStyle?: string[]
  color?: string[]
}
export default (options: ICVWOptions = {}) => {
  const {
    version = 'unknown',
    name = '🍰 Version ',
    nameStyle = consoleNameStyle,
    versionStyle = consoleVersionStyle(options),
  } = options
  if(mobile){return}
  if(msie || msedge){
    console.log(name + version)
  }else{
    console.log('%c' + name + '%c' + version, nameStyle, versionStyle)
  }
}
