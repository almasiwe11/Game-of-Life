function calculateLevel(totalExp: number) {
  let xpPerLevel = 500
  let xp = totalExp
  let level = 1
  while (xp >= xpPerLevel) {
    xp -= xpPerLevel
    level++
    xpPerLevel += 200
  }
  return { level, xp, xpPerLevel }
}

export { calculateLevel }
