<<<<<<< HEAD:linking_to_external_code/proxies.md
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 2d6f924b853c8d0668a46367553894967aa615c1:basics/modules/proxies.md

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
