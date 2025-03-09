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
function deleteSingleOldImage(imagePath?: string): void {
  if (!imagePath) {
    console.log("No image to delete");
    return;
  }

  const fullImagePath = path.join(__dirname, "..", imagePath); // Adjust path if needed

  fs.unlink(fullImagePath, (error: Error) => {
    if (error) {
      console.log("Error deleting image:", error.message);
    } else {
      console.log("Old image deleted successfully:", fullImagePath);
    }
  });
}

module.exports = { deleteSingleOldImage, deleteManyOldImages };
