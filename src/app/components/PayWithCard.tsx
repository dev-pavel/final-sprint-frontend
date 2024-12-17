'use client'

import { useState } from 'react'
import { payWithCard } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function PayWithCard() {
    const [cardNumber, setCardNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    const handlePayment = async () => {
        try {
            const card = await payWithCard(cardNumber, parseFloat(amount))
            setMessage(`Payment successful. New balance: $${card.balance.toFixed(2)}`)
        } catch (error) {
            setMessage((error as Error).message)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pay with Card</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Card Number"
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
                <Button onClick={handlePayment}>Pay</Button>
                {message && <p className="mt-4">{message}</p>}
            </CardContent>
        </Card>
    )
}

