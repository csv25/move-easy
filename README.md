# Move Easy Relocation Site

## Project goal

Move Easy is a lightweight website project for a relocation service. Based on the package name and server startup message, its intended purpose is to host the Move Easy website and deliver its pages, styling, scripts, and images to visitors.

The supplied files implement the website's serving and build infrastructure. The frontend content was not included, so specific services, page sections, contact forms, and other visitor-facing features cannot be confirmed from this snapshot.

## How the project is broken down

| Component | File or directory | Responsibility |
| --- | --- | --- |
| Website content | `public/` (expected; not supplied) | Holds `index.html`, stylesheets, browser JavaScript, and images. |
| HTTP server | `server.ts` | Receives browser requests and serves files from `public/` using Node.js built-in modules. |
| Project configuration | `package.json` | Defines the project name, development dependencies, and commands for running and building the server. |
| Dependency lockfile | `package-lock.json` | Records dependency versions and integrity information for reproducible installation. |
| TypeScript configuration | `tsconfig.json` | Enables strict checking and compiles the server into `dist/` using Node-compatible ES modules. |
| Build output | `dist/` (generated) | Contains the compiled server; the production server also expects website files in `dist/public/`. |

The uploaded filenames `package(1).json`, `server(1).ts`, and `tsconfig(1).json` should be restored to `package.json`, `server.ts`, and `tsconfig.json` when assembling the project. The existing scripts and compiler configuration reference these standard names.

### 1. Website layer

The frontend belongs in a `public/` directory beside `server.ts` during development. At minimum, it needs `public/index.html` for the home page. Additional HTML, CSS, JavaScript, and image files can be placed beneath that directory and requested by their paths.

The frontend is separate from the server: page layout and browser interactions belong in the public files, while `server.ts` handles file delivery.

### 2. Server layer

`server.ts` uses `node:http`, `node:fs/promises`, `node:path`, and `node:url`; no external server framework is declared.

For each request, the server:

1. Maps the exact URL `/` to `/index.html`.
2. Removes the query string before resolving the requested file path.
3. Normalizes the path and checks that it remains inside the public directory, returning `403 Forbidden` if the check fails.
4. Reads the requested file and responds with its contents.
5. Sets a content type for HTML, CSS, JavaScript, SVG, PNG, and JPG files; other extensions use `application/octet-stream`.
6. Returns `404 Not found` when the file cannot be read.

The port defaults to `3000` and can be changed with the `PORT` environment variable. This server supplies static files; the provided code does not implement application API routes, database access, authentication, or form-submission processing.

### 3. Development and build tooling

- **TypeScript** checks and compiles the server.
- **tsx** runs `server.ts` directly during development.
- **@types/node** supplies TypeScript definitions for Node.js APIs.
- **npm** manages dependencies and provides the project commands.

The TypeScript configuration targets ES2022, uses `NodeNext` module settings, enables strict checking, and compiles only `server.ts` into `dist/`. The package uses ES modules through `"type": "module"`.

## Getting started

Use a Node.js installation compatible with the locked development dependencies, along with npm. No Node.js version is explicitly pinned in the supplied project configuration.

1. Restore the standard filenames described above.
2. Add the website files under `public/`, including `public/index.html`.
3. Install dependencies:

   ```bash
   npm ci
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in a browser.

`npm run dev` runs the server once through `tsx`; the supplied command does not enable watch mode or automatic restart.

## Available commands

| Command | What it does |
| --- | --- |
| `npm ci` | Installs dependencies from the lockfile. |
| `npm run dev` | Runs `server.ts` directly with `tsx`. |
| `npm run build` | Runs `tsc` to compile the server to `dist/server.js`. |
| `npm start` | Runs the compiled server with Node.js. |

## Building and running the compiled version

```bash
npm run build
```

Before starting the compiled server, copy the **entire `public/` directory** into `dist/public/`. The server resolves its public directory relative to its own file, so development uses `public/`, while `dist/server.js` uses `dist/public/`.

The current build command compiles TypeScript only; it does **not** copy static assets. Without that copy, requests to the compiled server will return `404` even if the original `public/` directory exists.

Once the assets are in place:

```bash
npm start
```

## Current scope

This snapshot contains the server, package manifest, dependency lockfile, and TypeScript configuration. It does not include frontend assets, automated tests, a test script, or deployment configuration. Add the public website files to make the site usable, and include static-asset copying in the build or deployment process when running the compiled server.
