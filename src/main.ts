import { Runtime, createEffect, createSignal } from "./signals";

function main() {
  // Setup UI
  // const button1 = document.createElement("button");
  // const button2 = document.createElement("button");
  // const counter = document.createElement("p");
  // const counterDoubled = document.createElement("p");
  const checkbox = document.createElement("input");
  // button1.textContent = "+1";
  // button2.textContent = "-1";
  // counter.textContent = "not reactive yet";
  // counterDoubled.textContent = "not reactive yet";
  checkbox.setAttribute("type", "checkbox");

  document.body.appendChild(checkbox);
  // document.body.appendChild(button1);
  // document.body.appendChild(counter);
  // document.body.appendChild(counterDoubled);
  // document.body.appendChild(button2);

  // Setup reactive system
  // const count = createSignal(0);
  // const doubleCount = () => count.get() * 2;

  // createEffect(() => {
  //   counter.textContent = count.get().toString();
  // });

  // createEffect(() => {
  //   counterDoubled.textContent = doubleCount().toString();
  // });

  const a1 = createSignal(true);
  const b1 = createSignal(2);
  const c1 = createSignal(3);
  createEffect(() => console.log(a1.get() ? b1.get() * 2 : c1.get() * 3));
  // c1.set(5);
  a1.set(false);
  // c1.set(5);
  console.log(Runtime.signalSubscribers);
  b1.set(6); // Should not invoke effect

  checkbox.addEventListener("change", () => {
    const current = a1.get();
    a1.set(!current);
  });

  // Fibonacci test
  // const first = createSignal(0);
  // const fibs = new Array(50)
  //   .fill(1)
  //   .map((_, i) => i)
  //   .filter((n) => n > 1)
  //   .reduce(
  //     (fibs, n) => [...fibs, () => fibs[n - 1]() + fibs[n - 2]()],
  //     [() => first.get(), () => first.get() + 1]
  //   );
  // createEffect(() => console.log("Fib 60", fibs.at(-1)()), "Fib");

  // Add Listeners
  // button1.addEventListener("click", () => {
  //   console.log("+1");
  //   const current = count.get();
  //   count.set(current + 1);
  // });
  // button2.addEventListener("click", () => {
  //   console.log("-1");
  //   const current = count.get();
  //   count.set(current - 1);
  // });
}

main();
