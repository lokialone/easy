const XLSX = require('xlsx');
const workbook = XLSX.readFile('/Users/lokalone/Downloads/export.xls');
let sheetNames = workbook.SheetNames;
let worksheet = workbook.Sheets[sheetNames[0]];
const salerName = '业务员名称';
const bussinessAddress = '办公地址';
const billAddress = '开票地址';

// const filterOut = [
//     {
//         columnName: '办公地址',
//         test: '测试'
//     },
//     {
//         columnName: '开票地址',
//         test: '测试'
//     }

// ];
const filterIn = [

]

function alphabetNext(a) {
    let c = a.slice(-1);
    let sub = a.slice(0, -1);
    let code = c.charCodeAt();
    if (code === 90) return sub + 'AA';
    return sub + String.fromCharCode(code + 1);
}

function findColumnNumber(worksheet, name) {
    if (!name) throw new Error('请输入需要的字段');
    let startIndex = 'A';
    let header = worksheet[startIndex + '1'];
    let maxTry = 10000;
    let currentTry = 1;
    while (header.v !== name) {
        startIndex = alphabetNext(startIndex);
        header = worksheet[startIndex + '1'];
        currentTry++;
        if (currentTry >= maxTry) {
            throw new Error(`该表格可能不存在${name} or 表格列数超过10000行`);
        }
    }
    return {
        index: currentTry - 1,
        string: startIndex
    };
}

const {
    index: salerIndex,
    string: salerColumn
} = findColumnNumber(worksheet, salerName);
const {
    index: bussinessAddressIndex,
    string: bussinessAddressColumn
} = findColumnNumber(worksheet, bussinessAddress);
const {
    index: billAddressIndex,
    string: billAddressColumn
} = findColumnNumber(worksheet, billAddress);

// 根据表格号获取行号和列号
function splitColumnAndRow(value) {
    let arr = value.split('');
    let isColumn = true;
    let column = '';
    let row = '';
    arr.forEach((item) => {
        if (isNaN(Number(item))) {
            column += item;
        } else {
            isColumn = false;
        }
        if (!isColumn) {
            row += item
        }
    })
    return {
        column,
        row: Number(row)
    }

}

let currentRow = 1;
let rows = [];
let res = [];

Object.keys(worksheet).forEach(item => {
    if (item === '!ref') return;
    const {
        column,
        row
    } = splitColumnAndRow(item);
    let {
        w
    } = worksheet[item];
    if (currentRow !== row) {
        currentRow = row;
        let cannotUseFlag = rows.some((item, index) => {
            if ((index === bussinessAddressIndex || index === billAddressIndex) && item.indexOf('测试') !== -1) {
                return true;
            }
        });

        if (!cannotUseFlag) {
            res.push(rows);
        };
        rows = [];
    }
    if (column === salerColumn && row !== 1) {
        let valueEn = w.split(',');
        let valueZh = w.split('，');
        let value = valueEn.length >= valueZh.length ? valueEn : valueZh;
        w = value[0];
    }
    rows.push(w);
});
console.log(res);