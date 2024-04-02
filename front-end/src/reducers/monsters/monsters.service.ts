import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/battle.interface';
import { Monster } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());


const sendBattle = async (monsters:number[]): Promise<Battle> => {
  const bodyRequest = {
    monsterAId: monsters[0],
    monsterBId: monsters[1],
  }
  return await fetch(`${API_URL}/battle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyRequest)
  }).then((response) => response.json())
}

export const MonsterService = {
  getAll,
  sendBattle,
};
