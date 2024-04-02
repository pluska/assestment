import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import knex from '../db/knex';
import { foundWinner } from '../utilities/foundWinner';

const battle =async (req:Request, res:Response): Promise<Response> => {
  try {
    const {monsterAId, monsterBId} = req.body;

    const [monsterA, monsterB] = await Promise.all([
      knex(Monster.tableName).where({id: monsterAId}).first(),
      knex(Monster.tableName).where({id: monsterBId}).first(),
    ])

    if(!monsterA || !monsterB) {
      return res.status(StatusCodes.NOT_FOUND).json({error: "Monsters Not Found"})
    }

    const winner = foundWinner(monsterA, monsterB);

    const battleResults = {
      monsterA: monsterAId,
      monsterB: monsterBId,
      winner: winner.id
    }

    await knex(Battle.tableName).insert(battleResults);

    return res.status(StatusCodes.OK).json(battleResults);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "INTERNAL SERVER ERROR"})
  }
}


const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

export const BattleController = {
  list,
  battle,
};
