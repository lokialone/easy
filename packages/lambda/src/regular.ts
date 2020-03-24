//常用正则表达式
export function isPhone(str: string): boolean{
    return /^1[3456789]\d{9}$/.test(str);
}

export function isEmail(str: string) {
    return /^([\w\-\.])+\@([\w\-\.])+\.([A-Za-z]{2,4})$/.test(str);
}
// 固定电话
export function isTel(str: string): boolean{
    return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str);
}

export function isIDCardNumber(str: string) {
    //身份证正则表达式(15位)
    // isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //身份证正则表达式(18位)
    // isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    // 身份证正则合并：
    return /^(\d{15}$)|(^\d{17})([0-9]|X)$/.test(str);
}

export function badword(badWords: string[]) {
    // let badWords = ["ape", "monkey", "simian", "gorilla", "evolution"];
    let pattern = new RegExp(badWords.join("|"), "i");
    return (text:string) => pattern.test(text);
}
