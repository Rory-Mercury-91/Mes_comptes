/**
 * @description Indique si l'application tourne dans le shell Tauri.
 */
export function isTauriRuntime(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

/**
 * @description Indique si l'application tourne sur Android (WebView Tauri).
 */
export function isAndroidRuntime(): boolean {
  return (
    isTauriRuntime() &&
    typeof navigator !== "undefined" &&
    /android/i.test(navigator.userAgent)
  );
}

/**
 * @description Indique si l'application tourne sur une cible mobile Tauri.
 */
export function isMobileRuntime(): boolean {
  return isAndroidRuntime();
}

/**
 * @description Indique si l'application tourne sur le binaire desktop Tauri.
 */
export function isDesktopRuntime(): boolean {
  return isTauriRuntime() && !isMobileRuntime();
}
