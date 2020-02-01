import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SignedInContext } from '../context/UserContext';
import MenuButton from '../components/MenuButton';
import SpotifyButton from '../components/SpotifyButton';
import FacebookButton from '../components/FacebookButton';
import InstagramButton from '../components/InstagramButton';
import CreateShowModal from '../modals/CreateShowModal';
import EditBandBioModal from '../modals/EditBandBioModal';
import EditShowModal from '../modals/EditShowModal';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AXIOS_URL } from 'react-native-dotenv';

export default function Hub(props) {
  //global user signin info and editing function
  const [userInfo, setUserInfo] = useContext(SignedInContext);
  //hub info to display
  const [hubInfo, setHubInfo] = useState({});
  const [shows, setShows] = useState([]);
  let [dbPhoto, setDbPhoto] = useState('');
  const [oldShows, setOldShows] = useState([]);

  //load all user info when brought to hub
  useEffect(() => {
    axios.get(`${AXIOS_URL}/users/${userInfo.username}`)
      .then((response) => {
        // console.log("getting band info", response.data);
        setHubInfo(() => response.data);
      })
      .catch((err) => {
        // console.log("were not getting hub info", err);
      }),

      axios.get(`${AXIOS_URL}/bands/${userInfo.id}/shows`)
        .then((response) => {
          // console.log("getting a bands shows  in hub from db", response.data)
          setShows(() => response.data.shows);
        })
        .catch((err) => {
          // console.log("frontend not getting band shows from db", err);
        })
    axios.get(`${AXIOS_URL}/users/${userInfo.username}`)
      .then((response) => {
        console.log("getting a photo from db", response.data.bandPhoto)
        setDbPhoto(() => response.data.bandPhoto);
      })
      .catch((err) => {
        console.log("front end not getting band photo from db", err);
      })
  }, [])

  const getPreviousShows = () => {
    axios.get(`${AXIOS_URL}/shows/${userInfo.id}/oldrsvps`)
      .then(response => {
        console.log("getting old shows", response);
        setOldShows(response.data)
      })
      .catch(err => {
        console.log("not getting older shows", err);
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ScrollView style={{ marginTop: 30 }}>
        <Text style={styles.text}>Hub</Text>
        <View style={styles.container}>
          {/* image container */}
          {/* <Text>
            {dbPhoto &&
              <Image
                style={{ width: 100, height: 70 }}
                source={{ uri: dbPhoto }}
              />
            }
          </Text>  */}
        </View>
        <Text style={styles.infoText}>
          {hubInfo.bio}
        </Text>
        {/* Social Media Buttons */}
        <View style={styles.flexRowRight}>
          <SpotifyButton link={hubInfo.link_spotify} />
          <InstagramButton link={hubInfo.link_instagram} />
          <FacebookButton link={hubInfo.link_facebook} />
        </View>
        <View style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
        }}>
          {/* Button to open create show modal */}
          <EditBandBioModal />

          {/* Button to open create show modal */}
          {userInfo.userType === 'band' ? <CreateShowModal /> : null}
        </View>

        {/* Cards for all upcoming shows */}
        <View>
          {userInfo.userType === 'band' ?
            shows.map(show => {
              return (
                <Card
                  title={show.name}
                  style={styles.card}
                  backgroundColor='#fff'
                  borderWidth={0}
                  borderRadius={10}
                  padding={10}
                // image={require('../images/pic2.jpg')}
                >
                  <Text style={{ marginBottom: 10 }}>{show.time}</Text>
                  <Text style={{ marginBottom: 10 }}>{show.description}</Text>
                  <EditShowModal />
                </Card>
              )
            })
            : null}
        </View>
        {/* <View style={styles.container}>
          <Image
            source={dbPhoto}
            style={styles.thumbnail}
          />
        </View> */}



        <View>
          {userInfo.userType === 'fan' ?
            <View>
              < TouchableOpacity
                style={styles.prevButton}
                onPress={getPreviousShows}
              >
                <Text style={styles.buttonText} >Get old shows</Text>
              </TouchableOpacity>

              {
                oldShows.map(show => {
                  return (
                    <Card
                      title={show.name}
                      style={styles.card}
                      backgroundColor='#fff'
                      borderWidth={0}
                      borderRadius={10}
                      padding={10}
                    // image={require('../images/pic2.jpg')}
                    >
                      <Text style={{ marginBottom: 10 }}>{show.time}</Text>
                      <Text style={{ marginBottom: 10 }}>{show.date}</Text>
                      <Text style={{ marginBottom: 10 }}>{show.description}</Text>
                      <EditShowModal />
                    </Card>
                  )
                })
              }
            </View>
            : null}
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D323A',
  },
  text: {
    fontSize: 50,
    color: '#59C3D1',
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 20
  },
  card: {
    backgroundColor: '#75A4AD',
    borderRadius: 10
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 40,
    backgroundColor: '#59C3D1',
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#000'
  },
  prevButton: {
    backgroundColor: '#75A4AD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 90,
    marginBottom: 10
  },
  flexRowRight: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'flex-end',
    paddingRight: 20
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  infoText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
    paddingBottom: 5
  },
})



