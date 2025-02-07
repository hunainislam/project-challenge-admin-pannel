"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      router.push("/auth/signin");
    }
  }, []);

  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
