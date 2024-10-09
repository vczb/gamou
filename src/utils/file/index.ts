import fs from 'fs';

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