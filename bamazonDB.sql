DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home & Kitchen", 59.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Comforter", "Home & Kitchen", 129.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Computer & Accessories", 12.29, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse", "Computer & Accessories", 23.53, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monitor", "Computer & Accessories", 249.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports & Fitness", 12.29, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports & Fitness", 11.69, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shorts", "Men's Fashion", 24.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Men's Fashion", 13.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Women's Fashion", 134.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Romper", "Women's Fashion", 13.67, 100);
