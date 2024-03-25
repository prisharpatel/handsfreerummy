import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axiosConfig'
import { socket, SocketEvents } from '../../api/socket'
import { RummyGame, Value, Suit } from '../../Type'
import Container from '../ui/Container'
import Lobby from './Lobby'
import Table from './Table'
import { useProfile } from '../../hooks/Profile'

const Game = () => {
    const navigate = useNavigate()
    const { profile } = useProfile()
    const { gameId } = useParams()

    const [game, setGame] = useState<RummyGame>({
        gameId: '0',
        gameState: '',
        players: [],
        hand: [],
        discard: { value: Value.J, suit: Suit.C },
        melds: [],
        turnCounter: 0,
        playerOrder: 0,
        isOwner: false,
    })

    const joinGame = async () => {
        const data = JSON.stringify({
            action: 'join',
            displayName: profile.displayName,
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                const { data } = res
                console.log(data.game)
                setGame({
                    gameId: data.game.gameId,
                    players: data.game.players,
                    gameState: data.game.gameState,
                    hand: data.game.hand,
                    melds: data.game?.melds,
                    discard: data.game?.discard,
                    turnCounter: data.game?.turnCounter,
                    playerOrder: data.game?.playerOrder,
                    isOwner: data.game?.isOwner
                })
            })
            .catch((error: any) => {
                const data = error?.response?.data;
                console.log(data?.error?.message);
                navigate('/')
            })
    }

    useEffect(() => {
        joinGame()

        socket.on(SocketEvents.PLAYER_JOINED, (data: any) => {
            console.log(data.data.displayName, 'has joined')
        })

        socket.on(SocketEvents.GAME_STARTED, (data: any) => {
            console.log('STARTED:', data)
            setGame({
                ...game,
                hand: data.game.hand,
                discard: data.game.discard,
                gameState: 'in-game',
                players: data.game.players,
                playerOrder: data.game.playerOrder,
                turnCounter: data.game.turnCounter,
            })
        })

        socket.on(SocketEvents.PLAYED_MOVE, (data: any) => {
            console.log(data)
        });

        return () => {
            socket.off(SocketEvents.PLAYER_JOINED)
            socket.off(SocketEvents.GAME_STARTED)
            socket.off(SocketEvents.PLAYED_MOVE)
        }
    }, [])

    const handleClickPickup = () => {
        const data = JSON.stringify({
            action: 'move',
            move: 'drawPickup',
        })
        axiosInstance
            .post<any>('/games/' + gameId + '/', data)
            .then((res: any) => {
                console.log(res)
            })
            .catch(() => {
                console.log('An error occured')
            })
    }

    const handleClickDiscard = () => {
        console.log('discard pile')
    }
    if (game?.gameState === 'lobby') {
        return <Lobby game={game} />
    }
    if (game?.gameState === 'in-game') {
        return (
            <Table
                game={game}
                handleClickPickup={handleClickPickup}
                handleClickDiscard={handleClickDiscard}
            />
        )
    }
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    )
}

export default Game
