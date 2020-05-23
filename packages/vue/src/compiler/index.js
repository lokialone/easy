import parseHTML from './parse-html';
import generate from './generate';
export function compileToFunction(string) {
    // 根据html生产AST;
    let ast = parseHTML(string);
    // 根据AST生产 render函数的
    let code = generate(ast);
    let render = `with(this){return ${code}}`;
    let renderFn = new Function(render);
    return renderFn;
}
