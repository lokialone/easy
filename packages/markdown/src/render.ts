interface Itag {
    name: string,
    attributes?: any,
    content: any[]
}
function tag (name: string, content: any[], attributes?:any) {
    return {
        name,
        attributes,
        content
    }
}

function link(target: string, text: string) {
    return tag('a', [text], {href: target});
}

function htmlDoc(title: string, bodyContent: any) {
    return tag('html', [tag('head', [tag('title', [title])]),
    tag('body', [bodyContent])]);
}

function img(src:string) {
    return tag('img', [], {src});
}

type Ireplacement = [RegExp, string];

function escapeHTML(text: string) {
    let replacements: Ireplacement[]= [[/&/g, "&amp;"], [/"/g, "&quot;"],
    [/</g, "&lt;"], [/>/g, "&gt;"]];

    replacements.map((replace) => {
        text = text.replace(replace[0], replace[1]);
    });
    return text;
}

function renderHTML(element:Itag) {
    let pieces: string[] = [];
  
    function renderAttributes(attributes:any) {
      let result = [];
      if (attributes) {
        for (let name in attributes) 
          result.push(" " + name + "=\"" +
                      escapeHTML(attributes[name]) + "\"");
      }
      return result.join("");
    }
  
    function render(element: Itag | string) {
      // Text node
      if (typeof element == "string") {
        pieces.push(escapeHTML(element));
      }
      // only tag
      else if (!element.content || element.content.length == 0) {
        pieces.push("<" + element.name +
                    renderAttributes(element.attributes) + "/>");
      }
      // Tag with content
      else {
        pieces.push("<" + element.name +
                    renderAttributes(element.attributes) + ">");

        element.content.forEach(render);
        pieces.push("</" + element.name + ">");
      }
    }
  
    render(element);
    return pieces.join("");
}
