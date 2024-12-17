'use client'

import { useState } from 'react'
import { getCardBalance } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ShowBalance() {
    const [cardNumber, setCardNumber] = useState('')
    const [balance, setBalance] = useState<number | null>(null)
    const [error, setError] = useState('')

    const handleCheckBalance = async () => {
        try {
            const cardBalance = await getCardBalance(cardNumber)
            setBalance(cardBalance)
            setError('')
        } catch (error) {
            setError((error as Error).message)
            setBalance(null)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Show Balance</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mb-2"
                />
                <Button onClick={handleCheckBalance}>Check Balance</Button>
                {balance !== null && <p className="mt-4">Balance: ${balance.toFixed(2)}</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </CardContent>
        </Card>
    )
}

