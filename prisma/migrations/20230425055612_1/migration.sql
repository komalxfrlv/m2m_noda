-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "UserClient" AS ENUM ('bussiness', 'person', 'local');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('administrator', 'developer', 'manager', 'support', 'user');

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(99) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "auto_updating" BOOLEAN NOT NULL DEFAULT true,
    "auto_paying" BOOLEAN NOT NULL DEFAULT true,
    "hash_rst" VARCHAR(255),
    "hash_vrf" VARCHAR(255),
    "token" TEXT,
    "phone" BIGINT NOT NULL,
    "status" "UserStatus" NOT NULL,
    "client" "UserClient" NOT NULL,
    "role" "UserRole" NOT NULL,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "DeviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" VARCHAR(255) NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "mac" VARCHAR(99) NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StationSettings" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "stationId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "options" JSONB,

    CONSTRAINT "StationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" TEXT NOT NULL,
    "mac" VARCHAR(99) NOT NULL,
    "uptime" BIGINT,
    "charge" SMALLINT,
    "deviceId" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorSettings" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sleep" BIGINT DEFAULT 10,
    "alert" BOOLEAN NOT NULL DEFAULT false,
    "lost" BOOLEAN NOT NULL DEFAULT false,
    "sensorId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "pushStart" TIME,
    "pushEnd" TIME,
    "triggerMin" DOUBLE PRECISION,
    "triggerMax" DOUBLE PRECISION,
    "schedule" JSONB,
    "options" JSONB,

    CONSTRAINT "SensorSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "sensorId" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_id_key" ON "DeviceType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Version_id_key" ON "Version"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Station_id_key" ON "Station"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StationSettings_id_key" ON "StationSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StationSettings_stationId_key" ON "StationSettings"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_id_key" ON "Sensor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SensorSettings_id_key" ON "SensorSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SensorSettings_sensorId_key" ON "SensorSettings"("sensorId");

-- CreateIndex
CREATE UNIQUE INDEX "Data_id_key" ON "Data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Metric_id_key" ON "Metric"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationSettings" ADD CONSTRAINT "StationSettings_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationSettings" ADD CONSTRAINT "StationSettings_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "DeviceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorSettings" ADD CONSTRAINT "SensorSettings_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorSettings" ADD CONSTRAINT "SensorSettings_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
