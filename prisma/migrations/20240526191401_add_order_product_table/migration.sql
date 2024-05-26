/*
  Warnings:

  - You are about to drop the `UserFavoriteRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_userId_fkey";

-- DropTable
DROP TABLE "UserFavoriteRestaurant";
