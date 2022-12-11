<<<<<<< HEAD:linking_to_external_code/proxies.md
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 6a0eb6ff248beb3007c235c7ac29b5e82d65e143:basics/modules/proxies.md

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
