import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterImg, BattleMonsterInfo, BattleMonsterName, BattleMonsterProgressBar, BattleMonsterTitle } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {

    if (monster) {
        return (
            <BattleMonsterCard>
                <BattleMonsterImg src={monster.imageUrl} />
                <BattleMonsterName>{monster.name}</BattleMonsterName>
                <BattleMonsterInfo>HP</BattleMonsterInfo>
                <BattleMonsterProgressBar value={monster.hp} variant="determinate" />
                <BattleMonsterInfo>Attack</BattleMonsterInfo>
                <BattleMonsterProgressBar value={monster.attack} variant="determinate" />
                <BattleMonsterInfo>Defense</BattleMonsterInfo>
                <BattleMonsterProgressBar value={monster.defense} variant="determinate" />
                <BattleMonsterInfo>Speed</BattleMonsterInfo>
                <BattleMonsterProgressBar value={monster.speed} variant="determinate" />
            </BattleMonsterCard>
        )
    } else {
        return (
            <BattleMonsterCard centralized>
            <BattleMonsterTitle>{title!}</BattleMonsterTitle>
        </BattleMonsterCard>
        )
    }
}

export { MonsterBattleCard }