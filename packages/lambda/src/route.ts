interface Ipoint {
    x: number;
    y: number;
}

function point(x: number, y: number) {
    return { x,y }
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

function weightDistance(poinitA: Ipoint, poinitB: Ipoint) {

}

console.log(isSamePoint(addPoints(point(10, 10), point(4, -2), point(3, 2)), point(14, 8)));