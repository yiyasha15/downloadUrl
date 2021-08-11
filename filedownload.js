//requiring modules
const path = require('path');
const fs = require('fs');
const axios = require('axios')
const download = require('download');
const nodeCron = require("node-cron");
//joining path of directory 
downloadFiles();
const job = nodeCron.schedule("0 * * * *", () => {
  console.log("program run on schedule.");
  downloadFiles(); 
});
job.start();

function downloadFiles(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log("current time: ", time);
  console.log("program will run again after an hour.");
  let currentFiles =[];
  const directoryPath = path.join(__dirname, 'images');
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          currentFiles.push(file);
      });
      console.log("files in image folder",currentFiles);
  });
  //post request using axios
  axios.post('https://fhrwebt.ebmtech.com:44340/api/CustUrlFetch', {
      "CustomerNo": "TW111001"
  })
    .then(res => {
      let urlList = res.data.urlList;
      urlList.forEach(function (file) {
          let fileName = file.replace(/^.*[\\\/]/, '') //extract file name with .zip extension
          let fileNameNoExt = fileName.replace(/\.[^/.]+$/, "") //extract file name without .zip extension
          // check if file is in array
          console.log(fileName," already there: ",currentFiles.includes(fileName)); 
          console.log(fileNameNoExt," (without .zip)already there: ",currentFiles.includes(fileNameNoExt)); 
          if(currentFiles.includes(fileName)||currentFiles.includes(fileNameNoExt)){
              console.log("File already exists.");
              return;
          }
          else{
              //download file
              const url = file;
              // Path at which image will get downloaded
              const filePath = `${__dirname}/images`;
              download(file,filePath)
              .then(() => {
                  console.log('Download Completed');
              })
          }
      });
    })
    .catch(error => {
      console.error(error)
    })
}