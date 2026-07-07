import { getAppVersion } from "@/lib/appVersion";
import { isAndroidRuntime, isDesktopRuntime } from "@/lib/platform";

const GITHUB_REPO = "Rory-Mercury-91/Mes_comptes";
const GITHUB_RELEASES_BASE = `https://github.com/${GITHUB_REPO}/releases`;
const LATEST_JSON_URL = `${GITHUB_RELEASES_BASE}/latest/download/latest.json`;

type LatestJsonPayload = {
  version?: string;
  notes?: string;
};

/**
 * @description Télécharge et parse le latest.json de la release GitHub courante.
 */
async function fetchLatestReleaseJson(): Promise<LatestJsonPayload | null> {
  try {
    const response = await fetch(LATEST_JSON_URL);
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as LatestJsonPayload;
  } catch (error) {
    console.warn("Lecture latest.json impossible :", error);
    return null;
  }
}

/**
 * @description Construit l'URL de téléchargement de l'APK Android pour une version donnée.
 */
function buildAndroidApkDownloadUrl(version: string): string {
  return `${GITHUB_RELEASES_BASE}/download/v${version}/Mes_Comptes_${version}_android-universal.apk`;
}

export type UpdateInfo =
  | { kind: "desktop"; version: string; notes?: string }
  | { kind: "android"; version: string; downloadUrl: string; notes?: string };

/**
 * @description Compare deux versions semver X.Y.Z.
 */
function isNewerVersion(latest: string, current: string): boolean {
  const parse = (value: string) =>
    value.replace(/^v/i, "").split(".").map((part) => Number.parseInt(part, 10) || 0);

  const latestParts = parse(latest);
  const currentParts = parse(current);

  for (let index = 0; index < 3; index += 1) {
    const left = latestParts[index] ?? 0;
    const right = currentParts[index] ?? 0;
    if (left > right) {
      return true;
    }
    if (left < right) {
      return false;
    }
  }

  return false;
}

/**
 * @description Vérifie les mises à jour desktop via le plugin Tauri updater.
 */
export async function checkDesktopUpdate(): Promise<UpdateInfo | null> {
  if (!isDesktopRuntime()) {
    return null;
  }

  try {
    const { check } = await import("@tauri-apps/plugin-updater");
    const update = await check();
    if (!update) {
      return null;
    }

    return {
      kind: "desktop",
      version: update.version,
      notes: update.body ?? undefined,
    };
  } catch (error) {
    console.warn("Vérification mise à jour desktop impossible :", error);
    return null;
  }
}

/**
 * @description Vérifie les mises à jour Android via latest.json (même source que le desktop).
 */
export async function checkAndroidUpdate(): Promise<UpdateInfo | null> {
  if (!isAndroidRuntime()) {
    return null;
  }

  const current = getAppVersion();
  const latestRelease = await fetchLatestReleaseJson();
  const latestVersion = latestRelease?.version?.replace(/^v/i, "") ?? "";

  if (!latestVersion || !isNewerVersion(latestVersion, current)) {
    return null;
  }

  return {
    kind: "android",
    version: latestVersion,
    downloadUrl: buildAndroidApkDownloadUrl(latestVersion),
    notes: latestRelease?.notes ?? undefined,
  };
}

/**
 * @description Détecte une mise à jour selon la plateforme courante.
 */
export async function checkForAppUpdate(): Promise<UpdateInfo | null> {
  if (isDesktopRuntime()) {
    return checkDesktopUpdate();
  }

  if (isAndroidRuntime()) {
    return checkAndroidUpdate();
  }

  return null;
}

/**
 * @description Télécharge et installe une mise à jour desktop, puis relance l'app.
 */
export async function installDesktopUpdate(): Promise<void> {
  const { check } = await import("@tauri-apps/plugin-updater");
  const { relaunch } = await import("@tauri-apps/plugin-process");
  const update = await check();
  if (!update) {
    return;
  }

  await update.downloadAndInstall();
  await relaunch();
}

/**
 * @description Ouvre la page de téléchargement de l'APK sur GitHub.
 */
export async function openAndroidUpdateDownload(downloadUrl: string): Promise<void> {
  const { openUrl } = await import("@tauri-apps/plugin-opener");
  await openUrl(downloadUrl);
}
