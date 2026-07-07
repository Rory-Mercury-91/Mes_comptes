# Changelog

## [0.1.4] — 2026-07-07

### Ajouté
- Safe areas Android (viewport-fit, bandeaux haut/bas comme Mangathèque)

### Modifié
- Layout mobile : hauteur 100dvh, padding navigation système, en-tête sous encoche

## [0.1.3] — 2026-07-07

### Corrigé
- Signature Android release (APK signé publié, plus d'APK non signé)
- Détection MAJ Android via `latest.json` (aligné sur le desktop)

## [0.1.2] — 2026-07-07

### Corrigé
- Workflow release : l'APK Android rejoint la même release que le desktop (`appVersion`)
- Évite une release « latest » sans `latest.json` qui bloquait l'updater

## [0.1.1] — 2026-07-06

### Corrigé
- Alignement des numéros de version (`package.json`, Tauri, Cargo) pour l'updater et les releases

## [0.1.0] — 2026-07-06

### Ajouté
- Scaffold Tauri 2 + React + TypeScript + Vite
- Intégration Supabase (client configuré)
- Mises à jour automatiques desktop (Tauri updater) et Android (GitHub Releases)
- Règles Cursor pour cohérence du projet
- CI GitHub Actions (build + release)
