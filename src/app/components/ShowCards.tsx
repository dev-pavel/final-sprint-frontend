'use client'

import { useState, useEffect } from 'react'
import { getAllCards } from '../actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ShowCards() {
    const [cards, setCards] = useState<{ cardNumber: string; balance: number }[]>([])

    useEffect(() => {
        const fetchCards = async () => {
            const allCards = await getAllCards()
            setCards(allCards)
        }
        fetchCards()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Cards</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    {cards.map(card => (
                        <li key={card.cardNumber}>
                            {card.cardNumber} - Balance: ${card.balance.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

