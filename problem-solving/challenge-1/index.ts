const findFraction = (number:number, length: number): string => {
  return (number/length).toFixed(6);
}


export const numbersFractionCalculator = (numbers: number[]) => {
  let positives = 0, negative = 0, zeros = 0;

  numbers.forEach((number) => {
    if(number > 0) {
      positives ++;
    } else if (number < 0) {
      negative ++;
    } else {
      zeros ++;
    }
  })


  return {
    positives: findFraction(positives, numbers.length),
    negative: findFraction(negative, numbers.length),
    zeros: findFraction(zeros, numbers.length),
  }



};
