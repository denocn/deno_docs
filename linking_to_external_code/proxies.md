<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 05d0ca36aa490597a12af0312dc76ca7ad39aaa1

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
