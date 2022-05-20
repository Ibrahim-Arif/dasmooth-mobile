"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interpolator = /** @class */ (function () {
  function Interpolator() {}
  Interpolator.getInterpolator = function (config) {
    if (config.input.length < 2) {
      throw new Error("input array must have at least 2 entries");
    }
    if (config.output.length < 2) {
      throw new Error("output array must have at least 2 entries");
    }
    if (config.input.length !== config.output.length) {
      throw new Error("input and output array must have same number of items");
    }
    return function (x) {
      var i = config.input.indexOf(x);
      // if an exact match exists
      if (i > -1) {
        // return the exact match
        return config.output[i];
      }
      // using clamped values
      if (x < config.input[0]) {
        return config.output[0];
      }
      if (x > config.input[config.input.length - 1]) {
        return config.output[config.output.length - 1];
      }
      // find nearest x
      i = 0;
      while (i < config.input.length && config.input[i] < x) {
        i++;
      }
      var x1 = config.input[i - 1];
      var x2 = config.input[i];
      var y1 = config.output[i - 1];
      var y2 = config.output[i];
      return y1 + (y2 - y1) * ((x - x1) / (x2 - x1));
    };
  };
  return Interpolator;
})();
exports.default = Interpolator;
