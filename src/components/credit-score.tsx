"use client"

import { getCredits } from "@/lib/credits";
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

export function CreditScore() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

    const [creditScore, setCreditScore] = useState(0);

    function broadcastUpdate(broadcast: any) {
        console.log(broadcast);
        toast.info(`${broadcast.payload.amount} credits ${broadcast.payload.transactionType === 'add' ? 'added' : 'deducted'}!`, {
            description: `${broadcast.payload.sender} just ${broadcast.payload.transactionType === 'add' ? 'added' : 'deducted'} ${broadcast.payload.amount} credits`
        });
    }

    useEffect(() => {
        const fetchCreditScore = setInterval(async () => {
            setCreditScore(await getCredits());
        }, 5000);

        return () => clearInterval(fetchCreditScore);
    }, []);

    useEffect(() => {

        const channel = supabase.channel('updates').on('broadcast', {
            event: 'creditChange',
        },
            (payload) => broadcastUpdate(payload)
        ).subscribe();

        return () => {
            channel.unsubscribe();
        };

    });

    return (
        <section className="w-full h-full flex flex-col justify-center items-center">
            <h1>Tobi&apos;s current Social Credit Score</h1>
            <p className="font-black text-9xl">{creditScore}</p>
        </section>
    )
}