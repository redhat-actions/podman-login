# podman-login
[![CI checks](https://github.com/redhat-actions/podman-login/workflows/CI%20checks/badge.svg)](https://github.com/redhat-actions/podman-login/actions?query=workflow%3A%22CI+checks%22)
[![Test Login and Pull](https://github.com/redhat-actions/podman-login/actions/workflows/example.yml/badge.svg)](https://github.com/redhat-actions/podman-login/actions/workflows/example.yml)
[![Link checker](https://github.com/redhat-actions/podman-login/workflows/Link%20checker/badge.svg)](https://github.com/redhat-actions/podman-login/actions?query=workflow%3A%22Link+checker%22)
<br>
<br>
[![tag badge](https://img.shields.io/github/v/tag/redhat-actions/podman-login)](https://github.com/redhat-actions/podman-login/tags)
[![license badge](https://img.shields.io/github/license/redhat-actions/podman-login)](./LICENSE)
[![size badge](https://img.shields.io/github/size/redhat-actions/podman-login/dist/index.js)](./dist)

Podman Login is a GitHub Action to log in to a container image registry.

After logging in, you can work with the registry as an authenticated user, performing actions such as pushing an image, or pulling a private image. On GitHub runners, the authentication will be deleted at the end of each job as the workspace is cleaned up.

Also see **[push-to-registry](https://github.com/redhat-actions/push-to-registry)** and **[buildah-build](https://github.com/redhat-actions/buildah-build)** for related actions that can make use of this authentication.

This action only runs on `Linux`, as it uses [podman](https://github.com/containers/Podman) to perform the log in. [GitHub's Ubuntu action runners](https://github.com/actions/virtual-environments#available-environments) come with Podman preinstalled. If you are not using those runners, you must first [install Podman](https://podman.io/getting-started/installation).

<a id="action-inputs"></a>

## Action Inputs

| Input Name | Description | Default |
| ---------- | ----------- | ------- |
| registry | Hostname/domain of the container image registry such as `quay.io`, `docker.io`. | **Must be provided**
| username | Username to log in against the container image registry. | **Must be provided**
| password | Password, encrypted password, or access token for `username`. | **Must be provided**
| tls-verify | Verify TLS certificates when contacting the registry. | `true`
| logout | By default, the action logs out of the container image registry at the end of the job (for self-hosted runners). Set this to `false` to disable this behaviour. | `true`
| auth_file_path | Path of the authentication file, this will override the default auth file path in podman | Default set in podman |

## Examples

The example below shows how the `podman-login` action can be used to log in to `quay.io` container image registry.

```yaml
name: Log in to Quay.io
on:
  push:

env:
  REGISTRY_USER: quayuser
  IMAGE_REGISTRY: quay.io
  REGISTRY_PASSWORD: ${{ secrets.REGISTRY_PASSWORD }}

jobs:
  login:
    name: Log in to image registry
    runs-on: ubuntu-20.04
    steps:

      - name: Log in to Quay.io
        uses: redhat-actions/podman-login@v1
        with:
          username: ${{ env.REGISTRY_USER }}
          password: ${{ env.REGISTRY_PASSWORD }}
          registry: ${{ env.IMAGE_REGISTRY }}

  # Now you can push images, and pull private ones, from quay.io as 'quayuser'.
```

Logging into GitHub's container registry is just as easy:

```yaml
name: Log in to ghcr.io
on:
  push:

env:
  REGISTRY_USER: ${{ github.actor }}
  REGISTRY_PASSWORD: ${{ github.token }}
  IMAGE_REGISTRY: ghcr.io/${{ github.repository_owner }}

jobs:
  login:
    name: Log in to GitHub Container Registry
    runs-on: ubuntu-20.04
    steps:
      - name: Log in to ghcr.io
        uses: redhat-actions/podman-login@v1
        with:
          username: ${{ env.REGISTRY_USER }}
          password: ${{ env.REGISTRY_PASSWORD }}
          registry: ${{ env.IMAGE_REGISTRY }}

  # Now you can push images, and pull private ones, from ghcr.io.
```

It is also possible to login to AWS ECR repositories:

```yaml
name: Log in to ECR
on:
  push:

env:
  REGISTRY_USER: ${{ secrets.AWS_ACCESS_KEY_ID }}
  REGISTRY_PASSWORD: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  IMAGE_REGISTRY: 123456789012.dkr.ecr.eu-west-1.amazonaws.com

jobs:
  login:
    name: Log in to AWS ECR Registry
    runs-on: ubuntu-20.04
    steps:
      - name: Log in to AWS ECR
        uses: redhat-actions/podman-login@v1
        with:
          username: ${{ env.REGISTRY_USER }}
          password: ${{ env.REGISTRY_PASSWORD }}
          registry: ${{ env.IMAGE_REGISTRY }}

  # Now you can push images, and pull private ones, from ECR.
```

Refer to the [GitHub documentation](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context) <!-- markdown-link-check-disable-line -->
for information about the `github` context object.
