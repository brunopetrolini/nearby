import { ActivityIndicator, Text, type TextProps, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native';
import type { ComponentType } from 'react';

import { styles } from './styles';
import { colors } from '@/styles/theme';

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

function Button({ children, style, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, style]} activeOpacity={0.8} disabled={isLoading} {...props}>
      {isLoading ? <ActivityIndicator size="small" color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  );
}

function Title({ children, ...props }: TextProps) {
  return (
    <Text style={styles.title} {...props}>
      {children}
    </Text>
  );
}

interface IconProps {
  icon: ComponentType<TablerIconProps>;
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Icon = Icon;
Button.Title = Title;
export { Button };
