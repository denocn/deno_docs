<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 12370bde632ecbaf40205def911e6290032d8f6f

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
