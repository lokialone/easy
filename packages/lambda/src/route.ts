import BinaryHeap from './binaryHeap';

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
    INFO_PROXY[`${x}-${y}`] = h
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
    let directions: Ipoint[] = [
        Point(-1, -1), Point(0, -1), Point(1, -1),
        Point(-1, 0), Point(1, 0),
        Point(-1, 1), Point(0, 1), Point(1, 1),
    ];
    // 使用reduce,可以一次处理，觉得也无所谓就这样了
    return directions
        .map((item) => addPoints(item, point))
        .filter((item) => {
            return !(item.x < 0 || item.y < 0 || item.x > 20 || item.y > 20);
        });
}

// not really understand why 
function estimatedDistance(pointA: Ipoint, pointB:Ipoint) {
    let dx = Math.abs(pointA.x - pointB.x);
    let dy = Math.abs(pointA.y - pointB.y);
    // assume diagonal distance between two squares as 141;
    if (dx > dy) return (dx - dy) * 100 + dy * 141;

    return (dy - dx) * 100 + dx * 141;
}

function pointID(point: Ipoint) {
    return `${point.x}-${point.x}`;
}

function makeReachedList() {
    return {}
}

function storeReached(list: {[key: string]: []}, point: Ipoint, route: []) {
    list[pointID(point)] = route;
}

function findReached(list: {[key: string]:[]}, point: Ipoint) {
    return list[pointID(point)];
}

function findeRoute(from: Ipoint, to: Ipoint) {
    let openList = new BinaryHeap(routeScore);
    let reachedList = makeReachedList();
    function routeScore(route: any) {
        if (route.score == undefined)
          route.score = estimatedDistance(route.point, to) +
                        route.length;
        return route.score;
    }
    function addOpenRoute(route: any) {
        openList.push(route);
        storeReached(reachedList, route.point, route);
    }
    addOpenRoute({point: from, length: 0});
    while(openList.size() > 0) {
        let route = openList.pop();
        if (isSamePoint(route.point, to)) return route; 
        possibleDirections(route.ponit)
            .forEach((direction) => {
                let know = findReached(reachedList, direction);
                let newLength = route.length + weightDistance(route.point,  direction);
                if (!know || know.length > newLength) {
                    if (know) openList.remove(know);
                    addOpenRoute({point: direction, from: route, length: newLength});
                }
            })
    }
    return null;
}
console.log(possibleDirections(Point(0, 0)));