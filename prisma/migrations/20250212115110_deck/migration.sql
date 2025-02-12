-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "idDeck" INTEGER NOT NULL,
    CONSTRAINT "Game_idDeck_fkey" FOREIGN KEY ("idDeck") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Score" (
    "value" INTEGER NOT NULL,
    "idGame" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,

    PRIMARY KEY ("idGame", "idUser"),
    CONSTRAINT "Score_idGame_fkey" FOREIGN KEY ("idGame") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Score_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeral" INTEGER NOT NULL,
    "suit" TEXT NOT NULL,
    "idDeck" INTEGER NOT NULL,
    CONSTRAINT "Card_idDeck_fkey" FOREIGN KEY ("idDeck") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Deck_name_key" ON "Deck"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Card_numeral_suit_idDeck_key" ON "Card"("numeral", "suit", "idDeck");
