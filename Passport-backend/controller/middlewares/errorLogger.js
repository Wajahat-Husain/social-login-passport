import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, "..", "error.log");

const errorLogger = (err, req, res, next) => {
  const errorDetails = `${new Date().toISOString()} - ${req.method} ${
    req.url
  } - ${err.message}\n`;
  fs.appendFile(logFile, errorDetails, (error) => {
    if (error) console.error("Failed to write to log file");
  });
  next(err);
};

export default errorLogger;
