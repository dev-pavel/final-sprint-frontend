import { issueNewCard, getAllCards, topUpCard, payWithCard, getCardBalance, getCardHistory } from '@/app/actions'
import fs from 'fs/promises'

jest.mock('fs/promises')

describe('Transit System Actions', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('issueNewCard creates a new card', async () => {
        const mockCards: any[] = []
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))
        ;(fs.writeFile as jest.Mock).mockResolvedValue(undefined)

        const newCard = await issueNewCard()

        expect(newCard).toHaveProperty('id')
        expect(newCard.balance).toBe(0)
        expect(newCard.transactions).toEqual([])
        expect(fs.writeFile).toHaveBeenCalled()
    })

    test('getAllCards returns all cards', async () => {
        const mockCards = [{ id: 'CARD-1', balance: 10 }, { id: 'CARD-2', balance: 20 }]
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))

        const cards = await getAllCards()

        expect(cards).toEqual(mockCards)
    })

    test('topUpCard increases card balance', async () => {
        const mockCards = [{ id: 'CARD-1', balance: 10, transactions: [] }]
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))
        ;(fs.writeFile as jest.Mock).mockResolvedValue(undefined)

        const updatedCard = await topUpCard('CARD-1', 5)

        expect(updatedCard.balance).toBe(15)
        expect(updatedCard.transactions).toHaveLength(1)
        expect(updatedCard.transactions[0].amount).toBe(5)
        expect(updatedCard.transactions[0].type).toBe('topup')
        expect(fs.writeFile).toHaveBeenCalled()
    })

    test('payWithCard decreases card balance', async () => {
        const mockCards = [{ id: 'CARD-1', balance: 10, transactions: [] }]
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))
        ;(fs.writeFile as jest.Mock).mockResolvedValue(undefined)

        const updatedCard = await payWithCard('CARD-1', 5)

        expect(updatedCard.balance).toBe(5)
        expect(updatedCard.transactions).toHaveLength(1)
        expect(updatedCard.transactions[0].amount).toBe(-5)
        expect(updatedCard.transactions[0].type).toBe('payment')
        expect(fs.writeFile).toHaveBeenCalled()
    })

    test('getCardBalance returns correct balance', async () => {
        const mockCards = [{ id: 'CARD-1', balance: 10 }]
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))

        const balance = await getCardBalance('CARD-1')

        expect(balance).toBe(10)
    })

    test('getCardHistory returns correct transactions', async () => {
        const mockCards = [{ id: 'CARD-1', balance: 10, transactions: [{ date: '2023-01-01', amount: 10, type: 'topup' }] }]
        ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockCards))

        const history = await getCardHistory('CARD-1')

        expect(history).toEqual([{ date: '2023-01-01', amount: 10, type: 'topup' }])
    })
})

