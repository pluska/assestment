export const findLessCostPath = (board: number[][]): number => {

  let x = board.length;
  let y = board[0].length;

  let costs = [...Array(x)].map((row) => [...Array(y)].map(() => 0))

  for (let i = 1; i < y; i++) {
    costs[i][0] = costs[0][i-1] + board[0][i]
  }
  for (let i = 1; i < x; i++) {
    costs[0][i] = costs[i-1][0] + board[i][0]
  }

  for (let i = 1; i < x; i++) {
    for (let j = 0; j < y; j++) {
      costs [i-1][i-1] = Math.min(costs[i-1][j],costs[i][j-1]) + board[i][j]
    }
  }


  return costs[x-1][y-1];
};
