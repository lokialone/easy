class Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}
class Linklist {
    constructor() {
        this.head = null;
        this.size  = 0;
    }

    add(index, ele) {
        if (arguments.length === 1) {
            ele = index;
            if (!this.size){
                this.head = new Node(ele, null);;
            } else {
                let prev = this.getNodeByIndex(this.size - 1);
                prev.next = new Node(ele, null);
            }
            this.size++  
        } else {
            if (index > this.size) {
                throw new Error('index > size');
            }
            
            if (this.size === 0 || index === 0){
                this.head = new Node(ele, this.head);
            } else {
                let prev = this.getNodeByIndex(index - 1);
                prev.next = new Node(ele, prev.next);
            }
            this.size++
        }
    }
    remove() {

    }
    getNodeByIndex(index) {
        if (index === 0) return this.head;
        let node = this.head;
        for(let i=0; i < index;i++) {
            node = node.next;
        }
        return node;
    }
}

const link = new Linklist();
link.add(1);
link.add(2);
link.add(3);
 
// console.dir(link,{depth: 10});


function reverse(link) {
    // console.log(link.data, link.data
    let newHead = null;
    let current = link.head;
    let next;
    while(current) {
        next = current.next;
        current.next = newHead;
        newHead = current;
        current = next;
    }
    link.head = newHead;
    return link;  
}

function reverse2(head) {
    // console.log(link.data, link.data
    if (!head || !head.next) return head;
    let current = reverse2(head.next);
    head.next.next = head;
    head.next = null;
    console.log('current', current);
    return current;
}

console.dir(reverse2(link.head), { depth: null });

const l1 = new Linklist();
l1.add(1);
l1.add(3);

const l2 = new Linklist();
l2.add(2);
l2.add(4);
function mergeLinkList(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.data > l2.data) {
        l2.next = mergeLinkList(l1, l2.next);
        return l2;
    } else {
        l1.next = mergeLinkList(l1.next, l2);
        return l1;
    }
}
// console.dir(mergeLinkList(l1.head, l2.head), {depth:null});