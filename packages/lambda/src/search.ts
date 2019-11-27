// 尝试解决最短路径问题
// 定义数据结构
// for 课程练习
type IRoad = {
    to: string,
    distance: number
}
let roads: {[k: string]: IRoad[]} = {};

type IRoadInput = [string, number];

function makeRoads(from: string, road: IRoadInput[]) {
    function addRoad(from: string, to:string, length: number) {
        if (!(from in roads)) roads[from] = [];
        roads[from].push({to: to, distance: length});
    }
    road.forEach((item) => {
        addRoad(from, item[0], item[1]);
        addRoad(item[0], from, item[1]);
    });
}

makeRoads('Point Kiukiu', [['Hanaiapa', 19], ['Mt Feani', 15], ['Taaoa', 15]]);
makeRoads("Airport", [["Hanaiapa", 6], ["Mt Feani", 5], ["Atuona", 4], ["Mt Ootua", 11]]);
makeRoads("Mt Temetiu", [["Mt Feani", 8], ["Taaoa", 4]]);
makeRoads("Atuona", [["Taaoa", 3], ["Hanakee pearl lodge", 1]]);
makeRoads("Cemetery", [["Hanakee pearl lodge", 6], ["Mt Ootua", 5]]);
makeRoads("Hanapaoa", [["Mt Ootua", 3]]);
makeRoads("Puamua", [["Mt Ootua", 13], ["Point Teohotepapapa", 14]]);

function roadsFrom(place: string) {
    var found = roads[place];
    if (found == undefined) throw new Error("No place named '" + place + "' found.");
    return found;
}

// just for fun
// function gamblerPath(from: string, to: string) {
//     function randomInteger(below: number):number {
//       return Math.floor(Math.random() * below);
//     }
//     function randomDirection(from: string) {
//       var options = roadsFrom(from);
//       return options[randomInteger(options.length)].to;
//     }
  
//     let path = [];
//     while (true) {
//       path.push(from);
//       if (from === to)
//         break;
//       from = randomDirection(from);
//     }
//     return path;
// }
// console.log(gamblerPath("Hanaiapa", "Mt Feani"));

// 1.获取所有可能路径，同时去除有环的路
// 2. 计算长度


// 如何获取所有路径
// lokialone 
function possibleRoutes(from: string, to: string) {
    let allRoutes: string [][] = [];
    function findRoute(from: string, to: string, route:string[] = []) {
        route.push(from);
        let nextRoads = roadsFrom(from);
        nextRoads.forEach((nextRoad) => {
            let innerRoute = [...route];
            if (innerRoute.includes(nextRoad.to)) return;
            if (nextRoad.to === to) { 
                allRoutes.push([...innerRoute, to]);
            } else {
                findRoute(nextRoad.to, to, innerRoute);
            }
        });
    }
    findRoute(from, to);
    return allRoutes;
}

type IRoute = {
    places: string[];
    length: number;
}
// books solution
function possibleRoutesFuncation(from: string, to: string) {
    function notVisited(route:IRoute, from: string) {
        return !route.places.includes(from);
    }

    function findRoutes(route: IRoute) {
        var end = route.places[route.places.length - 1];
        if (end == to) return [route];
        return roadsFrom(from)
            .filter((nextRoad) => notVisited(route, nextRoad.to))
            .map((nextRoad) => continueRoute(nextRoad.to, to, route))
        }

    function continueRoute(rou) {
        function continueRoute(road) {
            return findRoutes({places: route.places.concat([road.to]),
                               length: route.length + road.distance});
          }
    }

    function getDistance(from: string, to: string) {
        let item = roadsFrom(from).find((road) => road.to === to);
        if (!item) throw new Error("can't find road from " + from);
        return item.distance;
    }
    

    return continueRoute(from, to, {places: [from], length: 0});

}
console.log(roadsFrom('Hanaiapa'));
console.log(possibleRoutesFuncation("Point Teohotepapapa", "Point Kiukiu"));
