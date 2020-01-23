import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawerNavigator from './navigation/DrawerNavigator'

//create global state for user signIn
export const SignedInContext = createContext({});

export default function App (props) {
  //initial login state of app
  const [userInfo, setUserInfo] = useState({});

  return (
    <View style={styles.container}>
      {/* pass signIn state to all children components*/}
      <SignedInContext.Provider value={[userInfo, setUserInfo]}>
        <DrawerNavigator />
      </SignedInContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})