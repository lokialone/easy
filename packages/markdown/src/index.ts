import { splitParagraphs } from './parser';
import tokenizer from './tokenizer';
import { readFileSync } from 'fs';
const path = require('path');

let file = readFileSync(path.join(process.cwd(), 'readme.md'), 'utf8');
let paragraphs = splitParagraphs(file);
let res = paragraphs.map(tokenizer);


