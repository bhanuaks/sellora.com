import { promises as fs } from "fs";
import path from "path";

export async function checkFilePath(dirPath, filename) {
    if (!dirPath || !filename) {
        return false;
    }

    const filePath = path.join(process.cwd(), dirPath, filename);

    try {
        await fs.access(filePath);
         
        return true;
    } catch (error) {
        console.error("File not found:", error);
        return false;
    }
}

export async function moveFile(dirPath, filename, destinationPath) {
    if (!dirPath || !filename || !destinationPath) {
        return false;
    }

    const filePath = path.join(process.cwd(), dirPath, filename);
    const destinationFilePath = path.join(process.cwd(), destinationPath, filename);
    try {
        await fs.access(filePath);
        await fs.rename(filePath, destinationFilePath);
        return true;
    } catch (error) {
        console.error("File not found:", error);
        return false;
    }
}
