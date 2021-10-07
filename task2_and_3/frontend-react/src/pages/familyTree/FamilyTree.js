import React, { useState } from "react";
import Tree from "react-d3-tree";
import Layout from "../../hoc/Layout/Layout";
import { findNodeObject, getUniqueNameList, useCenteredTree, addChildrenPropsToEachNode } from "./familyTree.helper";
import { FileUploader } from "../../components/FileUploader/FileUploader";
import clone from "clone";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Modal } from "../../components/Modal/Modal";

const FamilyTree = () => {
  const [translate, containerRef] = useCenteredTree();
  const [familyData, setFamilyData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [tempNodeEditName, setTempNodeEditName] = useState(null);
  const [duplicateName, setDuplicateName] = useState(false);
  const [uniqueNameList, setUniqueNameList] = useState([]);
  const [duplicateInputName, setDuplicateInputName] = useState(false);

  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  const updateFamilyData = (familyData) => {
    const { duplicateName, uniqueNameList } = getUniqueNameList(familyData, []);
    if (duplicateName) return setDuplicateName(true);
    else {
        setDuplicateName(false);
        setUniqueNameList(uniqueNameList);
        setFamilyData(addChildrenPropsToEachNode(familyData));
    }
  }

  const containerStyles = {
    width: "100%",
    height: "100vh",
  };

  const removeNode = (nodeDatum) => {
    let newFamilyData = clone(familyData);
    let { targetNodeParent, targetNode } = findNodeObject(
      nodeDatum.name,
      null,
      newFamilyData
    );

    if (targetNodeParent) {
      for (let i = 0; i < targetNodeParent.children.length; ++i) {
        if (targetNodeParent.children[i].name === targetNode.name)
          targetNodeParent.children.splice(i, 1);
      }
      const { duplicateName, uniqueNameList } = getUniqueNameList(newFamilyData, []);
      console.log(uniqueNameList);
      setUniqueNameList(uniqueNameList);
      setFamilyData(newFamilyData);
    } else {
      setFamilyData(null);
    }
  };

  const checkExistedName = (name) => {
    return uniqueNameList.indexOf(name) !== -1;
  }

  const addNode = () => {
    if (newNodeName === "" || duplicateInputName) return;
    setDuplicateInputName(false);
    setOpenModal(false);

    let newFamilyData = clone(familyData);
    let { targetNodeParent, targetNode } = findNodeObject(
      tempNodeEditName,
      null,
      newFamilyData
    );
    targetNode.children.push({ name: newNodeName, children: [] });
    setFamilyData(newFamilyData);

    let newUniqueNameList = [...uniqueNameList];
    newUniqueNameList.push(newNodeName);
    setUniqueNameList(newUniqueNameList);
  };

  const updateNewNodeName = (e) => {
    if (checkExistedName(e.target.value)) setDuplicateInputName(true);
    else setDuplicateInputName(false);
    setNewNodeName(e.target.value);
  };

  const renderForeignObjectNode = ({ nodeDatum, foreignObjectProps }) => (
    <g>
      <circle r={15}></circle>
      {/* `foreignObject` wraps the HTML tags to allow for them to be injected into the 
      SVG namespace, requiring width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "#dedede",
            width: "200px",
          }}
        >
          <h3 style={{ textAlign: "center", fontSize: "25px" }}>
            {nodeDatum.name}
          </h3>
          {nodeDatum.children && (
            <Aux>
              <button
                style={{ width: "50%" }}
                onClick={(e) => {
                  setOpenModal(true);
                  setTempNodeEditName(nodeDatum.name);
                }}
              >
                Add
              </button>
              <button
                style={{ width: "50%" }}
                onClick={(e) => removeNode(nodeDatum)}
              >
                Remove
              </button>
            </Aux>
          )}
        </div>
      </foreignObject>
    </g>
  );

  return (
    <Layout>
      <FileUploader passFamilyData={updateFamilyData} />
      {duplicateName ? (
        <div
          className="mt-3"
          style={{
            height: 30,
            width: "100%",
            textAlign: "center",
            color: "red",
          }}
        >
          Each member must have a unique name, please fix your uploaded JSON file!
        </div>
      ) : null}
      {familyData ? (
        <div style={containerStyles} ref={containerRef}>
          <Tree
            data={familyData}
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
            orientation="vertical"
          />
        </div>
      ) : null}
      <Modal trigger={openModal} onSubmitHandler={addNode}>
        <h3>My popup</h3>
        <input
          type="text"
          placeholder="Enter a name for new member"
          onChange={updateNewNodeName}
          style={{width: "50%"}}
        />
        {newNodeName === "" ? (
          <div
            className="mt-3"
            style={{ height: 30, width: "100%", textAlign: "center", color:"red" }}
          >
            Name must not be empty
          </div>
        ) : null}

        {duplicateInputName ? (
          <div
            className="mt-3"
            style={{ height: 30, width: "100%", textAlign: "center", color:"red" }}
          >
            Each member's name must be unique
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default FamilyTree;
