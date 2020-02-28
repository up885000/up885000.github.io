CREATE TABLE "measurements" (
  "measurement_id" serial,
  "measurement_name" varchar(30),
  PRIMARY KEY ("measurement_id")
);

CREATE TABLE "recipe_ingredients" (
  "recipe_id" int,
  "ingredients_id" int,
  "measurement_id" int,
  "quantity" float
);

CREATE INDEX "PK/FK" ON  "recipe_ingredients" ("recipe_id", "ingredients_id");

CREATE INDEX "FK" ON  "recipe_ingredients" ("measurement_id");

CREATE TABLE "recipe" (
  "recipe_id" serial,
  "recipe_name" varchar(100),
  "recipe_description" text,
  "preparation_time" time,
  "Cooking_time" time,
  "difficulty" varchar(20),
  PRIMARY KEY ("recipe_id")
);

CREATE TABLE "ingredients" (
  "ingredients_id" serial,
  "ingredients_name" varchar(100),
  PRIMARY KEY ("ingredients_id")
);

CREATE TABLE "category" (
  "category_id" serial,
  "category_name" Type,
  PRIMARY KEY ("category_id")
);

CREATE TABLE "recipe_category_line" (
  "recipe_id" int,
  "category_id" int
);

CREATE INDEX "PK/FK" ON  "recipe_category_line" ("recipe_id", "category_id");

CREATE TABLE "reviews" (
  "reviews_id" serial,
  "recipe_id" int,
  "rating" int,
  "review" varchar(200),
  PRIMARY KEY ("reviews_id")
);

CREATE INDEX "FK" ON  "reviews" ("recipe_id");
