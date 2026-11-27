"use client";

import { useState, useEffect } from "react";
import { formatRupiah, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Step3Payment } from "./Step3Payment";
import { Step4UploadProof } from "./Step4UploadProof";
import { Step5Success } from "./Step5Success";
import { createOrderAction, submitPaymentProofAction } from "@/app/actions/order";
import { Check, ArrowLeft, Loader2, Info, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import type { GameConfig } from "@/lib/games";

type AccountValidationState =
  | { state: "idle" }
  | { state: "loading" }
  | {
      state: "valid";
      nickname: string;
      username?: string;
      region?: string;
      avatarUrl?: string;
      source: "official" | "community";
    }
  | { state: "not_found"; message: string; source: "official" | "community" | "format" }
  | { state: "unavailable" | "format_only"; message: string };

interface DynamicCheckoutWizardProps {
  gameConfig: GameConfig;
  packages?: Array<{ id: string; name: string; price: number; amount?: number }>;
  rekeningList: Array<{ bank: string; nomor: string; atasNama: string }>;
  qrImageUrl?: string;
  initialPackageId?: string;
  defaultPackages?: Array<{ id: string; name: string; price: number; amount?: number }>;
  adminWhatsapp?: string;
}

export function DynamicCheckoutWizard({
  gameConfig,
  packages,
  rekeningList,
  qrImageUrl,
  initialPackageId,
  defaultPackages,
  adminWhatsapp,
}: DynamicCheckoutWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const availablePackages =
    packages && packages.length > 0
      ? packages
      : defaultPackages && defaultPackages.length > 0
      ? defaultPackages
      : [];

  const initialPkg = initialPackageId
    ? availablePackages.find((p) => p.id === initialPackageId) || availablePackages[0]
    : availablePackages[0];

  const [selectedPackage, setSelectedPackage] = useState(
    initialPkg || { id: "", name: "", price: 0, amount: 0 }
  );

  // Form inputs state
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    gameUserId: "",
    gameZoneId: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Created order data
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [proofToken, setProofToken] = useState("");
  const [validation, setValidation] = useState<AccountValidationState>({ state: "idle" });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (step !== 2) return;

    const userId = formData.gameUserId.trim();
    const zoneId = formData.gameZoneId.trim();

    const meetsThreshold =
      gameConfig.id === "roblox"
        ? userId.length >= 3
        : gameConfig.id === "mlbb"
        ? userId.length >= 5 && zoneId.length >= 3
        : userId.length >= 5;

    if (!meetsThreshold) {
      setValidation({ state: "idle" });
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setValidation({ state: "loading" });
      try {
        const res = await fetch("/api/game/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ game: gameConfig.id, userId, zoneId }),
          signal: controller.signal,
        });

        const data = await res.json();
        if (controller.signal.aborted) return;

        if (!res.ok) {
          setValidation({
            state: "unavailable",
            message: data?.error || "Gagal memeriksa akun. Anda tetap bisa melanjutkan pesanan.",
          });
          return;
        }

        if (data.status === "valid" && data.nickname) {
          setValidation({
            state: "valid",
            nickname: data.nickname,
            username: data.username,
            region: data.region,
            avatarUrl: data.avatarUrl,
            source: data.source === "official" ? "official" : "community",
          });
        } else if (data.status === "not_found") {
          setValidation({
            state: "not_found",
            message: data.message || "Akun tidak ditemukan.",
            source: data.source || "community",
          });
        } else if (data.status === "format_only") {
          setValidation({
            state: "format_only",
            message: data.message || "Format ID valid.",
          });
        } else {
          setValidation({
            state: "unavailable",
            message:
              data.message || "Verifikasi otomatis belum tersedia. Anda tetap bisa melanjutkan pesanan.",
          });
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setValidation({
          state: "unavailable",
          message: "Gagal memeriksa akun. Anda tetap bisa melanjutkan pesanan.",
        });
      }
    }, 700);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [step, gameConfig.id, formData.gameUserId, formData.gameZoneId, retryKey]);

  const steps = [
    `Pilih ${gameConfig.shortName}`,
    "Data Akun",
    "Bayar",
    "Upload Bukti",
    "Selesai",
  ];

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedPackage.id || selectedPackage.price <= 0) {
      setError("Silakan pilih paket item terlebih dahulu.");
      return;
    }

    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setError("Nama pemesan dan Nomor WhatsApp wajib diisi.");
      return;
    }

    if (!formData.gameUserId.trim()) {
      setError(`${gameConfig.fields[0]?.label || "ID Akun"} wajib diisi.`);
      return;
    }

    if (
      gameConfig.id === "roblox" &&
      validation.state === "not_found" &&
      validation.source === "official"
    ) {
      setError("Username Roblox tidak ditemukan. Periksa kembali ejaan username Anda.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createOrderAction({
        game: gameConfig.id,
        packageId: selectedPackage.id,
        itemName: selectedPackage.name,
        robuxAmount: selectedPackage.amount || 0,
        price: selectedPackage.price,
        gameUserId: formData.gameUserId.trim(),
        gameZoneId: formData.gameZoneId ? formData.gameZoneId.trim() : undefined,
        name: formData.name.trim(),
        whatsapp: formData.whatsapp.trim(),
      });

      if (!res.success) {
        setError(res.error || "Gagal membuat pesanan.");
        return;
      }

      setCreatedOrder(res.order);
      setProofToken(res.proofToken);
      setStep(3);
    } catch (err: any) {
      setError(`Terjadi kesalahan sistem: ${err?.message || "Coba lagi nanti."}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl rounded-2xl p-3 sm:p-7 bg-white text-[#47023B] border border-[#EAD6E0] shadow-sm w-full max-w-full min-w-0 overflow-hidden">
      {/* Progress Steps Header */}
      <div className="mb-5 sm:mb-8">
        <ol className="grid grid-cols-5 gap-1 sm:gap-3" aria-label="Progres pemesanan">
          {steps.map((label, index) => {
            const isCompletedOrActive = step >= index + 1;
            const isCurrent = step === index + 1;
            return (
              <li key={label} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200",
                    isCompletedOrActive
                      ? "bg-[#47023B] text-white shadow-xs"
                      : "border-2 border-[#EAD6E0] bg-[#FBF7F4] text-[#6E3B65]"
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "w-full truncate text-center text-[9px] sm:text-xs",
                    isCurrent ? "font-bold text-[#47023B]" : isCompletedOrActive ? "text-[#47023B]/80 font-medium" : "text-[#6E3B65]/70"
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#FAF0F5] border border-[#EAD6E0]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={step}
        >
          <div
            className="h-full bg-[#FA3890] transition-all duration-300 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Nominal Selection */}
      {step === 1 && (
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-[#47023B] font-heading">
              1. Pilih Paket {gameConfig.currencyName}
            </h3>
            <Badge variant="outline" className="text-[10px] sm:text-xs border-[#EAD6E0] bg-[#FAF0F5] text-[#47023B] px-2 py-0.5 font-semibold">
              {gameConfig.name}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#6E3B65]">
            Pilih denominasi item yang ingin Anda kirimkan ke akun game.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3.5 sm:grid-cols-3">
            {availablePackages.map((item) => {
              const isSelected = selectedPackage.id === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedPackage(item)}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative rounded-xl p-2.5 sm:p-3.5 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border min-w-0 overflow-hidden",
                    isSelected
                      ? "border-[#47023B] bg-[#FAF0F5] text-[#47023B] shadow-sm ring-1 ring-[#FA3890]/60"
                      : "border-[#EAD6E0] bg-[#FBF7F4] text-[#47023B] hover:border-[#FA3890]/60 hover:bg-[#FAF0F5]/60"
                  )}
                >
                  <div className="flex items-start justify-between gap-1 w-full">
                    <span className={cn("text-[10px] sm:text-[11px] font-bold uppercase tracking-wider", isSelected ? "text-[#47023B]" : "text-[#6E3B65]")}>
                      {gameConfig.shortName}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 transition-colors shrink-0",
                        isSelected
                          ? "border-[#47023B] bg-[#47023B] text-white"
                          : "border-[#EAD6E0] bg-white text-transparent"
                      )}
                    >
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
                    </span>
                  </div>

                  <div className="mt-1.5 text-sm sm:text-lg font-bold tracking-tight line-clamp-2 text-[#47023B]">
                    {item.name}
                  </div>

                  <div className={cn("mt-1.5 text-xs sm:text-sm font-extrabold", isSelected ? "text-[#47023B]" : "text-[#6E3B65]")}>
                    {formatRupiah(item.price)}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 sm:pt-4 border-t border-[#EAD6E0]">
            <div className="flex items-center justify-between sm:justify-start sm:gap-2">
              <span className="text-xs sm:text-sm text-[#6E3B65]">Total:</span>
              <span className="font-extrabold text-[#47023B] text-base sm:text-lg">
                {selectedPackage.price ? formatRupiah(selectedPackage.price) : "Pilih paket"}
              </span>
            </div>
            <Button
              type="button"
              disabled={!selectedPackage || !selectedPackage.price}
              onClick={() => setStep(2)}
              className="w-full sm:w-auto h-10 px-5 bg-[#47023B] hover:bg-[#5E074F] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              Lanjut ke Data Akun →
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Account & Buyer Data Form */}
      {step === 2 && (
        <form onSubmit={handleCreateOrder}>
          <div className="flex items-center justify-between gap-3 mb-1">
            <h3 className="text-lg font-bold text-[#47023B] font-heading">
              2. Masukkan Data Akun {gameConfig.shortName}
            </h3>
            <span className="text-xs text-[#6E3B65] font-medium">Langkah 2 dari 5</span>
          </div>
          <p className="text-sm text-[#6E3B65]">
            Isi identitas akun game tempat item akan dikirimkan. Kami tidak pernah meminta password.
          </p>

          {/* Guide Banner */}
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[#EAD6E0] bg-[#FAF0F5] p-3 text-xs text-[#47023B]">
            <Info className="h-4 w-4 shrink-0 text-[#FA3890] mt-0.5" />
            <span>{gameConfig.idGuide}</span>
          </div>

          {error && (
            <p className="mt-4 rounded-md border border-[#C81E4A]/30 bg-[#C81E4A]/10 px-3 py-2 text-sm text-[#C81E4A]" role="alert">
              {error}
            </p>
          )}

          <div className="mt-5 space-y-4">
            {/* Game Specific Fields */}
            <div
              className={cn(
                gameConfig.fields.length === 2
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                  : "space-y-4"
              )}
            >
              {gameConfig.fields.map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-sm font-semibold text-[#47023B]">
                    {field.label} <span className="text-[#FA3890]">*</span>
                  </label>
                  <Input
                    id={field.key}
                    type={field.type || "text"}
                    required={field.required}
                    value={field.key === "gameZoneId" ? formData.gameZoneId : formData.gameUserId}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key === "gameZoneId" ? "gameZoneId" : "gameUserId"]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-1.5 bg-[#FBF7F4] border-[#EAD6E0] text-[#47023B] placeholder:text-[#6E3B65]/50 focus-visible:ring-[#47023B] focus-visible:border-[#47023B]"
                  />
                  {field.helperText && (
                    <p className="mt-1 text-xs text-[#6E3B65]">{field.helperText}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Live Account Validation Banner */}
            {validation.state === "loading" && (
              <div
                aria-live="polite"
                className="flex items-center gap-2.5 rounded-xl border border-[#EAD6E0] bg-[#FAF0F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#47023B]"
              >
                <Loader2 className="h-4 w-4 animate-spin text-[#FA3890] shrink-0" />
                <span>Memeriksa data akun...</span>
              </div>
            )}

            {validation.state === "valid" && (
              <div
                aria-live="polite"
                className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-50 px-3.5 py-2.5 text-xs sm:text-sm text-emerald-900"
              >
                {validation.avatarUrl && (
                  <img
                    src={validation.avatarUrl}
                    alt={`Avatar ${validation.nickname}`}
                    className="h-10 w-10 rounded-full border border-emerald-300 bg-white object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span>Akun ditemukan:</span>
                    <strong className="font-bold text-emerald-700">{validation.nickname}</strong>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                    {validation.username && validation.username !== validation.nickname && (
                      <span className="text-xs text-emerald-800/80">(@{validation.username})</span>
                    )}
                    {validation.region && (
                      <span className="text-emerald-800">
                        dari <strong className="font-bold">{validation.region}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {validation.state === "not_found" && (
              <div
                role="alert"
                className={cn(
                  "flex items-center justify-between gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm",
                  validation.source === "official"
                    ? "border-[#C81E4A]/40 bg-[#C81E4A]/10 text-[#C81E4A]"
                    : "border-amber-500/40 bg-amber-50 text-amber-900"
                )}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{validation.message}</span>
                </div>
                {validation.source !== "official" && (
                  <button
                    type="button"
                    onClick={() => setRetryKey((k) => k + 1)}
                    className="inline-flex items-center gap-1 shrink-0 rounded-lg border border-amber-500/40 bg-white px-2.5 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Cek ulang
                  </button>
                )}
              </div>
            )}

            {(validation.state === "unavailable" || validation.state === "format_only") && (
              <div
                aria-live="polite"
                className="flex items-center justify-between gap-2.5 rounded-xl border border-[#EAD6E0] bg-[#FAF0F5] px-3.5 py-2.5 text-xs sm:text-sm text-[#6E3B65]"
              >
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-[#47023B] mt-0.5" aria-hidden="true" />
                  <span>{validation.message}</span>
                </div>
                {validation.state === "unavailable" && (
                  <button
                    type="button"
                    onClick={() => setRetryKey((k) => k + 1)}
                    className="inline-flex items-center gap-1 shrink-0 rounded-lg border border-[#EAD6E0] bg-white px-2.5 py-1 text-xs font-semibold text-[#47023B] hover:bg-[#F5D5E3]/50 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Cek ulang
                  </button>
                )}
              </div>
            )}

            {/* Buyer Contact Fields */}
            <div>
              <label htmlFor="buyerName" className="block text-sm font-semibold text-[#47023B]">
                Nama Pemesan <span className="text-[#FA3890]">*</span>
              </label>
              <Input
                id="buyerName"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Contoh: Budi Santoso"
                className="mt-1.5 bg-[#FBF7F4] border-[#EAD6E0] text-[#47023B] placeholder:text-[#6E3B65]/50 focus-visible:ring-[#47023B] focus-visible:border-[#47023B]"
              />
            </div>

            <div>
              <label htmlFor="waNumber" className="block text-sm font-semibold text-[#47023B]">
                Nomor WhatsApp Aktif <span className="text-[#FA3890]">*</span>
              </label>
              <Input
                id="waNumber"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="Contoh: 081234567890"
                className="mt-1.5 bg-[#FBF7F4] border-[#EAD6E0] text-[#47023B] placeholder:text-[#6E3B65]/50 focus-visible:ring-[#47023B] focus-visible:border-[#47023B]"
              />
              <p className="mt-1 text-xs text-[#6E3B65]">
                Digunakan untuk notifikasi status pesanan atau jika ada kendala akun.
              </p>
            </div>
          </div>

          {/* Selected Summary Card */}
          <div className="mt-6 rounded-xl border border-[#EAD6E0] bg-[#FAF0F5] p-3.5 flex items-center justify-between text-sm">
            <div>
              <span className="text-xs text-[#6E3B65] block">Paket Terpilih:</span>
              <span className="font-semibold text-[#47023B]">{selectedPackage.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6E3B65] block">Harga:</span>
              <span className="font-bold text-[#47023B]">{formatRupiah(selectedPackage.price)}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              disabled={submitting}
              className="border-[#EAD6E0] bg-white text-[#47023B] hover:bg-[#FAF0F5]"
            >
              <ArrowLeft className="h-4 w-4" /> Ganti Paket
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#47023B] hover:bg-[#5E074F] text-white font-bold shadow-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Lanjut ke Pembayaran"
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Payment Details */}
      {step === 3 && createdOrder && (
        <Step3Payment
          order={createdOrder}
          rekeningList={rekeningList}
          qrImageUrl={qrImageUrl}
          onNext={() => setStep(4)}
        />
      )}

      {/* Step 4: Upload Payment Proof */}
      {step === 4 && createdOrder && (
        <Step4UploadProof
          orderId={createdOrder.orderId}
          proofToken={proofToken}
          onSubmitProof={async (orderId, _proofUrl, token) => {
            const res = await submitPaymentProofAction(orderId, token || proofToken);
            return { ok: res.success, error: res.error };
          }}
          onSuccess={() => setStep(5)}
        />
      )}

      {/* Step 5: Success Summary */}
      {step === 5 && createdOrder && <Step5Success order={createdOrder} adminWhatsapp={adminWhatsapp} />}
    </Card>
  );
}
