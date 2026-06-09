import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdwslmsinhaysuohylof.supabase.co';
const supabaseKey = 'sb_publishable_JtOClg22zP57CteFnVSLrQ_5p0WjxTv';

// For backwards compatibility (publishToSupabase uses this)
export const supabase = createClient(supabaseUrl, supabaseKey);

export const TABLE_NAME = 'portfolio_settings';
export const ROW_ID = 'main';

// ── Direct REST fetch — works in incognito ──
export const SUPABASE_URL = supabaseUrl;
export const SUPABASE_KEY = supabaseKey;

/**
 * مستقیم با fetch به REST API صدا بزن
 * این روش در incognito و حالت‌های محدود کار می‌کنه
 */
export async function fetchPortfolioDirect(timeoutMs: number = 8000): Promise<any> {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?id=eq.${ROW_ID}&select=data`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Accept': 'application/json',
      },
      signal: controller.signal,
      // ضروری برای incognito — بدون credentials
      credentials: 'omit',
      mode: 'cors',
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    // Supabase REST برمی‌گردونه array
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (e) {
    clearTimeout(timeoutId);
    throw e;
  }
}

/**
 * مستقیم با fetch upsert کن (برای publishToSupabase)
 */
export async function upsertPortfolioDirect(data: any, timeoutMs: number = 10000): Promise<{ success: boolean; error?: string }> {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({ id: ROW_ID, data }),
      signal: controller.signal,
      credentials: 'omit',
      mode: 'cors',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      return { success: false, error: `HTTP ${response.status}: ${errText}` };
    }
    return { success: true };
  } catch (e: any) {
    clearTimeout(timeoutId);
    return { success: false, error: e?.message || 'Unknown error' };
  }
}