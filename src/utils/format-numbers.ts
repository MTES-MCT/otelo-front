export const formatNumber = (value: number): string => {
  try {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  } catch (error) {
    return `N/C`
  }
}
