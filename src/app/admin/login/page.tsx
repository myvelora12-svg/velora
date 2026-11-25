import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/ui/card";
import { MyVeloraLogo } from "@/components/ui/MyVeloraLogo";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF7F4] px-4 py-10">
      <Card className="w-full max-w-md p-6 shadow-sm sm:p-8 bg-white border-[#EAD6E0]">
        <div className="text-center flex flex-col items-center">
          <MyVeloraLogo variant="full" surface="light" size="lg" className="mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-[#47023B] font-heading">Login Admin</h1>
          <p className="mt-1.5 text-sm text-[#6E3B65]">
            Masuk untuk mengelola pesanan, rekening, dan pengaturan toko.
          </p>
        </div>

        <AdminLoginForm />
      </Card>
    </div>
  );
}
