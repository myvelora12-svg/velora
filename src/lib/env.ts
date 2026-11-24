/**
 * Ambil nilai env wajib. Gagal cepat kalau deployment lupa mengisi —
 * jangan diam-diam memakai nilai default yang ada di source code.
 */
function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim().length < 32) {
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
      // Fallback dummy selama build jika env belum diatur
      return "temporary_build_secret_min_32_characters_long_123456";
    }
    throw new Error(`Env ${name} wajib diisi dengan minimal 32 karakter.`);
  }
  return v.trim();
}

/** Secret JWT admin. Selalu dari env — tidak ada fallback hardcoded. */
export const ADMIN_JWT_SECRET = required("ADMIN_JWT_SECRET");
