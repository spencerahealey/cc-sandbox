/**
 * Shared utilities for cc-sandbox experiments
 */

export function timestamp(): string {
  return new Date().toISOString();
}

export function log(experiment: string, message: string): void {
  console.log(`[${timestamp()}] [${experiment}] ${message}`);
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
