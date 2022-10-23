<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 9a894fd4f866dd1bc7416a6e4c3a307ff43037b6

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
