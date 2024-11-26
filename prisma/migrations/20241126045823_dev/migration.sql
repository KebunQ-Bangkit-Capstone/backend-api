-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_image_id" TEXT,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Predictions" (
    "prediction_id" TEXT NOT NULL,
    "plant_index" INTEGER NOT NULL,
    "disease_index" INTEGER NOT NULL,
    "plant_name" TEXT NOT NULL,
    "disease_name" TEXT NOT NULL,
    "confidence_score" DOUBLE PRECISION NOT NULL,
    "image_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Predictions_pkey" PRIMARY KEY ("prediction_id")
);

-- CreateTable
CREATE TABLE "Discussions" (
    "discussion_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_id" TEXT,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Discussions_pkey" PRIMARY KEY ("discussion_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "discussion_id" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Predictions" ADD CONSTRAINT "Predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_discussion_id_fkey" FOREIGN KEY ("discussion_id") REFERENCES "Discussions"("discussion_id") ON DELETE CASCADE ON UPDATE NO ACTION;
