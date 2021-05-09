const obj = {
    nom: "doe",
    prenom: "josh"
}

const objstr = JSON.stringify(obj);

localStorage.setItem("tata", objstr);