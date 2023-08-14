import { NoFlags } from "./ReactFiberFlags.js";
import { HostRoot } from "./ReactWorkTags.js";

/**
 *
 * @param {*} tag fiber的类型： 函数组件0、类组件1、原生组件5、根元素3
 * @param {*} pendingProps 新属性（等待处理或者待生效的属性）
 * @param {*} key 唯一标识
 */
function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.key = key;
  this.type = null; // fiber类型，来自于虚拟DOM节点的type (span、div、p)
  // 每个虚拟DOM => Fiber节点 => 真实DOM
  this.stateNode = null; // 此fiber对应的真实DOM节点 h1 => 真实的DOM节点

  this.return = null; // 指向父节点
  this.child = null; // 指向第一个子节点
  this.sibling = null; // 指向弟弟

  // fiber哪来的？通过虚拟DOM节点创建，虚拟DOM会提供pendingProps用来创建fiber节点的属性
  this.pendingProps = pendingProps; // 等待生效的属性
  this.memoizedProps = null; // 已经生效的属性

  // 每个fiber还会有自己的状态，每种fiber状态存的类型是不一样的
  // 类组件对应的fiber存的就是类实例的状态，HostRoot存的就是要渲染的元素
  this.memoizedState = null;
  this.updateQueue = null; // 每个fiber身上可能还有更新队列，比如类组件中的setState

  this.flags = NoFlags; // 副作用的标识，表示要针对此fiber节点进行何种操作
  this.subtreeFlags = NoFlags; // 子节点对应的副作用标识
  this.alternate = null; // 轮替，双缓冲技术是在内存或显卡开辟一块鱼屏幕一样大小的存储区域，作为缓冲屏幕。
}

/**
 * 创建Fiber节点
 * @param {*} tag fiber的tag类型：每种虚拟DOM都会对应自己的fiber tag类型
 * @param {*} pendingProps
 * @param {*} key
 * @returns
 */
export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

export function createHostRootFiber() {
  return createFiber(HostRoot, null, null);
}
