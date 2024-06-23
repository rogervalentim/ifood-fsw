"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  IceCreamBowl,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  CupSoda,
  ScrollTextIcon,
  Pizza,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Search } from "./search";
import { usePathname } from "next/navigation";
import { BiSolidSushi } from "react-icons/bi";
import { GiHamburger } from "react-icons/gi";

interface HeaderProps {
  search?: boolean;
}

export function Header({ search }: HeaderProps) {
  const { data } = useSession();
  const pathname = usePathname();

  const handleSignInClick = () => signIn();

  const handleSignOutClick = () => signOut();

  return (
    <header
      className={
        search
          ? "flex h-20 items-center justify-between border-b px-5 pt-6 lg:flex lg:px-32 lg:pt-5"
          : "flex items-center justify-between px-5 pt-6 lg:px-32 lg:pt-5"
      }
    >
      <div className="relative h-[30px] w-[100px] ">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo fsw foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <div className="hidden lg:block">{search && <Search />}</div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center justify-between gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user.image as string | undefined} />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá Faça o seu login!</h2>
              <Button size="icon" onClick={handleSignInClick}>
                <LogInIcon />
              </Button>
            </div>
          )}
          <div className="py-5">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/" ? "bg-primary text-white" : ""}`}
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span className="block"> Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/my-orders" ? "bg-primary text-white" : ""}`}
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block"> Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/my-favorite-restaurants" ? "bg-primary text-white" : ""}`}
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block"> Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-1">
            <>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/413159dc-bc41-4fd9-bc63-1d9ab875e86d/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/413159dc-bc41-4fd9-bc63-1d9ab875e86d/products">
                  <IceCreamBowl size={16} />
                  <span className="block">Sobremesas</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/41a8fdd5-f5b9-4eb7-adcf-e5bcf88b0c77/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/41a8fdd5-f5b9-4eb7-adcf-e5bcf88b0c77/products">
                  <CupSoda size={16} />
                  <span className="block">Sucos</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/7cf5b235-2565-4c0e-ab75-1677dc39937a/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/7cf5b235-2565-4c0e-ab75-1677dc39937a/products">
                  <GiHamburger size={16} />
                  <span className="block">Hamburgúeres</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/1313274c-263f-4a6e-8c16-5d8a5b87747b/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/1313274c-263f-4a6e-8c16-5d8a5b87747b/products">
                  <Pizza size={16} />
                  <span className="block">Pizzas</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/b1c47e4d-5498-429b-b3a3-29fef3225d8b/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/b1c47e4d-5498-429b-b3a3-29fef3225d8b/products">
                  <BiSolidSushi size={16} />
                  <span className="block">Japonesa</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start space-x-3 rounded-full text-sm font-normal ${pathname === "/categories/e34ef030-452b-4ca4-931b-6915adacb994/products" ? "bg-primary text-white" : ""}`}
                asChild
              >
                <Link href="/categories/e34ef030-452b-4ca4-931b-6915adacb994/products">
                  <Utensils size={16} />
                  <span className="block">Brasileira</span>
                </Link>
              </Button>
            </>
          </div>

          <div className="py-4">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
