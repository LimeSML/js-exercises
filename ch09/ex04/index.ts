export class Warrior {
  #atk: number;

  constructor(atk: number) {
    if (atk < 0) {
      throw new Error("atk must be a positive number");
    }
    this.#atk = atk;
  }

  attack(): number {
    return this.#atk * 2;
  }
}

export class MagicWarrior extends Warrior {
  #mgc: number;

  constructor(atk: number, mgc: number) {
    super(atk);
    if (mgc < 0) {
      throw new Error("mgc must be a positive number");
    }
    this.#mgc = mgc;
  }

  attack(): number {
    return super.attack() + this.#mgc;
  }
}

export function WarriorFn(this: { atk: number }, atk: number) {
  if (atk < 0) {
    throw new Error("atk must be a positive number");
  }
  this.atk = atk;
}

WarriorFn.prototype.attack = function () {
  return this.atk * 2;
};

export function MagicWarriorFn(
  this: { atk: number; mgc: number },
  atk: number,
  mgc: number,
) {
  WarriorFn.call(this, atk);
  if (mgc < 0) {
    throw new Error("mgc must be a positive number");
  }
  this.mgc = mgc;
}

MagicWarriorFn.prototype = Object.create(WarriorFn.prototype);
MagicWarriorFn.prototype.constructor = MagicWarriorFn;
MagicWarriorFn.prototype.attack = function () {
  if (this.mgc < 0) {
    throw new Error("mgc must be a positive number");
  }
  return WarriorFn.prototype.attack.call(this) + this.mgc;
};
