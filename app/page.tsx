import Image from "next/image";
import { CategoryList } from "./_components/category-list";
import { Header } from "./_components/header";
import { Search } from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5">
        <Image
          src="/promo-banner-01.png"
          alt="Até com 30% de desconto em pizzas"
          className="h-auto w-full object-contain"
          height={0}
          width={0}
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
}
