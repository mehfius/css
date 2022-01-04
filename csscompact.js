const path = require('path');
const fs   = require('fs');

const getAllFiles = function(dirPath, arrayOfFiles) {

    files = fs.readdirSync(dirPath)
    


    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    })

  return arrayOfFiles 
}

const result = getAllFiles("./scripts/css")


let text = "";

const teste = result.forEach(element => {

  const data = fs.readFileSync(element, 'utf8');

  text+=data;

  text+="\n\n";

});


 fs.writeFile('./export/all.css', text, function (err,data) {

  if (err) {
    return console.log(err);
  }
 
}); 
