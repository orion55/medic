"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalSt =
/*#__PURE__*/
function () {
  function LocalSt() {
    _classCallCheck(this, LocalSt);
  }

  _createClass(LocalSt, [{
    key: "save",
    value: function save(data) {
      localStorage.setItem('json', JSON.stringify(data));
    }
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result, value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (localStorage.getItem('json')) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return $.get('json/lpu.json');

              case 4:
                result = _context.sent;
                this.save(result);
                return _context.abrupt("return", result);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(_context.t0.statusText));
                return _context.abrupt("return", null);

              case 13:
                _context.next = 17;
                break;

              case 15:
                value = localStorage.getItem('json');
                return _context.abrupt("return", value ? JSON.parse(value) : null);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "erase",
    value: function erase() {
      localStorage.removeItem('json');
    }
  }]);

  return LocalSt;
}();
"use strict";

$(document).ready(function () {
  new Medic({
    idMedic: 'medicId'
  });
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Класс сведений о лечебных учреждениях
 * Гребенёв Олег <admin@infoblog72.ru>
 */
var Medic =
/*#__PURE__*/
function () {
  function Medic(options) {
    _classCallCheck(this, Medic);

    this.checkIdMedic(options);
  }

  _createClass(Medic, [{
    key: "checkIdMedic",
    value: function checkIdMedic(options) {
      if ('idMedic' in options) {
        this.medicForm = $('#' + options.idMedic);

        if (this.medicForm.length !== 0) {
          this.init();
        }
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.storage = new LocalSt();
      this.storage.load().then(function (data) {
        if (data === null) {
          return false;
        } else {
          _this.info = data;
        }

        console.log(_this.info);
      });
      $('.collapse.show').each(function () {
        $(this).prev('.card-header').find('.fas').addClass('fa-chevron-up').removeClass('fa-chevron-down');
      });
      $('.collapse').on('show.bs.collapse', function () {
        $(this).prev('.card-header').find('.fas').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }).on('hide.bs.collapse', function () {
        $(this).prev('.card-header').find('.fas').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      });
      $('#medicAllDown').click(function () {
        var btn = $(this).find('.fas');

        if (btn.hasClass('fa-angle-double-down')) {
          btn.removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
          $('.medic__panel').removeData('bs.collapse').collapse({
            parent: '',
            toggle: false
          }).collapse('show').removeData('bs.collapse').collapse({
            parent: '#medicAccordion',
            toggle: false
          });
        } else {
          btn.removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
          $('.medic__panel').removeData('bs.collapse').collapse({
            parent: '',
            toggle: false
          }).collapse('hide').removeData('bs.collapse').collapse({
            parent: '#medicAccordion',
            toggle: false
          });
        }
      });
    }
  }]);

  return Medic;
}(); // module.exports = Medic