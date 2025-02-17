export const getOmphaleLabel = (value: string | null): string | null => {
  if (!value) return null

  const scenario = value.split('_')[0]
  const decohabitation = value.split('_')[1]
  let formattedScenario = ''
  let formattedDecohabitation = ''
  if (scenario === 'Central') {
    formattedScenario = 'Central'
  }
  if (scenario === 'PB') {
    formattedScenario = 'Décélération'
  }
  if (scenario === 'PH') {
    formattedScenario = 'Accelération'
  }
  if (decohabitation === 'H') {
    formattedDecohabitation = 'Haute'
  }
  if (decohabitation === 'B') {
    formattedDecohabitation = 'Basse'
  }
  if (decohabitation === 'C') {
    formattedDecohabitation = 'Tendanciel'
  }

  return `${formattedScenario} - ${formattedDecohabitation}`
}
