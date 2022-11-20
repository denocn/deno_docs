<<<<<<< HEAD:linking_to_external_code/proxies.md
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 7ecb7fde3a161932f5b088758674cb2f5932f492:basics/modules/proxies.md

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
