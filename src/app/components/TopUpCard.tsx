'use client'

import {useState} from 'react'
import {topUpCard} from '../actions'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'

export default function TopUpCard() {
    const [cardNumber, setCardNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    const handleTopUp = async () => {
        try {
            const card = await topUpCard(cardNumber, parseFloat(amount))
            setMessage(`Card ${card.cardNumber} topped up. New balance: $${card.balance.toFixed(2)}`)
        } catch (error) {
            setMessage((error as Error).message)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Up Card</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Card ID"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mb-2"
                />
                <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-2"
                />
                <Button onClick={handleTopUp}>Top Up</Button>
                {message && <p className="mt-4">{message}</p>}
            </CardContent>
        </Card>
    )
}

