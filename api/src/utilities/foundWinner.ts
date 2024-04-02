import { Monster } from "../models";

const findFirstAttacker = (monsterA:Monster, monsterB:Monster) => {
  if(monsterA.speed === monsterB.speed) {
    return monsterA.attack > monsterB.attack ? monsterA : monsterB;
  } else if (monsterA.speed > monsterB.speed) {
    return monsterA;
  } else {
    return monsterB;
  }
}

const calculateDamage = (attack:number, defense:number): number => {

  let damage = attack - defense;
  if(damage <= 1) {
    damage = 1
  }

  return damage

}


export const foundWinner = (monsterA:Monster, monsterB:Monster) => {

  const firstAttacker = findFirstAttacker(monsterA, monsterB);
  let winner = firstAttacker
  let [attacker, defender] = [firstAttacker, firstAttacker !== monsterA ? monsterA : monsterB]

  while (monsterA.hp > 0 && monsterB.hp > 0) {
    const damage = calculateDamage(attacker.attack, defender.defense)
    defender.hp -= damage;
    if(defender.hp <= 0) {
      winner = attacker
    }
    [attacker, defender] = [defender, attacker]
  }


  return winner;

}