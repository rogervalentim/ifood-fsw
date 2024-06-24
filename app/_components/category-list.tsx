import { db } from "../_lib/prisma";
import { CategoryItem } from "./category-item";

export async function CategoryList() {
  const categories = await db.category.findMany({});

  return (
    <div className="flex  gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-32 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
