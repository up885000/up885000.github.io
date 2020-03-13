/* Creates the category table, primary key on category_id */
CREATE TABLE `category` (
  `category_id` serial,
  `category_name` varchar(30),
  PRIMARY KEY (`category_id`)
);

/* Creates the ingredients table, composite key on recipe_id + ingredient_id as each ingredients will have a different measurement for each recipe*/
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int,
  `ingredients_id` int,
  `measurement_id` int,
  `quantity` float,
  KEY `PK/FK` (`recipe_id`, `ingredients_id`),
  KEY `FK` (`measurement_id`)
);

/* Creates the ingredients table, primary key on ingredient_id */
CREATE TABLE `ingredients` (
  `ingredients_id` serial,
  `ingredients_name` varchar(100),
  PRIMARY KEY (`ingredients_id`)
);

/* Creates the recipe table, primary key on recipe_id*/
CREATE TABLE `recipe` (
  `recipe_id` serial,
  `recipe_name` varchar(100),
  `recipe_description` text,
  `preparation_time` time,
  `cooking_time` time,
  `difficulty` varchar(20),
  `recipe_serving` int,
  PRIMARY KEY (`recipe_id`)
);

/* Creates the reviews table, primary key on review_id, foreign key on recipe_id*/
CREATE TABLE `reviews` (
  `reviews_id` serial,
  `recipe_id` int,
  `rating` int,
  `review` varchar(200),
  PRIMARY KEY (`reviews_id`),
  KEY `FK` (`recipe_id`)
);

/* Creates the intermediary table that connects recipes and their categories, this is done as many recipes will have many categories*/
CREATE TABLE `recipe_category_line` (
  `recipe_id` int,
  `category_id` int,
  KEY `PK/FK` (`recipe_id`, `category_id`)
);

/* Creates the measurements table, primary key on measurement_id*/
CREATE TABLE `measurements` (
  `measurement_id` serial,
  `measurement_name` varchar(30),
  PRIMARY KEY (`measurement_id`)
);
