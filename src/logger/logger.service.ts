import { LoggerService } from '@nestjs/common';

const DEFAULT_CONTEXT = 'undefined';
const SEPARATOR = '-';

const LOG_LEVEL_LOG = 'LOG';
const LOG_LEVEL_ERROR = 'ERROR';
const LOG_LEVEL_WARN = 'WARN';

export class Logger implements LoggerService {
  private readonly context: string;

  constructor(context?: string) {
    this.context = context ?? DEFAULT_CONTEXT;
  }

  log(message: any): any {
    console.log(this.getFormattedMessage(LOG_LEVEL_LOG, message));
  }

  error(message: any): any {
    console.log(this.getFormattedMessage(LOG_LEVEL_ERROR, message));
  }

  warn(message: any): any {
    console.log(this.getFormattedMessage(LOG_LEVEL_WARN, message));
  }

  private getFormattedMessage(logLevel: string, message: string): string {
    const context = this.context;
    const dateTime = new Date().toISOString();

    return `${logLevel} [${context}] ${SEPARATOR} ${dateTime} ${SEPARATOR} ${message}`;
  }
}
