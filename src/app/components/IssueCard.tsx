'use client'

import { useState } from 'react'
import { issueNewCard } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function IssueCard() {
    const [newCard, setNewCard] = useState<{ cardNumber: string } | null>(null)

    const handleIssueCard = async () => {
        const card = await issueNewCard()
        setNewCard(card)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Issue New Card</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleIssueCard}>Issue Card</Button>
                {newCard && <p className="mt-4">New card issued: {newCard.cardNumber}</p>}
            </CardContent>
        </Card>
    )
}

