type Pizza = {
	id: number
	name: string
	price: Number
}

type Order = {
	id: number
	pizza: Pizza
	status: "ordered" | "completed"
}

const menu: Pizza[] = [
	{ id: 1, name: "Margherita", price: 8 },
	{ id: 2, name: "Pepperoni", price: 10 },
	{ id: 3, name: "Hawaiian", price: 10 },
	{ id: 4, name: "Veggie", price: 9 },
  ];
  
let cashInRegister: number = 100;
const orderQueue: Order[] = [];

let nextOrderId: number = 0;

/**
 * Aggiunge una nuova pizza al menu
 */
function addMenu(pizzaObject: Pizza): void {
	menu.push(pizzaObject);
	console.log("Nuovo menu:", menu);
	updatePizzaDropdown();
	}

	/**
	 * Gestisce il click del bottone
	 */
	document.getElementById("addPizzaBtn")?.addEventListener("click", () => {
	const nameInput = document.getElementById("pizzaName") as HTMLInputElement;
	const priceInput = document.getElementById("pizzaPrice") as HTMLInputElement;

	const pizzaName = nameInput.value.trim();
	const pizzaPrice = parseFloat(priceInput.value);

	if (pizzaName === "" || isNaN(pizzaPrice) || pizzaPrice <= 0) {
	alert("Inserisci un nome valido e un prezzo positivo.");
	return;
}

addMenu({ name: pizzaName, price: pizzaPrice });

// Pulisce i campi dopo l'inserimento
nameInput.value = "";
priceInput.value = "";
});
  
function updateCashDisplay() {
	const cashElement = document.getElementById("cashDisplay") as HTMLSpanElement;
	if (!cashElement) {
		console.error("Elemento cashDisplay non trovato!");
		return;
	}
	cashElement.textContent = cashInRegister.toString();
	console.log("Cassa aggiornata: ", cashInRegister);
}
  
function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        alert("Errore: la pizza selezionata non è nel menu.");
        return null;
    }

    console.log("Prima dell'ordine, cassa:", cashInRegister);
    cashInRegister += selectedPizza.price;
    console.log("Dopo l'ordine, cassa:", cashInRegister);

    updateCashDisplay(); // 🔹 Assicuriamoci che venga chiamata!

    let newOrder = { id: nextOrderId, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
	nextOrderId += 1;

	let orderInput = document.getElementById("orderNumber") as HTMLInputElement;
	orderInput.max = nextOrderId.toString();
    
    return newOrder;
}

function completeOrder(orderNumber: string)
{
	const orderID = parseInt(orderNumber, 10);

	if (isNaN(orderID))
	{
		alert("Numero ordine non valido!")
		return null;
	}
	
	const orderToComplete = orderQueue.find(order => order.id === orderID);

	if (!orderToComplete)
	{
		alert("Inserire numero ordine!");
		return null;
	}

	console.log("Order before: ", orderToComplete);
	orderToComplete.status = "completed";
	console.log("Order after: ", orderToComplete);
	return (orderToComplete);//forse con valore prima di cambiamento
}

document.getElementById("completeOrderBtn")?.addEventListener("click", () => {
	let orderNumberElement = document.getElementById("orderNumber") as HTMLInputElement;
	let orderNumber = orderNumberElement.value;	
	completeOrder(orderNumber);
})
  
//gestisci click pulsante ordinazione
document.getElementById("placeOrderBtn")?.addEventListener("click", (event) => {
event.preventDefault(); //impedisce refresh della pagina

const orderedPizzaElement = document.getElementById("pizzaToOrder") as HTMLSelectElement;
const orderedPizzaValue = orderedPizzaElement.value;

	if (orderedPizzaValue == "defaultOption")
	{
		alert("Scegli una pizza valida!");
		return ;
	}

	const order = placeOrder(orderedPizzaValue);
	console.log("Ordine piazzato: ", order);
});
  
function updatePizzaDropdown() {
const selectElement = document.getElementById("pizzaToOrder") as HTMLSelectElement;
selectElement.innerHTML = ""; // Svuota il select prima di aggiornarlo

// Aggiunge l'opzione predefinita
const defaultOption = document.createElement("option");
defaultOption.value = "defaultOption";
defaultOption.textContent = "Scegli una pizza";
selectElement.appendChild(defaultOption);

// Popola il dropdown con le pizze disponibili
menu.forEach(pizza => {
	const option = document.createElement("option");
	option.value = pizza.name;
	option.textContent = pizza.name;
	selectElement.appendChild(option);
});
}

function getPizzaDetail(identifier: string | number)
{
	if (typeof identifier === "string")
	{

	}
}
  
document.addEventListener("DOMContentLoaded", () => {
	updatePizzaDropdown();
	updateCashDisplay(); // 🔹 Imposta il valore iniziale della cassa!
});
