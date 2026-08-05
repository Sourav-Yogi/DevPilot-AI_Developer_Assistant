import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export const extractRepositoryZip = async (zipPath, projectId) => {
  const extractPath = path.join("uploads", "repositories", projectId);

  console.log("======================================");
  console.log("ZIP PATH:", zipPath);
  console.log("EXTRACT PATH:", extractPath);

  fs.mkdirSync(extractPath, { recursive: true });

  await fs
    .createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  console.log("EXTRACT EXISTS:", fs.existsSync(extractPath));

  const items = fs.readdirSync(extractPath);

  console.log("ITEMS:", items);

  if (
    items.length === 1 &&
    fs.statSync(path.join(extractPath, items[0])).isDirectory()
  ) {
    const finalPath = path.join(extractPath, items[0]);
    console.log("RETURNING:", finalPath);
    return finalPath;
  }

  console.log("RETURNING:", extractPath);
  return extractPath;
};