/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GameType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entity` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "idUserCreator" INTEGER,
    CONSTRAINT "Deck_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "idUserCreator", "name") SELECT "id", "idUserCreator", "name" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
CREATE UNIQUE INDEX "Deck_name_key" ON "Deck"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GameType_name_key" ON "GameType"("name");
