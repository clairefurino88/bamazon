# Functionality

## bamazon Customer Feature

![screenshot 3](https://user-images.githubusercontent.com/33135335/38774153-3273b7e4-402f-11e8-9583-2be5a1f6426a.png)
The database, as seen on the left column, has been populated with around 10 different products.
Then, in the right screen, bamazonCustomer.js is running and displaying all of the items available for sale.
The user then uses the arrow keys to move through the list of product and select which one they would like to buy.

&nbsp;

![screenshot 4](https://user-images.githubusercontent.com/33135335/38774184-876939c6-4030-11e8-9404-28ce549e0d9c.png)
The user it then asked how many units of the product they would like to buy.

&nbsp;

![screenshot 5](https://user-images.githubusercontent.com/33135335/38774192-c5215f5a-4030-11e8-8cbf-aa6da02180ca.png)
The user is asked to confirm their order before completing it
Once the customer has placed the order bamazonCustomer.js checks if the store (database) has enough of the product to meet the customer's request.

&nbsp;

![screenshot 8](https://user-images.githubusercontent.com/33135335/38774235-d4daec08-4031-11e8-9542-059aab0cb667.png)
If the store has insufficient quntities, it read "Insufficient quantity!"

&nbsp;

![screenshot 7](https://user-images.githubusercontent.com/33135335/38774196-e7d5ebd8-4030-11e8-9d3a-4cc470579018.png)
If the store does have enough of the product, the customers order is fulfilled and the database automatically updates its stock.
This can be seen in the left column as the mouse 'stock_quanity' decreased by two after two mouse's were purchased

## bamazon Manager Feature

![options](https://user-images.githubusercontent.com/33135335/38774467-d44d79da-4037-11e8-9851-2627da948745.png)
First the manager is offered the different options: View Products, View Low Inventory, Add to Inventory, Add New Product, and Exit

&nbsp;

![viewproducts](https://user-images.githubusercontent.com/33135335/38774468-ea16b2e0-4037-11e8-91e3-043c577f6e9c.png)
When the manager selects View Products for Sale, the bamazonManager.js lists every available item

&nbsp;

![viewlowinventory](https://user-images.githubusercontent.com/33135335/38774472-fccf2dcc-4037-11e8-8865-e28993df943d.png)
When the manager selects View Low Inventory, the bamazonManager.js lists all items with an inventory count lower than five.

&nbsp;

![addinventory](https://user-images.githubusercontent.com/33135335/38774476-0d2b7a68-4038-11e8-98d1-6a0b06500082.png)
When the manager selects Add to Inventory, the bamazonManager.js displays a prompt that will let the manager "add more" of any item currently in the store and it is updated in the database. As you can see, after 8 pillows were added, the database updated from 50 pillow to 58 pillows.

&nbsp;

![screenshot 15](https://user-images.githubusercontent.com/33135335/38774496-972bceb6-4038-11e8-86ff-bfc442bf119f.png)
When the manager selects Add New Product, the bamazonManager.js allows the manager to add a completely new product and customize the department, price, and the sotck available to the store. This is then automatically updated in the database. As seen in the screenshot, the database is updated with 25 blouse's for $40.00 each in the database.
