import fs from 'fs';

// TODO: remove double slash gamou-v2/public//uploads/
export const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
      return true
    } else {
      console.log(`File not found: ${filePath}`);
      return false
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
    return false
  }
};

export const deleteDirectory = (dirPath: string) => {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Directory deleted: ${dirPath}`);
      return true;
    } else {
      console.log(`Directory not found: ${dirPath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting directory: ${dirPath}`, error);
    return false;
  }
};