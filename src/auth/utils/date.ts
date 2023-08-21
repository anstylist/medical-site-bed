export function hasTimeExpired(targetDate?: Date | null) {
  if (!targetDate) {
    return true
  }

  const currentDate = new Date()

  targetDate.setMinutes(targetDate.getMinutes() + 5)

  if (currentDate > targetDate) {
    return true
  }

  return false

}