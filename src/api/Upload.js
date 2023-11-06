import connection from "./Keys";

async function UploadAttachment(user_id, assign_id, file) {
  const { data, error } = await connection.storage
    .from("uploads")
    .upload(`attachments/${user_id}/${assign_id}/${file.name}`, file);

  console.log(`attachments/${user_id}/${assign_id}/${file.name}`);
  console.log(data);

  if (error) return { error: error.message };
  else return data;
}

async function DownloadAttachment(user_id, assign_id, fileName) {
  const { data } = await connection.storage
    .from("uploads")
    .getPublicUrl(`attachments/${user_id}/${assign_id}/${fileName}`);

  return data;
}

async function Delete(fileName) {
  const { data, error } = await connection.storage
    .from("uploads")
    .delete([fileName]);

  if (error) return { error: error.message };
  else return data;
}

export { UploadAttachment, DownloadAttachment, Delete };
