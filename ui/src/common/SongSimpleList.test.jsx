import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SongSimpleList } from './SongSimpleList'

const dispatch = vi.fn()
vi.mock('react-redux', () => ({ useDispatch: () => dispatch }))
vi.mock('../actions', () => ({
  setTrack: (record) => ({ type: 'SET_TRACK', record }),
}))
vi.mock('../config', () => ({ default: { enableStarRating: false } }))
vi.mock('./index', () => ({
  DurationField: () => null,
  SongContextMenu: () => null,
  RatingField: () => null,
}))

const data = {
  1: { id: '1', title: 'First', artist: 'A', duration: 10 },
  2: { id: '2', title: 'Second', artist: 'B', duration: 20 },
}

describe('<SongSimpleList />', () => {
  beforeEach(() => dispatch.mockClear())

  it('toggles selection without playing when a checkbox is clicked', () => {
    const onToggleItem = vi.fn()
    render(
      <SongSimpleList
        ids={['1', '2']}
        data={data}
        total={2}
        hasBulkActions
        onToggleItem={onToggleItem}
        selectedIds={['2']}
      />,
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    fireEvent.click(checkboxes[0])
    expect(onToggleItem).toHaveBeenCalledWith('1', expect.anything())
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('plays the track when the row body is clicked', () => {
    render(
      <SongSimpleList ids={['1']} data={data} total={1} selectedIds={[]} />,
    )
    fireEvent.click(screen.getByText('First'))
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TRACK',
      record: data['1'],
    })
  })
})
