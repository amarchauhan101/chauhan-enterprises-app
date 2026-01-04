import GeneralSetting from "@/components/GeneralSetting";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { DeleteIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
// import book from ""

async function page() {
    const userInAuth = await auth();
    const user = userInAuth.user;
  return (
    <GeneralSetting user={user} />
  );
}

export default page;
