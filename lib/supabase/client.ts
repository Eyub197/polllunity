import { createBrowserClient } from "@supabase/ssr"
import { Database } from "../types"

/**
 * Creates a Supabase client for the browser.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient<Database>} A client for the browser.
 */
export const createClient = (): import('@supabase/supabase-js').SupabaseClient<Database> => {
    /**
     * The Supabase client for the browser.
     *
     * @type {import('@supabase/supabase-js').SupabaseClient<Database>}
     */
    const client = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    /**
     * The client for the browser.
     *
     * @returns {import('@supabase/supabase-js').SupabaseClient<Database>} The client.
     */
    return client
}



