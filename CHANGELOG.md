# podman-login Changelog

## v2.0

### Breaking Changes
- Upgrade `@actions/core` 1.x to 3.x, `@actions/exec` 1.x to 3.x, `@actions/io` 1.x to 3.x
- Auth file path is now detected from podman's `--verbose` output instead of being hardcoded. The fallback path is used only if detection fails.
- Registry input is now automatically lowercased to comply with OCI spec

### Bug Fixes
- Fix `registryLogout()` not cleaning up Docker config credentials in the post step ([#36](https://github.com/redhat-actions/podman-login/issues/36))
- Fix auth file path mismatch with podman 5.x which changed from `/tmp/podman-run-<uid>` to `/tmp/storage-run-<uid>` ([#47](https://github.com/redhat-actions/podman-login/issues/47))
- Fix ENOENT error when `~/.docker` directory does not exist ([#42](https://github.com/redhat-actions/podman-login/issues/42))

### Features
- Add `tls_verify` input to skip TLS certificate verification for self-signed registries
- Support AWS OIDC temporary credentials for ECR login via `AWS_SESSION_TOKEN` ([#37](https://github.com/redhat-actions/podman-login/issues/37))
- Automatically lowercase registry input to prevent OCI naming errors ([#44](https://github.com/redhat-actions/podman-login/issues/44))

### Dependency Upgrades
- TypeScript 5.x to 6.0.3
- ESLint 8 (EOL) to 10 with flat config
- `@aws-sdk/client-ecr` 3.535 to 3.1094
- `@vercel/ncc` 0.38 to 0.44
- Remove unused `@aws-sdk/util-base64`
- Resolve all npm audit vulnerabilities

### CI & Infrastructure
- Upgrade `actions/checkout` v6 to v7, `actions/setup-node` v6 to v7
- Add workflow-level `permissions: contents: read`
- Add concurrency groups to cancel redundant CI runs
- Pin `runs-on` to `ubuntu-24.04`
- Add Dependabot for npm and GitHub Actions updates
- Add SECURITY.md
- Enable secret scanning and push protection
- Remove deprecated CRDA vulnerability scan workflow

## v1.8
- Update action to run on Node24. https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

## v1.7
- Update action to run on Node20.https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20/

## v1.6
- Update action/core dependency to 1.10.0

## v1.5
- Update action to run on Node16. https://github.blog/changelog/2022-05-20-actions-can-now-run-in-a-node-js-16-runtime/

## v1.4
- Add ability to login to AWS ECR repositories. More details at https://github.com/redhat-actions/podman-login/issues/23

## v1.3
- Add support to provide custom auth file path instead of using default ones set by podman. More details [here](https://github.com/redhat-actions/podman-login/issues/19).
- Add `--verbose` flag in the login command that will give more detailed output.

## v1.2
- Add ability to pull image from docker after login. https://github.com/redhat-actions/podman-login/issues/15

## v1.1
- Set environment variable `REGISTRY_AUTH_FILE` with the generated auth file to work with buildah

## v1
- Initial Release
