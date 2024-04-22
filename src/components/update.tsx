"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { updateCredits } from "@/lib/updateCredits";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export function Update() {
  const [amount, setAmount] = React.useState("");
  const [tabValue, setTabValue] = React.useState("add");
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const router = useRouter();

  async function handleUpdate() {
    if(!amount) return toast.error("Please enter an amount");
    setLoading(true);
    const response = await updateCredits(tabValue, parseInt(amount)).then(
      () => {
        router.refresh();
        setLoading(false);
        setDialogOpen(false);
        return 200;
      }
    );

    if (response === 200) {
      toast.success("Credits updated successfully");
    } else {
      toast.error("An error occurred while updating credits");
    }
  }

  return (
    <Dialog defaultOpen={false} open={dialogOpen} onOpenChange={setDialogOpen}>
      <Toaster />
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Tobi&apos;s credits</DialogTitle>
          <DialogDescription>
            Has Tobi been bad or good? Update his social credit score here.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          value={tabValue}
          onValueChange={(value) => setTabValue(value)}
          defaultValue="add"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Credit</TabsTrigger>
            <TabsTrigger value="deduct">Deduct Credit</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="5"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </TabsContent>
          <TabsContent value="deduct">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="5"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button disabled={loading} type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
