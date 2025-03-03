const menu: { name: string; price: number }[] = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
];

const cashInRegister: number = 100;
const orderQueue: any[] = [];

/**
 * Aggiunge una nuova pizza al menu
 */
function addMenu(pizzaObject: { name: string; price: number }): void {
    menu.push(pizzaObject);
    console.log("Nuovo menu:", menu);
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
