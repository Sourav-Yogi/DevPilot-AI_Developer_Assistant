import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export const extractRepositoryZip = async (zipPath, projectId) => {
  const extractPath = path.join("uploads", "repositories", projectId);

  fs.mkdirSync(extractPath, { recursive: true });

  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  // 👇 Add these two lines
  console.log("Extract Path:", extractPath);
  console.log("Contents:", fs.readdirSync(extractPath));

  return extractPath;
};