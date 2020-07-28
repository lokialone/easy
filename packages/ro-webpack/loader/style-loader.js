function loader(source) {  
    return `    
        let style = document.createElement('style');
        style.innerHTML =${JSON.stringify(source)};
        document.head.appendChild(style);
        module.exports ="";
    `;
}
module.exports = loader;