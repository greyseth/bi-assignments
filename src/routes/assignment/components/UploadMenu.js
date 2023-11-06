import { useEffect, useState } from "react";
import { UploadAttachment } from "../../../api/Upload";
import { useParams } from "react-router-dom";
import { postRequest } from "../../../api/API";
import connection from "../../../api/Keys";

function UploadMenu({ setUploadMenu, updAttach, setUpdAttach, account }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const [file, setFile] = useState(undefined);
  const [link, setLink] = useState("");

  return (
    <div className="upload-menu-container">
      {!uploading ? (
        <UploadForm
          setFile={setFile}
          setLink={setLink}
          setUploading={setUploading}
          setUploadMenu={setUploadMenu}
        />
      ) : !error ? (
        <Uploading
          file={file}
          link={link}
          setUploading={setUploading}
          updAttach={updAttach}
          setUpdAttach={setUpdAttach}
          setError={setError}
          account={account}
          setUploadMenu={setUploadMenu}
        />
      ) : (
        <UploadError error={error} setUploadMenu={setUploadMenu} />
      )}
    </div>
  );
}

function UploadForm({ setFile, setLink, setUploading, setUploadMenu }) {
  return (
    <div className="upload-menu">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="or paste a download link"
        onChange={(e) => setLink(e.target.value)}
      />
      <button className="green-button" onClick={() => setUploading(true)}>
        Upload
      </button>
      <button
        className="green-button"
        onClick={() => {
          setUploadMenu(false);
        }}
      >
        Close
      </button>
    </div>
  );
}

function Uploading({
  file,
  link,
  setUploading,
  updAttach,
  setUpdAttach,
  setError,
  setUploadMenu,
  account,
}) {
  let { assign_id } = useParams();
  let uploading = false;

  useEffect(() => {
    async function upload() {
      if (uploading) return;
      uploading = true;

      //File upload
      if (file) {
        const upload = await UploadAttachment(account.user_id, assign_id, file);
        if (upload.error) {
          setError(upload.error);
          setUploading(false);
        } else {
          const req = postRequest("assignments/newupload", {
            assign_id: assign_id,
            fileName: file.name,
            attachments: updAttach,
          });
          if (req.error) {
            setError("An error has occurred during file upload");
            setUploading(false);
          } else setUpdAttach((prev) => [...prev, file.name]);
        }
      }

      //Link upload
      if (link) {
        const req = postRequest("assignments/newupload", {
          assign_id: assign_id,
          fileName: link,
          attachments: updAttach,
        });
        if (req.error) {
          setError("An error has occurred during link upload");
          setUploading(false);
        } else setUpdAttach((prev) => [...prev, link]);
      }

      setUploadMenu(false);

      uploading = false;
    }

    if (!file && !link) setError("You must put a file or a link!");
    if (link && !link.startsWith("https://")) setError("Link is invalid!");
    else upload();
  }, []);

  return (
    <div className="upload-menu">
      <h2>Uploading file...</h2>
    </div>
  );
}

function UploadError({ error, setUploadMenu }) {
  return (
    <div className="upload-menu upload-error">
      <h2>An error has occurred</h2>
      <p>{error}</p>
      <button className="green-button" onClick={() => setUploadMenu(false)}>
        Close
      </button>
    </div>
  );
}

export default UploadMenu;
