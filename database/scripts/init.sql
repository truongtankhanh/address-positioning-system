-- Drop database if exists
DROP DATABASE IF EXISTS "buiding_db";

-- Create database
CREATE DATABASE "buiding_db";

-- Use database
\c "buiding_db";

-- Begin transaction
BEGIN;

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS "building" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "name" character varying(255) NOT NULL, 
  PRIMARY KEY ("id")
)

CREATE TABLE IF NOT EXISTS "location" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "location_name" character varying(255) NOT NULL, 
  "location_number" character varying(255) NOT NULL, 
  "area" double precision NOT NULL, 
  "building_id" uuid  NOT NULL, 
  "parent_location" uuid, 
  PRIMARY KEY ("id")
)

-- Add foreign key constraints
ALTER TABLE IF NOT EXISTS 
  "location" 
ADD 
  CONSTRAINT "FK_274a6372ed117e25068b48fbc2d" FOREIGN KEY ("building_id") REFERENCES "building"("id") ON DELETE NO ACTION ON UPDATE NO ACTION

-- Commit transaction
COMMIT;
