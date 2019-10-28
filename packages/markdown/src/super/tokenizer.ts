// more flexible tokenizer
// can add custom rules//  normal tokenizer
import identify from "../identify";

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

    constructor(input: string) {
        this.setInput(input);
        this.innerLoop();
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

    public getResult() {
        return this.context.result;
    }

    private savePreviousContent() {
        let content = this.getContent();
        if (content.length) {
            this.pushInfo({content});
            this.setContent('');
        }
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
            if (this.readUlList(char)) continue;
            this.appendContent(char);
            this.increaseCursor();
        }
        this.savePreviousContent();  
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
                this.pushInfo({tag: `h${tmpContent.length}`});
                this.increaseCursor();
            } else {
                this.appendContent(tmpContent);
            }
            return true;
        }
        return false
    }

    public readUlList(char: string) {
        if (identify.isDash(char)) {
            char = this.getNextChar();
            if (identify.isWhitespace(char)) {
                this.savePreviousContent();
                this.pushInfo({tag: 'li', parent: 'ul'});
                this.increaseCursor();
            } else {
               this.appendContent(char);
            }
           return true;
        }
        return false;
    }


}

export default Tokenizer;
