# buildah-build
[![CI checks](https://github.com/redhat-actions/podman-login/workflows/CI%20checks/badge.svg)](https://github.com/redhat-actions/podman-login/actions?query=workflow%3A%22CI+checks%22)
[![Build](https://github.com/redhat-actions/podman-login/workflows/Test%20Login/badge.svg)](https://github.com/redhat-actions/podman-login/actions?query=workflow%3ABuild)
[![Link checker](https://github.com/redhat-actions/podman-login/workflows/Link%20checker/badge.svg)](https://github.com/redhat-actions/podman-login/actions?query=workflow%3A%22Link+checker%22)
<br>
<br>
[![tag badge](https://img.shields.io/github/v/tag/redhat-actions/podman-login)](https://github.com/redhat-actions/podman-login/tags)
[![license badge](https://img.shields.io/github/license/redhat-actions/podman-login)](./LICENSE)
[![size badge](https://img.shields.io/github/size/redhat-actions/podman-login/dist/index.js)](./dist)

Podman login is a GitHub Action to login against a container image registry.

This action only runs on Linux, as it uses [podman](https://github.com/containers/Podman) to perform the login. [GitHub's Ubuntu action runners](https://github.com/actions/virtual-environments#available-environments) come with Podman preinstalled. If you are not using those runners, you must first [install Podman](https://podman.io/getting-started/installation).

After logging to container image registry, you may use [push-to-registry](https://github.com/redhat-actions/push-to-registry) to push the image and make it pullable.

<a id="action-inputs"></a>

## Action Inputs

| Input Name | Description | Default |
| ---------- | ----------- | ------- |
| registry | Server URL of the container image registry. Example: `quay.io` | **Must be provided**
| username | Username to login against the container image registry. | **Must be provided**
| password | Password or token to login against the container image registry. | **Must be provided**
| logout | Set to `false` if you don't want to logout to container image registry at the end of the job. | `true`

## Example

The example below shows how the `podman-login` action can be used to login to `quay.io` container image registry.

```yaml
name: Login to Quay.io
on:
  push:

env:
  REGISTRY_USER: ${{ secrets.REGISTRY_USER }}
  IMAGE_REGISTRY: quay.io
  REGISTRY_PASSWORD: ${{ secrets.REGISTRY_PASSWORD }}

jobs:
  login:
    name: Login to container image registry
    runs-on: ubuntu-20.04
    steps:

      - name: Login to Quay.io
        uses: redhat-actions/podman-login@v1
        with:
          username: ${{ env.REGISTRY_USER }}
          password: ${{ env.REGISTRY_PASSWORD }}
          registry: ${{ env.IMAGE_REGISTRY }}
          logout: false # Do not logout at the end of the job
```
