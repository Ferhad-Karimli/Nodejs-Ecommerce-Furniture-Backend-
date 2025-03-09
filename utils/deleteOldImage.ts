const { fs } = require("fs");
const { path } = require("path");
function deleteManyOldImages(imagePaths: string[]): void {
  imagePaths?.forEach((item) => {
    const fullImagePath = path?.join(item);
    fs?.unlink(fullImagePath, (error: NodeJS.ErrnoException | null) => {
      if (error) {
        console.log("Error deleting image:", error.message);
      } else {
        console.log("Old image deleted successfully:", fullImagePath);
      }
    });
  });
}
function deleteSingleOldImage(imagePath: string): void {
  const fullImagePath = path?.join(imagePath);
  fs.unlink(fullImagePath, (error: NodeJS.ErrnoException | null) => {
    if (error) {
      console.log("Error deleting image:", error.message);
    } else {
      console.log("Old image deleted successfully:", fullImagePath);
    }
  });
}

module.exports = { deleteSingleOldImage, deleteManyOldImages };
