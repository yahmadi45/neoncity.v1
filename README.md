# NeoCityOS

NeoCityOS is a cyberpunk-inspired, browser-based desktop environment built with HTML, CSS, and vanilla JavaScript. It brings educational tools, games, productivity utilities, and a DevOps demo dashboard together in one static web application.

<p align="center">
  <a href="https://yahmadi45.github.io/neoncity.v1/">
    <img src="https://img.shields.io/badge/Open%20NeoCityOS-%2300d9e8?style=for-the-badge&labelColor=101522&color=00d9e8" alt="Open NeoCityOS" />
  </a>
</p>

## Project status

The app runs as a static website, directly in a browser or in an Nginx Docker container. The repository includes a Dockerfile, Docker Compose setup, a health endpoint, and a GitHub Actions workflow that builds the image and smoke-tests the site. The DevOps Control Room is a frontend demo: pipeline runs, service metrics, deployment actions, and event logs are local sample data, not connected to GitHub Actions or production infrastructure. No deployment to a public server is performed by this repository's CI workflow.

## Evolution milestones

This project began as a functioning web application, not an empty repository. The repository history starts on July 16, 2025; its initial application upload already contained the desktop UI, apps, games, assets, and user documentation. The DevOps setup was added later, with the dashboard and container workflow merged into `main` in November 2026. These are commit milestones, not release tags.

| Stage | Commit | What changed |
| --- | --- | --- |
| **1. First application upload** | [`31151cd`](https://github.com/yahmadi45/neoncity.v1/commit/31151cdab7dd00458466f9589bb250e5764de7e9) | Added the working NeoCityOS site, its apps and games, media, and app guides. |
| **2. Earlier README and demo updates** | [`4608997`](https://github.com/yahmadi45/neoncity.v1/commit/4608997) | Improved the project overview and links to its existing browser demos. |
| **3. Landing page** | [`1782b00`](https://github.com/yahmadi45/neoncity.v1/commit/1782b00) | Added a separate welcome page with project features, media, and navigation to the desktop. |
| **4. Current project README baseline** | [`d24e0af`](https://github.com/yahmadi45/neoncity.v1/commit/d24e0afa7e42c2748c7ff7c4612061c910db0604) | Updated the existing project introduction and feature overview. |
| **5. Container and CI** | [`136abd6`](https://github.com/yahmadi45/neoncity.v1/commit/136abd61cf72de2cd4ab421ae5d77b910b3b81ff) | Added an Nginx Docker image, Compose service, health check, and GitHub Actions build and smoke tests. |
| **6. DevOps dashboard merged** | [`9b3514f`](https://github.com/yahmadi45/neoncity.v1/commit/9b3514f0a02dc814cc64cae650d789ddc108107e) | Merged the dashboard, application registration, styles, and container CI into `main`. |

## Features

- Cyberpunk desktop with login, taskbar, animated interface, and app windows.
- Education tools for algorithms, data structures, and text analysis.
- Games including dice, memory, number guessing, puzzle solving, and Neon Jump.
- Browser-like app, file manager, store, local settings, and user state.
- DevOps Control Room with sample pipeline statuses, service-health cards, a response-time chart, and activity log.
- Interactive demo pipeline reruns and deployment button; these update sample data in the browser only.
- Static Nginx container with a health endpoint, Compose configuration, and CI smoke tests.

## Architecture

```text
Browser
  └── Static HTML / CSS / JavaScript
        ├── NeoCityOS desktop and browser-based apps
        ├── LocalStorage for demo state
        └── DevOps Control Room (sample data)

Docker Compose
  └── Nginx :8080 in container → host :8081 by default

GitHub Actions
  └── Build image → start container → smoke-test health, pages, dashboard assets
```

There is no application API or database. Accounts are a client-side experience, and dashboard activity is simulated; neither provides server-side authentication, remote pipeline access, or real deployments.

## Run with Docker

Requirements: Docker Desktop or Docker Engine with the Compose plugin.

From the repository root:

```powershell
docker compose up --pull always -d
```

- NeoCityOS: <http://localhost:8081>
- Health check: <http://localhost:8081/health>
- Open the DevOps icon on the desktop to view the control room.

The host port is configurable in `docker-compose.yml`; the container listens on port `8080`. Stop the app without deleting image data:

```powershell
docker compose down
```

Build and run without Compose:

```powershell
docker build -t neoncity:local .
docker run --rm -p 8081:8080 neoncity:local
```

## Run without Docker

Open `index.html` in a modern browser, or serve the repository root with a local static-file server. For the full desktop interaction, sign in using the client-side demo login. There is no backend to install.

## CI and checks

`.github/workflows/ci.yml` runs for pushes to `main` and pull requests targeting `main`. It builds the Docker image, starts Nginx, and checks the health endpoint, home page, landing page, DevOps JavaScript, and DevOps stylesheet. The workflow does not publish an image or deploy to a server.

Run the matching local checks from the repository root:

```powershell
node --check src/apps/devopsDashboard.js
node --check src/core/appManager.js
node --check src/core/appConfig.js
docker compose config --quiet
docker build -t neoncity:ci .
```

## DevOps dashboard scope

The DevOps Control Room currently demonstrates a dashboard layout and client-side interactions:

- Pipeline rows and their starting statuses are sample data, saved locally in browser storage after interaction.
- Rerunning a pipeline simulates a result after a short delay; it does not start a GitHub Actions run.
- Service uptime and response-time values are illustrations, not monitored measurements.
- Deploy release records a demo event only; it does not deploy the website.

To make it operate against real infrastructure, add a backend or trusted serverless API, authenticate users, connect provider APIs using server-side secrets, and return real pipeline, monitoring, and deployment data. Never put access tokens in browser JavaScript or commit secrets to the repository.

## Application guides

- [DevOps Control Room](#devops-dashboard-scope)
- [Store / NeoStore](src/README_APPS_GAMES/Store.md)
- [File Manager](src/README_APPS_GAMES/FileManager.md)
- [Browser](src/README_APPS_GAMES/Browser.md)
- [Algorithm Visualizer](src/README_APPS_GAMES/AlgorithmVisualizer.md)
- [Data Structures](src/README_APPS_GAMES/DataStructures.md)
- [Text Analyzer](src/README_APPS_GAMES/TextAnalyzer.md)
- [Dice Game](src/README_APPS_GAMES/DiceGame.md)
- [Advanced Dice](src/README_APPS_GAMES/AdvancedDice.md)
- [Memory Game](src/README_APPS_GAMES/MemoryGame.md)
- [Number Guesser](src/README_APPS_GAMES/NumberGuesser.md)
- [Puzzle Solver](src/README_APPS_GAMES/PuzzleSolver.md)
- [Neon Jump](src/README_APPS_GAMES/NeonJump.md)

## Workspace, branches, and pull requests

Keep the original `main` worktree clean. Start each task in a separate worktree and a small, focused branch; the helper fetches the latest `origin/main` and skips large Git LFS video downloads:

```powershell
.\scripts\new-workspace.ps1 -Branch feature/my-change
# or: .\scripts\new-workspace.ps1 -Branch fix/my-bug
```

The helper creates a sibling worktree under `neoncity-worktrees/` (or use `-Path` to choose a location). Make and test the change there, then commit and push only that feature branch:

```powershell
Set-Location ..\neoncity-worktrees\feature-my-change
node --check src\apps\devopsDashboard.js
docker compose config --quiet
docker build -t neoncity:check .
git add <changed-files>
git commit -m "Describe the focused change"
git push -u origin feature/my-change
```

Open a pull request from the feature branch to `main` and merge it after review and CI pass. **Do not push directly to `main` unless explicitly requested.** Keep each PR focused; do not include unrelated working-tree deletions or changes. GitHub Actions validates JavaScript syntax, Compose configuration, builds the image, and smoke-tests served endpoints.

When the PR is merged, refresh the original clean worktree using `git pull --ff-only origin main`. If the original worktree contains local changes, leave it untouched and refresh a separate clean worktree instead.

## Repository layout

```text
index.html                       NeoCityOS entry point
landing.html                     Welcome and project overview page
src/core/                        Desktop state, routing, app configuration
src/apps/                        Browser apps and DevOps dashboard
src/games/                       Browser games
src/styles/                      Desktop, app, component, and game styles
scripts/new-workspace.ps1         Safe feature branch and worktree helper
src/README_APPS_GAMES/           Guides for individual apps and games
assets/                          App icons, screenshots, and sound assets
Dockerfile                       Static Nginx image
nginx.conf                       Nginx site configuration and health route
docker-compose.yml               Local container setup; host port 8081
.github/workflows/ci.yml          Build and smoke-test workflow
```

## Security and deployment notes

- The login is a browser-side demo, not a security boundary or identity system.
- The dashboard has no backend integrations. Never treat its sample health, build, or deployment states as live production status.
- Nginx sets basic response headers; configure TLS, domain routing, access controls, and any security policy appropriate to your real deployment environment.
- GitHub Actions CI verifies a container build and local HTTP responses; it does not publish images or deploy a public site.
- This Compose service is a simple single-container static-site setup, not a multi-node production cluster.
- Do not bake secrets into the image or commit credentials, API keys, or tokens.
