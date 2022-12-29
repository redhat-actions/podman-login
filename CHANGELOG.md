# podman-login Changelog

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
