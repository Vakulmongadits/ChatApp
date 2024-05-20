import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
var db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB);

const errorCB = (err) => {
    console.log("SQL Error: " + err);
}

const openCB = (err) => {
    console.log("Database OPENED");
}

export const createTable = (tableName) => {
    db.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, message VARCHAR)`, [], (result) => {
        console.log("Table created successfully");
    }, (error) => {
        console.log("Create table error", error)
    })
};

export const getDataFromDB = (tableName) => {

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ${tableName}`, [], (tx, resultSet) => {
                var length = resultSet.rows.length;
                let chatDBData = []
                for (var i = 0; i < length; i++) {
                    console.log(resultSet.rows.item(i));
                    chatDBData.push(resultSet.rows.item(i))
                }
                // console.log("chatDBData getDataFromDB --> ", chatDBData);
                return resolve(chatDBData);
            }, (error) => {
                console.log('error --> ', error)
                return reject([])
            })
        })
    })
};

export const deleteFromDB = (tableName, id) => {
    let sql = `DELETE FROM ${tableName} WHERE id =` + id;
    let params = [1];
    return new Promise((resolve,reject)=>{
        db.executeSql(sql, params, (resultSet) => {
            return resolve(true)
        }, (error) => {
            console.log("Delete user error", error);
            return reject(false)
        })
    })
}

export const dropTable = (tableName) => {
    db.transaction(tx => {
        tx.executeSql(
            `DROP TABLE ${tableName};`, [],
            (tx, results) => {
                if (results && results.rows && results.rows._array) {
                    /* do something with the items */
                    // results.rows._array holds all the results.
                    console.log(JSON.stringify(results.rows._array));
                    console.log('table dropped')
                } else {
                    console.log('no results')
                }
            },
            (tx, error) => {
                console.log(error);
            }
        )
    });
}

export const saveDataInDB=(tableName,messageText)=>{
    let params = [messageText]; //storing user data in an array
   return new Promise((resolve,reject)=>{
    db.executeSql(`INSERT INTO ${tableName} (message) VALUES (?)`, params, (result) => {
    return resolve(true)
    }, (error) => {
        console.log("Create user error", error);
        return reject(false)
    });
   })
}