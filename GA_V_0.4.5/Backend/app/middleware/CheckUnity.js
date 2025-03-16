const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const upload = multer({ dest: "temp/" });
const UNITY_FILES = ["index.html", "Build", "TemplateData"];

async function checkUnityZipFile(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: "No zip file provided" });
  }

  const tempZipPath = req.file.path;
  const tempExtractPath = path.join(__dirname, "../temp", uuidv4());

  try {
    await fs.promises.mkdir(tempExtractPath, { recursive: true });

    await fs
      .createReadStream(tempZipPath)
      .pipe(unzipper.Extract({ path: tempExtractPath }))
      .promise();

    const extractedFiles = await fs.promises.readdir(tempExtractPath);

    const isUnityProject = UNITY_FILES.every((file) =>
      extractedFiles.includes(file)
    );

    if (!isUnityProject) {
      await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
      return res
        .status(400)
        .json({ message: "Invalid Unity project structure" });
    }

    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    fs.unlinkSync(tempZipPath);

    next();
  } catch (error) {
    await fs.promises.rm(tempExtractPath, { recursive: true, force: true });
    fs.unlinkSync(tempZipPath);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  upload,
  checkUnityZipFile,
};
