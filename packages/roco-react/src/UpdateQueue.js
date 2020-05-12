export class Update {
    constructor(payload) {
        this.payload = payload;
    }
}
// 但单链表
export class UpdateQueue {
    constructor() {
        this.firstUpdate = null;
        this.lastEffect = null;
    }
    enqueueUpdate(update) {
        if (this.lastUpadte == null) {
            this.firstUpdate = this.lastUpadte = update;
        } else {
            this.lastUpadte.nextUpdate = update;
            this.lastUpadte = update;
        }
    }
    forceUpdate(state) {
        let currentUpdate = this.firstUpdate;
        while(currentUpdate) {
            let nextState =  typeof currentUpdate.payload === 'function' ? currentUpdate.payload(state) : currentUpdate.payload;
            if (typeof nextState === 'object' && nextState !== null) {
                state = {...state, ...nextState};
            } else {
                state = nextState;
            }
            currentUpdate = currentUpdate.nextUpdate;
        }
        this.firstUpdate = this.lastUpadte = null;
        return state;
    }
}

