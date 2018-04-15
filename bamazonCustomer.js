var mysql = require("mysql");
var inquirer = require("inquirer");

//Array to hold all products in the DB
var productArray = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;

  displayAllProducts();

 
});

//Pushes all items in DB into productArray and lists them to inquirer
function displayAllProducts() {
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
 

    //Loop to push items into productArray
    for (var i = 0; i < res.length; i++) {
    	productArray.push(res[i].product_name);
    }
    

    inquirer
  		.prompt([
  			{
				type: "list",
				message: "Which item would you like to purchase?",
				choices: productArray,
				name: "selection"
		    }
		])
		.then(function(inqRes) {
			console.log(inqRes.selection);
			selectItem(inqRes.selection);


		});//ends then


  });//end of connection query
} //end of displayAllProducts


//function to handle the selected item
function selectItem(item) { 

  connection.query("SELECT * FROM products WHERE product_name =?", [item], function(err, res) {
    if (err) throw err;
    console.log("Item details: ");
    // console.log(res);
    console.log("Product name: " + res[0].product_name);
    console.log("Price: $" + res[0].price);
    console.log(res[0].stock_quantity + " left in stock.")

    quantityPrompt(res);

  
    });//ends connection

}//ends selectItem function


//prompt for user to select the qunatity
function quantityPrompt(res) {
	  inquirer
  		.prompt([
  			{
				type: "input",
				message: "How many would you like to purchase?",
				name: "quantity"
		    }
		])
		.then(function(inqRes) {
			console.log(inqRes.quantity);

			var inqQuan = parseInt(inqRes.quantity);
			if (inqQuan <= res[0].stock_quantity) {

				var total = (inqQuan*res[0].price).toFixed(2);
				console.log("Your total is: $" + total);
				
				confirmPrompt(res, inqQuan);


			}

			else {
				console.log("Insufficient quantity!");
				quantityPrompt(res);

			}

		});//ends then
    
}// ends quantityPrompt


function confirmPrompt(res, inqQuan) {
	inquirer
  				.prompt([
		  			{
						type: "confirm",
						message: "Would you like to place your order?",
						name: "confirm",
						default: true
				    }
				])
				.then(function(inqRes) {
					if (inqRes.confirm) {
						console.log("Your order has been placed!");
						var newQuan = res[0].stock_quantity- inqQuan;
						updateQunatity(res, newQuan);
						
					}

					else {
						console.log("Your order has NOT been placed.");
						regretsPrompt(res);
					}


				});//ends then
} 


// if user does not confirm order, regrets prompt will ask user to change quantity or start over
function regretsPrompt (res) {
	inquirer
  		.prompt([
  			{
				type: "list",
				message: "What would you like to do?",
				choices: ["Change Quantity", "Start Over"],
				name: "selection"
		    }
		])
		.then(function(inqRes) {
			if (inqRes.selection == "Change Quantity"){
				quantityPrompt(res);
			}
			else {
				displayAllProducts();	
			}


		});//ends then
}

// updates DB quantity 
function updateQunatity(res, newQuan) {
	connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuan
      },
      {
        product_name: res[0].product_name
      }
    ],
    function(err, res) {

      console.log("\n Thank you, come again!");
      connection.destroy();
     
    }
  );
}