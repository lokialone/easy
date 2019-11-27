const testDom = {
    name: 'div',
    props: {
        onClick: {
            value: {
                type: 'var',
                value: 'b'
            }
        },
    },
    children: [
        "hello",
        {
            type: 'var',
            value: 'world'
        },
        {
            name: 'p',
            children: [
                'hi',
                'ppp'
            ]
        }
    ]
}

function h() {
    console.log('x');
}
let world = 'hi break world';
let b = 'n b !';
'h("div", {"onClick", b})'
function parse() {

}