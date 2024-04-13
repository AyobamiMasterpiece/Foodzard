import { Pressable, StyleSheet, Text, View } from 'react-native';

import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
    stylearr?: object; 
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text,stylearr, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps}  style={[styles.container,stylearr]} android_ripple={{
        color:'white'
      }} >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Button;