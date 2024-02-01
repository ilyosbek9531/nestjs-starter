-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('SINGLE_LINE', 'MULTI_LINE', 'SINGLE_SELECT', 'MULTI_SELECT', 'PHOTO', 'PHOTOS', 'CHECKBOX', 'RADIO', 'PASSWORD', 'EMAIL', 'NUMBER', 'DATE', 'DATERANGE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "app_slug" TEXT NOT NULL,
    "app_icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "field_slug" TEXT NOT NULL,
    "field_type" "FieldType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "App_app_slug_key" ON "App"("app_slug");

-- CreateIndex
CREATE UNIQUE INDEX "Field_field_slug_key" ON "Field"("field_slug");
