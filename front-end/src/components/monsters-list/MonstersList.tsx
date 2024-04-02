import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { Monster } from "../../models/interfaces/monster.interface"
import { setSComputerMonster, setSelectedMonster } from "../../reducers/monsters/monsters.actions"
import { Image, ListTitle, MonsterCard, MonsterName, MonstersSection } from "./MonstersList.styled"

type MonstersListProps = {
    monsters: Monster[]
}

const MonstersList: React.FC<MonstersListProps> = ({ monsters }) => {
    const dispatch = useAppDispatch();

    const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(null);

    const findRandomMonster = (selectedId:number, monsters:Monster[]) => {
        let randomId = Math.floor(Math.random() * monsters.length + 1)
        while (selectedId === randomId) {
            randomId = Math.floor(Math.random() * monsters.length + 1)
        }
        return randomId
    }

    const handleMonsterClick = (monster: Monster) => {
        const value = selectedMonsterId === monster.id ? null : monster.id
        const computerMonsterId = findRandomMonster(Number(selectedMonsterId), monsters);
        const monsterComputer = monsters.filter((monster) => Number(monster.id) === computerMonsterId)

        setSelectedMonsterId(value)

        dispatch(setSComputerMonster(monsterComputer[0]));
        dispatch(setSelectedMonster(!value ? null : monster));
    }

    return (
        <div>
            <ListTitle>{monsters.length > 0 ? 'Select your monster': 'No monsters available'}</ListTitle>

            <MonstersSection data-testid="monsters-list-section">
                {monsters.map(monster => (
                    <MonsterCard key={monster.id} onClick={() => handleMonsterClick(monster)} selected={monster.id === selectedMonsterId} data-testid={monster.id}>
                        <Image src={monster.imageUrl} />
                        <MonsterName>
                            {monster.name}
                        </MonsterName>
                    </MonsterCard>
                ))}
            </MonstersSection>
        </div>
    )
}

export { MonstersList }