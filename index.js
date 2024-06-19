/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qrimage from "qr-image";
import fs from "fs";


  
inquirer
.prompt([
  {"message": "Type in your URL: ",
name:"URL"},
])
.then((answers) => {
    const url = answers.URL;
    var qr_png = qrimage.image(url, {parse_url: true});
    qr_png.pipe(fs.createWriteStream('url_qr_code.png'));
    fs.writeFile('URL.txt',url, (err) =>{
        if (err) throw err;
        console.log("The file has been saved!")
    });
})
.catch((error) => {
  if (error.isTtyError) {
    console.log('An error occured.')
  } else {
    console.log('Unable to complete request.')
  }
});