import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ShowBalance from './ShowBalance'
import { getCardBalance } from '../actions'

jest.mock('../actions')

describe('ShowBalance', () => {
    test('renders ShowBalance component', () => {
        render(<ShowBalance />)
        expect(screen.getByText('Show Balance')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Card ID')).toBeInTheDocument()
        expect(screen.getByText('Check Balance')).toBeInTheDocument()
    })

    test('shows balance when card ID is entered and button is clicked', async () => {
        ;(getCardBalance as jest.Mock).mockResolvedValue(100)

        render(<ShowBalance />)
        fireEvent.change(screen.getByPlaceholderText('Card ID'), { target: { value: 'CARD-123' } })
        fireEvent.click(screen.getByText('Check Balance'))

        await waitFor(() => {
            expect(screen.getByText('Balance: $100.00')).toBeInTheDocument()
        })

        expect(getCardBalance).toHaveBeenCalledWith('CARD-123')
    })

    test('shows error when card is not found', async () => {
        ;(getCardBalance as jest.Mock).mockRejectedValue(new Error('Card not found'))

        render(<ShowBalance />)
        fireEvent.change(screen.getByPlaceholderText('Card ID'), { target: { value: 'INVALID-CARD' } })
        fireEvent.click(screen.getByText('Check Balance'))

        await waitFor(() => {
            expect(screen.getByText('Card not found')).toBeInTheDocument()
        })

        expect(getCardBalance).toHaveBeenCalledWith('INVALID-CARD')
    })
})

