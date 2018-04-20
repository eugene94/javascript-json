const {IdentityObject} = require('../class/IdentityObject')

const removeFirstAndLast = str => str.slice(1,str.length-1)

const isArrayClosed = str => {
  str.trim()
  return str[0]==='[' && str[str.length-1] ===']'
}

const isObjClosed = str => {
  str = str.trim();
  return str[0]==='{' && str[str.length-1] ==='}'
}

const stringSelector = '\''

const isNullString = str => str ==='null'

const hasStringEdge = str => str[0]===stringSelector || str[str.length-1]===stringSelector

const isClosedOutSide = str=> str[0]===stringSelector && str[str.length-1]===stringSelector


const isClosedInside = (str) => {
  const internalString = removeFirstAndLast(str)
  if(internalString.indexOf(stringSelector) === -1) return new IdentityObject('string', str)
  throw new Error(`invalid String type not closed insied ${str}`)
}

const isBooleanString = str => str === 'false' || str === 'true'

const isUndefinedString = str => str === 'undefined'

const checkClosedString = (str) => {
  if(isClosedOutSide(str)) return isClosedInside(str)
  throw new Error(`invalid String type not closed outside' ${str}`)
}


const MakeIdObjPrimitiveType = str => {
  if(hasStringEdge(str)) return checkClosedString(str)
  if(!isNaN(str)) return new IdentityObject('number', str)
  if(isBooleanString(str)) return new IdentityObject('boolean', str)
  if(isNullString(str)) return new IdentityObject('null', str)
  if(isUndefinedString(str)) return new IdentityObject('undefined', str) 
  throw new Error(`${str} 는 알 수 없는 타입입니다`) 
}


module.exports = Object.freeze({
    isArrayClosed,
    isObjClosed,
    MakeIdObjPrimitiveType,
  });