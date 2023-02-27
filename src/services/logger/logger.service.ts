import { LoggerService } from '@nestjs/common';
import * as process from 'process';
import { dirname, join } from 'node:path';
import { appendFileSync, mkdirSync, statSync, renameSync } from 'node:fs';

const DEFAULT_CONTEXT = 'undefined';
const SEPARATOR = '-';

const LOG_LEVEL_LOG = 'LOG';
const LOG_LEVEL_ERROR = 'ERROR';
const LOG_LEVEL_WARN = 'WARN';

const DEFAULT_LOG_FILE_MAX_SIZE = 5;
const LOG_FILE_EXTENSION = 'log';

const maxLogFileSize =
  parseInt(process.env.LOG_FILE_MAX_SIZE, 10) || DEFAULT_LOG_FILE_MAX_SIZE;

export class Logger implements LoggerService {
  private readonly context: string;

  constructor(context?: string) {
    this.context = context ?? DEFAULT_CONTEXT;
  }

  log(message: any): any {
    this.writeLog(LOG_LEVEL_LOG, message);
  }

  error(message: any): any {
    this.writeLog(LOG_LEVEL_ERROR, message);
  }

  warn(message: any): any {
    this.writeLog(LOG_LEVEL_WARN, message);
  }

  private writeLog(logLevel: string, message: any): void {
    const formattedMessage = this.getFormattedMessage(logLevel, message);

    process.stdout.write(formattedMessage);

    this.writeLogToFile(logLevel, formattedMessage);
  }

  private getFormattedMessage(logLevel: string, message: any): string {
    const context = this.context;
    const dateTime = new Date().toISOString();

    return `${logLevel} [${context}] ${SEPARATOR} ${dateTime} ${SEPARATOR} ${message}\n`;
  }

  private writeLogToFile(logLevel: string, message: string): void {
    const fileName = logLevel === LOG_LEVEL_ERROR ? 'error' : 'app';
    const fullFileName = fileName + '.' + LOG_FILE_EXTENSION;
    const filePath = join('./logs', fullFileName);
    const dirName = dirname(filePath);

    try {
      const stats = statSync(filePath);
      const fileSize = stats.size / 1024;

      if (fileSize > maxLogFileSize) {
        const rotatedFilePath = join(
          dirName,
          `${fileName}-${Date.now()}.${LOG_FILE_EXTENSION}`,
        );
        renameSync(filePath, rotatedFilePath);
      }
    } catch (e) {}

    mkdirSync(dirName, { recursive: true });
    appendFileSync(filePath, message);
  }
}
