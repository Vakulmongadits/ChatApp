import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, } from 'react-native';
import Header from '../../component/Header';
import { PROFILE_SCREEN } from '../../utils/StringConstant';
import RNSpeedometer from 'react-native-speed-meter';
import { openCamera } from '../../component/ImagePicker';
let ic_user = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
import styles from './styles';

const ProfileScreen = ({ navigation }) => {

    const [userInfo, setUserInfo] = React.useState({
        name: 'vakul',
        image: ic_user,
        email: 'vakul@gmail.com'
    })

    const tapOnProfileImage = async () => {
        let image = await openCamera()
        setUserInfo({ ...userInfo, image: image?.path })
    }

    console.log('userInfo --> ', userInfo)

    return (
        <SafeAreaView style={styles.container}>
            <Header title={PROFILE_SCREEN} />
            <TouchableOpacity onPress={() => tapOnProfileImage()}>
                <Image style={styles.imageUser} source={{ uri: userInfo.image }} />
            </TouchableOpacity>

            <Text style={styles.textName}>Name: {userInfo.name}</Text>
            <Text style={styles.textEmail}>Email: {userInfo.email}</Text>
            <RNSpeedometer rotationValueProp={60} percentageValue={(percentageValue) => console.log(percentageValue)} />
        </SafeAreaView>
    )
}

export default ProfileScreen;