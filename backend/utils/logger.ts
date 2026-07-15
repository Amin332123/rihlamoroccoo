export class Logger {
  private static formatMessage(level: string, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctxString = context ? ` [${context}]` : "";
    return `[${timestamp}] [${level}]${ctxString}: ${message}`;
  }

  static info(message: string, context?: string): void {
    console.info(this.formatMessage("INFO", message, context));
  }

  static warn(message: string, context?: string): void {
    console.warn(this.formatMessage("WARN", message, context));
  }

  static error(message: string, error?: any, context?: string): void {
    const errMessage = error instanceof Error ? error.message : String(error);
    const details = error instanceof Error && error.stack ? `\nStack: ${error.stack}` : "";
    console.error(this.formatMessage("ERROR", `${message} - ${errMessage}${details}`, context));
  }

  static debug(message: string, context?: string): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.formatMessage("DEBUG", message, context));
    }
  }
}
