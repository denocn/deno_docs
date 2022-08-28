<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> e4cf9dfb004690a9bb8624d61ca423827757e4ac

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
