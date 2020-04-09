const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv

const lines = argv.lines || 1000000
const filename = argv.output || 'users.csv'
const stream = fs.createWriteStream(filename)

const createUser = (i) => {
  const handle = faker.name.findName();
  const name = faker.name.findName();
  const image_url = `http://d2tlnaqrf4t9d7.cloudfront.net/UserId+photos+for+S3/userId${i}.jpeg`;
  const track_count = faker.random.number(50);
  const follower_count = faker.random.number(2000);
  const join_date = faker.date.past(10, '2020-01-01');

  return `${handle},${name},${image_url},${track_count},${follower_count},${join_date}\n`
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines
  function writing(){
    let canWrite = true
    do {
      i--
      let user = createUser()
      //check if i === 0 so we would write and call `done`
      if(i === 0){
        // we are done so fire callback
        writeStream.write(user, encoding, done)
      }else{
        // we are not done so don't fire callback
        writeStream.write(user, encoding)
      }
      //else call write and continue looping
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  writing()
};

//write our `header` line before we invoke the loop
stream.write(`handle,name,image_url,track_count,follower_count,join_date\n`, 'utf-8')
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end()
});