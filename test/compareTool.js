const fs = require('fs');
const testFolder = './actual/';
let filesActualFolder = fs.readdirSync(testFolder);
var assert = require('assert');
var lineReaderNew = require('line-reader');
let counterHola = 0;


var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./actual/notas.txt')
  });
  
  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
  });

  lineReader.on('close', function (line) {
    console.log('done');
  });

describe('Check file existence', function() {
    it('File should exist.', function() {
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                if(!fs.existsSync(`./expected/${file}`)){
                    console.log('The non existing file is'+file);
                    assert.fail();
                }
            });
          })
    });
  });

  describe('Check the content of the files with for each.', function() {
    it('It has got the line', function(done) {
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                
                lineReaderNew.eachLine(`./actual/${file}`, function(line, last) {
                    fs.readFile(`./expected/${file}`, 'utf8',function (err, data) {
                      
                        if (err) throw err;                        
                    
                        if(!(data.indexOf(line) >= 0)){
                            assert.fail('Line doesnt match.'+line);
                            done();
                        }
                      });
                      if(last){
                        counterHola++;
                        if(counterHola===filesActualFolder.length){
                            done();
                        }
                    }

                  });

            });
            
          })
    });
  });