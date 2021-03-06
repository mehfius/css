const path = require('path');
const fs   = require('fs');

const { createClient } = require("@supabase/supabase-js");

var connSupa = function () {

  return createClient(process.env['url'],process.env['anom_key'])

};

const conn     = connSupa();

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


const cssAllFiles = function (){

  let text = ""
  const result = getAllFiles("./scripts/css");

  Object.entries(result).forEach(([key, value]) => {

    let isModules = value.indexOf('/modules/');

    let modules   = path.basename(value,'.css');

    data = fs.readFileSync(value, 'utf8');

    if(isModules>-1){
      
      let css       = "body[modules='"+modules+"']";
      
      data.split(/\r?\n/).forEach(line =>  {
        
        text+=css+""+line;
        console.log(css+""+line);
        
      });
      
    }else{
      
      text+="/*"+value+"*/";
  
      text+=data;
  
      text+="\n\n";
      
    }
    


  });

  return text;
}


const categoryColors = async function (){

  const { data, error }  = await conn.from("category").select('id,color');

  var style = "";

  Object.entries(data).forEach(([key, value]) => {

    style+='item[category="'+value.id+'"] {background-color:'+value.color+'15;}';
    style+='item[category="'+value.id+'"] data > created {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] detalhes figure {border-color:'+value.color+'40;}';
    style+='item[category="'+value.id+'"] header {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] > medicos {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] > share > div {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] data > updated {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] > pacientes > div > * {background-color:'+value.color+'20;}';
    style+='item[category="'+value.id+'"] options > button{background-color:'+value.color+'15;}';
    style+='item[category="'+value.id+'"] chat post message{background-color:'+value.color+'15;}';
    
  });

  return style;

};

//const color = categoryColors();

//console.log(await color);



const main = async function (){

  let text = await categoryColors();

  text+=cssAllFiles();

  fs.writeFile('./export/all.css', text, function (err,data) {

    if (err) {
      return console.log(err);
    }
  
  }); 

}();

   