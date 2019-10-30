const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;

const isHashbang = (character: string) : boolean => character === '#';
const isOpeningSquareBrace = (character: string) : boolean => character === '[';
const isClosingSquareBrace = (character: string) : boolean => character === ']';
const isWhitespace = (character: string) : boolean => WHITESPACE.test(character);
const isNumber = (character: string) : boolean => NUMBER.test(character);
const isDot = (character: string) : boolean => character === '.';
const isDash =  (character: string) : boolean => character === '-';
const isOpeningParenthesis = (character: string) : boolean => character === '(';
const isClosingParenthesis = (character: string) : boolean => character === ')';
const isAsterisk =  (character: string) : boolean => character === '*';
const isGreater = (character:string): boolean => character === '>';
const isTick = (character:string): boolean => character === '`';
const isExclamation = (character:string): boolean => character === '!';

export default {
    isHashbang,
    isOpeningSquareBrace,
    isClosingSquareBrace,
    isOpeningParenthesis,
    isClosingParenthesis,
    isWhitespace,
    isNumber,
    isDot,
    isDash,
    isAsterisk,
    isGreater,
    isTick,
    isExclamation
}
