'use server'

import { env } from "process";

export async function updateCredits(updateType: string, amount: number) {
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

      return response.status;
    } catch (error) {
      console.log(error);
    }
  } else if (updateType === "deduct") {
    console.log("Key UC -" + env.UC_API_KEY)
    try {
      const response = await fetch("https://upcred.it/api/transactions/deduct", {
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

      return response.status;
    } catch (error) {
      console.log(error);
    }
  }
}
