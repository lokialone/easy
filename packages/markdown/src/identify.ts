const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;

// #
const isHashbang = (character: string) : boolean => character === '#';
const isSquareBraceLeft = (character: string) : boolean => character === '[';
const isSquareBraceRight = (character: string) : boolean => character === ']';
const isSquareBrace = (character: string) : boolean => isSquareBraceLeft(character) || isSquareBraceRight(character);
const isBraceLeft = (character: string) : boolean => character === '(';
const isBraceRight = (character: string) : boolean => character === ')';
const isBrace = (character: string) : boolean => isBraceLeft(character) || isBraceRight(character);
const isWhitespace = (character: string) : boolean => WHITESPACE.test(character);
const isNumber = (character: string) : boolean => NUMBER.test(character);
// TODO
// is code start ```
//  is -
export default {
    isHashbang,
    isSquareBrace,
    isSquareBraceLeft,
    isSquareBraceRight,
    isBrace,
    isBraceLeft,
    isBraceRight,
    isWhitespace,
    isNumber
}
