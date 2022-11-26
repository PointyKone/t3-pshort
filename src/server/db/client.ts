// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import { createClient } from '@supabase/supabase-js'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}


const options = {
  db: {

    schema: 'public',

  },

  auth: {

    autoRefreshToken: true,

    persistSession: true,

    detectSessionInUrl: true

  }
}

const supabaseUrl = 'https://rmtxrknumvkqbufnysqp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
let supabase;
if (supabaseKey && supabaseUrl) {
  supabase = createClient(supabaseUrl, supabaseKey, options)
} else {
  console.log("Please make sure a supabase URL and Key are set.")
}

export {supabase};