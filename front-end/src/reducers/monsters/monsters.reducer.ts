import { createReducer } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import { fetchMonstersData, fetchSendBattle, setSComputerMonster, setSelectedMonster } from './monsters.actions';
import { Battle } from '../../models/interfaces/battle.interface';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  battleResult: Battle | null;
  computerMonster: Monster | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  battleResult: null,
  computerMonster: null,
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(fetchSendBattle.pending, (state) => ({
    ...state,
    battleResult: null,
  }));

  builder.addCase(fetchSendBattle.rejected, (state) => ({
    ...state,
    battleResult: null,
  }));

  builder.addCase(fetchSendBattle.fulfilled, (state, action) => ({
    ...state,
    battle: action.payload,
  }));

  builder.addCase(setSComputerMonster, (state, action) => ({
    ...state,
    computerMonster: action.payload
  }))

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
  }));
});
