import downloadIcon from "../../../assets/img/download.svg";
import deleteIcon from "../../../assets/img/delete.svg";
import { useEffect, useState } from "react";
import { postRequest } from "../../../api/API";
import { DownloadAttachment } from "../../../api/Upload";

function AssignFile({ account, assignData, updAttach, setUpdAttach, file }) {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (loading)
  // }, [loading]);

  async function handleDownload() {
    setLoading(true);

    if (file.startsWith("https://")) window.open(file, "_blank");
    else {
      const download = await DownloadAttachment(
        account.user_id,
        assignData.assign_id,
        file
      );
      window.open(download.publicUrl, "_blank");
    }

    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);

    const req = await postRequest("assignments/deleteattach", {
      assign_id: assignData.assign_id,
      file: file,
      attachments: updAttach,
    });

    if (!req.error) {
      setUpdAttach(req.data);
    } else alert("An error has occurred during file deletion");

    setLoading(false);
  }

  return (
    <li key={assignData.assign_id}>
      <p>{file}</p>
      <div className="file-item-controls">
        <button onClick={handleDownload}>
          <img className="svg-white" src={downloadIcon} />
        </button>
        {assignData.owner_id === account.user_id ? (
          <button className="del-btn" onClick={handleDelete}>
            <img className="svg-white" src={deleteIcon} />
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default AssignFile;
