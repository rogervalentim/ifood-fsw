import { Header } from "@/app/_components/header";
import { ProductItem } from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({
  params: { id },
}: CategoryPageProps) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category?.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
