import Board from './Board'
import { RummyGame, Suit, Value } from '../../Type'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useModal } from '../../hooks/Modal'
import Settings from '../settings/Settings'
import Tutorial from '../tutorial/Tutorial'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { socket, SocketEvents } from '../../api/socket'
import OpponentHand from './OpponentHand'
import PlayerHand from './PlayerHand'
import { CardType } from '../../Type'
import Card from './Card'
import CardBack from './CardBack'
import Container from '../ui/Container'

interface TableProps {
    game: RummyGame
}

const dummyRuns = [
    [
        { value: Value.A, suit: Suit.C },
        { value: Value.A, suit: Suit.D },
    ],
    [{ value: Value.K, suit: Suit.D }],
    [{ value: Value.J, suit: Suit.C }],
]

const Table = ({ game }: TableProps) => {
    const { dispatch: dispatchModal } = useModal()

    return (
        <Container>
            <Modal />
            <div className="grid grid-cols-5">
                <div>
                    <div>
                        <Button
                            text={'Settings'}
                            onClick={() =>
                                dispatchModal({
                                    type: 'showModal',
                                    modal: {
                                        title: 'Settings',
                                        component: <Settings />,
                                    },
                                })
                            }
                        />
                    </div>
                    <div>
                        <Button
                            text={'Tutorial'}
                            onClick={() =>
                                dispatchModal({
                                    type: 'showModal',
                                    modal: {
                                        title: 'Tutorial',
                                        component: <Tutorial />,
                                    },
                                })
                            }
                        />
                    </div>
                </div>

                <div className="col-start-2">
                    <OpponentHand playerId={1} cardCount={7} />
                </div>

                <div className="col-start-3">
                    <OpponentHand playerId={2} cardCount={7} />
                </div>

                <div className="col-start-4">
                    <OpponentHand playerId={3} cardCount={7} />
                </div>
                <div className="col-start-5 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Discard</h1>
                    <Card card={{ value: Value.J, suit: Suit.C }} />
                </div>

                <div className="col-start-6 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Pickup</h1>
                    <CardBack />
                </div>

                <div className="mb-20 mt-20 col-span-3">
                    <Board
                        playedRuns={dummyRuns}
                        discard={{ value: Value.Six, suit: Suit.H }}
                    />
                </div>
                <div className="col-start-2">
                    <h2 className="text-lg font-semibold">Melds</h2>
                </div>
                <div className="col-start-2 col-span-3">
                    <PlayerHand playerId={4} hand={[]} />
                </div>
            </div>
        </Container>
    )
}

export default Table
