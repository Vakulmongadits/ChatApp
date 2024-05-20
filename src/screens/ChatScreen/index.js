import React from 'react';
import { Alert, FlatList, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, View, } from 'react-native';
import Header from '../../component/Header';
import ItemChat from './ItemChat';
import styles from './styles';
import { createTable, deleteFromDB, getDataFromDB, saveDataInDB } from '../../database/DatabaseHelper';
import { REMOVE, REMOVE_CHAT_DESCRIPTION, TYPE_HERE, TYPING, YES } from '../../utils/StringConstant';
import { moderateScale } from '../../utils/Metrics';
let tableName = 'users';

const ChatScreen = ({ navigation, route }) => {
    let isBOT = route.params.isBOT;

    const [data, setData] = React.useState([])
    const [messageText, setMessageText] = React.useState('')
    const flatListRef = React.useRef();
    const [isTyping, setIsTyping] = React.useState(false)
    React.useEffect(async () => {
        if (isBOT) {
            setIsTyping(true)
            setTimeout(() => {
                setData([BOT_CHAT_DATA[0]])
                setIsTyping(false)
            }, 1000)
        } else {
            createTable(tableName)
            getChatData()
        }
    }, [])

    React.useEffect(() => {
        scrollFlatList();
    }, [data])

    const updateBOTChatData = () => {
        setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
                let newData = [...data];
                let myBOTData = newData.filter((elem) => elem.botId)
                newData.push(BOT_CHAT_DATA[myBOTData[myBOTData.length - 1].botId])
                setData(newData)
                setIsTyping(false)
            }, 1000)
        }, 500)
    }

    const deleteUser = async (id) => {
        let result = await deleteFromDB(tableName, id)
        result && getChatData()
    }

    const getChatData = async () => {
        let data = await getDataFromDB(tableName)
        setData(data)
    }

    const tapOnSend = async () => {
        if (messageText.trim() == '') return
        if (isBOT) {
            let localData = data;
            localData.push({ message: messageText })
            setData(localData)

            updateBOTChatData()
        }
        else {
            let result = saveDataInDB(tableName, messageText)
            result && getChatData()
        }
        setMessageText('')
    }

    const scrollFlatList = () => {
        setTimeout(() => {
            if (flatListRef) flatListRef.current?.scrollToEnd(false)
        }, 1000)
    }

    const showDeleteAlert = (data, index) => {
        Alert.alert(REMOVE, REMOVE_CHAT_DESCRIPTION, [{
            text: NO,
        },
        { text: YES, onPress: () => deleteUser(data[index].id) },
        ])
    }

    let chatData = isTyping ? data.concat([{ message: TYPING, botId: 1 }]) : data
    return (
        <View style={{ flex: 1, }}>
            <Header title={"Chat Screen"} showLeftIcon tapOnLeft={() => navigation.goBack()} />
            <FlatList data={chatData} extraData={chatData}
                style={{ margin: moderateScale(16), }}
                ref={flatListRef}
                keyExtractor={(item, index) => `${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <ItemChat item={item} index={index}
                    onLongPress={() => showDeleteAlert(data, index)} />} />
            <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={60}>
                <View style={styles.viewTextInput}>
                    <TextInput value={messageText}
                        style={styles.textInputMessage}
                        placeholder={TYPE_HERE}
                        onChangeText={setMessageText} />

                    <TouchableOpacity style={styles.touchSend} onPress={() => tapOnSend()}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2343/2343805.png' }}
                            style={styles.imageSend} />
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen;

let BOT_CHAT_DATA = [
    { botId: 1, message: "Hi, My name is Alex, How can I help you?" },
    { botId: 2, message: "Please share your issue in details." },
    { botId: 3, message: "Please share you phone number" },
    { botId: 4, message: "Thanks for reaching to us, We will arrange a call for your on given phone number" },
]