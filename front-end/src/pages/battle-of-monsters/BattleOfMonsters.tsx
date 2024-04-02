import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData, fetchSendBattle, setSComputerMonster, setSelectedMonster } from "../../reducers/monsters/monsters.actions"
import { selectBattleResult, selectComputerMonster, selectMonsters, selectSelectedMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, ReloadBattleButton, StartBattleButton } from "./BattleOfMonsters.styled"
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)
    const computerMonster = useSelector(selectComputerMonster)
    const battleResult = useSelector(selectBattleResult)

    const [winnerName, setWinnerName] = useState('')


    useEffect(() => {
        dispatch(fetchMonstersData())
    }, []);

    const handleStartBattleClick = () => {
        if (selectedMonster && computerMonster) {
            dispatch(fetchSendBattle([Number(selectedMonster.id), Number(computerMonster.id)]))
            setWinnerName(battleResult?.winner == Number(selectedMonster?.id) ? selectedMonster?.name : computerMonster?.name)
        }
    }

    const handleReloadBattleClick = () => {
        dispatch(fetchMonstersData())
        setWinnerName('')
        dispatch(setSelectedMonster(null))
        dispatch(setSComputerMonster(null))
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />
            {winnerName ? (
                <WinnerDisplay text={winnerName} />
            ) : (<></>)}

            <BattleSection>
                <MonsterBattleCard monster={selectedMonster} title={selectedMonster?.name || "Player"}></MonsterBattleCard>
                {winnerName ? (
                    <ReloadBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleReloadBattleClick}>Reload Battle</ReloadBattleButton>
                ) : (
                    <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                )}
                <MonsterBattleCard monster={computerMonster} title="Computer"></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }