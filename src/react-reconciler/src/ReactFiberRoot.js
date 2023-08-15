import { createHostRootFiber } from "./ReactFiber";
import { initialUpdateQueue } from "./ReactFiberClassUpdateQueue";

function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

export function createFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo);
  // HostRoot指的就是根节点div#root
  const uninitializedFiber = createHostRootFiber();
  // 根容器的current指向当前的根fiber
  root.current = uninitializedFiber; // current指的是当前容器他的现在正在显示的或者说已经渲染好的fiber树
  // 根fiber的stateNode, 也就是真实DOM节点指向FiberRootNode
  uninitializedFiber.stateNode = root;

  initialUpdateQueue(uninitializedFiber);
  return root;
}
