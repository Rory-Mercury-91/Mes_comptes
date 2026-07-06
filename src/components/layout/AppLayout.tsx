import { Outlet } from "react-router-dom";
import { Wallet } from "lucide-react";
import { UpdateBanner } from "@/components/common/UpdateBanner";
import { useAppUpdater } from "@/hooks/useAppUpdater";
import { getAppVersion } from "@/lib/appVersion";
import "./AppLayout.css";

/**
 * @description Layout principal avec sidebar et bandeau de mise à jour.
 */
export function AppLayout() {
  const { updateInfo, installing, applyUpdate, dismiss } = useAppUpdater();

  return (
    <div className="app-layout">
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
