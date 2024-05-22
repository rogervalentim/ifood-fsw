import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

export function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  function handleDecreaseQuantityClick() {
    decreaseProductQuantity(cartProduct.id);
  }

  function handleIncreaseQuantityClick() {
    increaseProductQuantity(cartProduct.id);
  }

  function handleRemoveClick() {
    removeProductFromCart(cartProduct.id);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center  text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground "
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="blocks w-8 text-xs">{cartProduct.quantity}</p>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
}
