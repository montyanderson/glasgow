import { serve } from "http/server";

import { config } from "./config.ts";
import { createServer } from "./lib/create-server.ts";

const port = 8080;

await serve(createServer(config), { port });
