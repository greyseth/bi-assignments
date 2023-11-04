import { useEffect, useState } from "react";

function UploadMenu({ setUploadMenu, setAssignData }) {
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
          setError={setError}
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

function Uploading({ file, link, setError, setUploadMenu }) {
  let uploading = false;

  useEffect(() => {
    async function upload() {
      if (uploading) return;
      uploading = true;

      uploading = false;
    }

    if (!file && !link) setError("You must put a file or a link!");
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
