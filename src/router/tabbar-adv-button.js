// import React from 'react';
// import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
// import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/';
// // import { palette } from '../theme';
// import { Icon } from '../../assets/images';
// // import CTText from '../components/ctText';
// import { RFValue } from 'react-native-responsive-fontsize';
// // import { palette } from '../theme/color';

// // type Props = BottomTabBarButtonProps & {
// //   bgColor?: string,
// // };

// export const TabBarAdvancedButton = ({ bgColor, onPress, isFocused,
//   // ...props,
//   label
// }) => {

//   const styles = style({
//     white: '#FFFFFF',
//     orange: '#FFA500',
//     green: '#008000',
//     black: '#000000',

//   });

//   return (
//     <View style={styles.container} pointerEvents="box-none">

//       <View style={styles.bottomContainer}>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={onPress}>
//             <Image
//               source={Icon.product}
//               style={[styles.centerImage, {
//                 tintColor: isFocused ? palette.orange : 'rgba(69, 69, 85, 0.7)'
//               }]}
//               resizeMode={'contain'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* <CTText
//           text={label}
//           semiBold={isFocused}
//           style={{
//             fontSize: RFValue(8),
//             color: isFocused ? palette.green : 'rgba(69, 69, 85, 0.7)',
//             textAlign: 'center', marginTop: 0, marginBottom: 6,
//           }}
//           numberOfLines={1}
//         /> */}
//         <Text
//           style={[
//             styles.centerText,
//             {
//               color: isFocused ? palette.orange : 'rgba(69, 69, 85, 0.7)',
//               fontSize: RFValue(8),
//             }
//           ]}
//           numberOfLines={1}>
//           {label}
//         </Text>

//       </View>

//     </View>
//   );
// };

// const style = props =>
//   StyleSheet.create({
//     container: {
//       position: 'relative',
//       justifyContent: 'flex-end',
//       flex: 1,
//       // top: -20
//       backgroundColor: palette.white
//     },
//     bottomContainer: {
//       // height: 70,

//       // backgroundColor: 'transparent',
//       // elevation: 30,
//       alignItems: 'center',
//       justifyContent: 'flex-end',

//       // shadowColor: props.black,
//       // shadowOffset: { width: 1, height: 0 },
//       // shadowOpacity: 0.5,
//       // shadowRadius: 1,
//       // zIndex: 1,
//       // borderWidth: 1,
//       // borderColor: 'black',
//       height: 50,
//     },
//     background: {
//       position: 'absolute',
//       top: 0,
//       backgroundColor: 'red'
//     },
//     button: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: 50,
//       height: 50,
//       borderRadius: 50,
//       backgroundColor: '#fef1d6',
//       borderWidth: 3,
//       borderColor: props.white,
//       // elevation: 30,
//       // position: 'absolute',
//       alignSelf: 'center',
//       // top: -20,
//       zIndex: 100


//     },
//     buttonContainer: {
//       backgroundColor: palette.white,
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: 60,
//       height: 60,
//       borderRadius: 50,
//       // backgroundColor: 'red',
//       // elevation: 5,
//       // position: 'absolute',
//       // alignSelf: 'center',
//       // top: -20,
//       zIndex: -200,
//       // padding: 10
//     },
//     buttonIcon: {
//       fontSize: 16,
//       color: '#F6F7EB',
//     },

//     centerImage: {
//       width: 26,
//       height: 22,
//       tintColor: 'white',
//     },

//     centerText: {
//       fontSize: 11,
//       marginTop: 5,
//       marginBottom: 8,
//     },
//   });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabBarAdvancedButton = () => {
  return (
    <View>
      <Text>TabBarAdvancedButton</Text>
    </View>
  )
}

export default TabBarAdvancedButton

const styles = StyleSheet.create({})