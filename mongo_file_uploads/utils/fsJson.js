const fs = require('fs');



function readJSONDocument(){
    var jsonData
    fs.readFile('./nuevo.json', function read(err, data){
        if(err) {
            console.log(err);
        }
        console.log('Document read!');
        jsonData = JSON.parse(data);
        console.log(jsonData)
    });

    return jsonData
}
function insertDataJSONDocument(data){
    fs.writeFile('./nuevo.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
        return "The file was saved!";
    });
}
function cleanDocument(){
    return insertDataJSONDocument('');
}

module.exports =  {
    cleanDocument : cleanDocument,
    insertDataJSONDocument : insertDataJSONDocument,
    readJSONDocument : readJSONDocument
}