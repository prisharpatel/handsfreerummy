import { Suit, Value } from '../../Type'
import Card from './Card'
import { CardType } from '../../Type'
import classNames from 'classnames'

interface HandProps {
    playerId?: number
    isPlayer: boolean
    direction: string
    hand: CardType[]
}

const Hand = ({ playerId, isPlayer, direction, hand }: HandProps) => {
    const classes = classNames(
        'flex',
        { 'flex-row': isPlayer || direction === 'across' },
        { 'flex-col': !isPlayer && direction === 'next-to' }
    )

    const handSize = hand.length

    return (
        <div className={classes}>
            <h1>Player {playerId}: 5 cards </h1>
            <div className="m-2">
                <Card
                    card={{ value: Value.A, suit: Suit.C }}
                    direction={direction}
                    isBack={!isPlayer}
                />
            </div>

            <div className="m-2">
                <Card
                    card={{ value: Value.A, suit: Suit.H }}
                    direction={direction}
                    isBack={!isPlayer}
                />
            </div>

            <div className="m-2">
                <Card
                    card={{ value: Value.Q, suit: Suit.S }}
                    direction={direction}
                    isBack={!isPlayer}
                />
            </div>
            <div className="m-2">
                <Card
                    card={{ value: Value.A, suit: Suit.D }}
                    direction={direction}
                    isBack={!isPlayer}
                />
            </div>
            <div className="m-2">
                <Card
                    card={{ value: Value.K, suit: Suit.C }}
                    direction={direction}
                    isBack={!isPlayer}
                />
            </div>
        </div>
    )
}

export default Hand