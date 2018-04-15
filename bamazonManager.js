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

  initialPrompt();

 
});

function initialPrompt() {
	inquirer
  		.prompt([
  			{
				type: "list",
				message: "What would you like to do?",
				choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
				name: "command"
		    }
		])
		.then(function(answer) {
		switch(answer.command){
			case "View Products For Sale":
				viewProducts();
				break;
			case "View Low Inventory":
				lowInventory();
				
				break;
			case "Add to Inventory":
				addInventory();
				
				break;
			case "Add New Product":
				newItem();
				break;
			case "Exit":
				console.log("\n Your session has ended.");
      			connection.destroy();
		}


		});//ends then



}


function viewProducts(){
	connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    	for (var i = 0; i<res.length; i++) {
    		console.log("==================================");
    		console.log("Product ID: " + res[i].id);
    		console.log("Product Name: " + res[i].product_name);
    		console.log("Department Name: " + res[i].department_name);
    		console.log("Price: " + res[i].price);
    		console.log("Stock Quantity: " + res[i].stock_quantity);
    		console.log("==================================");


    	}

    	initialPrompt();


    
  });
}

function lowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity <= 10", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    console.log("==================================");
    	for (var i = 0; i<res.length; i++) {
    		
    		console.log("Product ID: " + res[i].id + "     Product Name: "+  res[i].product_name + "     Stock Quantity: " + res[i].stock_quantity);
    		   		

    	}
    console.log("==================================");

    initialPrompt();


  });
}

function addInventory() {

  
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
				message: "Select the product you would like to add inventory too?",
				choices: productArray,
				name: "selection"
		    }
		])
		.then(function(inqRes) {
			console.log(inqRes.selection);
			selectItem(inqRes.selection);


		});//ends then


  });//end of connection query
} //end of addInventory

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

function quantityPrompt(res) {
	  inquirer
  		.prompt([
  			{
				type: "input",
				message: "How many would you like to add to the inventory?",
				name: "quantity"
		    }
		])
		.then(function(inqRes) {
			console.log(inqRes.quantity);

			var inqQuan = parseInt(inqRes.quantity);
			
				
				
				confirmPrompt(res, inqQuan);


		});//ends then
    
}// ends quantityPrompt

function confirmPrompt(res, inqQuan) {
	inquirer
  				.prompt([
		  			{
						type: "confirm",
						message: "Are you sure you want to add " + inqQuan + " " + res[0].product_name + " to the inventory?",
						name: "confirm",
						default: true
				    }
				])
				.then(function(inqRes) {
					if (inqRes.confirm) {
						console.log("The inventory has been restocked!");
						var newQuan = res[0].stock_quantity + inqQuan;
						updateQunatity(res, newQuan);
						
						
					}

					else {
						console.log("Your inventory has NOT been restocked.");
						regretsPrompt(res);
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

      console.log("\n The inventory database has been updated!");
      initialPrompt();
     
    }
  );
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
				initialPrompt();	
			}


		});//ends then
}


function newItem() {
  console.log("Inserting a new product...\n");
  inquirer
  		.prompt([
  			{
					type: "input",
					message: "What is the product name?",
					name: "name"
		    },
		    {
		    	type: "input",
					message: "What is the name of the department?",
					name: "deptName"
		    },
		    {
		    	type: "input",
					message: "What is the price of the product?",
					name: "price"
		    },
		    {
		    	type: "input",
					message: "How many is in stock?",
					name: "stoQuan"
		    }
		])
		.then(function(res) {
		
  connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: res.name,
      department_name: res.deptName,
      price: res.price,
      stock_quantity: res.stoQuan
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateCrud AFTER the INSERT completes
      initialPrompt();
      
    }
  );

  });//ends then
}




