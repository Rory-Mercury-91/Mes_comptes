import { isSupabaseConfigured } from "@/lib/supabaseClient";
import "./HomePage.css";

/**
 * @description Page d'accueil temporaire en attendant les écrans métier.
 */
export function HomePage() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <section className="home-page">
      <h1>Bienvenue</h1>
      <p className="home-page-lead">
        Application de suivi de comptes avec profils utilisateurs — desktop et Android.
      </p>

      <div className="home-page-status">
        <h2>État du projet</h2>
        <ul>
          <li className={supabaseReady ? "status-ok" : "status-warn"}>
            Supabase : {supabaseReady ? "configuré" : "variables .env manquantes"}
          </li>
          <li className="status-ok">Mises à jour automatiques : branchées</li>
          <li className="status-pending">Profils et comptes : à implémenter</li>
        </ul>
      </div>
    </section>
  );
}
