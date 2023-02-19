<<<<<<< HEAD:linking_to_external_code/proxies.md
## Proxies {#proxies}
=======
# Proxies
>>>>>>> ef7f667f545c3e19811127ceefdcc498f0b6c86a:basics/modules/proxies.md

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
