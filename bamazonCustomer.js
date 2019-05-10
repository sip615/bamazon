const inq = require("inquirer");
const mysql = require("mysql");
require("console.table");
require("dotenv").config();

const connection = mysql.createConnection({
	database: "bamazon",
	host: "localhost",
	password: process.env.DB_PASS,
	port: "3306",
	user: process.env.DB_USER
});

//Initialize a connection with the server and load the product from the db
connection.connect(err => {
	if (err) {
		console.error(`error connection: ${err.stack}`);
	}
	loadProduct();
});

//load the store's product into the table form the database.
const loadProduct = () => {
	connection.query("SELECT * FROM products", (err, res) => {
		if (err) throw err;
		console.table(res);
		askForItem(res);
	});
};

const askForItem = inventory => {
	inq
		.prompt([
			{
				type: "input",
				message: "What item ID would you like to purchase? [E to Escape]",
				name: "choice",
				validate: res => !isNaN(res) || res.toLowerCase() === "e"
			}
		])
		.then(res => {
			console.log(res);
			seeIfEscape(res.choice);
			let choiceID = parseInt(res.choice);
			let product = checkInventory(choiceID, inventory);

			if (product) {
				askForQuantity(product);
			} else {
				console.log(`This item is unavailable.`);
				loadProduct();
			}
		});
};

const askForQuantity = product => {
	inq
		.prompt([
			{
				type: "input",
				name: "quantity",
				message: "How many would you like? [E to Escape]",
				validate: val => {
					return val > 0 || val.toLowerCase() === "e";
				}
			}
		])
		.then(val => {
			seeIfEscape(val.quantity);
			let quantity = parseInt(val.quantity);
			if (quantity > product.stock_quantity) {
				console.log(`Insufficient Quantity`);
				loadProduct();
			} else {
				makePurchase(product, quantity);
			}
		});
};

const makePurchase = (product, quantity) => {
	connection.query(
		"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
		[quantity, product.item_id],
		(err, res) => {
			console.log(
				`Successfully purchased ${quantity} ${product.product_name}s!`
			);
			loadProduct();
		}
	);
};

const checkInventory = (choiceId, inventory) => {
	for (var i = 0; i < inventory.length; i++) {
		if (inventory[i].item_id === choiceId) {
			return inventory[i];
		}
	}
	return null;
};

const seeIfEscape = choice => {
	if (choice.toLowerCase() === "e") {
		console.log("kBye");
		process.exit(0);
	}
};
