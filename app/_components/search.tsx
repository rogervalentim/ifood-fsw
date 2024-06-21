"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2 lg:gap-0" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none lg:w-[570px] lg:rounded lg:rounded-l-md"
        onChange={handleChange}
        value={search}
      />
      <Button
        size="icon"
        className="lg:rounded lg:rounded-r-md lg:bg-[#FFB100]"
      >
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
