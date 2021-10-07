import { useRef } from "react";
import "./FileUploader.css";

export const FileUploader = (props) => {
  const componentRef = useRef();

  const onFileUploaded = (e) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      let jsonContent = JSON.parse(e.target.result);
      props.passFamilyData(jsonContent);
    };
    reader.readAsText(e.target.files[0]);

    componentRef.current.value = null; //Clear input tag
  };

  return (
    <form method="post" action="#" style={{ margin: "auto", width: "30%" }}>
      <div className="form-group files">
        <label>Upload your family JSON file.</label>
        <input
          type="file"
          className="form-control"
          accept=".json"
          onChange={onFileUploaded}
          ref={(node) => (componentRef.current = node)}
        />
      </div>
    </form>
  );
};
