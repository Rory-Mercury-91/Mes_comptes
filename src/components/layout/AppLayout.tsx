import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { Wallet } from "lucide-react";
import { UpdateBanner } from "@/components/common/UpdateBanner";
import { useAppUpdater } from "@/hooks/useAppUpdater";
import { getAppVersion } from "@/lib/appVersion";
import { isAndroidRuntime, isMobileRuntime } from "@/lib/platform";
import "./AppLayout.css";

/**
 * @description Layout principal avec sidebar desktop et en-tête compact mobile (safe areas).
 */
export function AppLayout() {
  const mobile = isMobileRuntime();
  const { updateInfo, installing, applyUpdate, dismiss } = useAppUpdater();

  useLayoutEffect(() => {
    const android = isAndroidRuntime();
    document.documentElement.classList.toggle("runtime-android", android);
    return () => document.documentElement.classList.remove("runtime-android");
  }, []);

  const layoutClass = ["app-layout", mobile ? "app-layout--mobile" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={layoutClass}>
      {updateInfo ? (
        <UpdateBanner
          version={updateInfo.version}
          platformLabel={
            updateInfo.kind === "desktop"
              ? "Nouvelle version desktop disponible"
              : "Nouvelle version Android disponible"
          }
          installing={installing}
          onApply={applyUpdate}
          onDismiss={dismiss}
        />
      ) : null}

      <div className="app-layout-body">
        <aside className="app-sidebar" aria-label="Navigation principale">
          <div className="app-sidebar-brand">
            <Wallet size={22} aria-hidden />
            <span>Mes Comptes</span>
          </div>
          <p className="app-sidebar-version">v{getAppVersion()}</p>
        </aside>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
