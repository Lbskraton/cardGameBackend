/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idGame` on the `Score` table. All the data in the column will be lost.
  - Added the required column `idGameTypeid` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRound` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Card_numeral_suit_idDeck_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Card";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "minRounds" INTEGER NOT NULL DEFAULT 1,
    "maxRounds" INTEGER NOT NULL DEFAULT 999,
    "maxUsers" INTEGER NOT NULL,
    "minUsers" INTEGER NOT NULL DEFAULT 2
);

-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameid" INTEGER NOT NULL,
    CONSTRAINT "Round_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "idGameTypeid" INTEGER NOT NULL,
    "idDeck" INTEGER NOT NULL,
    CONSTRAINT "Game_idGameTypeid_fkey" FOREIGN KEY ("idGameTypeid") REFERENCES "GameType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_idDeck_fkey" FOREIGN KEY ("idDeck") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id", "idDeck", "type") SELECT "id", "idDeck", "type" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_Score" (
    "value" INTEGER,
    "winner" BOOLEAN,
    "idRound" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    PRIMARY KEY ("idRound", "idUser"),
    CONSTRAINT "Score_idRound_fkey" FOREIGN KEY ("idRound") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("idUser", "value") SELECT "idUser", "value" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
