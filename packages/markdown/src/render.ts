
// function tag(name: string, content: any[], attributes?: any) {
//     return {
//         name,
//         attributes,
//         content
//     }
// }

// function link(target: string, text: string) {
//     return tag('a', [text], {href: target});
// }

// function htmlDoc(title: string, bodyContent: any) {
//     return tag('html', [tag('head', [tag('title', [title])]),
//     tag('body', bodyContent)]);
// }
// function img(src:string) {
//     return tag('img', [], {src});
// }

// type Ireplacement = [RegExp, string];

// function escapeHTML(text: string) {
//     let replacements: Ireplacement[]= [[/&/g, "&amp;"], [/"/g, "&quot;"],
//     [/</g, "&lt;"], [/>/g, "&gt;"]];

//     replacements.map((replace) => {
//         text = text.replace(replace[0], replace[1]);
//     });
//     return text;
// }

// function renderAttributes(attributes: any) {
//     if (!attributes) return '';
//     let result = '';
//     for(let attr in attributes) {
//         result += ` ${attr}="${escapeHTML(attributes[attr])}"`;
//     }
//     return result;
// }

// function renderHTML(element:any) {
//     if (!element) return '';
//     if (typeof element === 'string') return element;
//     if (element.content.length === 0) {
//         return `<${element.name}${renderAttributes(element.attributes)} />`
//     } else {
//         return `<${element.name}${renderAttributes(element.attributes)}>${element.content.map(renderHTML).join('')}</${element.name}>`
//     }
// }

// let doc = tag('div', [tag('p', ['xxxx']), tag('div', [tag('span', [img("img/sheep.png")]), img("img/sheep.png"),tag("p", ["Here is a paragraph, and an image..."])])]);
// var body = [tag("h1", ["The Test"]),
//             tag("p", ["Here is a paragraph, and an image..."]),
//             img("img/sheep.png")];
// var doc = htmlDoc("The Test", body);
// console.log(renderHTML(doc));
// console.log(renderHTML(link("http://www.nedroid.com", "Drawings!")));