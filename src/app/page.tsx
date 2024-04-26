import { Separator } from "@/components/ui/separator";
import { Update } from "@/components/update";
import { createClient } from "@/lib/supabase/server";
import { LoginButton } from "@/components/login-button";
import { CreditScore } from "@/components/credit-score";
import { revalidatePath } from "next/cache";

export const revalidate = 5;

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();


  return (
    <main className="flex flex-col w-screen h-screen">
      <nav className="w-full h-20">
        <div className="w-full h-full flex items-center justify-between p-9">
          <h1 className="text-2xl font-bold">ban.social</h1>
          {data?.user ? <Update /> : <LoginButton />}
        </div>
      </nav>
      <Separator />
      <CreditScore />

    </main>
  );
}
