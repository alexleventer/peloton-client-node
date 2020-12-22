"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.peloton = void 0;
var querystring = require('querystring');
var request_1 = require("./request");
var clientVariables = {
    loggedIn: false
};
function _pelotonApiUrlFor(forPath) {
    return "https://api.onepeloton.com/api" + forPath;
}
function _pelotonAuthUrlFor(forPath) {
    return "https://api.onepeloton.com/auth" + forPath;
}
function _verifyIsLoggedIn() {
    if (!clientVariables.loggedIn) {
        throw new Error('Must authenticate before making API call.');
    }
}
function authenticate(options) {
    return __awaiter(this, void 0, void 0, function () {
        var loginRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request_1["default"].post(_pelotonAuthUrlFor('/login'), {
                        username_or_email: options.username,
                        password: options.password
                    })];
                case 1:
                    loginRes = _a.sent();
                    clientVariables.cookie = loginRes.headers['set-cookie'];
                    clientVariables.userId = loginRes.data.user_id;
                    clientVariables.loggedIn = true;
                    return [2];
            }
        });
    });
}
function me() {
    return __awaiter(this, void 0, void 0, function () {
        var meRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _verifyIsLoggedIn();
                    return [4, request_1["default"].get(_pelotonApiUrlFor('/me'), {
                            cookie: clientVariables.cookie
                        })];
                case 1:
                    meRes = _a.sent();
                    return [2, meRes.data];
            }
        });
    });
}
function workouts(options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var userId, joins, limit, page, workoutQueryParams, workoutRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _verifyIsLoggedIn();
                    userId = clientVariables.userId;
                    joins = options.joins || 'ride';
                    limit = options.limit || 10;
                    page = options.page || 0;
                    workoutQueryParams = querystring.stringify({ joins: joins, limit: limit, page: page });
                    return [4, request_1["default"].get(_pelotonApiUrlFor("/user/" + userId + "/workouts?" + workoutQueryParams), {
                            cookie: clientVariables.cookie
                        })];
                case 1:
                    workoutRes = _a.sent();
                    return [2, workoutRes.data];
            }
        });
    });
}
exports.peloton = {
    authenticate: authenticate,
    me: me,
    workouts: workouts
};
//# sourceMappingURL=index.js.map