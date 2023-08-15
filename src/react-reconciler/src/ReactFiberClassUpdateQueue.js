export function initialUpdateQueue(fiber) {
  // 创建一个新的更新队列
  // pending其实是一个循环链表
  const queue = {
    shared: {
      pending: null,
    },
  };
  fiber.updateQueue = queue;
}

function createUpdate() {
  return {};
}

/**
 * 更新队列入队操作
 * @param {*} fiber
 * @param {*} update
 */
function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const shared = updateQueue.shared;
  const pending = shared.pending;
  if (pending === null) {
    update.next = update;
  } else {
    // 如果更新队列不为空的话，去除第一个更新
    update.next = pending.next;
    // 然后让原来队列的最后一个的next指向新的next
    pending.next = update;
  }

  updateQueue.shared.pending = update;
}

/**
 * 基于老状态，生成新状态
 * @param {*} fiber
 */
function processUpdateQueue(fiber) {
  const queue = fiber.updateQueue;
  const pending = queue.shared.pending;
  if (pending !== null) {
    queue.shared.pending = null;
    // 最后一个更新
    const lastPendingUpdate = pending;
    const firstPendingUpdate = lastPendingUpdate.next;
    // 将循环链表化成单向链表
    lastPendingUpdate.next = null;
    let newState = fiber.memoizedState; // 获取老状态
    let update = firstPendingUpdate; // 获取第一个更新
    while (update) {
      // 循环单向链表
      newState = getStateFromUpdate(update, newState); // 获取update的新状态与老状态进行合并
      update = update.next;
    }
    fiber.memoizedState = newState; // 将合并后的状态重新赋值
  }
}

/**
 * 获取update的新状态(update.payload)与老状态进行合并
 * @param {*} update
 * @param {*} newState
 */
function getStateFromUpdate(update, newState) {
  return Object.assign({}, newState, update.payload);
}

let fiber = { memoizedState: { id: 1 } };
initialUpdateQueue(fiber);
let update1 = createUpdate();
update1.payload = { name: "ljc" };
enqueueUpdate(fiber, update1);

let update2 = createUpdate();
update2.payload = { age: 14 };
enqueueUpdate(fiber, update2);

// 基于老状态，计算新状态
processUpdateQueue(fiber);
console.log(fiber.memoizedState);
