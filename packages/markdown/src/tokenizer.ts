//  以回车分割行
import identify from "./identify";

export function splitParagraphs(input: string): string[] {
    return input.split('\n');
}

interface IResult {
    tag?: string,
    content?: string,
    parent?: 'ul' | 'ol'
}
interface IContext {
    input: string, 
    content: string,
    result: IResult[],
    cursor: number
}

class Tokenizer {
    private context:IContext = {
        input: '',
        content: '',
        result: [],
        cursor: 0
    }

    public setInput(input:string) {
        this.context.input = input;
    }

    public getInput() {
        return this.context.input;
    }

    public getCursor() {
        return this.context.cursor;
    }

    public increaseCursor() {
        this.context.cursor++;
    }

    public getContent() {
        return this.context.content;
    }

    public setContent(val: string) {
        return this.context.content = val;
    }

    public appendContent(char: string) {
        let content = this.getContent() + char;
        this.setContent(content)
    }

    public pushInfo(res: IResult) {
        this.context.result.push(res);
    }

    private savePreviousContent() {
        let content = this.getContent();
        if (content.length) {
            this.pushInfo({content});
            this.setContent('');
        }
    }

    constructor(input: string) {
        this.setInput(input);
        this.innerLoop();
    }

    /**
     * getNextChar
     */
    public getNextChar() {
        this.increaseCursor();
        return this.getInput().charAt(this.getCursor());
    }

    private innerLoop() {
        let input = this.getInput();
        while(this.getCursor() < input.length) {
            let char = input.charAt(this.getCursor());
            if (this.readHeader(char)) continue;
            this.readHeader(char);
            this.increaseCursor();
        }
    }

    public readHeader(char: string) {
        if (identify.isHashbang(char)) {
            let tmpContent = char;
            char = this.getNextChar();
            while(identify.isHashbang(char)) {
                tmpContent += char;
                char = this.getNextChar();
            }
            // 根据空格判断## 为header是否成立
            if (identify.isWhitespace(char)) {
                this.savePreviousContent();
                this.result.push({tag: 'h2'});
                this.cursor++;
            } else {
                this.content += tmpContent;
            }
            return true;
        }
        return false
    }

    public addRules(char:string, callback: Function) {

    }

    public getResult() {
        return this.context.result;
    }

}

export default Tokenizer;
