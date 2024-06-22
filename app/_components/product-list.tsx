import { Prisma } from "@prisma/client";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <section className="flex gap-4 overflow-x-scroll px-5 lg:gap-5  lg:px-0   [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </section>
  );
}
