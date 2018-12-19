// @flow
import { StyleSheet } from 'react-native';

import { concatStyles } from '../../styles';

import type { Props } from './types';

export const styles = StyleSheet.create({
  maskInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
    fontSize: 1,
  },
});

const positionMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  'full-width': 'space-between',
};

export const getContainerStyle = ({ inputPosition, containerProps }: Props) =>
  concatStyles(
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: positionMap[inputPosition],
    },
    containerProps && containerProps.style,
  );

const getBorderWidthStyle = ({ cellBorderWidth, variant }: Props) => {
  switch (variant) {
    case 'clear':
      return { borderWidth: 0 };
    case 'border-b':
      return {
        borderBottomWidth: cellBorderWidth,
      };
    default:
      return { borderWidth: cellBorderWidth };
  }
};

export const getInputSpaceStyle = ({ inputPosition, space }: Props) => {
  switch (inputPosition) {
    case 'left':
      return {
        marginRight: space,
      };
    case 'center':
      return {
        marginRight: space / 2,
        marginLeft: space / 2,
      };
    case 'right':
      return {
        marginLeft: space,
      };
    default:
      return {
        marginRight: 0,
        marginLeft: 0,
      };
  }
};

export const getCellStyle = (props: Props, { isActive }: Object) => {
  const { size, inactiveColor, activeColor, variant } = props;

  return {
    color: activeColor,
    fontSize: Math.max(14, 0.4 * size),
    textAlign: 'center',
    textAlignVertical: 'center',

    borderColor: isActive ? activeColor : inactiveColor,
    borderRadius: variant === 'border-circle' ? size : 0,

    width: size,
    height: size,

    ...getBorderWidthStyle(props),
    ...getInputSpaceStyle(props),
  };
};
