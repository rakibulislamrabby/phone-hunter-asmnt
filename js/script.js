const searchButton = () => {
    const input = document.getElementById("input-value");
    const inputValue = input.value;
    console.log(inputValue);
    input.value = "";

    fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
        .then(res => res.json())
        .then(data => displayCards(data.data))
}

const displayCards = (phones) => {
    for (const phone of phones) {
        const div = document.createElement("div");
        div.className = "col-lg-4";

    }
}