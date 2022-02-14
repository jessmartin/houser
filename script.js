// Set up the UI
// Add the sliders to the UI
// Read the values from sliders and draw
// Draw the house

function draw(widthInFeet, roofPitchAngleInDegrees, wallThicknessInches, firstFloorCeilingHeightFeet) {
  var canvas = document.getElementById('twod-house');
  var ctx = canvas.getContext('2d');

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var pixelScale = 12;
  // All measurements are in feet, unless otherwise specified
  var width = widthInFeet * pixelScale;
  var depth = 24 * pixelScale;
  var wallThickness = wallThicknessInches / 12 * pixelScale; // What's typical?
  var rooflineHeight = 10 * pixelScale;
  var subfloorThickness = 8 / 12 * pixelScale; // Look into this?

  var overhangWidth = 2 * pixelScale; // Soffit + fascia board
  var firstFloorCeilingHeight = firstFloorCeilingHeightFeet * pixelScale;

  var rulerHashWidth = 1 * pixelScale;

  ctx.translate(170, 300);
  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgb(255, 255, 255, 0.8)';
  // ctx.scale(0.5,0.5);

  // floor
  ctx.beginPath();
  ctx.moveTo(-1 * (width / 2), 0);
  ctx.lineTo(width / 2, 0);
  ctx.stroke();

  // left wall
  ctx.strokeRect(-1 * (width / 2), 0, wallThickness, -rooflineHeight);
  ctx.fillStyle = 'rgb(255, 255, 255, 0.4)';
  ctx.fillRect(-1 * (width / 2), 0, wallThickness, -rooflineHeight);

  // right wall
  ctx.strokeRect(width / 2 - wallThickness, 0, wallThickness, -rooflineHeight);
  ctx.fillRect(width / 2 - wallThickness, 0, wallThickness, -rooflineHeight);

  // second floor ceiling
  ctx.strokeRect(-1 * (width / 2) + wallThickness, -firstFloorCeilingHeight, width - 2 * wallThickness, subfloorThickness);
  ctx.fillRect(-1 * (width / 2) + wallThickness, -firstFloorCeilingHeight, width - 2 * wallThickness, subfloorThickness);

  ctx.beginPath();
  // left soffit
  ctx.moveTo(-1 * (width / 2), -rooflineHeight);
  ctx.lineTo(-1 * (width / 2) - overhangWidth, -rooflineHeight);

  // right soffit
  ctx.moveTo(width / 2, -rooflineHeight);
  ctx.lineTo(1 * (width / 2) + overhangWidth, -rooflineHeight);

  // roof
  var angleInRadians = roofPitchAngleInDegrees * Math.PI / 180
  ctx.moveTo(-1 * (width / 2) - overhangWidth, -rooflineHeight);
  var soffitToRoofApexHeight = ((width / 2) + overhangWidth) / Math.tan(angleInRadians / 2);
  ctx.lineTo(0, -1 * soffitToRoofApexHeight - rooflineHeight);
  ctx.lineTo(width / 2 + overhangWidth, -rooflineHeight);
  ctx.stroke();

  // building height measurement
  var buildingHeight = soffitToRoofApexHeight + rooflineHeight;
  ctx.beginPath();
  ctx.setLineDash([5, 3]);
  ctx.moveTo(width / 2 + overhangWidth * 2, 0);
  ctx.lineTo(width / 2 + overhangWidth * 2 + rulerHashWidth, 0);
  ctx.lineTo(width / 2 + overhangWidth * 2 + rulerHashWidth, -1 * buildingHeight);
  ctx.lineTo(width / 2 + overhangWidth * 2, -1 * buildingHeight);
  // midpoint hash
  ctx.moveTo(width / 2 + overhangWidth * 2 + rulerHashWidth, -1 * (buildingHeight / 2));
  ctx.lineTo(width / 2 + overhangWidth * 2 + rulerHashWidth * 2, -1 * (buildingHeight / 2));
  ctx.stroke();

  // text label
  var buildingHeightFeet = Math.floor(buildingHeight / pixelScale);
  var buildingHeightInches = Math.round(12 * ((buildingHeight / pixelScale) - Math.floor(buildingHeight / pixelScale)));
  ctx.font = 'italic 18px serif'; // replace with a nice font
  ctx.fillText(
    `${buildingHeightFeet}' ${buildingHeightInches}"`,
    width / 2 + overhangWidth * 2 + rulerHashWidth * 2 + 5,
    -1 * (buildingHeight / 2) + 5
  );

}

function readInputsAndDraw() {
  wallThicknessLabel.innerHTML = `${wallThickness.value}"`;
  var wallThicknessInches = parseInt(wallThickness.value);
  var roofPitchAngleInDegrees = parseInt(roofSlider.value);
  roofSliderLabel.innerHTML = `${roofPitchAngleInDegrees}&deg;`;
  firstFloorCeilingHeightLabel.innerHTML = `${firstFloorCeilingHeightSlider.value}'`;
  var firstFloorCeilingHeight = parseInt(firstFloorCeilingHeightSlider.value);

  var widthInFeet = parseInt(widthSlider.value);
  widthLabel.innerHTML = `${widthInFeet}'`;

  draw(widthInFeet, roofPitchAngleInDegrees, wallThicknessInches, firstFloorCeilingHeight);
}

// roof slider
var roofSlider = document.getElementById('roofAngle');
var roofSliderLabel = document.getElementById('roofAngleLabel');
roofSlider.oninput = readInputsAndDraw;

// wall thickness
var wallThickness = document.getElementById('wallThickness');
var wallThicknessLabel = document.getElementById('wallThicknessLabel');
wallThickness.oninput = readInputsAndDraw;

// first floor ceiling height
var firstFloorCeilingHeightSlider = document.getElementById('firstFloorCeilingHeightSlider');
var firstFloorCeilingHeightLabel = document.getElementById('firstFloorCeilingHeightLabel');
firstFloorCeilingHeightSlider.oninput = readInputsAndDraw;

// width
var widthSlider = document.getElementById('widthSlider');
var widthLabel = document.getElementById('widthLabel');
widthSlider.oninput = readInputsAndDraw;

draw(16, 90, 8, 8);