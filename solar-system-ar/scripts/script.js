/* Planets Data */
var data = {
  mercury: {
    transform_z: 1,
    scale: 0.5,
    orbitalSpeed: 1
    // distanceFromSun: 57,
    // realScale: 1
  },
  venus: {
    transform_z: 1.8,
    scale: 1,
    orbitalSpeed: 3
  },
  earth: {
    transform_z: 2.4,
    scale: 1,
    orbitalSpeed: 5
  },
  mars: {
    transform_z: 2.7,
    scale: 0.8,
    orbitalSpeed: 8
  },
  jupiter: {
    transform_z: 4,
    scale: 6,
    orbitalSpeed: 20
  },
  saturn: {
    transform_z: 6,
    scale: 5,
    orbitalSpeed: 40
  },
  uranus: {
    transform_z: 9,
    scale: 3.5,
    orbitalSpeed: 12
  },
  neptune: {
    transform_z: 13,
    scale: 3.5,
    orbitalSpeed: 15
  },
  sun: {
    transform_x: 0,
    transform_z: 0,
    scale: 0.085
  }
};

/* Required Modules */
var Scene = require('Scene');
var Reactive = require('Reactive');
var Diagnostics = require('Diagnostics');
var Animation = require('Animation');
var Audio = require('Audio');
var TouchGestures = require('TouchGestures');

/* Starting audio */
var music = Scene.root
  .child('Device')
  .child('Camera')
  .child('Focal Distance')
  .child('audiosource0');

Audio.play(music);

/* Helper Functions */
function CalculateRotationalSpeed(degree) {
  return Math.PI / ((180 / degree) % 360);
}

function CalculateRotationTime(speed) {
  return speed * 10000;
}

function CalculateScale(scale) {
  return scale * 0.02;
}

function CalculateDistanceFromSun(distance) {
  return distance * 1500;
}

/* Debugging */
//mercury[0].hidden = venus[0].hidden = mars[0].hidden = jupiter[0].hidden = saturn[0].hidden = uranus[0].hidden = neptune[0].hidden = true;
//earth[0].hidden = moon[0].hidden = sun[0].hidden = true;

var rotationSampler = Animation.samplers.linear(0, CalculateRotationalSpeed(-360));

/* ========== Planets ============== */

/* Mercury */

var mercury = Scene.root.child('planet_1_mercury');
var mercury_child = mercury.find('innerSphere');
var mercuryDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.mercury.orbitalSpeed), loopCount: Infinity });

mercury_child.transform.z = CalculateDistanceFromSun(data.mercury.transform_z);
mercury.transform.scaleX = CalculateScale(data.mercury.scale);
mercury.transform.scaleY = CalculateScale(data.mercury.scale);
mercury.transform.scaleZ = CalculateScale(data.mercury.scale);
mercury.transform.rotationZ = CalculateRotationalSpeed(360);
mercury.transform.rotationY = Animation.animate(mercuryDriver, rotationSampler);

mercuryDriver.start();

/* Venus */

var venus = Scene.root.child('planet_2_venus');
var venus_child = venus.find('innerSphere');
var venusDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.venus.orbitalSpeed), loopCount: Infinity });

venus_child.transform.z = CalculateDistanceFromSun(data.venus.transform_z);
venus.transform.scaleX = CalculateScale(data.venus.scale);
venus.transform.scaleY = CalculateScale(data.venus.scale);
venus.transform.scaleZ = CalculateScale(data.venus.scale);
venus.transform.rotationZ = CalculateRotationalSpeed(360);
venus.transform.rotationY = Animation.animate(venusDriver, rotationSampler);

venusDriver.start();

/* Earth */

var earth = Scene.root.child('planet_3_earth');
var earth_child = earth.find('innerSphere');
var earthDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.earth.orbitalSpeed), loopCount: Infinity });

earth_child.transform.z = CalculateDistanceFromSun(data.earth.transform_z);
earth.transform.scaleX = CalculateScale(data.earth.scale);
earth.transform.scaleY = CalculateScale(data.earth.scale);
earth.transform.scaleZ = CalculateScale(data.earth.scale);
earth.transform.rotationZ = CalculateRotationalSpeed(360);
earth.transform.rotationY = Animation.animate(earthDriver, rotationSampler);

earthDriver.start();

/* Mars */

var mars = Scene.root.child('planet_4_mars');
var mars_child = mars.find('innerSphere');
var marsDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.mars.orbitalSpeed), loopCount: Infinity });

mars_child.transform.z = CalculateDistanceFromSun(data.mars.transform_z);
mars.transform.scaleX = CalculateScale(data.mars.scale);
mars.transform.scaleY = CalculateScale(data.mars.scale);
mars.transform.scaleZ = CalculateScale(data.mars.scale);
mars.transform.rotationZ = CalculateRotationalSpeed(360);
mars.transform.rotationY = Animation.animate(marsDriver, rotationSampler);

marsDriver.start();

/* Jupiter */

var jupiter = Scene.root.child('planet_5_jupiter');
var jupiter_child = jupiter.find('innerSphere');
var jupiterDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.jupiter.orbitalSpeed), loopCount: Infinity });

jupiter_child.transform.z = CalculateDistanceFromSun(data.jupiter.transform_z);
jupiter.transform.scaleX = CalculateScale(data.jupiter.scale);
jupiter.transform.scaleY = CalculateScale(data.jupiter.scale);
jupiter.transform.scaleZ = CalculateScale(data.jupiter.scale);
jupiter.transform.rotationZ = CalculateRotationalSpeed(360);
jupiter.transform.rotationY = Animation.animate(jupiterDriver, rotationSampler);

jupiterDriver.start();

/* Saturn */

var saturn = Scene.root.child('planet_6_saturn');
var saturn_child = saturn.find('innerSphere');
var saturnDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.saturn.orbitalSpeed), loopCount: Infinity });

saturn_child.transform.z = CalculateDistanceFromSun(data.saturn.transform_z);
saturn.transform.scaleX = CalculateScale(data.saturn.scale);
saturn.transform.scaleY = CalculateScale(data.saturn.scale);
saturn.transform.scaleZ = CalculateScale(data.saturn.scale);
saturn.transform.rotationZ = CalculateRotationalSpeed(360);
saturn.transform.rotationY = Animation.animate(saturnDriver, rotationSampler);

saturnDriver.start();

/* Uranus */

var uranus = Scene.root.child('planet_7_uranus');
var uranus_child = uranus.find('innerSphere');
var uranusDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.uranus.orbitalSpeed), loopCount: Infinity });

uranus_child.transform.z = CalculateDistanceFromSun(data.uranus.transform_z);
uranus.transform.scaleX = CalculateScale(data.uranus.scale);
uranus.transform.scaleY = CalculateScale(data.uranus.scale);
uranus.transform.scaleZ = CalculateScale(data.uranus.scale);
uranus.transform.rotationZ = CalculateRotationalSpeed(360);
uranus.transform.rotationY = Animation.animate(uranusDriver, rotationSampler);

uranusDriver.start();

/* Neptune */

var neptune = Scene.root.child('planet_8_neptune');
var neptune_child = neptune.find('innerSphere');
var neptuneDriver = Animation.timeDriver({ durationMilliseconds: CalculateRotationTime(data.neptune.orbitalSpeed), loopCount: Infinity });

neptune_child.transform.z = CalculateDistanceFromSun(data.neptune.transform_z);
neptune.transform.scaleX = CalculateScale(data.neptune.scale);
neptune.transform.scaleY = CalculateScale(data.neptune.scale);
neptune.transform.scaleZ = CalculateScale(data.neptune.scale);
neptune.transform.rotationZ = CalculateRotationalSpeed(360);
neptune.transform.rotationY = Animation.animate(neptuneDriver, rotationSampler);

neptuneDriver.start();

/* Get Text */
// var planet_text = Scene.root.find('text0');
// planet_text.text = 'Neptune';

// Diagnostics.log(neptune);

// TouchGestures.onTap().subscribe(function(gesture) {
//   Diagnostics.log('Tapping');
//   Diagnostics.log(gesture);
// });

// TouchGestures.onTap(earth).subscribe(function(gesture) {
//   Diagnostics.log('Tapping');
// });

// TouchGestures.onPinch(earth).subscribe(function(gesture) {
// Scale the planet
//   Diagnostics.log('Pinching');
// });

// TouchGestures.onPinch().subscribe(function(gesture) {
//   var lastScaleX = earth.transform.scaleX.lastValue;
//   earth.transform.scaleX = Reactive.mul(lastScaleX, gesture.scale);

//   var lastScaleY = earth.transform.scaleY.lastValue;
//   earth.transform.scaleY = Reactive.mul(lastScaleY, gesture.scale);

//   var lastScaleZ = earth.transform.scaleZ.lastValue;
//   earth.transform.scaleZ = Reactive.mul(lastScaleZ, gesture.scale);
// });
