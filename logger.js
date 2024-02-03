import pino from "pino";

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || "error",
});

export default logger;
