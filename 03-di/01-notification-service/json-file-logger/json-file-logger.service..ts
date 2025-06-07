import { Injectable, Scope, ConsoleLogger, Inject } from '@nestjs/common';
import { JsonFileLoggerOptions, JsonLogEntry } from './json-file-logger.model';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable({ scope: Scope.TRANSIENT })
export class JsonFileLoggerService extends ConsoleLogger {
  private readonly logFilePath: string;
  constructor(
    @Inject('OPTIONS') private readonly config: JsonFileLoggerOptions
  ) {
    super();
    this.logFilePath = join(process.cwd(), this.config.logDirectory, this.config.logFileName);
  }

  private async ensureLogDirectoryExists(): Promise<void> {
    try {
      await fs.mkdir(join(process.cwd(), this.config.logDirectory), { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Failed to create log directory:', err);
        throw err;
      }
    }
  }

   private async writeToJsonFile(entry: JsonLogEntry): Promise<void> {
    try {
      await this.ensureLogDirectoryExists();
      await fs.appendFile(this.logFilePath, JSON.stringify(entry) + '\n', 'utf8');
    } catch (error) {
      super.error(`Failed to write log to file: ${error.message}`, error.stack);
    }
  }

  async logToJSON(message: string) {
    await this.writeToJsonFile({
      timestamp: new Date().toISOString(),
      level: 'log',
      message,
      context: this.context,
    });
  }
}