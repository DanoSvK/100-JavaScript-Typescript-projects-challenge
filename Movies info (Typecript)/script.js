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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var searchBtn = document.querySelector(".search-btn");
var movieTitleEl = document.querySelector("input");
var card = document.querySelector(".card");
var renderDataEl = document.querySelector(".render-app");
var errorMsg = document.querySelector(".error-message");
var errorMsgWrapper = document.querySelector(".error-message-wrapper");
var errorMsgDelay = 3000;
var MovieApp = /** @class */ (function () {
    function MovieApp() {
        var _this = this;
        this.getData = function () { return __awaiter(_this, void 0, void 0, function () {
            var apiKey, movieTitle, res, data, html, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        apiKey = "Enter_Your_Api_Key";
                        movieTitle = movieTitleEl.value;
                        return [4 /*yield*/, fetch("https://www.omdbapi.com/?apikey=".concat(apiKey, "&t=").concat(movieTitle))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        // Generating error
                        if (data.Response === "False")
                            throw new Error("".concat(data.Error));
                        html = this.markup(data);
                        renderDataEl.innerHTML = html;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        // Catching and rendering error with error message
                        errorMsg.innerHTML = "".concat(err_1, " Enter a correct movie or tv show name.");
                        errorMsgWrapper.classList.add("active");
                        setTimeout(function () {
                            errorMsgWrapper.classList.remove("active");
                        }, errorMsgDelay);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        searchBtn.addEventListener("click", function () {
            _this.getData();
        });
        document.addEventListener("keydown", function (e) {
            // Check if enter is pressed and at the same time if input is active
            if (e.key === "Enter" && document.activeElement === movieTitleEl) {
                _this.getData();
            }
        });
    }
    // Generating dynamic markup
    MovieApp.prototype.markup = function (data) {
        //Splitting genres string into array to dynamically create <p> element per each genre in markup()
        var genres = data.Genre.split(",");
        return "\n    \n        <div class=\"main-content\">\n              <img class=\"poster\" src=".concat(data.Poster, " alt=\"Movie poster\" />\n              <div class=\"movie-info\">\n                <h1>").concat(data.Title, "</h1>\n                <p><img class=\"star\" src=\"./star-icon.svg\" alt=\"\" /> 8.4</p>\n                <div class=\"details\">\n                  <p class=\"age\">").concat(data.Rated, "</p>\n                  <p class=\"air-date\">").concat(data.Released, "</p>\n                </div>\n                <div class=\"genres\">\n                ").concat(genres.map(function (i) { return "<p class=\"genre\">".concat(i, "</p>"); }).join(""), "\n                </div>\n              </div>\n            </div>\n            <div class=\"text-content\">\n            <p class=\"writers\">\n                <span>Writers:</span><br />\n                ").concat(data.Writer, "\n              </p>\n              <p class=\"cast\">\n                <span>Cast:</span><br />\n                ").concat(data.Actors, "\n              </p>\n              <p class=\"plot\">\n                <span>Plot:</span><br />\n                ").concat(data.Plot, "\n              </p>\n            </div>");
    };
    return MovieApp;
}());
new MovieApp();
