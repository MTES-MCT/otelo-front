-- First, alter the table to drop old columns and add new nullable columns
ALTER TABLE "vacancy_accommodation" DROP CONSTRAINT "vacancy_accommodation_pkey";

ALTER TABLE "vacancy_accommodation" 
  DROP COLUMN "nb_loc_vac_pp",
  DROP COLUMN "nb_loc_vac_pp_long",
  DROP COLUMN "nb_loc_vac_pp_short",
  DROP COLUMN "nb_total_pp",
  DROP COLUMN "prop_loc_vac_pp",
  DROP COLUMN "prop_loc_vac_pp_long",
  DROP COLUMN "prop_loc_vac_pp_short";

-- Add new columns as nullable first
ALTER TABLE "vacancy_accommodation" 
  ADD COLUMN "nb_log_vac_2less" INTEGER,
  ADD COLUMN "nb_log_vac_2more" INTEGER,
  ADD COLUMN "nb_log_vac_5more" INTEGER,
  ADD COLUMN "nb_total" INTEGER,
  ADD COLUMN "prop_log_vac_2less" DOUBLE PRECISION,
  ADD COLUMN "prop_log_vac_2more" DOUBLE PRECISION,
  ADD COLUMN "prop_log_vac_5more" DOUBLE PRECISION,
  ADD COLUMN "year" INTEGER;

-- Update the data if needed (you might want to add your data migration logic here)
-- For example:
UPDATE "vacancy_accommodation" SET 
  "year" = 2023,  -- Replace with appropriate default year
  "nb_total" = 0,
  "nb_log_vac_2less" = 0,
  "nb_log_vac_2more" = 0,
  "nb_log_vac_5more" = 0,
  "prop_log_vac_2less" = 0.0,
  "prop_log_vac_2more" = 0.0,
  "prop_log_vac_5more" = 0.0;

-- Now make the columns non-nullable
ALTER TABLE "vacancy_accommodation" 
  ALTER COLUMN "nb_log_vac_2less" SET NOT NULL,
  ALTER COLUMN "nb_log_vac_2more" SET NOT NULL,
  ALTER COLUMN "nb_log_vac_5more" SET NOT NULL,
  ALTER COLUMN "nb_total" SET NOT NULL,
  ALTER COLUMN "prop_log_vac_2less" SET NOT NULL,
  ALTER COLUMN "prop_log_vac_2more" SET NOT NULL,
  ALTER COLUMN "prop_log_vac_5more" SET NOT NULL,
  ALTER COLUMN "year" SET NOT NULL;

-- Finally, add the new primary key
ALTER TABLE "vacancy_accommodation" 
  ADD CONSTRAINT "vacancy_accommodation_pkey" PRIMARY KEY ("epci_code", "year"); 