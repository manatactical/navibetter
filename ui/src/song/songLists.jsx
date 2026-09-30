import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNoteOutlined'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import DynamicMenuIcon from '../layout/DynamicMenuIcon'

const songLists = {
  all: {
    icon: (
      <DynamicMenuIcon
        path={'song'}
        icon={MusicNoteOutlinedIcon}
        activeIcon={MusicNoteIcon}
        exact
      />
    ),
    params: '',
  },
  recentlyAdded: {
    icon: (
      <DynamicMenuIcon
        path={'song/recentlyAdded'}
        icon={LibraryAddOutlinedIcon}
        activeIcon={LibraryAddIcon}
      />
    ),
    params: 'sort=recently_added&order=DESC',
  },
}

export default songLists
export const defaultSongList = 'all'
