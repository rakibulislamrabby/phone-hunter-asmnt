const main = document.getElementById("main");
const phoneDetails = document.getElementById("phone-details");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;
    // console.log(inputValue);
    input.value = "";
    main.innerHTML = "";
    phoneDetails.innerHTML = ""
    if (inputValue.toLowerCase() === "apple" || inputValue.toLowerCase() === "oppo" || inputValue.toLowerCase() === "samsung" || inputValue.toLowerCase() === "huawei") {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.data))

        error.innerHTML = ""
    }
    else {
        error.innerText = "Write the available phone name in our site";
    }

}

const displayCards = (phones) => {
    const first10Phone = phones.slice(0, 20);
    first10Phone.forEach(phone => {
        // console.log(phone);
        const div = document.createElement("div");
        div.className = "col-lg-4";
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.brand}</h5>
            <p class="card-text">${phone.phone_name}</p>
            <p class="card-text"></p>
            <button onclick="loadExplore('${phone.slug}')" class="btn btn-primary">Explore</button>
        </div>
        </div>
            `;
        main.appendChild(div);
    });
}
const loadExplore = phoneId => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => displayExplore(data))
}

const displayExplore = (details) => {
    console.log(details);
    phoneDetails.innerHTML = "";
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
            <div class="card">
                <img src="${details.data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${details.data.name}</h5>
                    <p class="card-text">${details.data.releaseDate}</p>
                    <p class="card-text">Chipset: ${details.data.mainFeatures.chipSet}</p>
                    <p class="card-text">Memory: ${details.data.mainFeatures.memory}, Storage: ${details.data.mainFeatures.storage}</p>
                    <p class="card-text">Display-Size: ${details.data.mainFeatures.displaySize}</p>
    
                    <h5 class="card-title">Others-Information</h5>
                     <p class="card-text">Bluetooth: ${details.data.others.Bluetooth}</p>
                     <p class="card-text">GPS: ${details.data.others.GPS}</p>
                     <p class="card-text">NFC: ${details.data.others.NFC}</p>
                     <p class="card-text">Radio: ${details.data.others.Radio}</p>
                     <p class="card-text">USB: ${details.data.others.USB}</p>
                     <p class="card-text">WLAN: ${details.data.others.WLAN}</p>
                    
                    </div>
                </div>
    
    `;
    phoneDetails.appendChild(div);
}