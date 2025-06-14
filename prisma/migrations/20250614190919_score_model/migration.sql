/*
  Warnings:

  - You are about to drop the column `type` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `idDeck` on the `GameType` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "GameTypeDeck" (
    "gameTypeId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,

    PRIMARY KEY ("gameTypeId", "deckId"),
    CONSTRAINT "GameTypeDeck_gameTypeId_fkey" FOREIGN KEY ("gameTypeId") REFERENCES "GameType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameTypeDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "suit" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "frontImg" BLOB,
    "deckId" INTEGER NOT NULL,
    "idUserCreator" INTEGER,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("deckId", "entity", "frontImg", "id", "suit", "value") SELECT "deckId", "entity", "frontImg", "id", "suit", "value" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idUserCreator" INTEGER,
    CONSTRAINT "Deck_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "name") SELECT "id", "name" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
CREATE UNIQUE INDEX "Deck_name_key" ON "Deck"("name");
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idGameTypeid" INTEGER NOT NULL,
    "idUserCreator" INTEGER,
    CONSTRAINT "Game_idGameTypeid_fkey" FOREIGN KEY ("idGameTypeid") REFERENCES "GameType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id", "idGameTypeid") SELECT "id", "idGameTypeid" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE TABLE "new_GameType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "minRounds" INTEGER NOT NULL DEFAULT 1,
    "maxRounds" INTEGER NOT NULL DEFAULT 999,
    "maxUsers" INTEGER NOT NULL DEFAULT 1,
    "minUsers" INTEGER NOT NULL DEFAULT 1,
    "time" INTEGER,
    "idUserCreator" INTEGER,
    CONSTRAINT "GameType_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameType" ("id", "maxRounds", "maxUsers", "minRounds", "minUsers", "name") SELECT "id", "maxRounds", "maxUsers", "minRounds", "minUsers", "name" FROM "GameType";
DROP TABLE "GameType";
ALTER TABLE "new_GameType" RENAME TO "GameType";
CREATE TABLE "new_Score" (
    "value" INTEGER,
    "winner" BOOLEAN,
    "playing" BOOLEAN,
    "idRound" INTEGER NOT NULL,
    "idGameParticipant" INTEGER NOT NULL,

    PRIMARY KEY ("idRound", "idGameParticipant"),
    CONSTRAINT "Score_idRound_fkey" FOREIGN KEY ("idRound") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_idGameParticipant_fkey" FOREIGN KEY ("idGameParticipant") REFERENCES "GameParticipant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("idGameParticipant", "idRound", "playing", "value", "winner") SELECT "idGameParticipant", "idRound", "playing", "value", "winner" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
CREATE UNIQUE INDEX "Score_idRound_idGameParticipant_key" ON "Score"("idRound", "idGameParticipant");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
