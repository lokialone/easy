/**
 * 从根节点开始调度
 * diff阶段, 对比新旧虚拟dom, render, get effect list
 * render 生成fiber链 && get effect list
 * 这个时间可以进行任务拆分， 此阶段可以暂停
 * commit阶段渲染页面，无法暂停
 */
import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, TAG_HOST, PLACEMENT,DELETION, UPDATE, TAG_CLASS,TAG_FUNCTION_COMPONENT} from './constants';
import {UpdateQueue, Update} from './UpdateQueue';
import { setProps } from './utils';
let nextUnitOfWork = null; //下一个工作单元
let workInProgressRoot = null; //当前的工作树
let currentRoot = null;//
let deletions = []; //删除节点不放在effectList里
let workInProgressFiber = null; //for hook; 正在工作的Fiber
let hookIndex = 0; //for hook
export function scheduleRoot(rootFiber) {
    // 至少更新过一次
    if(currentRoot && currentRoot.alternate) {
        workInProgressRoot = currentRoot.alternate//复用上一次，上一次的树
      
        workInProgressRoot.alternate = currentRoot;//上一次的树
        if (rootFiber)  workInProgressRoot.props = rootFiber.props;
    } else if (currentRoot) {
        if (rootFiber)  {
            rootFiber.alternate = currentRoot;
             workInProgressRoot = rootFiber;
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        } 
    } else {
        workInProgressRoot = rootFiber;
    }
    workInProgressRoot.firstEffect = workInProgressRoot.nextEffect = workInProgressRoot.lastEffect = null;
    nextUnitOfWork = workInProgressRoot;
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop, { timeout: 500});
}

function commitRoot() {
    deletions.forEach(commitWork);
    let currentFiber = workInProgressRoot.firstEffect;
    while(currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    deletions.length = 0;//清空deletions
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
    
}

function commitWork(currentFiber) {
    if (!currentFiber) return;
    let returnFiber = currentFiber.return;
    while(returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {
        returnFiber = returnFiber.return;
    }
    let returnDom = returnFiber.stateNode;
    if (currentFiber.effectTag === PLACEMENT) {
        let nextFiber = currentFiber;
        if (currentFiber.tag === TAG_CLASS) return;
        // 如果要过载的节点不是DOM节点，而是类组件； 一直找到真实节点为止
        while(nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {
            nextFiber = nextFiber.child;
        }
        returnDom.appendChild(nextFiber.stateNode);
    } else if(currentFiber.effectTag === DELETION) {
        console.log(currentFiber);
        return commitDeletion(currentFiber, returnDom);
    } else if (currentFiber.effectTag === UPDATE) {
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text)
            currentFiber.stateNode.textContent = currentFiber.props.text;
        } else {
            if (currentFiber.tag === TAG_CLASS) {
                return currentFiber.effectTag = null;
            } else
            updateDom(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
        }
    }
    currentFiber.effectTag = null;
}

function commitDeletion(currentFiber, domReturn) {
    if (currentFiber.tag === TAG_HOST && currentFiber.tag === TAG_TEXT) {
         returnDom.removeChild(currentFiber.stateNode);
    } else {
        commitDeletion(currentFiber.child, domReturn);
    }
}


//收集有副作用的fiber, 然后组成effect list
function completeUnitOfWork(currentFiber) {
    let returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;

            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }
        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            // 每个fiber有2个属性， firstEffect, lastEffect.
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
               
            } else {
                returnFiber.firstEffect = currentFiber;
            }  
             returnFiber.lastEffect = currentFiber;  
        }
    }

}

function performUnitOfWork(currentFiber) {
    // debugger
    beginWork(currentFiber);
    if (currentFiber.child) {
        return currentFiber.child;
    }
    while(currentFiber) {
        completeUnitOfWork(currentFiber);
        if (currentFiber.sibling) {
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;
    }
}

/**
 * 
 * 1. 创建真实dom
 * @param {*} currentFiber 
 */
function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {
        updateHost(currentFiber);
    } else if (currentFiber.tag === TAG_CLASS) {
        updateClassComponent(currentFiber);
    }
    else if (currentFiber.tag === TAG_FUNCTION_COMPONENT) {
        updateFuncitonComponent(currentFiber);
    }
}

function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {//stateNode 是组件的实例
        currentFiber.stateNode
         = new currentFiber.type(currentFiber.props);
         currentFiber.stateNode.intnernalFiber = currentFiber;
         currentFiber.updateQueue = new UpdateQueue();
    } 
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state);
    let newElement = currentFiber.stateNode.render();
     reconcileChildren(currentFiber, [newElement]);
}

function updateFuncitonComponent(currentFiber) {
    workInProgressFiber = currentFiber;
    hookIndex = 0;
    workInProgressFiber.hooks = [];
    const newChildren = [currentFiber.type(currentFiber.props)];
    reconcileChildren(currentFiber, newChildren);
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDom(currentFiber);
    }
    let newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}

function updateHostRoot(rootFiber) {
    // 创建dom, 创建子fiber.
    let newChildren = rootFiber.props.children;
    reconcileChildren(rootFiber, newChildren);
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDom(currentFiber);
    }
}

function createDom(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    } else if (currentFiber.tag === TAG_HOST) {
        let stateNode = document.createElement(currentFiber.type);
        updateDom(stateNode, {}, currentFiber.props)
        return stateNode
    }
}

function updateDom(stateNode, oldProps, newProps) {
    if (stateNode && stateNode.setAttribute)  setProps(stateNode, oldProps, newProps);//
   
}
function reconcileChildren(currentFiber, newChildren) {
    let newChildrenIndex = 0;
    let prevSibling;
    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;
    if (oldFiber) oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
    while(newChildrenIndex < newChildren.length || oldFiber) {
        let newChild = newChildren[newChildrenIndex];
        let newFiber;
        let sameType = oldFiber && newChild && oldFiber.type === newChild.type;
        let tag;
        if (newChild && typeof newChild.type === 'function' && newChild.type.prototype.isReactComponent ) {
            tag = TAG_CLASS;
        } else if(newChild && typeof newChild.type === 'function' ) {
            tag = TAG_FUNCTION_COMPONENT;
        }
        if ( newChild && newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;
        } else if(newChild && typeof newChild.type == 'string') {
            tag = TAG_HOST;
        }
        if (sameType) {
            if (oldFiber.alternate) {
                newFiber = oldFiber.alternate;
                newFiber.props = newChild.props;
                newFiber.alternate = oldFiber;
                newFiber.effectTag = UPDATE;
                newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue();
                newFiber.nextEffect = null;
            } else {
                 newFiber = {
                    tag,
                    type: newChild.type,
                    props:newChild.props,
                    stateNode: oldFiber.stateNode,
                    return: currentFiber,
                    updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                    alternate: oldFiber,
                    effectTag: UPDATE,
                    nextEffect: null//也是一个单链表
                }
            }
           
        } else {
            if(newChild) {
                newFiber = {
                    tag,
                    type: newChild.type,
                    props:newChild.props,
                    stateNode: null,
                    return: currentFiber,
                    updateQueue: new UpdateQueue(),
                    effectTag: PLACEMENT,
                    nextEffect: null//也是一个单链表
                    }
            }
            if (oldFiber) {
                oldFiber.effectTag = DELETION;
                deletions.push(oldFiber);
            }
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling; //oldFiber向下移动
        }
        
        if (newChild) {
             if (newChildrenIndex === 0) {
                currentFiber.child = newFiber;
            
            } else {
                prevSibling.sibling = newFiber; 
            }
            prevSibling = newFiber;
        }
       
       
        newChildrenIndex++
    }

}

// 有一个优先级的概念 expirationTime
requestIdleCallback(workLoop, { timeout: 500});

export function useReducer(reducer, initialValue) {
    let oldHook = workInProgressFiber.alternate && workInProgressFiber.alternate.hooks && workInProgressFiber.alternate.hooks[hookIndex];
    let newHook = oldHook;
    if(oldHook) {
        oldHook.state = oldHook.updateQueue.forceUpdate(oldHook.state);
    } else {
        newHook= {
            state: initialValue,
            updateQueue: new UpdateQueue()
        }
    }
    
    const dispatch = action => {
        let payload = reducer? reducer(newHook.state, action): action;
        newHook.updateQueue.enqueueUpdate(
            new Update(payload)
        )
        scheduleRoot();
    }
    workInProgressFiber.hooks[hookIndex++] = newHook;
    return [newHook.state, dispatch];
}

export function useState(initialValue) {
    return useReducer(null, initialValue);
}
