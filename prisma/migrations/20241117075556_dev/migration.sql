-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Predictions" (
    "prediction_id" TEXT NOT NULL PRIMARY KEY,
    "plant_name" TEXT NOT NULL,
    "disease_name" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "article_url" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Discussions" (
    "discussion_id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "image_id" TEXT,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Discussions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "discussion_id" TEXT NOT NULL,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Comments_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussions" ("discussion_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
