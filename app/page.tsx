import { CategoryList } from "./_components/category-list";
import { Header } from "./_components/header";
import { Search } from "./_components/search";
import { ProductList } from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import { PromoBanner } from "./_components/promo-banner";
import { RestaurantList } from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";

const fetch = async () => {
  const getProducts = db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

export default async function Home() {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="px-5 pt-6 lg:hidden">
        <Search />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <CategoryList />
      </div>

      <div className="hidden h-[500px] w-full  justify-between bg-primary px-32 sm:hidden lg:flex">
        <div className="pt-[126px]">
          <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
          <p className="text-lg font-normal text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>

          <div className="mt-8 flex h-[88px] w-[658px] items-center justify-center rounded-lg bg-white">
            <Search />
          </div>
        </div>
        <div className="pt-[146px]">
          <Image
            src="/image-base.png"
            className="h-[372px] w-[372px] object-contain"
            height={0}
            width={0}
            sizes="100vw"
            alt="image base"
          />
        </div>
      </div>

      <div className="hidden px-5 pt-10 lg:flex">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:px-32 lg:pt-10">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="hidden gap-4 px-32 pt-10 lg:flex">
        <div>
          <Link href={`/categories/${pizzasCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas!"
            />
          </Link>
        </div>
        <div>
          <Link href={`/categories/${burguersCategory?.id}/products`}>
            <PromoBanner
              src="/promo-banner-02.png"
              alt="A partir de R$17,90 em lanches"
            />
          </Link>
        </div>
      </div>

      <div className="px-5 pt-6 lg:hidden">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6 lg:px-32 lg:pt-10">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}
