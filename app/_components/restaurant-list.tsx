import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { RestaurantItem } from "./restaurant-item";
import { authOptions } from "../_lib/auth";

export async function RestaurantList() {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <section className="flex gap-4 overflow-x-scroll px-5 lg:gap-5 lg:px-0 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </section>
  );
}
