const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;
// #
const isHashbang = (character: string) : boolean => character === '#';
const isOpeningSquareBrace = (character: string) : boolean => character === '[';
const isClosingSquareBrace = (character: string) : boolean => character === ']';
const isSquareBrace = (character: string) : boolean => isOpeningSquareBrace(character) || isClosingSquareBrace(character);
const isWhitespace = (character: string) : boolean => WHITESPACE.test(character);
const isNumber = (character: string) : boolean => NUMBER.test(character);
const isDot = (character: string) : boolean => character === '.';
const isDash =  (character: string) : boolean => character === '-';
const isOpeningParenthesis = (character: string) : boolean => character === '(';

const isClosingParenthesis = (character: string) : boolean => character === ')';
const isAsterisk =  (character: string) : boolean => character === '*';
const isParenthesis = (character: string) : boolean =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);
const isGreater = (character:string): boolean => character === '>';
const isTick = (character:string): boolean => character === '`';
const isExclamation = (character:string): boolean => character === '!';
// TODO
// is code start ```
//  is -
const isHeader = (str:string): boolean => /^#+\s/.test(str);
const isUlList =(str:string): boolean => str.startsWith('- ');
const isOlList =(str:string): boolean => /^([0-9]+\.\s)/.test(str);

export default {
    isHashbang,
    isSquareBrace,
    isOpeningSquareBrace,
    isClosingSquareBrace,
    isOpeningParenthesis,
    isClosingParenthesis,
    isParenthesis,
    isWhitespace,
    isNumber,
    isDot,
    isHeader,
    isUlList,
    isOlList,
    isDash,
    isAsterisk,
    isGreater,
    isTick,
    isExclamation
}
