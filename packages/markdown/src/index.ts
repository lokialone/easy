import { splitParagraphs } from './parser';
import tokenizer, { IResult } from './tokenizer';
// import { h, render } from 'preact';
import { readFileSync } from 'fs';
const path = require('path');

let file = readFileSync(path.join(process.cwd(), 'readme.md'), 'utf8');
let paragraphs = splitParagraphs(file);
let tokens = paragraphs.map(tokenizer);
let cursor = 0;
let length = tokens.length;

const headers = ['h1', 'h2', 'h3', 'h4', 'h5'];
const result = [];

function renderHeader(paragraph: IResult[]) {
    let index = 0;
    let tag = paragraph[0];
    let tagName = tag.tag;
    let res = {
        tag: '',
        attributes: '',
        content: []
    };
    if (tagName && headers.includes(tagName)) {
        res.tag = tagName;
        while (index < paragraph.length) {
            let tag = paragraph[index];
            if (!tag.tag) res.content.push(tag.content);

        }
        return true;
    }
    return false;
}

function renderBlackQuote(paragraph: IResult[]) {
    return false;
}

while(cursor < length) {
    let paragraph = tokens[cursor];
    if ( !paragraph || !paragraph.length) result.push({tag: 'br'});
    if (renderHeader(paragraph)) continue;
    if (renderBlackQuote(paragraph)) continue;
    // deal header
    cursor++;
}


