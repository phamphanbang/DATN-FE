import ReactS3Client from "react-aws-s3-typescript";

const config = {
  bucketName: "toeicamp",
  region: "ap-southeast-2",
  accessKeyId: "AKIAXAGELGWEEV57FHVG",
  secretAccessKey: "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",
};

const uploadFile = async (file: File, fileName: string) => {
  const s3 = new ReactS3Client(config);
  try {
    const res = await s3.uploadFile(file, fileName);
    return res.location;
  } catch (exception) {}
  return "";
};

const deleteFile = async () => {
  const s3 = new ReactS3Client(config);
  const filepath = "directory-name/filename-to-be-deleted";
  try {
    await s3.deleteFile(filepath);
  } catch (exception) {}
};

export { uploadFile, deleteFile };
