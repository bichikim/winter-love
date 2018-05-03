export const isSupportWebworker = () => {
  return Boolean(window.Worker)
}
