import { env } from "process";

import { Separator } from "@/components/ui/separator";
import React from "react";
import { Update } from "@/components/update";
import { createClient } from "@/lib/supabase/server";
import { createClient as createUpdateClient } from "@supabase/supabase-js";
import { LoginButton } from "@/components/login-button";

export default async function Home() {
  let creditScore = 0;

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser();

  try {
    const response = await fetch(
      `https://upcred.it/api/user/get?id=${env.TOBI_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "UC-Key": `${env.UC_API_KEY}`,
        },
      }
    ).then((res) => res.json());

    creditScore = response.data[0].credits;
  } catch (error) {
    alert("An error occurred while fetching Tobi's credit score.");
    creditScore = 0;
  }

  return (
    <main className="flex flex-col w-screen h-screen">
      <nav className="w-full h-20">
        <div className="w-full h-full flex items-center justify-between p-9">
          <h1 className="text-2xl font-bold">ban.social</h1>
          {data?.user ? <Update /> : <LoginButton />}
        </div>
      </nav>
      <Separator />
      <section className="w-full h-full flex flex-col justify-center items-center">
        <h1>Tobi&apos;s current Social Credit Score</h1>
        <p className="font-black text-9xl">{creditScore}</p>
      </section>

    </main>
  );
}
