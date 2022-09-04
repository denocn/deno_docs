<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> fb396696b70771d0106df0f916864260e4676579

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
