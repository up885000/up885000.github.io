/* This SQL is used by quickSetup.sh to create and populate the recipeapp database quickly. */

CREATE database recipeapp;

use recipeapp;

/* Creates the category table, primary key on category_id */
CREATE TABLE `category` (
  `category_id` serial,
  `category_name` varchar(30),
  PRIMARY KEY (`category_id`)
);

/* Creates the recipe_ingredients table, composite key on recipe_id + ingredient_id as each ingredients will have a different measurement for each recipe*/
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int,
  `ingredients_id` int,
  `measurement_id` int,
  `quantity` float,
  `type` varchar(8),
  PRIMARY KEY (`recipe_id`, `ingredients_id`, `type`),
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
  `image_location` varchar(150),
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

INSERT INTO category (category_id, category_name) VALUES (1 , 'African');
INSERT INTO category (category_id, category_name) VALUES (2 , 'Rice');
INSERT INTO category (category_id, category_name) VALUES (3 , 'Chinese');
INSERT INTO category (category_id, category_name) VALUES (4 , 'Seafood');
INSERT INTO category (category_id, category_name) VALUES (5 , 'Side');
INSERT INTO category (category_id, category_name) VALUES (6 , 'British');
INSERT INTO category (category_id, category_name) VALUES (7 , 'Dessert');
INSERT INTO category (category_id, category_name) VALUES (8 , 'Vegetarian');
INSERT INTO category (category_id, category_name) VALUES (9 , 'Chicken');
INSERT INTO category (category_id, category_name) VALUES (10 , 'Mexican');

/* This file contains all the SQL code to insert data for the ingredients table into the server */

/* Fish and Chips */
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (1 , 'Sunflower Oil');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (2 , 'Cod Fillets');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (3 , 'Flour');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (4 , 'Black Pepper');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (5 , 'Lager');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (6 , 'Potato');

/* Battenburg Cake */
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (7 , 'Butter');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (8 , 'Sugar');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (9 , 'Eggs');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (10 , 'Vanilla Extract');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (11 , 'Icing Sugar');

/* Jam roly-poly */

INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (12 , 'Milk');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (13 , 'Strawberry Jam');
/* Also: Flour, Sugar */

/* Chicken Burritos */
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (14 , 'Chicken Thighs');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (15 , 'Mayonnaise');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (16 , 'Sour Cream');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (17 , 'Lime');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (18 , 'Tomato');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (19 , 'Rice');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (20 , 'Tortilla');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (21 , 'Mozarella');

/* Firecracker prawns with stir-fried greens */
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (22 , 'Spring Oninons');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (23 , 'Chillies');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (25 , 'Oyster Sauce');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (26 , 'Vinegar');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (27 , 'Soy Sauce');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (28 , 'Prawns');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (29 , 'Olive Oil');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (30 , 'Park Choi');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (31 , 'Sesame Oil');


/* Jollof Rice */
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (32 , 'Passata');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (33 , 'Puree');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (34 , 'Scotch Bonnet Chillies');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (35 , 'Onions');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (36 , 'Vegetable Oil');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (37 , 'Tomatoes');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (38 , 'Chicken Stock');
INSERT INTO ingredients (ingredients_id, ingredients_name) VALUES (39 , 'Plantains');

/* This file contains all the SQL code to insert data for the measurements table into the server */

INSERT INTO measurements (measurement_id , measurement_name) VALUES (1 , ' ');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (2 , 'ml');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (3 , 'fl oz');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (4 , 'tbsp');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (5 , 'g');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (6 , 'lb');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (7 , 'oz');
INSERT INTO measurements (measurement_id , measurement_name) VALUES (8 , 'tsp');

/* This file contains all the SQL code to insert data for the recipe_category table into the server */

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (1 , 1);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (1 , 2);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (2 , 3);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (2 , 2);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (2 , 4);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (2 , 5);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (3 , 6);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (3 , 4);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (4 , 7);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (4 , 6);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (4 , 8);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (5 , 7);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (5 , 6);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (5 , 8);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (6 , 9);

INSERT INTO recipe_category_line (recipe_id, category_id) VALUES (6 , 10);

/* This file contains all the SQL code to insert data for the recipe_ingredients table into the server */

/*/ Jollof Rice */



/* Firecracker prawns with stir-fried greens */



/* Fish and chips */



/* Battenburg Cake */
INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4, 7, 5, 175, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4, 7, 7, 6, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 8, 5, 175, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 8, 7, 6, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 9, 1, 3, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 3, 5, 175, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 3, 7, 6, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 10, 4, 1, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (4 , 11, 4, 3, 'neutral');

/* Jam roly-poly */

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 3, 5, 200, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 3, 7, 7, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 8, 4, 1, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 12, 2, 150, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 12, 3, 5, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (5 , 13, 4, 6, 'neutral');

/* Chicken burritos */

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 14, 5, 800, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 14, 7, 28, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 15, 4, 2, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 16, 4, 2, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 17, 1, 1, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 37, 1, 2, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 19, 5, 150, 'metric');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 19, 7, 5, 'imperial');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 20, 1, 4, 'neutral');

INSERT INTO recipe_ingredients (recipe_id , ingredients_id, measurement_id, quantity, type) 
VALUES (6 , 21, 4, 4, 'neutral');

INSERT INTO recipe (recipe_id, recipe_name, recipe_description, preparation_time
, cooking_time, difficulty, recipe_serving, image_location) 
VALUES (4 , 'Battenberg cake'
, 'Battenberg cake is a true classic for afternoon tea. The Hairy Bikers recipe makes it foolproof.

Method

1. Preheat the oven to 190C/375F/Gas 5.

2. Grease a 20cm/8in square, loose-based cake tin with butter.

3. Take a 30cm x 20cm/12in x 8in strip of baking parchment and make a 8cm/3infold in the centre. This will create a division in the cake so that the two
differently coloured sponges can be cooked at the same time.

4. Line the tin with the baking parchment, keeping the division in the centre

5. Put the butter, sugar, eggs, flour and vanilla in a food processor and pulse until well combined.

6. Transfer the batter to a bowl set on scales, remove half of the batter and put it in a different bowl.

7. Add a small dab of red food colouring to one bowl and fold it into the batter until it is well blended.

8. Spoon the cake batters into each side of the prepared tin and smooth the surface with the back of a spoon.

9. Bake in the centre of the oven for about 25 minutes, or until the sponges have risen. Cool in the tin for five minutes, then slide a knife around the outside of each sponge and turn them out onto a wire rack. If the sponges have risen unevenly, press the surface gently until level. Leave until completely cold

10. To assemble the cake, first place one sponge on top of the other and trim off the crusty edges so they are both the same size. Cut the sponges in half lengthways to make four long rectangles.

11. Warm the apricot jam in a saucepan then press through a fine sieve.

12. Brush the long side of one of the sponges with jam and sandwich together with a sponge of a contrasting colour. Do the same with the other two sponges.

13. Sandwich the two pairs of sponges together like a checker board and brush the top and sides with jam.

14. Place the marzipan on a surface dusted with icing sugar and roll into a rectangle of about 40cm x 20cm/16in x10in; it should be large enough to wrap the cake completely, leaving the ends exposed, and be about 5mm/¼in thick.

15. Turn the cake upside down on the marzipan and brush the underside of the sponges with jam.

16. Wrap the marzipan around the cake, pressing it gently onto the surface of the sponges, and press the edges together to make a firm join.

17. Turn back over with the seam underneath, trim a thin slice off each end and place on a serving plate.'

, '00:45', '00:20', 'Hard', 1, '/database/images/battenburg_cake.jpg');

/* Jam roly-poly */

INSERT INTO recipe (recipe_id, recipe_name, recipe_description, preparation_time
, cooking_time, difficulty, recipe_serving, image_location) 
VALUES (5 , 'Jam roly-poly'
, 'Try a recipe based on the Hairy Bikers recipe for jam roly-poly. Its an easy homemade version of a childhood classic. Serve with plenty of custard.

Method

1. Preheat the oven to 200C/180C Fan/Gas6. Butter a large sheet of baking paper and set aside.

2. Stir the flour, suet, sugar and salt in a large bowl until fully combined. Slowly stir in the milk to form a soft, spongy dough.

3. Tip the dough out onto a floured surface and knead for a few minutes. Roll the dough out to a 22cm x32cm/8½in x 13in rectangle.

4. Spread the jam onto the dough, leaving a 1.5cm/½in border. Gently roll the dough up from the short end and transfer to the greaseproof paper, seam-side down. Wrap the roly poly in the baking paper, making a long pleatin the paper to allow the pudding to expand as it cooks. Twist the ends ofthe paper like a Christmas cracker and tie tightly with kitchen string, to seal the pudding inside. Repeat the process with a large piece of kitchen foil.

5. Place the pudding onto a roasting rack set on a deep-sided roasting tin. Pour boiling water halfway up the roasting tin and cook in the oven for 30–35 minutes.

6. Remove the pudding from the oven, unwrap the kitchen foil, then snip the string and unwrap the paper.

7. The pudding should be well risen and lightly browned in places. Don’t worry if the jam has made its way through to the outside of the pudding a little – it will taste all the more delicious.

8. Put on a board or serving plate and cut into thick slices. Serve with lots of hot custard or cream.'

, '00:30', '00:45', 'Medium', 6, '/database/images/jam_roly_poly.jpg');

/* Chicken burritos */

INSERT INTO recipe (recipe_id, recipe_name, recipe_description, preparation_time
, cooking_time, difficulty, recipe_serving, image_location) 
VALUES (6 , 'Chicken burritos'
, 'These authentic chicken burritos are the real deal. Topped with pico de gallo, chipotle crema, guacamole, soured cream and cheese, guests won''t be disappointed.

Method

1. To make the chicken, mix the lime juice, garlic, oil, oregano, chilli, sugar and salt and pepper together in a large bowl. Add the chicken, cover and place in the fridge for at least 2 hours.

2. Meanwhile, to make the chipotle crema, mix the chipotles en adobo, soured cream and mayonnaise with a squeeze of lemon juice and a pinch of salt and set aside.

3. To make the pico de gallo, mix all the ingredients together with ½ teaspoon of salt in a bowl and set aside.

4. To make the guacamole, pound the chilli in a pestle and mortar with the onionand ¼ teaspoon of salt, into a lumpy paste. Add the avocado and break up the flesh roughly with a fork. The result should be lumpy not smooth. Stir in the lime juice, to taste, and the chopped coriander.

5. Place a frying pan over a high heat and cook the chicken thighs, without the marinade, until browned and sealed. Add the marinade to the pan, cover with alid and cook for 10–15 minutes, or until the chicken is cooked through as the juices run clear. Slice the chicken into strips.

6. Meanwhile, cook the rice according to packet instructions.

7. Divide the tortillas between four plates and top with the rice, chicken, sauces, mozzarella and lettuce. Fold up the bottom of each tortilla, then fold the sides in and roll to contain the filling. Cut in half to serve.'

, '01:30', '00:20', 'Medium', 4, '/database/images/chicken_burrito.jpg');

/* This file contains all the SQL code to insert data for the reviews table into the server */

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (1 , 1, 4, 'This recipe was very good. I made this for 8, and we all thoroughly enjoyed it.');

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (2 , 2, 5, 'Quick and easy to cook. A well deserved 5-star side dish.');

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (3 , 3, 4, 'I made this last night. Everything turned out delicious! Fries were yummy and the fish was tender and it was a great dinner.');

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (4 , 4, 5, 'GREAT recipe - easy to make. very authentic - however, you must spread the apricot jam on the marzipan with a pastry brush before you wrap the cake in it.');

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (5 , 5, 1, 'Followed this recipe rather than mary berrys which said to use self raising flour. Wished I''d have stuck with Mary berry, this was so terrible I put it out for the birds.');

INSERT INTO reviews (reviews_id, recipe_id, rating, review) VALUES (6 , 6, 5, 'Fun recipe who doesn’t love a good chicken burrito? And better when is homemade and made with lots of love');

create user 'webapp'@'localhost' identified by '1234';

grant all privileges on recipeapp.* to 'webapp'@'localhost';