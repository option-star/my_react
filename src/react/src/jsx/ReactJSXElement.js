import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import hasOwnProperty from "shared/hasOwnProperty";

/** 保留属性不放到props上œ */
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

/**
 * 判断是否是合法的key
 * @param {*} config
 */
function hasValidKey(config) {
  return config.key !== undefined;
}

/**
 * 判断是否是合法的ref
 * @param {*} config
 * @returns
 */
function hasValidRef(config) {
  return config.ref !== undefined;
}

/**
 * 生成React元素（虚拟DOM元素）
 * @param {*} type 元素类型
 * @param {*} key 唯一标识
 * @param {*} ref 用于获取真实DOM元素
 * @param {*} props 属性 children、style、id
 * @returns
 */
function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  };
}

export function jsxDEV(type, config) {
  let propName; // 属性名
  const props = {}; // 属性对象
  let key = null; // 每个虚拟dom可以有一个可选的key属性，用于区分一个父节点下的不同子节点
  let ref = null; // 引入，后面可以通过这实现获取真实DOM的需求

  if (hasValidKey(config)) {
    key = config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName)
    ) {
      props[propName] = config[propName];
    }
  }

  return ReactElement(type, key, ref, props);
}
