//Global Variable
const main = document.getElementById("main");
const phoneDetails = document.getElementById("phone-details");
const searchButton = () => {
    const input = document.getElementById("input-value");
    const error = document.getElementById("error");
    const inputValue = input.value;
    input.value = "";
    main.innerHTML = "";
    phoneDetails.innerHTML = "";
    //error handling 
    if (inputValue.toLowerCase() === "apple" || inputValue.toLowerCase() === "oppo" || inputValue.toLowerCase() === "samsung" || inputValue.toLowerCase() === "huawei" || inputValue.toLowerCase() === "iphone") {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.data))

        error.innerHTML = ""
    }
    else {
        error.innerText = "No phone Found";
    }

}

const displayCards = (phones) => {
    //show first 20 data in window
    console.log(phones);
    const first20Phone = phones.slice(0, 20);
    first20Phone.forEach(phone => {
        //create Class
        const div = document.createElement("div");
        div.className = "col-lg-4";
        div.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
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
    phoneDetails.innerHTML = "";
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
                <img src="${details.data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${details.data.name}</h5>
                    <h6 class="card-text">Release-Date: ${details.data.releaseDate ? details.data.releaseDate : "No Release Date Found"}</h6>
                    <p class="card-text">Chipset: ${details.data.mainFeatures.chipSet}</p>
                    <p class="card-text">Memory: ${details.data.mainFeatures.memory}, Storage: ${details.data.mainFeatures.storage}</p>
                    <p class="card-text">Display-Size: ${details.data.mainFeatures.displaySize}</p>
    
                    <h5 class="card-title">Others-Information</h5>
                     <p class="card-text">Bluetooth:${details?.data?.others?.Bluetooth ? details.data.others.Bluetooth : "No data found"}</p>
                     <p class="card-text">GPS: ${details?.data?.others?.GPS ? details.data.others.GPS : "No data found"}</p>
                     <p class="card-text">NFC: ${details?.data?.others?.NFC ? details.data.others.NFC : "No data found"}</p>
                     <p class="card-text">Radio: ${details?.data?.others?.Radio ? details.data.others.Radio : "No data found"}</p>
                     <p class="card-text">USB: ${details?.data?.others?.USB ? details.data.others.USB : "No data found"}</p>
                     <p class="card-text">WLAN: ${details?.data?.others?.WLAN ? details.data.others.WLAN : "No data found"}</p>
                    <p class="card-text">Sensors: ${details?.data?.mainFeatures?.sensors}</p>
                    </div>
    `;
    phoneDetails.appendChild(div);
}