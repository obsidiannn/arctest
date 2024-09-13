-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "nickname" TEXT,
    "mobile" TEXT,
    "email" TEXT,
    "avatar" TEXT,
    "address" TEXT NOT NULL,
    "nickname_idx" TEXT,
    "gender" INTEGER DEFAULT 1,
    "user_sign" TEXT,
    "pub_key" TEXT,
    "status" INTEGER DEFAULT 1,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_address_idx" ON "users"("address");
