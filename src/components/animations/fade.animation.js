import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const FadeInView = ({ duration = 1500, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    // transition value from 0 to 1
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
