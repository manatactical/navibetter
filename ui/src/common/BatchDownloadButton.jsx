import PropTypes from 'prop-types'
import {
  Button,
  useDataProvider,
  useTranslate,
  useUnselectAll,
  useNotify,
} from 'react-admin'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import subsonic from '../subsonic'

export const BatchDownloadButton = ({ resource, selectedIds, className }) => {
  const translate = useTranslate()
  const dataProvider = useDataProvider()
  const unselectAll = useUnselectAll()
  const notify = useNotify()

  const download = () => {
    dataProvider
      .getMany(resource, { ids: selectedIds })
      .then((response) => {
        // ponytail: original format only, no transcoding options for a batch.
        // Add a batch download dialog if size/format choice is needed.
        response.data.forEach((record) =>
          subsonic.download(record.mediaFileId || record.id),
        )
      })
      .catch(() => {
        notify('ra.page.error', 'warning')
      })
    unselectAll(resource)
  }

  const caption = translate('ra.action.download')
  return (
    <Button
      aria-label={caption}
      onClick={download}
      label={caption}
      className={className}
    >
      <CloudDownloadOutlinedIcon />
    </Button>
  )
}

BatchDownloadButton.propTypes = {
  resource: PropTypes.string,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
}
