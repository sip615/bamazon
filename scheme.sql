--Creates a new bamazon database, and drops anything called bamazon if it already exists--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
--Make sure to use the bamazon database--
USE bamazon;
--Creates the products table for the bamazon CLI--
CREATE TABLE `products`
(
  `item_id` int
(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar
(45) NOT NULL,
  `department_name` varchar
(45) NOT NULL,
  `price` decimal
(10,2) NOT NULL,
  `stock_quantity` int
(10) NOT NULL,
  PRIMARY KEY
(`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Get everything from the products table--
SELECT *
FROM products;

--Populate the table, (this code was provided with TA assistance)--
INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Uncharted 4", "Video Games", 49.95, 150),
    ("DOOM", "Video Games", 59.99, 200),
    ("Crate of Spam", "Food and Drink", 24.50, 50),
    ("Cool Shades", "Apparel", 75.00, 5),
    ("Worn Denim Jeans", "Apparel", 54.25, 35),
    ("Survival Towel", "Necessities", 42.42, 42),
    ("Bill and Ted's Excellent Adventure", "Films", 15.00, 25),
    ("Mad Max: Fury Road", "Films", 25.50, 57),
    ("Monopoly", "Board Games", 30.50, 35),
    ("Yahtzee", "Board Games", 19.95, 23);
