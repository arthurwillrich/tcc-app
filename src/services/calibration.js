// calibration.js

export function startCalibration(webgazer, setCalibrated, setPointIndex) {
  setCalibrated(false);
  setPointIndex(0);
  webgazer.showPredictionPoints(true);
  webgazer.setRegression('ridge');
  webgazer.setTracker('clmtrackr');
  webgazer.begin();
}

export function stopCalibration(webgazer, setCalibrated, setPointIndex) {
  setCalibrated(true);
  setPointIndex(null);
  webgazer.showPredictionPoints(false);
  webgazer.end();
}

export function calibrationPoints(webgazer, setCalibrated, setPointIndex) {
  startCalibration(webgazer, setCalibrated, setPointIndex);
  var numPoints = 9;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var leftOffset = width * 0.1;
  var topOffset = height * 0.1;
  var pointSize = 0.2 * Math.min(width, height);
  var points = createPoints(numPoints, leftOffset, topOffset, pointSize);
  var index = 0;

  var listener = function listener() {
    var point = points[index];
    var element = document.elementFromPoint(point.x, point.y);
    if (element) {
      element.style.backgroundColor = 'green';
      index += 1;
      if (index === numPoints) {
        stopCalibration(webgazer, setCalibrated, setPointIndex);
        document.removeEventListener('click', listener);
      } else {
        setTimeout(function () {
          element.style.backgroundColor = 'red';
        }, 500);
      }
    }
  };

  document.addEventListener('click', listener);
}

function createPoints(numPoints, leftOffset, topOffset, pointSize) {
  var points = [];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      points.push({
        x: leftOffset + i * leftOffset * 2,
        y: topOffset + j * topOffset * 2
      });
    }
  }
  return points;
}
