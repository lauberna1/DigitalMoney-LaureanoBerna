"use client";
import { useState } from "react";
import { Search } from "../Search/Search";

import { Transactions } from "../Transactions/Transactions";
import { useRouter } from "next/navigation";
export function Activity() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/dashboard/actividad?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <>
      <Search onChange={setSearch} value={search} onKeyDown={handleKeyDown} />
      <Transactions />
    </>
  );
}
