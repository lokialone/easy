import tokenizer from './tokenizer';
// import { h, render } from 'preact';
import { IResult } from './tokenizer';
export function splitParagraphs(input:string):string[] {
    return input.split('\n');
}


function isHeader(tag:string | undefined) {
    if (!tag) return false;
    const HEADER = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10'];
    return HEADER.includes(tag);
}

function readHeader(token: IResult[]) {
    let header = token[0].tag;
    let cursor = 1;
    let length = token.length;
    while(cursor < length) {
        let item = token[cursor];
        if (item)
        cursor++;
    }
    return { 
        tag: header || '',
        attributes: null,
        content: []
    }
}

function isBlockQuote() {

}

function isBold(tagName: string) {
    const Bold = ['`', '``', '```'];
    // if (tagName)
}

function isInlineCode() {

}

function isGraphCode() {

}

interface IParseResult {
    tag: string;
    attributes: any;
    content: any
}

function parser(data: string) {
    let paragraphs = splitParagraphs(data);
    let tokens = paragraphs.map(tokenizer);
    let cursor = 0;
    let result: IParseResult[] = [];
    let length = tokens.length;
    while(cursor < length) {
        let token = tokens[cursor];
        if (!token.length) {
            result.push({tag: 'br', attributes: null, content: ''});
        }
        let firstToken = token[0];
        if (isHeader(firstToken.tag)) {
            result.push(readHeader(token));
        } 
    }
    
    

}
export default parser;


