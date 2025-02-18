/*
  Warnings:

  - You are about to drop the column `idDeck` on the `Game` table. All the data in the column will be lost.
  - Added the required column `idDeck` to the `GameType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playing` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "idGameTypeid" INTEGER NOT NULL,
    CONSTRAINT "Game_idGameTypeid_fkey" FOREIGN KEY ("idGameTypeid") REFERENCES "GameType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id", "idGameTypeid", "type") SELECT "id", "idGameTypeid", "type" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_GameType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idDeck" INTEGER NOT NULL,
    "minRounds" INTEGER NOT NULL DEFAULT 1,
    "maxRounds" INTEGER NOT NULL DEFAULT 999,
    "maxUsers" INTEGER NOT NULL,
    "minUsers" INTEGER NOT NULL DEFAULT 2,
    CONSTRAINT "GameType_idDeck_fkey" FOREIGN KEY ("idDeck") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameType" ("id", "maxRounds", "maxUsers", "minRounds", "minUsers", "name") SELECT "id", "maxRounds", "maxUsers", "minRounds", "minUsers", "name" FROM "GameType";
DROP TABLE "GameType";
ALTER TABLE "new_GameType" RENAME TO "GameType";
CREATE TABLE "new_Score" (
    "value" INTEGER,
    "winner" BOOLEAN,
    "playing" BOOLEAN NOT NULL,
    "idRound" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    PRIMARY KEY ("idRound", "idUser"),
    CONSTRAINT "Score_idRound_fkey" FOREIGN KEY ("idRound") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("idRound", "idUser", "value", "winner") SELECT "idRound", "idUser", "value", "winner" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
