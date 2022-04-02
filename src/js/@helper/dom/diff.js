import { isNil } from '../valid.js';

export const diff = ($element, realNode, virtualNode) => {
  if (isNil(realNode) && isNil(virtualNode)) return;
  if (isOnlyExistRight(realNode, virtualNode)) return $element.append(virtualNode);
  if (isOnlyExistLeft(realNode, virtualNode)) return realNode.remove();
  if (isChangedNode(realNode, virtualNode)) return realNode.replaceWith(virtualNode);

  const [realChildren, realLength] = getChildren(realNode);
  const [virtualChildren, virtualLength] = getChildren(virtualNode);

  for (let i = 0; i < Math.max(realLength, virtualLength); i++) {
    diff(realNode, realChildren[i], virtualChildren[i]);
  }
};

const getChildren = target => {
  if (!target) return [[], 0];
  const targetChildrens = Array.from(target.children);
  return [targetChildrens, targetChildrens.length];
};

const isChangedNode = (realNode, virtualNode) => {
  if (isNodeNotEquals(realNode, virtualNode)) return true;
  if (isDifferenceAttributes(realNode, virtualNode)) return true;
  if (isNotEqualsLastContent(realNode, virtualNode)) return true;
  return false;
};

const isDifferenceAttributes = (realNode, virtualNode) => {
  const $realNodeAttributes = realNode.attributes;
  const $virtualNodeAttributes = virtualNode.attributes;

  if ($realNodeAttributes.length !== $virtualNodeAttributes.length) return true;

  for (let i = 0; i < $realNodeAttributes.length; i++) {
    const $r = $realNodeAttributes[i].name;
    const $v = $virtualNodeAttributes[i].name;
    if (isEqualsAttribute(realNode, virtualNode, $r, $v)) return true;
  }

  return false;
};

const isEqualsAttribute = (node1, node2, name1, name2) =>
  node1.getAttribute(name1) !== node2.getAttribute(name1) ||
  node1.getAttribute(name2) !== node2.getAttribute(name2);

const isNotEqualsLastContent = (realNode, virtualNode) => {
  const { firstChild: realFirstChild, textContent: realText } = realNode;
  const { firstChild: virtualFirstChild, textContent: virtualText } = virtualNode;
  if (!isTextNode(realFirstChild)) return false;
  if (!isTextNode(virtualFirstChild)) return false;
  if (realText !== virtualText) return true;
  return false;
};

const isNodeNotEquals = (node1, node2) => node1.nodeName !== node2.nodeName;

const isOnlyExistLeft = (node1, node2) => node1 && !node2;

const isOnlyExistRight = (node1, node2) => !node1 && node2;

const isTextNode = node => node instanceof Text;
