-- Use database
\c "buiding_db";

-- Insert data into the building table
INSERT INTO "building" ("name") 
VALUES 
  ("A"), 
  ("B");


-- Insert data into the location table
INSERT INTO "location" (
  "location_name", "location_number", 
  "area", "building_id", "parent_location"
) 
VALUES 
  (
    'Location A', '001', 100.0, 
    'replace_me', NULL
  ), 
  (
    'Location B', '002', 150.0, 
    'replace_me', NULL
  ), 
  (
    'Location C', '003', 200.0, 
    'replace_me', NULL
  );


