type SignalId = number;
type EffectId = number;

class Signal<T> {
  #id: SignalId;

  constructor(value: T) {
    Runtime.signalValues.push(value);
    const id = Runtime.signalValues.length - 1;
    this.#id = id;
  }

  get(): T {
    // Get value
    const value = Runtime.signalValues[this.#id] as T;

    // Add subscribers
    if (Runtime.runningEffectId != null) {
      // Why compare against null instead of "if (Runtime.runningEffectId)"? Answer: Because runningEffectId might be ZERO
      const effectIdsSet =
        Runtime.signalSubscribers.get(this.#id) || new Set<EffectId>();
      effectIdsSet.add(Runtime.runningEffectId);

      if (!Runtime.signalSubscribers.has(this.#id)) {
        Runtime.signalSubscribers.set(this.#id, effectIdsSet);
      }
    }

    // Return value
    return value;
  }

  set(value: T) {
    // Set value
    Runtime.signalValues[this.#id] = value;

    // Notify subscribers
    if (Runtime.signalSubscribers.has(this.#id)) {
      const effectIds = Runtime.signalSubscribers.get(this.#id);
      if (effectIds) {
        // This line clones the effectIds into an array to prevent the signalSubscribers to be mutated during the effect running loop.
        const clonedEffectIds = Array.from(effectIds);
        // TODO: I am not 100% sure this is actually necessary, but it is worth investigating possible bugs that could arise from not cloning the effectIds here.
        clonedEffectIds.forEach((effectId) => {
          Runtime.runEffect(effectId);
        });
      }
    }
  }
}

class Runtime {
  static signalValues: unknown[] = [];
  static signalSubscribers: Map<SignalId, Set<EffectId>> = new Map();
  static runningEffectId: EffectId | null = null;
  static effects: Function[] = [];

  static createSignal<T>(value: T): Signal<T> {
    return new Signal<T>(value);
  }

  static createEffect(fn: Function) {
    Runtime.effects.push(fn);
    const effectId = Runtime.effects.length - 1;

    Runtime.runEffect(effectId);
  }

  static runEffect(effectId: EffectId) {
    // Push the effect onto stack
    const prevRunningEffect = Runtime.runningEffectId;
    Runtime.runningEffectId = effectId;

    // Run the effect
    const effect = Runtime.effects[effectId];
    effect();

    // Pop the effect off stack
    Runtime.runningEffectId = prevRunningEffect;
  }
}

export const createSignal = Runtime.createSignal;
export const createEffect = Runtime.createEffect;
