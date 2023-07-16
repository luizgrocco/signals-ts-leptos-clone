import { createEffect, createSignal } from "./signals";

function main() {
  // Setup UI
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  const counter = document.createElement("p");
  const counterDoubled = document.createElement("p");
  button1.textContent = "+1";
  button2.textContent = "-1";
  counter.textContent = "not reactive yet";
  counterDoubled.textContent = "not reactive yet";

  document.body.appendChild(button1);
  document.body.appendChild(counter);
  document.body.appendChild(counterDoubled);
  document.body.appendChild(button2);

  // Setup reactive system
  const count = createSignal(0);
  const doubleCount = () => count.get() * 2;

  createEffect(() => {
    counter.textContent = count.get().toString();
  });

  createEffect(() => {
    counterDoubled.textContent = doubleCount().toString();
  });

  // Add Listeners
  button1.addEventListener("click", () => {
    console.log("+1");
    const current = count.get();
    count.set(current + 1);
  });
  button2.addEventListener("click", () => {
    console.log("-1");
    const current = count.get();
    count.set(current - 1);
  });
}

main();
