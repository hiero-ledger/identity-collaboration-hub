## Updating and Testing the Hedera DID Resolver

This guide explains how to update dependencies and code, run the resolver locally or in Docker, and test resolution requests end-to-end.

### Prerequisites
- **Bun** (recommended for local dev): see `https://bun.sh`
- **Docker** (optional) for containerized runs
- A terminal tool to make HTTP requests: `curl`, `httpie`, or a REST client

### Project Overview
- Entry point: `index.ts` (Elysia HTTP server)
- Resolve endpoint: `GET /1.0/identifiers/:identifier`
- Default port: `8080` (override with `PORT`)

### Run Locally with Bun
1. Install dependencies:
   ```bash
   bun install
   ```
2. Start the server (either command works):
   ```bash
   bun index.ts
   # or
   bun run start
   ```
3. Optional: change port
   ```bash
   PORT=3000 bun index.ts
   ```
4. Optional: hot reload during development
   ```bash
   bun --watch index.ts
   ```

### Build and Run with Docker
1. Build the image (from the repo root):
   ```bash
   docker build -t uni-resolver-driver-did-hedera .
   ```
2. Run the container:
   ```bash
   docker run --rm -p 8080:8080 uni-resolver-driver-did-hedera
   ```
3. Test it (see test commands below). If you update dependencies or code, rebuild the image.

### Updating the Resolver
- Update a dependency (e.g., `@hiero-did-sdk/resolver`) to latest:
  ```bash
  bun add @hiero-did-sdk/resolver@latest
  ```
- Install fresh after editing `package.json` manually:
  ```bash
  bun install
  ```
- Make code changes in `index.ts`. The route `GET /1.0/identifiers/:identifier` calls the resolver and returns:
  - `didDocument`
  - `didResolutionMetadata` (e.g., content type, retrieval time)
  - `didDocumentMetadata` (driver metadata from resolution)

### Testing the Resolver

#### Using curl (local Bun or Docker)
Use one of the example DIDs from the README. For example:
```bash
curl -s http://localhost:8080/1.0/identifiers/did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215 | jq
```

Expected top-level JSON fields:
- `didDocument`
- `didResolutionMetadata`
- `didDocumentMetadata`

### Troubleshooting
- Port already in use: change port with `PORT=3000 bun index.ts` or stop the other process.
- `404 Not Found`: DID cannot be located by the driver.
- `400` with message: likely an invalid DID or resolution input error.
- Docker changes not reflected: rebuild the image after updating code or `bun.lock`.
- Missing deps: re-run `bun install`.

### Notes for Contributors
- Keep the public API path aligned with Universal Resolver conventions: `/1.0/identifiers/:identifier`.
- If you add new routes or behavior, document them in `README.md` and update this page as needed.

### Plugging into the Universal Resolver

To run this driver inside the Universal Resolver deployment, use the container image published to GitHub Container Registry (GHCR) by this repo's GitHub Actions.

1) Find the latest image tag from GitHub Actions
- Go to this repository on GitHub → Actions → the latest successful build workflow.
- Open the job details and find the step labeled "output image tags".
- Copy the full image reference, e.g.:
  - `ghcr.io/hiero-ledger/uni-resolver-driver-did-hedera:v0.1.6-86a309b`

2) Update Universal Resolver docker-compose
- In your Universal Resolver checkout, open its `docker-compose.yml` and locate the service for this driver (or add one).
- Replace the image reference with the tag copied above. Example snippet:
  ```yaml
  services:
    driver-did-hedera:
      image: ghcr.io/hiero-ledger/uni-resolver-driver-did-hedera:v0.1.6-86a309b
      ports:
        - "8165:8080"
  ```

3) Update Universal Resolver README (optional but recommended)
- In the Universal Resolver repository, update its `README.md` where drivers are listed:
  - Add/replace the did:hedera driver image reference with the GHCR tag you copied.
  - Include a short example resolve URL if desired.

4) Restart Universal Resolver
```bash
docker compose pull
docker compose up -d --force-recreate
```

5) Test through Universal Resolver gateway
```bash
curl -s "http://localhost:8165/1.0/identifiers/<your-did-hedera>" | jq
```

Notes:
- Always prefer the exact GHCR tag from the "output image tags" step to ensure deterministic deployments.
- When a new version is published, repeat steps 1–2 to bump the image in Universal Resolver.


