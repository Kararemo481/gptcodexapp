# gptcodexapp

A public work log dashboard for a Codex-assisted GitHub repository setup.

## Status

The published site tracks the repository's early setup work, merged pull requests, closed issues, validation state, and next useful follow-ups.

## Published Site

`https://kararemo481.github.io/gptcodexapp/`

## Local Preview

Open `index.html` in a browser to view the app locally.

## Project Shape

- `index.html` defines the dashboard markup.
- `styles.css` contains the responsive visual system.
- `scripts/app.js` renders activity and next-step data.
- `assets/workflow-map.svg` provides the workflow visual.
- `.github/workflows/validate.yml` checks the expected repository files.
- `.github/workflows/pages.yml` keeps a GitHub Actions Pages workflow available if the Pages source is switched back to Actions.

## Validation

The GitHub Actions workflow confirms that the expected dashboard files are present, then prints the repository file list.
