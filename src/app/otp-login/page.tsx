"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { verifyOtp } from "./actions";

export default async function OtpLogin() {
    const params = useParams();
    console.log(params);

    return (
        <form className="w-screen h-screen flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>
                        Register your account to start using ban.social
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Set a Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" formAction={verifyOtp}>
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
