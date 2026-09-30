import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BatchDownloadButton } from './BatchDownloadButton'
import subsonic from '../subsonic'

const unselectAll = vi.fn()
const getMany = vi.fn()

vi.mock('react-admin', () => ({
  Button: ({ onClick, label, children }) => (
    <button onClick={onClick}>{label || children}</button>
  ),
  useDataProvider: () => ({ getMany }),
  useTranslate: () => (key) => key,
  useUnselectAll: () => unselectAll,
  useNotify: () => vi.fn(),
}))

vi.mock('../subsonic', () => ({ default: { download: vi.fn() } }))

describe('<BatchDownloadButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getMany.mockResolvedValue({
      data: [{ id: '1' }, { id: '2', mediaFileId: 'm2' }],
    })
  })

  it('downloads each selected song using its media file id', async () => {
    render(<BatchDownloadButton resource="song" selectedIds={['1', '2']} />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(subsonic.download).toHaveBeenCalledTimes(2))
    expect(getMany).toHaveBeenCalledWith('song', { ids: ['1', '2'] })
    expect(subsonic.download).toHaveBeenCalledWith('1')
    expect(subsonic.download).toHaveBeenCalledWith('m2')
    expect(unselectAll).toHaveBeenCalledWith('song')
  })
})
