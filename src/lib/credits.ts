"use server";

import { env } from "process";

import { createClient } from "@/lib/supabase/server";
import { createClient as createUpdateClient } from "@supabase/supabase-js";

const client = createUpdateClient(
  env.NEXT_PUBLIC_SUPABASE_URL as string,
  env.SUPABASE_SERVICE_ROLE_KEY as string
);
const updatesChannel = client.channel("updates");

export async function getCredits() {
  let creditScore = 0;

  try {
    const response = await fetch(
      `https://upcred.it/api/user/get?id=${env.TOBI_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "UC-Key": `${process.env.UC_API_KEY}`,
        },
      }
    ).then((res) => res.json());

    creditScore = response.data[0].credits;
  } catch (error) {
    console.log(error);
  }

  return creditScore;
}

export async function updateCredits(
  updateType: string,
  amount: number,
  comment?: string
) {
  const supabase = createClient();

  const payload = {
    sender: (await supabase.auth.getUser()).data.user?.email?.split("@")[0],
    amount: amount,
    transactionType: updateType,
    comment: comment,
  };

  if (updateType === "add") {
    try {
      const response = await fetch("https://upcred.it/api/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "UC-Key": `${env.UC_API_KEY}`,
        },
        body: JSON.stringify({
          source: env.SAAS_ID,
          destination: env.TOBI_ID,
          amount: amount,
        }),
      });

      /* SEND BROADCAST */
      updatesChannel.send({
        type: "broadcast",
        event: "creditChange",
        payload: payload,
      });

      return { payload };
    } catch (error) {
      console.log(error);
      return 500;
    }
  } else if (updateType === "deduct") {
    try {
      const response = await fetch(
        "https://upcred.it/api/transactions/deduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "UC-Key": `${env.UC_API_KEY}`,
          },
          body: JSON.stringify({
            source: env.SAAS_ID,
            destination: env.TOBI_ID,
            amount: amount,
          }),
        }
      );

      /* SEND BROADCAST */
      updatesChannel.send({
        type: "broadcast",
        event: "creditChange",
        payload: payload,
      });

      return { payload };
    } catch (error) {
      console.log(error);
      return 500;
    }
  }
}
