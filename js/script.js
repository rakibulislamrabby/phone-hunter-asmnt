const main = document.getElementById("main");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;
    console.log(inputValue);
    input.value = "";
    main.innerHTML = "";
    if (inputValue.toLowerCase() === "apple" || inputValue.toLowerCase() === "oppo" || inputValue.toLowerCase() === "samsung" || inputValue.toLowerCase() === "huawei") {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.data))

        error.innerHTML = ""
    }
    else {
        error.innerText = "Write available phone Name in our site";
    }

}

const displayCards = (phones) => {
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement("div");
        div.className = "col-lg-4 ";
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.phone_name}</p>
            <p class="card-text"></p>
            <a href="#" class="btn btn-primary">Explore</a>
        </div>
        </div>
            `;
        main.appendChild(div);
    });
}