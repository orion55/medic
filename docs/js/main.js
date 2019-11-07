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
        var value, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = localStorage.getItem('json');

                if (value) {
                  _context.next = 16;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return $.get('json/lpu.json');

              case 5:
                result = _context.sent;
                this.save(result);
                return _context.abrupt("return", result);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(_context.t0.statusText));
                return _context.abrupt("return", null);

              case 14:
                _context.next = 17;
                break;

              case 16:
                return _context.abrupt("return", value ? JSON.parse(value) : null);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.storage = new LocalSt();
                _context.next = 3;
                return this.storage.load();

              case 3:
                data = _context.sent;

                if (!(data === null)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", false);

              case 8:
                this.info = data.LPU;

              case 9:
                this.info.forEach(function (elem) {
                  if (elem.full_name !== null) {
                    elem.full_name = elem.full_name.replace(/<[^>]+>/g, '').trim();
                  }

                  if (elem.address !== null) {
                    elem.address = elem.address.trim();
                  }

                  if (elem.phone !== null) {
                    elem.phone = elem.phone.trim();
                  }
                });
                console.log(_(this.info).groupBy('hid').value()); // console.log(this.info)

                this.chevron();
                this.allDown();

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "chevron",
    value: function chevron() {
      $('.collapse.show').each(function () {
        $(this).prev('.card-header').find('.fas').addClass('fa-chevron-up').removeClass('fa-chevron-down');
      });
      $('.collapse').on('show.bs.collapse', function () {
        $(this).prev('.card-header').find('.fas').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }).on('hide.bs.collapse', function () {
        $(this).prev('.card-header').find('.fas').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      });
    }
  }, {
    key: "allDown",
    value: function allDown() {
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
}();