


// ------------- Part 1 -----------------
// Fill out the function addTwoNumbers() to create a working calculator UI (user interface)

function addTwoNumbers(): void {
    const firstInput = document.querySelector('#first-input') as HTMLInputElement
    const secondInput = document.querySelector('#second-input') as HTMLInputElement
    const val1: string = firstInput.value
    const val2: string = secondInput.value
    //TODO: get the value contained in the second input
    //TODO: check that neither input is the empty string (values retrieved from inputs are strings), if so return.
    if (val1 == "" || val2 == "") {
        return
    }
    // must parse values in order to add them, then convert back to a string
    // in order to input our result into the DOM
    document.querySelector('#total').innerHTML = `${parseInt(val1) + parseInt(val2)}` //backtick method!

}

//TODO: add an event listener (addTwoNumbers) to the "#compute-button" on "click"
const computeButton: HTMLButtonElement = document.getElementById("compute-button") as HTMLButtonElement
computeButton.addEventListener("click", addTwoNumbers)


// Before starting part 2, your calculator should be able to successfully add two numbers,
// and should not throw an error if either inputs are empty.



// ------------- Part 2 -----------------
// Fill out the following functions to build a shopping cart UI.
// You should be able to logically and visually add items to the cart , and the cart total should
// update upon each addition.


// This will serve as the logical cart: a map from an itemID to its cart-count
const myCart: {[key: string]: number} = {}

function setUpShop(): void {
    const cart_buttons = document.querySelectorAll('.cart-button')
    for (let i = 0; i < cart_buttons.length; i++){
        const btn = cart_buttons[i]
        const item_id: string = btn.getAttribute("data-for")
        const item: HTMLButtonElement = document.getElementById(item_id) as HTMLButtonElement
        btn.addEventListener("click", () => addToCart(item))
        //TODO: get the item with id item_id
        //TODO: bind an event listener to the current button
        //  - the event listener should be a function that calls addToCart(item),
        //  hint: you can create an anonymous function inside of your call to
        //  btn.addEventListener like this: () => <function body>
    }
}

function addToCart(item): void {
    const itemID: string = item.id
    //TODO: increment the cart count for the given itemID in the cart object
    //  - the cart should map cart item ids to their quantity.
    //  - if an item is already present in the cart, increment its quantity
    // -  if an item is not yet in the cart, set its quantity to 1
    //  - you can check if a given key is in an object like so : if (itemID in myCart) {..}
    if (itemID in myCart) {
        myCart[itemID] = myCart[itemID] + 1
    } else {
        myCart[itemID] = 1
    }
    displayCart()
}

function displayCart(): void {
    const cart: HTMLDivElement = document.querySelector('#my-cart')
    //this resets the carts inner HTML
    cart.innerHTML = ""
    let total: number = 0

    //TODO: fill in this method -- replace the question marks!
    //  param item: the DOM element representing the item (of the class "store-item")
    // 1) each store-item has a custom attribute "data-price". To retrieve an attribute
    //    value for a given element, say "myAttribute", you can use element.getAttribute("myAttribute").
    //    note that this value will be returned as a string
    // 2) when adding html to the cart element, it should include the itemid, quantity,
    //    and compound price (price x quantity).
    //      ex: item 1, quantity: 3, $30
    //    the item desciption, quanity, and price, should be rapped in a paragraph (<p> </p>) so that
    //    each item displays on a new line

    const displayItem: (item: HTMLDivElement) => void = (item) => {
        const price: string = item.getAttribute("data-price") // attribute data-price
        const quantity: number = myCart[item.id] // stored in myCart
        const priceNum : number = parseFloat(price)
        const totalPrice : number = priceNum * quantity
        // remember that you can use the backtick method here (explained in the handout)
        cart.innerHTML += `<p> ${item.id}, quantity: ${quantity}, ${price} </p>`
        total += totalPrice
    }

    //TODO: call displayItem on each of the items in the myCart Object
    // - the map function applies a function (supplied as the argument to the map call) to each of the
    //   elements in a list.
    //      ex: myList.map(someFunction)
    // - to get the keys of an object as a list, you can use the Object.keys method:
    //      ex: Object.keys(myObject)
    // - in order to actually use the items in the list as the parameter to someFunction, you can use
    //   an anonymous arrow function
    //      ex: myList.map(a => someFunction(a))
    //   remember that the keys of myCart are ~IDs~ of "store-item"s, not the DOM elements themselves',
    //   and that the displayItem function takes in an actual DOM element.
    Object.keys(myCart).map(a => displayItem(document.getElementById(a) as HTMLDivElement))

    //TODO: update the inner html of the element with ID #cart-total with the compounded total!
    document.querySelector(`#cart-total`).innerHTML = `${total}`
}

setUpShop()









