import React from 'react';
import { Alert, FlatList, } from 'react-native';
import Header from '../../component/Header';
import SQLite from 'react-native-sqlite-storage';
import ItemConvo from './ItemConvo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { deleteFromDB, getDataFromDB } from '../../database/DatabaseHelper';
import { moderateScale } from '../../utils/Metrics';
import { BOT, CONVO_SCREEN, NO, REMOVE, REMOVE_CHAT_DESCRIPTION, START_CHAT_WITH_BOT, YES } from '../../utils/StringConstant';
let tableName = 'ConvoTable';

const ConvoScreen = ({ navigation }) => {

    const [data, setData] = React.useState([]);
    var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB);

    const errorCB = (err) => {
        console.log("SQL Error: " + err);
    }

    const openCB = (err) => {
        console.log("Database OPENED");
    }

    React.useEffect(() => {
        // dropTable()
        // setDataInSqlite([2,'Vinod'])
        createConvoTable()
        getData()
    }, []);

    const setDataInSqlite = (params) => {
        let sql = `INSERT INTO ${tableName} (id, message) VALUES (?, ?)`;

        db.executeSql(sql, params, (result) => {
            getData()
        }, (error) => {
            console.log("Create user error", error);
        });
    }

    const createConvoTable = () => {
        db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, message VARCHAR)`, [], (result) => {
            console.log("Table created successfully");
        }, (error) => {
            console.log("Create table error", error)
        })
    }

    const deleteConvo = async (id) => {
        let result = await deleteFromDB(tableName, id)
        result && getData()
    }

    const getData = async () => {
        let data = await getDataFromDB(tableName);
        setData(data)
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, }}>

            <Header title={CONVO_SCREEN} />
            <FlatList data={[{ type: BOT, message: START_CHAT_WITH_BOT }].concat(data)} extraData={data}
                style={{ margin: moderateScale(16), }}

                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) => <ItemConvo item={item} index={index}
                    tapOnRemove={() => Alert.alert(REMOVE, REMOVE_CHAT_DESCRIPTION, [{
                        text: NO,
                        onPress: () => console.log('Cancel Pressed'),
                       style: 'cancel',
                    },
                    { text: YES, onPress: () => deleteConvo(data[index].id) },
                    ])}
                    onPress={() => navigation.navigate('ChatScreen', { isBOT: item.type == BOT })}
                />} />
        </GestureHandlerRootView>
    )
}

export default ConvoScreen;