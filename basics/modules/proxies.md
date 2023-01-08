<<<<<<< HEAD:linking_to_external_code/proxies.md
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 8dcda584e4b56cd8c0ab149928e07661159e01d3:basics/modules/proxies.md

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
