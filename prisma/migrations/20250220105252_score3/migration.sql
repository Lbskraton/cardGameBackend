/*
  Warnings:

  - The primary key for the `Score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `Score` table. All the data in the column will be lost.
  - Added the required column `idGameParticipant` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "GameParticipant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "GameParticipant_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "value" INTEGER,
    "winner" BOOLEAN,
    "playing" BOOLEAN NOT NULL,
    "idRound" INTEGER NOT NULL,
    "idGameParticipant" INTEGER NOT NULL,

    PRIMARY KEY ("idRound", "idGameParticipant"),
    CONSTRAINT "Score_idRound_fkey" FOREIGN KEY ("idRound") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_idGameParticipant_fkey" FOREIGN KEY ("idGameParticipant") REFERENCES "GameParticipant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Score" ("idRound", "playing", "value", "winner") SELECT "idRound", "playing", "value", "winner" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
CREATE UNIQUE INDEX "Score_idRound_idGameParticipant_key" ON "Score"("idRound", "idGameParticipant");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GameParticipant_gameId_userId_key" ON "GameParticipant"("gameId", "userId");
