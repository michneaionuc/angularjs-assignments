(function() {
    angular.module('ShoppingListCheckOff', [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService) {
        const toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyList();
        toBuy.moveItem = (itemIndex) => {
            ShoppingListCheckOffService.moveItem(itemIndex);
        }          
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        const alreadyBought = this;
        
        alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtList();
    }

    function ShoppingListCheckOffService() {
        const service = this;
        
        const initialValues = [
            { name: "cookies", quantity: 10 },
            { name: "coffee", quantity: 1 },
            { name: "bread", quantity: 2 },
            { name: "milk", quantity: 3 },
            { name: "butter", quantity: 2 },
            { name: "apples", quantity: 5 },
            { name: "oranges", quantity: 4 }
        ]

        const toBuyList = initialValues;
        const alreadyBoughtList = []; 

        service.moveItem = (index) => {
            const boughtItem = toBuyList.splice(index, 1)[0];
            alreadyBoughtList.push(boughtItem);
        }

        service.getToBuyList = () => {
            return toBuyList;
        }

        service.getAlreadyBoughtList = () => {
            return alreadyBoughtList;
        }
    }
})()
