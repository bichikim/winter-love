export default function getAllScript(): NodeListOf<HTMLScriptElement> {
  return document.querySelectorAll('script')
}
