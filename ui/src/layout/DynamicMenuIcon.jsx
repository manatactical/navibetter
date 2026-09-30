import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { createElement } from 'react'

const DynamicMenuIcon = ({ icon, activeIcon, path, exact }) => {
  const location = useLocation()

  if (!activeIcon) {
    return createElement(icon, { 'data-testid': 'icon' })
  }

  const active = exact
    ? location.pathname === '/' + path
    : location.pathname.startsWith('/' + path)

  return active
    ? createElement(activeIcon, { 'data-testid': 'activeIcon' })
    : createElement(icon, { 'data-testid': 'icon' })
}

DynamicMenuIcon.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  activeIcon: PropTypes.object,
  exact: PropTypes.bool,
}

export default DynamicMenuIcon
