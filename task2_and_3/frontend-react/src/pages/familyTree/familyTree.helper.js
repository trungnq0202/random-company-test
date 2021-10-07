import { useCallback, useState } from "react";

export const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);
  return [translate, containerRef];
};

export const findNodeObject = (targetName, parent, node) => {
  var targetNodeParent = parent;

  if (node instanceof Array) {
    for (let i = 0; i < node.length; ++i) {
      const res = findNodeObject(targetName, targetNodeParent, node[i]);
      if (res.targetNode)
        return {
          targetNodeParent: res.targetNodeParent,
          targetNode: res.targetNode,
        };
    }
  } else {
    if (node.name && node.name === targetName) {
      return { targetNodeParent: parent, targetNode: node };
    } else if (node.children) {
      return findNodeObject(targetName, node, node.children);
    }
  }

  return { targetNodeParent: null, targetNode: null };
};

export const getUniqueNameList = (node, uniqueNameList) => {
  var finalUniqueNameList = uniqueNameList;
  if (uniqueNameList.indexOf(node.name) !== -1) return { duplicateName: true, uniqueNameList: [] };
  uniqueNameList.push(node.name);

  if (node.children) {
    for (let i = 0; i < node.children.length; ++i){
      const res = getUniqueNameList(node.children[i], finalUniqueNameList);
      if (res.duplicateName) return { duplicateName: true, uniqueNameList: [] };
      else finalUniqueNameList = res.uniqueNameList;
    }
  }
  return { duplicateName: false, uniqueNameList: finalUniqueNameList };
}

export const addChildrenPropsToEachNode = (node) => {
  if (!node.children) node.children = [];
  else {
    for (let i = 0; i < node.children.length; ++i)
      addChildrenPropsToEachNode(node.children[i]);
  }
  return node;
}