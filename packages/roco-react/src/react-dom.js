import { TAG_ROOT } from './constants';
import { scheduleRoot} from './schedule.js';
export default function render(element, container) {
    let rootFiber = {
        tag: TAG_ROOT, //每个fiber会有一个tag标识
        stateNode: container,//指向真实dom
        props: {
            children: [element]
        }
    };
    scheduleRoot(rootFiber);
}