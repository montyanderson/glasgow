<div align="center">
	<img src="./logo.svg" alt="glasgow" width="100%">

> Lean image-resizing service built with Deno + TypeScript. Created for IPFS.

</div>

## about

Glasgow was built to transform large, high-quality images from an upstream
service into fast, digestable smaller ones, on the fly.

We use an in-process cache to avoid needlessly recompressing images and
increasing latency. The cache stores the `Promise` to a result, so two requests
in short succession will only hit the upstream service once.

## assumptions

The motivation for Glasgow was to run quietly over an IPFS gateway. Accordingly,
Glasgow assumes that image paths are immutable, that `monty.jpg` will only ever
resolve to one image. This means that the service will never re-request an image
from upstream if it exits in the cache and is only suitable for use cases where
the content of a path does not change.

## usage

Create `config.ts` and add your configuration.

```typescript
import { Config } from "./types/config.ts";

export const config: Config = {
  port: 8000,
  upstream: "https://my-server/my-images/",
  routes: {
    microscopic: {
      size: 5,
    },
    small: {
      size: 150,
    },
    medium: {
      size: 500,
    },
    large: {
      size: 1000,
    },
  },
};
```

Run.

```
deno task start
```

`http://localhost:8000/microscopic/monty.jpg` now shows a resized version of
`http://my-server/my-images/monty.jpg`.
