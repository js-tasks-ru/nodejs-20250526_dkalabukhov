export interface JsonFileLoggerOptions {
  logFileName: string,
  logDirectory: string,
}

export interface JsonLogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: string;
}