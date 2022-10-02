<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 7dee5f33649837999b1b639c15b990616761bf6e

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
