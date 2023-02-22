---
layout: ../../layouts/BlogPost.astro
title: "Building a file system router for Deno, part 1: the basics"
time: 10
date: Feb 16, 2023
description: File system routing is a popular approach taken by modern meta-frameworks like Next.js, SvelteKit, and Fresh.  So how does it work?
tags: [deno, deno deploy, filesystem routing]
---

# Building a file system router, part 1

These days, one of the more popular approaches to handling routing in apps is **file system routing**. Generally speaking, a file system router takes a root directory as input, and generates routes for your application based on the directory structure of the given directory and all of its children.

This is often very convenient, and allows for quick iteration of routes - especially in an application with a lot of pages. This approach has been popularized by meta-frameworks like [Next](https://nextjs.org/), [Nuxt](https://nuxtjs.org/), [SvelteKit](https://kit.svelte.dev/), [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart), etc. The list goes on and on...

We'll be building this router in Typescript, specifically for the [Deno](https://deno.land/) runtime. Deno is fast, easy to use, has great tooling, and has a large and useful standard library. We also want to be able to deploy to [Deno Deploy](https://deno.com/deploy), which is the first party deployment solution created and backed by the Deno company. Deno Deploy is the defacto way to deploy Deno based-projects, and is a "javascript container" based system built on top of V8 isolates. It functions in a similar way to [Cloudflare Workers](https://workers.cloudflare.com/).

## Example, please

So what the heck does this look like in practice? We'll be building a simple file system router that can handle basic directory shapes:

```javascript
my-app/
├─ pages/
│  ├─ blog/
│  │  ├─ post1.ts
│  │  ├─ post2.ts
│  ├─ about.ts
│  ├─ index.ts
├─ mod.ts
```

In this case, the **pages/** directory is the root directory from which we'll create our routes. **mod.ts** will be the entry point file from which we'll start the router.

Based on the structure of the **pages/** directory, we should end up with routes like this:

| File                | Route       |
| ------------------- | ----------- |
| pages/blog/post1.ts | /blog/post1 |
| pages/blog/post2.ts | /blog/post2 |
| pages/about.ts      | /about      |
| pages/index.ts      | /           |

Note that **pages/index.ts** is transformed into a route with path **/**, and not **/index**. Since you can't represent the route **/** with an empty file name, it's common convention to use **index.ts**. As if that file name wasn't already overloaded enough!

More sophisticated file system routers will also handle things like advanced pattern matching and middleware, but that will be out of scope for the purpose of this post (more to come in the future!)

## Defining route handlers

Each file in the pages directory will export as its default export a function takes a [**Request**](https://developer.mozilla.org/en-US/docs/Web/API/Request) object and returns a [**Response**](https://developer.mozilla.org/en-US/docs/Web/API/Response) object:

```typescript
// pages/index.ts
export default (req: Request): Response => {
  return new Response("Hello world!");
};
```

```typescript
// pages/blog/post1.ts
export default (req: Request): Response => {
  return new Response("Hello from blog post 1!");
};
```

Both **Request** and **Response** are part of the standard web API. Thankfully, Deno supports (and embraces) web standards!

## Our entry point

Let's start from the top down. We'll start the file system router by running **mod.ts**. We can use Deno's standard [http server](https://deno.land/std@0.177.0/http/server.ts?s=serve) which expects a [**Handler**](https://deno.land/std@0.177.0/http/server.ts?s=Handler) as its first argument. Conveniently, a **Handler** is just a function that takes a **Request** object and returns a **Response** object. Keen eyes will notice that this is a similar shape to our file route handlers as defined above.

```typescript
// mod.ts
import { serve, type Handler } from "https://deno.land/std/http/server.ts";

const fsHandler: Handler = (req, ...rest) {
  return new Response();
}

serve(fsHandler);
```

The **Handler** type can receive more than one input parameter. We only care about the first parameter (the **Request**) for now. We'll use a spread to reference the rest of the arguments as **...rest** for now.

We'll also provide our router's root directory to our script by passing it in as a command line argument. We can easily do this with [**Deno.args**](https://examples.deno.land/command-line-arguments):

```typescript
// mod.ts
import { serve } from "https://deno.land/std/http/server.ts";

const rootDir = Deno.args[0];

const fsHandler: Handler = (req, ...rest) {
  return new Response();
}

serve(fsHandler);
```

Now, running this file with the command **"deno run mod.ts ./pages"** will start Deno's http server with the handler we've provided. But right now, the handler we've provided does nothing. Onwards!

## Step 1: discovering routes

So we've defined how each route will handle requests, but we still need a way of discovering the files on disk. For this, we can use Deno's [**fs.walk**](https://deno.land/std/fs/walk.ts) function from the standard library.

```typescript
// mod.ts
import {
  serve,
  type Handler,
} from "https://deno.land/std/http/server.ts";
import {
  walk,
  type WalkOptions,
  type WalkEntry,
} from "https://deno.land/std/fs/walk.ts";

const rootDir = Deno.args[0];

async function discoverFiles(rootDir: string): Promise<WalkEntry[]> {
  const walkOptions: WalkOptions = {
    // Exclude directories when walking the filesystem.  We only care
    // about files which have declared handlers in them.
    includeDirs: false,

    // Only allow typescript files because they are the only files
    // which will have actual handler definitions.
    exts: [".ts"],
  };

  const entries: WalkEntry[] = [];
  for await (const entry of walk(rootDir, walkOptions)) {
    entries.push(entry);
  }

  return entries;
}

// Step 1: Use fs.walk to discover file system entries
const entries = await discoverFiles(rootDir);

const fsHandler: Handler = (req, ...rest) {
  return new Response();
}

serve(fsHandler);
```

Here, we've added a **discoverFiles** function. This function takes our root directory and passes it to **fs.walk**. We then collect all of the results from **fs.walk** and return them as an array of [**fs.WalkEntry**](https://deno.land/std/fs/walk.ts?s=WalkEntry) objects.

At this point, all we've done is walked the file system to discover some information about the files we've supplied. You can check out the Deno documentation to see the full type information for **fs.WalkEntry**, but for now just know that the results will look something like this:

```typescript
[
  {
    path: "pages/blog/post1.ts",
    name: "post1.ts",
    isFile: true,
    isDirectory: false,
    isSymlink: false,
  },
  {
    path: "pages/blog/post2.ts",
    name: "post2.ts",
    isFile: true,
    isDirectory: false,
    isSymlink: false,
  },
  // ...etc
];
```

## Step 2: generating a handler mapping

Remember that each route file exports a **Handler** type as its default export. We will access handlers as defined in each file by dynamically importing the file and accessing its default export.

For convenience, we'll need a way to store each route in memory alongside its corresponding **Handler** function. We can use the built-in [**Map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) type for this.

```typescript
// mod.ts
import {
  serve,
  type Handler,
} from "https://deno.land/std/http/server.ts";
import {
  walk,
  type WalkOptions,
  type WalkEntry,
} from "https://deno.land/std/fs/walk.ts";
import { extname, relative } from "https://deno.land/std/path/mod.ts";

const rootDir = Deno.args[0];

async function discoverFiles(rootDir: string): Promise<WalkEntry[]> {
  const walkOptions: WalkOptions = {
    // Exclude directories when walking the filesystem.  We only care
    // about files which have declared handlers in them.
    includeDirs: false,

    // Only allow typescript files because they are the only files
    // which will have actual handler definitions.
    exts: [".ts"],
  };

  const entries: WalkEntry[] = [];
  for await (const entry of walk(rootDir, walkOptions)) {
    entries.push(entry);
  }

  return entries;
}

// Store each file route as a route name -> Handler pair
type HandlerMap = Map<string, Handler>;

async function generateHandlerMap(
  rootDir: string,
  entries: WalkEntry[]
): Promise<HandlerMap> {
  function sanitizePath(path: string) {
    const ext = extname(path);

    path = path.slice(0, -ext.length);
    path = relative(rootDir, path);

    if (path.endsWith("index")) {
      path = path.slice(0, -"index".length);
    }

    return `/${path}`;
  }

  const handlerMap: HandlerMap = new Map();
  for (const entry of entries) {
    const route = sanitizePath(entry.path);

    const importPath = `./${entry.path}`;
    const handler = (await import(importPath)).default;

    handlerMap.set(route, handler);
  }

  return handlerMap;
}

// Step 1: Use fs.walk to discover file system entries
const entries = await discoverFiles(rootDir);

// Step 2: Generate a mapping from route paths to Handlers
const handlerMap = await generateHandlerMap(rootDir, entries);

const fsHandler: Handler = (req, ...rest) {
  return new Response();
}

serve(fsHandler);
```

There is a fair bit to unpack here:

1. We've added a **HandlerMap** type which is simply a **Map** with a **string** type (the route) as its key and a **Handler** as its corresponding value.

2. We've added a **generateHandlerMap** function which takes our root directory and the file information we discovered in the previous step. This function iterates through the file information and adds key/value pairs to the handler map. The keys are the sanitized route names as derived from the file names, and the values are the route handlers dynamically imported from each file.

3. Within **generateHandlerMap**, we do some sanitization on the paths returned from **fs.walk**. This is important so we can store the route names as they will be processed by the browser. We need to remove the file extension from the file name as well as remove any trailing **"index"** substrings that may be present. For example, the file path **"pages/blog/post2.ts"** as returned from **fs.walk** will be changed to the final route name **"/blog/post2"**.

## Step 3: matching routes at run-time

We're almost done! We've now got a mapping from route names to their corresponding handlers, which will prove very useful. All that's left to do is to finish our **fsHandler** function which is passed to the Deno standard library's **http.serve**.

```typescript
// mod.ts
import { serve, type Handler } from "https://deno.land/std/http/server.ts";
import {
  walk,
  type WalkOptions,
  type WalkEntry,
} from "https://deno.land/std/fs/walk.ts";
import { extname, relative } from "https://deno.land/std/path/mod.ts";

const rootDir = Deno.args[0];

async function discoverFiles(rootDir: string): Promise<WalkEntry[]> {
  const walkOptions: WalkOptions = {
    // Exclude directories when walking the filesystem.  We only care
    // about files which have declared handlers in them.
    includeDirs: false,

    // Only allow typescript files because they are the only files
    // which will have actual handler definitions.
    exts: [".ts"],
  };

  const entries: WalkEntry[] = [];
  for await (const entry of walk(rootDir, walkOptions)) {
    entries.push(entry);
  }

  return entries;
}

// Store each file route as a route name -> Handler pair
type HandlerMap = Map<string, Handler>;

async function generateHandlerMap(
  rootDir: string,
  entries: WalkEntry[]
): Promise<HandlerMap> {
  function sanitizePath(path: string) {
    const ext = extname(path);

    path = path.slice(0, -ext.length);
    path = relative(rootDir, path);

    if (path.endsWith("index")) {
      path = path.slice(0, -"index".length);
    }

    return `/${path}`;
  }

  const handlerMap: HandlerMap = new Map();
  for (const entry of entries) {
    const route = sanitizePath(entry.path);

    const importPath = `./${entry.path}`;
    const handler = (await import(importPath)).default;

    handlerMap.set(route, handler);
  }

  return handlerMap;
}

// Step 1: Use fs.walk to discover file system entries
const entries = await discoverFiles(rootDir);

// Step 2: Generate a mapping from route paths to Handlers
const handlerMap = await generateHandlerMap(rootDir, entries);

// Step 3: Match routes at run-time
const fsHandler: Handler = async (req, ...rest) => {
  const route = new URL(req.url).pathname;
  const handler = handlerMap.get(route);

  if (!handler) {
    return new Response("404");
  }

  const response = await handler(req, ...rest);
  return response;
};

serve(fsHandler);
```

The logic here is simple. When a **Request** comes in from the browser, we check the path name from the URL. If the route exists in our **HandlerMap**, it means that we should route the request to the corresponding **Handler** from the map. If the route does not exist in our **HandlerMap**, it means that a file for this route does not exist. In that case, we can just return a 404 response.

Notice that since **fsHandler** is of type **Handler**, and our defined handler functions from each file also satisfy the same type, we can directly pass through the rest of the arguments using **...rest**. (If you're curious, the second argument to the **Handler** type is a [**ConnInfo**](https://deno.land/std/http/server.ts?s=ConnInfo) object, which holds some information about the underlying socket connection).

## Next steps

And that's it! We've got a simple, working file system router. As mentioned previously, this router is quite rudimentary: features such as middleware and dynamic path matching are commonplace in more sophisticated file system routers. Check out [justinawrey/fsrouter](https://github.com/justinawrey/fsrouter) for an example of a file system router that does a little bit more than the basics.

But wait... we've got a problem. When running this code in **Deno Deploy**, we encounter an error:

> TypeError: Dynamic import is not enabled in this context.

Uh-oh. **Deno Deploy** doesn't support dynamic imports. We need to figure out a way to get around this limitation. Stay tuned for part 2.
