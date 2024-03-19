import Container from '../ui/Container'
import { useProfile } from '../../hooks/Profile'
import Button from '../ui/Button'
import Card from '../game/Card'
import { Suit, Value } from '../../Type'

const Tutorial = () => {
    return (
        <Container>
            <div className = "justify-center">
                <h2 className = "text-xl">Play Round</h2>
                <h3 className = "text-base">
                    1. Pick up a card from pickup pile or discard pile.
                    2. Play cards from your hand into a meld on board, create your own meld, or discard a card into the discard pile. 
                        Note: cannot discard card picked up from discard pile on the same turn 
                </h3>
                <h2 className = "text-xl">Commands</h2>
                <h3 className= "text-base">
                    1. "Pickup from Discard Pile" or "Pickup from Pickup Pile"
                    2. "Play 9 of hearts on meld 5", "Create meld with 9 of hearts, 9 or spades, and 9 of clubs", or "Discard 10 of hearts"
                </h3>
            </div>
        </Container>
    )
}

export default Tutorial