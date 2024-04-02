const determinateDiceNumber = (dice:number): boolean => {
  if (dice <= 6 && dice >= 1) {
    return true
  } else {
    return false
  }
}


export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number
): number => {

  if(determinateDiceNumber(dice1) && determinateDiceNumber(dice2) && determinateDiceNumber(dice3)) {
    if (dice1 === dice2 && dice1 === dice3) {
      return dice1*3;
    } else if (dice1 === dice2 || dice1 === dice3) {
      return dice1*2
    } else if (dice2 === dice3) {
      return dice2*2
    } else {
      return Math.max(dice1, dice2, dice3);
    }
  } else {
    throw "Dice out of number range";
    
  }



  return 0;
};
