export type HardcodedOrderStatus =
  | "pending"
  | "pending_payment"
  | "waiting_verify"
  | "approved"
  | "processing"
  | "completed"
  | "rejected"
  | "expired";

export interface HardcodedOrder {
  orderId: string;
  code: string;
  status: HardcodedOrderStatus;
  game: string;
  gameUserId?: string;
  gameZoneId?: string;
  adminNote?: string;
  requiresActivation?: boolean;
  activationAmountText?: string;
  createdAt: string;
}

const DEFAULT_HARDCODED_CONFIG = {
  status: "pending" as const,
  requiresActivation: true,
  activationAmountText: "Rp. 99,123",
  adminNote: "Butuh aktivasi senilai Rp. 99,123",
  createdAt: "2026-11-25T07:48:00.000Z",
};

/**
 * Daftar kode pesanan hardcode untuk menu Lacak Order (/cek-order).
 */
export const HARDCODED_ORDERS: HardcodedOrder[] = [
  {
    orderId: "RBX-121712-ORDER",
    code: "RBX-121712-ORDER",
    game: "roblox",
    ...DEFAULT_HARDCODED_CONFIG,
  },
  {
    orderId: "MLB-121712-ORDER",
    code: "MLB-121712-ORDER",
    game: "mlbb",
    ...DEFAULT_HARDCODED_CONFIG,
  },
  {
    orderId: "FF-121712-ORDER",
    code: "FF-121712-ORDER",
    game: "freefire",
    ...DEFAULT_HARDCODED_CONFIG,
  },
  {
    orderId: "PBG-121712-ORDER",
    code: "PBG-121712-ORDER",
    game: "pubg",
    ...DEFAULT_HARDCODED_CONFIG,
  },
  {
    orderId: "FCM-121712-ORDER",
    code: "FCM-121712-ORDER",
    game: "fcmobile",
    ...DEFAULT_HARDCODED_CONFIG,
  },
];

export function findHardcodedOrder(query: string): HardcodedOrder | null {
  const normalized = query.trim().toUpperCase();
  if (!normalized) return null;

  return (
    HARDCODED_ORDERS.find(
      (item) =>
        item.code.toUpperCase() === normalized ||
        item.orderId.toUpperCase() === normalized
    ) ?? null
  );
}
