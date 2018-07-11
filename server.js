import express from 'express';
import path from 'path';
import sphero from 'sphero';

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const bb8 = sphero('54b709d2f2f24eaa809fa1bab5e08d56');

bb8.connect(() => {
  app.use('/', router);

  router.get('/', function(req, res) {
    res.send('im the home page!');
    console.log('bb8',bb8);
  });

  router.get('/battery', (req, res) => {
    bb8.getPowerState(function(err, data) {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("data:");
        console.log("  recVer:", data.recVer);
        console.log("  batteryState:", data.batteryState);
        console.log("  batteryVoltage:", data.batteryVoltage);
        console.log("  chargeCount:", data.chargeCount);
        console.log("  secondsSinceCharge:", data.secondsSinceCharge);
      }
      res.send('check battery');
    });
  });

  router.get('/color', (req, res) => {
    bb8.color({ red: 255, green: 0, blue: 255 });
    console.log('dwadaw');
    res.send('change color');
  });

  router.get('/detectCollision', (req, res) => {
    bb8.detectCollisions({device: "bb8"});
    bb8.color("green");

    bb8.on("collision", function(data) {
      console.log("collision detected");
      console.log("  data:", data);

      bb8.color("red");

      setTimeout(function() {
        bb8.color("green");
      }, 1000);
    });

    bb8.roll(155, 0);
    res.send('detect mode');
  });

  app.listen(port, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`Listen at port ${port}`);
  });
})





// bb8.connect(function() {
//   console.log("Now connected to BB-8");
//
//   //The Ping command verifies that BB8 is awake and receiving commands.
//   bb8.ping(function(err, data) {
//     console.log(err || data);
//   });
//
//   //Get bluetooth infos
//   bb8.getBluetoothInfo(function(err, data) {
//     if (err) {
//       console.log("error: ", err);
//     } else {
//       console.log("data:");
//       console.log("  name:", data.name);
//       console.log("  btAddress:", data.btAddress);
//       console.log("  separator:", data.separator);
//       console.log("  colors:", data.colors);
//     }
//   });
//
//   //Get battery infos
//   bb8.getPowerState(function(err, data) {
//     if (err) {
//       console.log("error: ", err);
//     } else {
//       console.log("data:");
//       console.log("  recVer:", data.recVer);
//       console.log("  batteryState:", data.batteryState);
//       console.log("  batteryVoltage:", data.batteryVoltage);
//       console.log("  chargeCount:", data.chargeCount);
//       console.log("  secondsSinceCharge:", data.secondsSinceCharge);
//     }
//   });
//
//   // sets color to the provided r/g/b values
//   bb8.color({ red: 255, green: 0, blue: 255 });
//
//   setTimeout(function() {
//
//     bb8.disconnect(function() {
//       console.log("Now disconnected from BB-8");
//     });
//
//   }, 3000);
//   console.log('bb8', bb8);
//   // roll BB-8 in a random direction, changing direction every second
//   setInterval(function() {
//     let direction = Math.floor(Math.random() * 360);
//     bb8.roll(150, direction);
//   }, 1000);
// });
//
// const app = express();
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './src/index.html'));
// });
//
// app.listen(3000, (error) => {
//   if (error) {
//     console.log(error);
//   }
// });
