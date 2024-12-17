'use client'

import { useState, useEffect } from 'react'
import { getAllCards } from '../actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {Button} from "@/components/ui/button";

export default function ShowCards() {
    const [cards, setCards] = useState<{ cardNumber: string; balance: number }[]>([])

    const fetchCards = async () => {
        const allCards = await getAllCards()
        setCards(allCards)
    }

    useEffect(() => {
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
                <Button onClick={fetchCards} className="mt-5">Reload Cards</Button>
            </CardContent>
        </Card>
    )
}

