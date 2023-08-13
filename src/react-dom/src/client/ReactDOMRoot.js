import { createContainer } from "react-reconciler/src/ReactFiberReconciler";

function RootDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

export function createRoot(container) {
  const root = createContainer(container);
  return new RootDOMRoot(root);
}
