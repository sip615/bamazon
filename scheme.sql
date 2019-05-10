--Creates a new bamazon database, and drops anything called bamazon if it already exists--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
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