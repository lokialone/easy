import { splitParagraphs, transformLine } from './parser';
import { readFileSync } from 'fs';
const path = require('path');

let file = readFileSync(path.join(process.cwd(), 'readme.md'), 'utf8');
// let paragraphs = splitParagraphs(file);
// transformLine (paragraphs[0]);

