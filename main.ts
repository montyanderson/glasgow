import { serve } from "http/server";

import { config } from "./config.ts";
import { createServer } from "./lib/create-server.ts";

await serve(createServer(config), { port: config.port });
