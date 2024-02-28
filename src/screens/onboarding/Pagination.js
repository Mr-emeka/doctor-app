import { TouchableOpacity, View } from 'react-native';


import { slides, styles } from '../../constant';

export const Pagination = (index) => {
  return (
    <>
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.length > 1 &&
            slides.map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.dotStyle, i === index ? styles.activeDot : styles.dot]}
              />
            ))}
        </View>
      </View>
    </>
  );
};
