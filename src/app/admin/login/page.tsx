import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/ui/card";
import { CloverLogo } from "@/components/ui/CloverLogo";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111613] px-4 py-10">
      <Card className="w-full max-w-md p-6 shadow-2xl sm:p-8 bg-[#161c18] border-[#243028]">
        <div className="text-center flex flex-col items-center">
          <CloverLogo variant="full" size="lg" className="mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-white font-heading">Login Admin</h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Masuk untuk mengelola pesanan, rekening, dan pengaturan toko.
          </p>
        </div>

        <AdminLoginForm />
      </Card>
    </div>
  );
}
