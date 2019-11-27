 
 let INFOS: {
     [k: string]: number
 } = {};

 const MAP_SIZE = 20;
 const INFO_PROXY = new Proxy(INFOS, {
    get(target, property) {
        // property
        return (property in target) && property && (typeof property !== 'symbol') ? target[property] : 0;
    }
 });

 function addHeightInfo(x: number, y:number, h: number) {
    INFO_PROXY[`${x},${y}`] = h
 }
 addHeightInfo(0, 0, 18);
 addHeightInfo(11, 18, 8);

 interface Ipoint {
    x: number;
    y: number;
}

function Point(x: number, y: number) {
    return { x, y }
}

function heightAt(point: Ipoint) {
    return  INFO_PROXY[`${point.x},${point.y}`];
}

function addPoints(...points: Ipoint[]) :Ipoint{
    return points.reduce((acc, item) => {
        acc.x += item.x;
        acc.y += item.y;
        return acc;
    }, {x: 0, y: 0});
}
function isSamePoint(...points: Ipoint[]) :boolean {
    let samplePoint = points[0];
    // samplePonit === null || samplePonit === undefined
    if (samplePoint == null || points.length <= 1) throw Error("parameter error");
    return points.every((item) => {
        return item.x === samplePoint.x && item.y === samplePoint.y;
    });
}

function weightDistance(pointA: Ipoint, pointB: Ipoint) {
    let heightDifference = heightAt(pointB) - heightAt(pointA);
    let climbFactor = (heightDifference < 0 ? 1 : 2);
    let flatDistance = (pointA.x == pointB.x || pointA.y == pointB.y ? 100 : 141);
    return flatDistance + climbFactor * Math.abs(heightDifference);
}

function possibleDirections(point: Ipoint): Ipoint[] {
    // mainly question is edge
    let x = point.x;
    let y = point.y;
    let directions: Ipoint[] = [
        Point(-1, -1), Point(0, -1), Point(1, -1),
        Point(-1, 0), Point(1, 0),
        Point(-1, 1), Point(0, 1), Point(1, 1),
    ];
    // 使用reduce,可以一次处理，觉得也无所谓就这样了
    return directions.map((item) => addPoints(item, point)).filter((item) => {
        return !(item.x < 0 || item.y < 0 || item.x > 20 || item.y > 20);
    });
}

console.log(possibleDirections(Point(0, 0)));