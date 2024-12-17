import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import IssueCard from './IssueCard'
import { issueNewCard } from '../actions'

jest.mock('../actions')

describe('IssueCard', () => {
    test('renders IssueCard component', () => {
        render(<IssueCard />)
        expect(screen.getByText('Issue New Card')).toBeInTheDocument()
        expect(screen.getByText('Issue Card')).toBeInTheDocument()
    })

    test('issues new card when button is clicked', async () => {
        const mockCard = { id: 'CARD-123' }
        ;(issueNewCard as jest.Mock).mockResolvedValue(mockCard)

        render(<IssueCard />)
        fireEvent.click(screen.getByText('Issue Card'))

        await waitFor(() => {
            expect(screen.getByText('New card issued: CARD-123')).toBeInTheDocument()
        })

        expect(issueNewCard).toHaveBeenCalled()
    })
})

