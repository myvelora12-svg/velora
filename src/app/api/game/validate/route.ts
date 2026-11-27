import { NextRequest, NextResponse } from "next/server";

type ValidationStatus = "valid" | "not_found" | "format_only" | "unavailable";
type ValidationSource = "official" | "community" | "format";

interface ValidationResponse {
  status: ValidationStatus;
  nickname?: string;
  username?: string;
  region?: string;
  avatarUrl?: string;
  message?: string;
  source: ValidationSource;
}

const WINDOW_MS = 60_000;
const MAX_REQ = 30;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const rec = hits.get(key);
  if (!rec || rec.reset <= now) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_REQ;
}

function safeParseJson(text: string): Record<string, any> | null {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

async function validateRoblox(usernameInput: string): Promise<ValidationResponse> {
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(usernameInput)) {
    return {
      status: "not_found",
      message: "Format username Roblox tidak valid (3–20 karakter, huruf/angka/underscore).",
      source: "official",
    };
  }

  try {
    const res = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [usernameInput], excludeBannedUsers: false }),
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      return {
        status: "unavailable",
        message: "Server Roblox sedang sibuk. Anda tetap bisa melanjutkan pesanan.",
        source: "official",
      };
    }

    const data = safeParseJson(await res.text());
    const list = Array.isArray(data?.data) ? data.data : [];
    if (list.length === 0) {
      return {
        status: "not_found",
        message: "Username Roblox tidak ditemukan. Periksa kembali ejaan Anda.",
        source: "official",
      };
    }

    const user = list[0];
    let avatarUrl: string | undefined;

    if (user?.id) {
      try {
        const avatarRes = await fetch(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${encodeURIComponent(String(user.id))}&size=150x150&format=Png&isCircular=false`,
          { signal: AbortSignal.timeout(4000) }
        );
        if (avatarRes.ok) {
          const avatarJson = safeParseJson(await avatarRes.text());
          const url = avatarJson?.data?.[0]?.imageUrl;
          if (typeof url === "string" && url.startsWith("https://")) {
            avatarUrl = url;
          }
        }
      } catch {
        // Avatar failure must not break validation
      }
    }

    const name = typeof user?.name === "string" ? user.name : usernameInput;
    const displayName =
      typeof user?.displayName === "string" && user.displayName.trim()
        ? user.displayName.trim()
        : name;

    return {
      status: "valid",
      nickname: displayName,
      username: name,
      avatarUrl,
      source: "official",
    };
  } catch {
    return {
      status: "unavailable",
      message: "Server Roblox sedang sibuk. Anda tetap bisa melanjutkan pesanan.",
      source: "official",
    };
  }
}

async function validateMlbb(userId: string, zoneId: string): Promise<ValidationResponse> {
  if (!/^\d{5,20}$/.test(userId) || !/^\d{3,10}$/.test(zoneId)) {
    return {
      status: "not_found",
      message: "User ID dan Server/Zone ID harus berupa angka.",
      source: "format",
    };
  }

  try {
    const res = await fetch(
      `https://api.isan.eu.org/nickname/ml?id=${encodeURIComponent(userId)}&zone=${encodeURIComponent(zoneId)}`,
      { signal: AbortSignal.timeout(6000) }
    );
    const text = await res.text();
    const json = safeParseJson(text);

    if (res.ok && json?.success === true && typeof json?.name === "string" && json.name.trim()) {
      const region =
        typeof json.country === "string" && json.country.trim()
          ? json.country.trim()
          : undefined;
      return {
        status: "valid",
        nickname: json.name.trim(),
        region,
        source: "community",
      };
    }

    if (json && json.success === false) {
      return {
        status: "not_found",
        message: "Akun MLBB tidak ditemukan. Periksa kembali ID & Server Anda.",
        source: "community",
      };
    }

    return {
      status: "unavailable",
      message:
        "Verifikasi otomatis belum tersedia. Pastikan ID & Server benar — Anda tetap bisa melanjutkan pesanan.",
      source: "community",
    };
  } catch {
    return {
      status: "unavailable",
      message:
        "Verifikasi otomatis belum tersedia. Pastikan ID & Server benar — Anda tetap bisa melanjutkan pesanan.",
      source: "community",
    };
  }
}

async function validateFreeFire(userId: string): Promise<ValidationResponse> {
  if (!/^\d{5,20}$/.test(userId)) {
    return {
      status: "not_found",
      message: "Player ID Free Fire harus berupa angka.",
      source: "format",
    };
  }

  try {
    const res = await fetch(
      `https://api-cek-id-game-ten.vercel.app/api/check-id-game?type_name=free_fire&userId=${encodeURIComponent(userId)}`,
      { signal: AbortSignal.timeout(6000) }
    );
    const json = safeParseJson(await res.text());

    if (res.ok && json?.status === true) {
      const nick =
        json.data?.username ||
        json.data?.nickname ||
        json.data?.name ||
        json.username ||
        json.name;
      if (typeof nick === "string" && nick.trim()) {
        return {
          status: "valid",
          nickname: nick.trim(),
          source: "community",
        };
      }
    }

    if (res.ok && json?.status === false) {
      return {
        status: "not_found",
        message: "Player ID Free Fire tidak ditemukan. Periksa kembali ID Anda.",
        source: "community",
      };
    }

    return {
      status: "unavailable",
      message:
        "Format ID valid. Verifikasi nickname sedang tidak tersedia, Anda tetap bisa lanjut pesanan.",
      source: "community",
    };
  } catch {
    return {
      status: "unavailable",
      message:
        "Format ID valid. Verifikasi nickname sedang tidak tersedia, Anda tetap bisa lanjut pesanan.",
      source: "community",
    };
  }
}

function validateFormatOnly(game: string, userId: string): ValidationResponse {
  const valid =
    game === "pubg"
      ? /^\d{6,20}$/.test(userId)
      : /^[a-zA-Z0-9_-]{5,30}$/.test(userId);

  if (!valid) {
    return {
      status: "not_found",
      message: "Format ID belum sesuai. Periksa kembali ID akun game Anda.",
      source: "format",
    };
  }

  return {
    status: "format_only",
    message: "Format ID valid. Pastikan ID sudah sesuai profil game Anda.",
    source: "format",
  };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      { status: 429 }
    );
  }

  let body: { game?: unknown; userId?: unknown; zoneId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  const game = typeof body.game === "string" ? body.game.trim().toLowerCase() : "";
  const userId = typeof body.userId === "string" ? body.userId.trim().slice(0, 64) : "";
  const zoneId = typeof body.zoneId === "string" ? body.zoneId.trim().slice(0, 20) : "";

  if (!game || !userId) {
    return NextResponse.json(
      { error: "Parameter game dan userId wajib diisi." },
      { status: 400 }
    );
  }

  let result: ValidationResponse;
  switch (game) {
    case "roblox":
      result = await validateRoblox(userId);
      break;
    case "mlbb":
      if (!zoneId) {
        return NextResponse.json(
          { error: "Server/Zone ID wajib diisi untuk MLBB." },
          { status: 400 }
        );
      }
      result = await validateMlbb(userId, zoneId);
      break;
    case "freefire":
      result = await validateFreeFire(userId);
      break;
    case "pubg":
    case "fcmobile":
      result = validateFormatOnly(game, userId);
      break;
    default:
      return NextResponse.json({ error: "Game tidak dikenali." }, { status: 400 });
  }

  return NextResponse.json(result);
}
