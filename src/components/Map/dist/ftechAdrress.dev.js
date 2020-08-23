"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DataFteching;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DataFteching(_ref) {
  var x = _ref.x,
      y = _ref.y;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      adrress = _useState2[0],
      setAdrress = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var region = /place/;
  (0, _react.useEffect)(function () {
    function FtechData() {
      var token;
      return regeneratorRuntime.async(function FtechData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = 'pk.eyJ1IjoiYW5kcmlpbXNuIiwiYSI6ImNrZGYzZ200YTJudXQyeHNjMjk2OTk2bjUifQ.njqMX6x6U946yjJdWwA7mA';
              _context.next = 3;
              return regeneratorRuntime.awrap(_axios["default"].get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(x, ",").concat(y, ".json?access_token=").concat(token)).then(function (res) {
                // console.log(res.data.features.find(place => place.id.match(region)).text)
                setAdrress(res.data);
              })["catch"](function (err) {
                return console.log(err);
              })["finally"](function () {
                return setLoading(false);
              }));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }

    FtechData();
  }, []);
  if (loading) return null; // console.log({ adrress.features.find(place => place.id.match(region)).text })

  console.log("".concat(adrress.features.find(function (place) {
    return place.id.match(region);
  }).text));
  return adrress.features.find(function (place) {
    return place.id.match(region);
  }).text;
}