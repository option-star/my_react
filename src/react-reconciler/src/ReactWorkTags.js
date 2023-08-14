/* 每种虚拟DOM都会对应自己的fiber tag类型 */

// 根Fiber的tag
export const HostRoot = 3; 

// 原生组件Fiber的tag
export const HostComponent = 5;

export const HostText = 6;