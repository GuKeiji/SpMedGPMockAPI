// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import {
//     createDrawerNavigator,
//     DrawerContentScrollView,
//     DrawerItemList,
//     DrawerItem,
// } from '@react-navigation/drawer';

// import Medico from './medicos';
// import Paciente from './pacientes';
// import Login from './login';

// export default function Main() {
//     return (
//         <Drawer.Navigator
//             initialRouteName="Login"
//             screenOptions={{
//                 drawerHideStatusBarOnOpen: true,
//                 drawerStatusBarAnimation: 'fade',
//                 drawerStyle: {
//                     backgroundColor: "#1D1136",
//                     width: 240,
//                 },
//                 drawerContentStyle: {
//                     alignContent: "center"
//                 },
//                 drawerLabelStyle: {
//                     textAlign: 'center',
//                     color: '#FFF'
//                 }

//             }}
//         >
//             <Drawer.Screen name="Medico" component={Medico} />
//             <Drawer.Screen name="Paciente" component={Paciente} />
//         </Drawer.Navigator>
//     )
// }