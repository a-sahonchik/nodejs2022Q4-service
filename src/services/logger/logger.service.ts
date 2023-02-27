import { LoggerService, LogLevel } from '@nestjs/common';
import * as process from 'process';
import { dirname, join } from 'node:path';
import { appendFileSync, mkdirSync, statSync, renameSync } from 'node:fs';

const DEFAULT_CONTEXT = 'undefined';
const SEPARATOR = '-';

const LOG_LEVEL = parseInt(process.env.LOG_LEVEL, 10);
const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

const LOG_LEVEL_LOG = 'log';
const LOG_LEVEL_ERROR = 'error';
const LOG_LEVEL_WARN = 'warn';
const LOG_LEVEL_DEBUG = 'debug';
const LOG_LEVEL_VERBOSE = 'verbose';

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

  debug(message: any): any {
    this.writeLog(LOG_LEVEL_DEBUG, message);
  }

  verbose(message: any): any {
    this.writeLog(LOG_LEVEL_VERBOSE, message);
  }

  private writeLog(logLevel: LogLevel, message: any): void {
    if (logLevels.indexOf(logLevel) > LOG_LEVEL) {
      return;
    }

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
