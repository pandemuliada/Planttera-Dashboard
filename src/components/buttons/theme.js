import React from 'react'
import { IoIosAdd, IoIosCreate } from 'react-icons/io'
import { colors } from '../../theme'

const buttonColors = {
  primary: {
    default: `${colors.primary}-400`,
    hover: `${colors.primary}-500`,
    disabled: `${colors.primary}-400`,
  },
  danger: {
    default: `${colors.danger}-400`,
    hover: `${colors.danger}-500`,
    disabled: `${colors.danger}-400`,
  }
}

const buttonIcons = {
  add: <IoIosAdd size={24} />,
  edit: <IoIosCreate size={24} />,
}

const buttonSizes = {
  small: 'py-1 px-3',
  normal: 'py-2 px-4',
  large: 'py-3 px-5',
}

export {
  buttonColors,
  buttonIcons,
  buttonSizes
}