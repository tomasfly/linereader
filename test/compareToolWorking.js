const fs = require('fs');
const testFolder = './actual/';
let filesActualFolder = fs.readdirSync(testFolder);
var assert = require('assert');
var lineReader = require('line-reader');
let counterHola = 0;

xdescribe('Check file existence', function() {
    it('File should exist.', function() {
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                if(!fs.existsSync(`./expected/${file}`)){
                    assert.fail();
                }
            });
          })
    });
  });

  xdescribe('Check the content of the files.', function() {
    it('It has got the line', function(done) {
            for (let index = 0; index < filesActualFolder.length; index++) {

                lineReader.eachLine(`./actual/${filesActualFolder[index]}`, function(line, last) {
                    
                        fs.readFile(`./expected/${filesActualFolder[index]}`, function (err, data) {
                      
                        if (err) throw err;

                        if(!(data.indexOf(line) >= 0)){
                            assert.fail('Line doesnt match.');
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

            }
    });
  });