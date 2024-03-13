-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS "building_db"."building" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "name" character varying(255) NOT NULL, 
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "building_db"."location" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
  "location_name" character varying(255) NOT NULL, 
  "location_number" character varying(255) NOT NULL, 
  "area" double precision NOT NULL, 
  "building_id" uuid  NOT NULL, 
  "parent_location" uuid, 
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_274a6372ed117e25068b48fbc2d" FOREIGN KEY ("building_id") REFERENCES "building"("id")
);