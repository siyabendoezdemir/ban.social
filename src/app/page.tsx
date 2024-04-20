import { env } from "process";

export default async function Home() {
  const tobiId = "d3154c72-d0a6-46ff-bed4-d750a95c8668";

  let creditScore = 0;

  try {
    const response = await fetch(
      `https://upcred.it/api/user/get?id=${tobiId}`,
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
    console.log(error);
    creditScore = 0;
  }

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center bg-slate-900">
      <h1>Tobi's current Social Credit Score</h1>
      <p className="font-black text-9xl">{creditScore}</p>
    </main>
  );
}
