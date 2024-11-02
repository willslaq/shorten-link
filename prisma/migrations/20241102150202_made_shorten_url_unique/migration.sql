/*
  Warnings:

  - A unique constraint covering the columns `[shorten_url]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "urls_shorten_url_key" ON "urls"("shorten_url");
