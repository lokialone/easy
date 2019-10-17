import { splitParagraphs } from './parser';
import { readFileSync } from 'fs';
const path = require('path');

let file = readFileSync(path.join(process.cwd(), 'readme.md'), 'utf8');
console.log(splitParagraphs(file));
