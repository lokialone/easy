
class BinaryHeap {
    scoreFunction: Function;
    content: any[];
    constructor(scoreFunction: any) {
        // 设置默认scoreFunction 为identity function
        if (typeof scoreFunction === 'function') {
            this.scoreFunction = scoreFunction;
        } else {
            this.scoreFunction = (x:any) => x;
        }
        
        this.content = [];
    }
    push(element: any) {
        this.content.push(element);
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        let res = this.content[0];
        let end = this.content.pop();
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return res;
    }
    size() {
        return this.content.length;
    }
    remove(node :any) {
        let index = null;
        this.content.some((item, _index) => {
            if (item === node) {
                index = _index;
                return true;
            }
            return false;
        });
        if (index === null) return;

        let end = this.content.pop();
        this.content[index] = end;
        this.bubbleUp(index);
        this.sinkDown(index);
    }
    bubbleUp(index: number) {
        let element = this.content[index];
        let score = this.scoreFunction(element);
        while(index > 0) {
            let parentIndex = Math.floor((index + 1) / 2) - 1;
            let parent = this.content[parentIndex];
            if (score > this.scoreFunction(parent)) break;
            this.content[parentIndex] = element;
            this.content[index] = parent;
            index = parentIndex;
        }

    }
    sinkDown(index: number) {
        let length = this.content.length;
        let element = this.content[index];
        let elementScore = this.scoreFunction(element);
        while(true) {
            let child1Index = (index + 1) * 2  -1;
            let child2Index = child1Index + 1;
            let swapIndex = null;
            let child1Score = Number.MAX_VALUE;
            if (child1Index < length) {
                let child1 = this.content[child1Index];
                child1Score = this.scoreFunction(child1);
                if (child1Score < elementScore) swapIndex = child1Index;
            }

            if (child2Index < length) {
                let child2 = this.content[child2Index];
                let child2Score = this.scoreFunction(child2);
                if (child2Score < (swapIndex == null ? elementScore : child1Score)) swapIndex = child2Index;
            }
            if (swapIndex === null) break;
            this.content[index] = this.content[swapIndex];
            this.content[swapIndex] = element;
            index = swapIndex;
        }
    }
}

export default BinaryHeap;
