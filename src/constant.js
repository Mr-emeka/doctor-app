import { StyleSheet, Dimensions } from 'react-native';


export const slides = [
    {
      key: "one",
      title: "Meet Doctors Online",
      text: "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
      image: require("../assets//onboarding/slide-1.jpeg"),
    },
  
    {
      key: "two",
      title: "Connect with Specialists",
      text: "Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.",
      image: require("../assets/onboarding/slide-2.png"),
    },
    {
      key: "three",
      title: "Thousands of Online Specialists",
      text: " Explore a Vast Array of Online Medical Specialists, Offering an Extensive Range of Expertise Tailored to Your Healthcare Needs.",
      image: require("../assets/onboarding/slide-3.jpeg"),
    },
  ];
  



export const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 20,
    textAlign: 'center'
  },
  paginationContainer: {
    bottom: Dimensions.get('screen').height / 2.5,
    left: 0,
    right: 0,
  },
  paginationDots: {
    width: '15%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0,
    alignSelf: 'center',
  },
  activeDot: {
    backgroundColor: '#38bdf8',
    width: 20,
    height: 5,
    borderRadius: 5,
  },
  dot: {
    backgroundColor: 'white',
    width: 10,
    height: 5,
    borderRadius: 5,
  },
  iconBorder: {
    backgroundColor: '#38bdf8',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 3,
    marginTop: 30,
  },
  image: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: "contain",
  },
  bottom: {
    marginTop: -50,
    // flex: 0.3,
    paddingVertical: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
});
