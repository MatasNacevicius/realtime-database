import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase();

let enterID = document.getElementById("priceID");
let enterName = document.getElementById("enterName");
let enterQuantity = document.getElementById("enterQuantity");

let insertBtn = document.getElementById("insert");
let updateBtn = document.getElementById("update");
let ramoveBtn = document.getElementById("remove");

insertBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const productName = enterName.value;
  const productQuantity = enterQuantity.value;
  const productID = enterID.value;

  set(ref(db, "product/" + productID), {
    name: productName,
    quantity: productQuantity,
    id: productID,
  })
    .then(() => {
      alert("added successfuly");
    })
    .catch((error) => {
      alert(error);
    });
});

updateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const productID = enterID.value;

  get(child(ref(db), `product/${productID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        enterName.value = snapshot.val().name;
        enterQuantity.value = snapshot.val().quantity;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
