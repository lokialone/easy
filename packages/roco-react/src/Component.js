 import { Update, UpdateQueue } from './UpdateQueue';
import {scheduleRoot} from './schedule';
 class Component {
    constructor(props) {
        this.props = props;
    }
    setState(payload) {
        this.intnernalFiber.updateQueue.enqueueUpdate(new Update(payload));
        scheduleRoot();
    }
}
Component.prototype.isReactComponent = {};//感觉这个写法很奇怪

export default Component;