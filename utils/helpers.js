export function remCalc(value, baseValue = 16) {
  return `${value / baseValue}rem`
}

export function clampCalc(value, baseValue = 16) {
  return `clamp(${value}px, ${value / baseValue}vw, ${value * 1.2}px)`
}

export const flatListToHierarchical = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'childItems' } = {},
) => {
  const tree = []
  const childrenOf = {}
  data.forEach((item) => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

export const findByProperty = (obj, predicate) => {
  if (predicate(obj)) return obj
  for (const n of Object.values(obj)
    .filter(Boolean)
    .filter((v) => typeof v === 'object')) {
    let found = findByProperty(n, predicate)
    if (found) return found
  }
}

export const stringToBoolean = (val) => val === 'true' || val === 'True'
