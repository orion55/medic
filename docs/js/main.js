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
                this.save(this.optimize(result));
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
  }, {
    key: "optimize",
    value: function optimize(data) {
      var info = data.LPU;
      info.forEach(function (elem) {
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
      return {
        'LPU': info
      };
    }
  }]);

  return LocalSt;
}();
"use strict";

$(document).ready(function () {
  var local = new LocalSt();
  new Medic({
    idMedic: 'medicId',
    storage: local
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

    if (this.checkIdMedic(options) && this.checkStorage(options)) {
      this.init(options);
    }
  }

  _createClass(Medic, [{
    key: "checkIdMedic",
    value: function checkIdMedic(options) {
      if ('idMedic' in options) {
        this.medicForm = $('#' + options.idMedic);

        if (this.medicForm.length !== 0) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "checkStorage",
    value: function checkStorage(options) {
      if ('storage' in options) {
        if (typeof options.storage != 'undefined') {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(options) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.storage = options.storage;
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
                this.creatingData();
                this.displayHead();
                this.dispalayAccordion();
                this.chevron();
                this.allDown();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "creatingData",
    value: function creatingData() {
      this.treeData = _(this.info).groupBy('hid').value();
      this.headers = [];

      for (var prop in this.treeData) {
        if (this.treeData.hasOwnProperty(prop)) {
          if (prop !== 'null') {
            var obj = _.find(this.info, {
              'id': prop
            });

            this.headers.push(obj);
            var arr = this.treeData['null'];
            arr.splice(_.findIndex(arr, {
              'id': prop
            }), 1);
            this.treeData['null'] = arr;
          }
        }
      }

      for (var _prop in this.treeData) {
        if (this.treeData.hasOwnProperty(_prop)) {
          var _arr = this.treeData[_prop];
          _arr = _.sortBy(_arr, ['full_name']);
          this.treeData[_prop] = _arr;
        }
      }

      this.headers = _.sortBy(this.headers, ['full_name']);
    }
  }, {
    key: "displayHead",
    value: function displayHead() {
      this.medicForm.prepend("<div class=\"medic__control-panel\">\n                <button type=\"button\" class=\"btn btn-info\" id=\"medicAdd\"\n                        title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C\"><i class=\"fas fa-plus\"></i></button>\n                <button type=\"button\" class=\"btn btn-info\" id=\"medicAllDown\"\n                        title=\"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C\\\u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0451\"><i\n                        class=\"fas fa-angle-double-down\"></i></button>\n                <button type=\"button\" class=\"btn btn-info\" id=\"medicJson\"\n                        title=\"\u0421\u043A\u0430\u0447\u0430\u0442\u044C json\"><i\n                        class=\"fas fa-download\"></i></button>\n            </div>\n            <table class=\"table table-hover table-bordered medic__table\">\n                <thead>\n                <tr>\n                    <th scope=\"col\" class=\"medic-col-1\">\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435</th>\n                    <th scope=\"col\" class=\"medic-col-2\">\u0410\u0434\u0440\u0435\u0441</th>\n                    <th scope=\"col\" class=\"medic-col-3\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</th>\n                </tr>\n                </thead>\n            </table>\n            <div class=\"accordion\" id=\"medicAccordion\"></div>");
    }
  }, {
    key: "dispalayAccordion",
    value: function dispalayAccordion() {
      var _this = this;

      this.medicAccordion = $('#medicAccordion');
      this.headers.forEach(function (elem) {
        _this.displayCard(elem.id);
      });
      this.displayCard(null);
    }
  }, {
    key: "displayCard",
    value: function displayCard(id) {
      var obj;

      if (id !== null) {
        obj = _.find(this.headers, {
          'id': id
        });
      } else {
        obj = {
          'full_name': 'Без категории',
          'address': null,
          'phone': null
        };
      }

      this.medicAccordion.append("<div class=\"card\" id=\"card-".concat(id, "\">\n        <div class=\"card-header medic__header medic__card\" id=\"heading-").concat(id, "\">\n            <table class=\"table table-hover table-bordered medic__table medic__header\">\n                <tr class=\"mb-0 medic__title-card\" data-toggle=\"collapse\"\n                    data-target=\"#collapse-").concat(id, "\" aria-expanded=\"true\"\n                    aria-controls=\"collapse-").concat(id, "\">\n                    <td class=\"medic-col-1\">\n                        <i class=\"fas fa-chevron-down medic__fas\"></i>").concat(obj.full_name !== null ? obj.full_name : '', "\n                    </td>\n                    <td class=\"medic-col-2\">").concat(obj.address !== null ? obj.address : '', "</td>\n                    <td class=\"medic-col-3\">").concat(obj.phone !== null ? obj.phone : '', "</td>\n                </tr>\n            </table>\n        </div>"));
      this.displayCardBody(id);
      this.medicAccordion.last("</div>");
    }
  }, {
    key: "displayCardBody",
    value: function displayCardBody(hid) {
      var arr = this.treeData[hid];
      var curCard = $("#card-".concat(hid));
      curCard.append("<div id=\"collapse-".concat(hid, "\" class=\"medic__panel collapse show\"\n             aria-labelledby=\"heading-").concat(hid, "\"\n             data-parent=\"#medicAccordion\">\n            <div class=\"card-body medic__card\">\n                <table class=\"table table-hover table-bordered medic__table\" id=\"table-").concat(hid, "\">"));
      var curTable = $("#table-".concat(hid));
      arr.forEach(function (elem) {
        curTable.append("<tr>\n                        <td class=\"medic-col-1\">".concat(elem.full_name !== null ? elem.full_name : '', "</td>\n                        <td class=\"medic-col-2\">").concat(elem.address !== null ? elem.address : '', "</td>\n                        <td class=\"medic-col-3\">").concat(elem.phone !== null ? elem.phone : '', "</td>\n                    </tr>"));
      });
      curCard.last("</table>\n            </div>\n        </div>");
    }
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