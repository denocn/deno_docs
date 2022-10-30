<<<<<<< HEAD
## Proxies {#proxies}
=======
# Proxies
>>>>>>> 33d3dcb8cdf7deaae53f3216ea91a21ca8453a60

Deno supports proxies for module downloads and the Web standard `fetch` API.

Proxy configuration is read from environmental variables: `HTTP_PROXY`,
`HTTPS_PROXY` and `NO_PROXY`.

In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
