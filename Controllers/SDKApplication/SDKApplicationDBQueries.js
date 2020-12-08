const SDKApplicationDb = require('../../app/Models/SDKApplication');
const SDKDeveloperDb = require('../../app/Models/SDKDeveloper');
const SDKAndroidDb = require('../../app/Models/SDKAndroidApp');
const SDKiosDb = require('../../app/Models/SDKiosApp');



var ApplicationDBQueries = {

    insertQuery: (params, ProjectID) => {
            return SDKApplicationDb.updateOne(
                { Project_Name : params.Project_Name },
                { $set:{ userID : params.userID,Project_Id : ProjectID,Project_Name : params.Project_Name}},
                { upsert : true } ).exec()
    },
    getQuery:(params) =>{
        return  SDKApplicationDb.findOne({Project_Id: params.Project_Id}).exec()
    },
    finddeveloperQuery:(params) =>{
        return  SDKDeveloperDb.findOne({userID: params.emailID}).exec()
    },
    findQuery:(params) =>{
      return  SDKAndroidDb.findOne({
            Project_Id: params.Project_Id
        }).exec()
    },
    findiosQuery:(params) =>{
        return  SDKiosDb.findOne({
            Project_Id: params.Project_Id
        }).exec()
    },
    InsertAndroidConfigFile : (params,App_Key1,Secret_Key1) =>{
        var CreatedDate = Math.floor(Date.now() / 1000);
        var ModifiedDate = Math.floor(Date.now() / 1000);

        let androidConfig = new SDKAndroidDb({
            App_Name: params.App_Name,
            Package_Name: params.Project_Name,
            PlayStore_Link: params.PlayStore_Link,
            App_Key: App_Key1,
            Secret_Key: Secret_Key1,
            Project_Id: params.Project_Id,
            AndroidJsonFiles : "localhost:8080/public/jsonFiles/"+params. App_Name + ".json",

        });
        return androidConfig;

    },
    deleteQuery: (params) => {
        return SDKAndroidDb.deleteMany({Project_Id: new RegExp('^' + params.Project_Id + '$')}).exec()
    },
    deleteprojectQuery: (params) => {
        return SDKApplicationDb.deleteOne({Project_Id: new RegExp('^' + params.Project_Id + '$')}).exec()
    },
    deleteiosprojectQuery: (params) => {
        return SDKiosDb.deleteMany({Project_Id: new RegExp('^' + params.Project_Id + '$')}).exec()
    },
    InsertIosConfigFile : (params,appKey,secretKey,AppName) =>{
        var CreatedDate = Math.floor(Date.now() / 1000);
        var ModifiedDate = Math.floor(Date.now() / 1000);

        let iosConfig = new SDKiosDb({
            Project_Id : params.Project_Id,
            App_Name : params.App_Name,
            Bundle_Identifier : params.Bundle_Identifier,
            App_Store_Id : params.App_Store_Id,
            App_Key :appKey,
            Secret_Key : secretKey,
            PlistFile : "localhost:8080/public/plistFiles/"+ AppName + ".plist",
            Created_Date : CreatedDate,
            Modified_Date : ModifiedDate
        });
        return iosConfig;

    }

}
module.exports =  ApplicationDBQueries;