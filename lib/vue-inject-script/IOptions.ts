/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 */
export default interface IOptions {
  prototypeName?: string
  name?: string
  src?: string | string[]
  isRunScriptWithSrc?: boolean
  loaded?: (src: string) => void
}
