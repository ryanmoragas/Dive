// import React, { useState, useEffect, useContext } from 'react';
// import { SignedInContext } from '../context/UserContext';
// import {
//   Modal,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   KeyboardAvoidingView,
//   TextInput,
// } from 'react-native';
// import { Card } from 'react-native-elements'
// import SingleShowModal from '../modals/SingleShowModal';
// import { ScrollView } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import MenuButton from '../components/MenuButton';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';
// import { AXIOS_URL } from 'react-native-dotenv';
// import * as Location from 'expo-location';
// import MapView from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';

// export default function ShowsNearBy(props) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [location, setLocation] = useState({});
//   // console.log("are we getting users id?", props.userInfo)
//   //allows user to get shows they previously went to on button click
//   // let userId = props.userInfo;

//   // console.log("user id", userId);

//   const getLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== 'granted') {
//       console.log("can't get location");
//       // this.setState({
//       //   errorMessage: 'Permission to access location was denied',
//       // });
//     }

//     let locationObj = await Location.getCurrentPositionAsync({});
//     locationObj = JSON.stringify(locationObj);
//     setLocation(locationObj);
//     // setLocation(location);
//     console.log("getting users location", location);
//   };

//   const getShowsByLocation = async () => {

//   }

//   useEffect(() => {
//     getLocationAsync();
//   }, [])


//   return (
//     <View>
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={modalVisible}
//       >
//         {/* start of modal when showing */}
//         <KeyboardAvoidingView behavior="padding" style={styles.container}>
//           <ScrollView style={{ marginTop: 20 }}>
//             {/* back button */}
//             <Ionicons size={64} style={styles.menuIconContainer} onPress={() => { setModalVisible(false) }}>
//               <Ionicons
//                 name='ios-arrow-back'
//                 color='#59C3D1'
//                 size={32}
//                 style={styles.menuIcon}
//                 onPress={() => { setModalVisible(false) }}
//               />
//             </Ionicons>
//             <View style={styles.container}>
//               <View style={styles.title}>
//                 {/* <Text style={styles.headerText}>Previous Shows</Text> */}
//                 <Text style={styles.headerText}>{location.timestamp}</Text>
//                 <View style={styles.mapContainer}>
//                   <MapView style={styles.mapStyle} />
//                 </View>
//               </View>
//               {/* <Text style={styles.text}>Previous shows</Text> */}

//               {/* {oldShows && oldShows.map(show => {
//                   return (
//                     <Card
//                       key={show.shows.id}
//                       style={styles.card}
//                       backgroundColor='#111'
//                       padding={10}
//                       borderRadius={10}
//                       containerStyle={styles.card}
//                     // image={require('../images/pic2.jpg')}
//                     > */}
//               {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}

//               {/* modal to display single show info */}
//               {/* <SingleShowModal show={show.shows.id} showName={show.shows.name} /> */}

//               {/* <Text style={styles.cardText}>{show.show.name}</Text> */}
//               {/* <Text style={styles.cardText}>{show.time}</Text>
//                       <Text style={styles.cardText}>{show.date}</Text>
//                       <Text style={styles.cardText}>{show.description}</Text> */}
//               {/* <EditShowModal /> */}
//               {/* </Card>
//             //   )
//             // })
//             } */}
//               {/* </View> */}
//               {/* </View> */}
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>

//       </Modal >
//       {/* edit bio button when modal is hidden */}
//       < TouchableOpacity
//         style={styles.signupContainer}
//         onPress={() => { setModalVisible(true); }
//         }
//       >
//         <Text style={styles.signupButtonText}>Get Shows Near By</Text>
//       </TouchableOpacity >

//     </View >
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2D323A',
//     padding: 20
//   },
//   headerText: {
//     fontSize: 50,
//     color: '#3BAFBF',
//     fontWeight: 'bold',
//     textAlign: 'right',
//     paddingRight: 20
//   },
//   input: {
//     height: 40,
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginHorizontal: 40,
//     fontWeight: 'bold'
//   },
//   title: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   cardText: {
//     fontSize: 16,
//     color: '#59C3D1',
//     fontWeight: 'bold',
//     textAlign: 'left',
//     paddingRight: 20,
//     marginBottom: 10
//   },
//   text: {
//     fontSize: 30,
//     alignItems: 'center',
//     color: '#59C3D1',
//     opacity: 0.9,
//     fontWeight: 'bold',
//     marginLeft: 90,
//     marginBottom: 15
//   },
//   loginContainer: {
//     backgroundColor: '#C70039',
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//     width: 140,
//     marginHorizontal: 7
//   },
//   signupContainer: {
//     backgroundColor: '#75A4AD',
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginHorizontal: 90,
//     marginBottom: 15
//   },
//   modal: {
//     marginLeft: 120
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontWeight: '700',
//     color: '#fff'
//   },
//   button: {
//     borderRadius: 5,
//     marginHorizontal: 40,
//     backgroundColor: '#59C3D1',
//     textAlign: 'center',
//     fontWeight: '700',
//     color: '#fff'
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontWeight: '700',
//     color: '#000'
//   },
//   prevButton: {
//     backgroundColor: '#75A4AD',
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginHorizontal: 90,
//     marginBottom: 10
//   },
//   signupButtonText: {
//     textAlign: 'center',
//     fontWeight: '700',
//     color: '#000'
//   },
//   menuIcon: {
//     zIndex: 9,
//     position: 'absolute',
//     top: 40,
//     left: 20,
//   },
//   menuIconContainer: {
//     zIndex: 9,
//     position: 'absolute',
//     top: 30,
//     left: 10,
//     padding: 10,
//   },
//   mapContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     width: 395,
//     height: 250,
//     // width: Dimensions.get('window').width,
//     // height: Dimensions.get('window').height,
//   },

// })
