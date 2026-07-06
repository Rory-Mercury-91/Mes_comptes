declare const __APP_VERSION__: string;

/**
 * @description Retourne la version applicative embarquée au build (alignée sur package.json).
 */
export function getAppVersion(): string {
  return __APP_VERSION__;
}
