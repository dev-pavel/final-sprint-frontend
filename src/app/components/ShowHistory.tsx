'use client'

import { useState } from 'react'
import { getCardHistory } from '../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Transaction {
    rideAt: string
    fare: number
}

export default function ShowHistory() {
    const [cardNumber, setCardNumber] = useState('')
    const [history, setHistory] = useState<Transaction[]>([])
    const [error, setError] = useState('')

    const handleShowHistory = async () => {
        try {
            const cardHistory = await getCardHistory(cardNumber)
            console.log(cardHistory)
            setHistory(cardHistory)
            setError('')
        } catch (error) {
            setError((error as Error).message)
            setHistory([])
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Show Ride History</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="mb-2"
                />
                <Button onClick={handleShowHistory}>Show History</Button>
                {history.length > 0 && (
                    <ul className="mt-4">
                        {history.map((transaction, index) => (
                            <li key={index}>
                                {new Date(transaction.rideAt).toLocaleString()} - ride:{' '}
                                ${Math.abs(transaction.fare).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </CardContent>
        </Card>
    )
}

