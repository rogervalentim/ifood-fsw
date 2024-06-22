import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import { OrderItem } from "./_components/order-item";
import { HeaderWeb } from "../_components/header-web";
import { Header } from "../_components/header";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>

      <HeaderWeb />

      <div className="px-5 py-6  lg:px-32">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}
