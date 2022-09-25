<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 7a1a1f920f063b84c08e0d5f4ac547d80b9ecc8c

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
