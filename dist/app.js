(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T$ = void 0;

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var T$ = function T$(todos) {
  return new ToDoListInit(todos);
};

exports.T$ = T$;
var DefaultToDos = [{
  id: 1,
  title: 'Write Documentation for Innovator',
  status: 'Not Started'
}, {
  id: 2,
  title: 'Train Devs on DevOps',
  status: 'In Progress'
}, {
  id: 3,
  title: 'Add Video widget to templates',
  status: 'Done'
}, {
  id: 4,
  title: 'Add service finder to templates',
  status: 'Not Started'
}]; //set has some special functions that make it nice for validation etc.

var Statuses = new Set(['Not Started', 'In Progress', 'Done']);

var ToDoList =
/*#__PURE__*/
function () {
  function ToDoList() {
    _classCallCheck(this, ToDoList);

    _defineProperty(this, "_sortOrder", 'id');
  }

  _createClass(ToDoList, [{
    key: "buildStatus",
    value: function buildStatus(status) {
      this.validateStatus(status);
      var statusSelect = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Statuses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;
          statusSelect += '<option';

          if (status === i) {
            statusSelect += ' selected';
          }

          statusSelect += "> ".concat(i, " </option>");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return statusSelect;
    }
  }, {
    key: "validateStatus",
    value: function validateStatus(status) {
      if (!Statuses.has(status)) {
        throw "invalid status:  ".concat(status);
      }

      return this;
    }
  }, {
    key: "setupSummary",
    value: function setupSummary() {
      var total = this.todos.length;
      var todosDone = this.todos.filter(function (o) {
        return o.status === 'Done';
      }).length;
      var todosInProgress = this.todos.filter(function (o) {
        return o.status === 'In Progress';
      }).length;
      var todosNotStarted = this.todos.filter(function (o) {
        return o.status === 'Not Started';
      }).length;
      var totalText = "";
      var summaryText = "".concat(todosDone, " Done<br> ").concat(todosInProgress, " In Progress<br> ").concat(todosNotStarted, " Not Started<br>");

      if (total < 1) {
        totalText = "No Todos to display";
      } else if (total === 1) {
        totalText = "1 todo";
      } else {
        totalText = "".concat(total, " todos");
      }

      $('.to-do-total').html(totalText);
      $('.to-do-breakdown').html(summaryText);
    }
  }, {
    key: "setupList",
    value: function setupList() {
      if (!$) {
        throw 'jQuery not  loaded';
      }

      this.sortToDoList();
      this.setupSummary();
      $('.current-list').empty();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.todos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;
          //i is an object, can destructure objects
          var id = i.id,
              title = i.title,
              status = i.status;
          $('.current-list').append("<li class=\"".concat(status.split(' ').join(''), " \">").concat(title, " <select class=\"status-todo\" data-id=\"").concat(id, "\">").concat(this.buildStatus(status), "</select><input type=\"button\" value=\"delete\" class=\"delete-todo\" data-id=\"").concat(id, "\"></li>"));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
  }, {
    key: "sortToDoList",
    value: function sortToDoList() {
      var _this = this;

      this.todos.sort(function (a, b) {
        if (_this._sortOrder === 'id') {
          a = a.id;
          b = b.id;
          return a < b ? -1 : a > b ? 1 : 0;
        } else if (_this._sortOrder === 'title') {
          a = a.title.toLowerCase();
          b = b.title.toLowerCase();
          return a < b ? -1 : a > b ? 1 : 0;
        } else if (_this._sortOrder === 'status') {
          a = a.status;
          b = b.status; //custom sort order for status: Not Started, In Progress, Done

          if (a === 'Not Started') {
            return -1;
          }

          if (a === 'Done') {
            return +1;
          }

          if (b === 'Not Started') {
            return +1;
          }

          if (b === 'Done') {
            return -1;
          }

          return a - b;
        }
      });
    }
  }, {
    key: "findToDo",
    value: function findToDo(item) {
      //used for deleting and changing status
      if (!item) {
        throw 'no item provided';
      }

      if (_typeof(item) === 'object') {
        item = $(item.target).attr('data-id');
      } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.todos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var i = _step3.value;

            if (i.title === item) {
              item = i.id;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      var itemIndex = this.todos.findIndex(function (o) {
        return o.id == item;
      });

      if (itemIndex < 0) {
        throw 'item not found';
      }

      return itemIndex;
    }
  }, {
    key: "addToDo",
    value: function addToDo() {
      var newTodo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('#new-todo').val();
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Not Started';

      if (newTodo) {
        this.validateStatus(status); //... spreads the resulting array into individual parameters which is what "max" requires
        //map creates a new array. o represents each item in the old array so o.id returns the id of each object in the original array

        var maxID = Math.max.apply(Math, _toConsumableArray(this.todos.map(function (o) {
          return o.id;
        })));
        newTodo = {
          id: maxID + 1,
          title: newTodo,
          status: status //... spreads the existing this.todos into individual values for the new array.

        };
        this.todos = [].concat(_toConsumableArray(this.todos), [newTodo]);
        this.setupList();
      } else {
        throw "no New Todo to add";
      }

      return this;
    }
  }, {
    key: "deleteToDo",
    value: function deleteToDo(item) {
      var itemIndex = this.findToDo(item);
      this.todos.splice(itemIndex, 1);
      this.setupList();
      return this;
    }
  }, {
    key: "changeStatus",
    value: function changeStatus(item, status) {
      this.validateStatus(status);
      var itemIndex = this.findToDo(item);
      this.todos[itemIndex].status = status;
      this.setupList();
      return this;
    }
  }, {
    key: "sortOrder",
    set: function set(reorderBy) {
      this._sortOrder = reorderBy;
      this.setupList();
    }
  }]);

  return ToDoList;
}();

;

var ToDoListInit =
/*#__PURE__*/
function (_ToDoList) {
  _inherits(ToDoListInit, _ToDoList);

  function ToDoListInit() {
    var _this2;

    var todos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultToDos;

    _classCallCheck(this, ToDoListInit);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ToDoListInit).call(this));
    _this2.todos = todos;

    _this2.setupList();

    return _this2;
  }

  return ToDoListInit;
}(ToDoList);

},{}],2:[function(require,module,exports){
"use strict";

var _Greetr = require("./Greetr");

var T = (0, _Greetr.T$)().addToDo('Cuddle with the cat', 'Done').deleteToDo('Add service finder to templates').changeStatus('Write Documentation for Innovator', 'In Progress');
$('#add-todo').click(function () {
  return T.addToDo();
}); //using "on" instead of click/change allows events to be applied to items that are added to the dom later.

$('.current-list').on('click', '.delete-todo', function (e) {
  return T.deleteToDo(e);
});
$('#to-do-sort').change(function () {
  return T.sortOrder = $('#to-do-sort').val();
}); //target more useful than .currentTarget

$('.current-list').on('change', '.status-todo', function (e) {
  return T.changeStatus(e, e.target.value);
});
/*

[
    {
        title:'Play with Ponies',
        status: 'Not Started'
    },
    {
        title:'Watch Football',
        status: 'Not Started'
    },
    {
        title:'Drink Coffee',
        status: 'Done'
    }
]*/

},{"./Greetr":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zcmMvR3JlZXRyLmpzIiwiLi4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU8sSUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFLLENBQUEsS0FBSztBQUFBLFNBQUssSUFBSSxZQUFKLENBQWlCLEtBQWpCLENBQUw7QUFBQSxDQUFoQjs7O0FBQ1AsSUFBSSxZQUFZLEdBQUcsQ0FDZjtBQUNJLEVBQUEsRUFBRSxFQUFFLENBRFI7QUFFSSxFQUFBLEtBQUssRUFBRSxtQ0FGWDtBQUdJLEVBQUEsTUFBTSxFQUFFO0FBSFosQ0FEZSxFQU1mO0FBQ0ksRUFBQSxFQUFFLEVBQUUsQ0FEUjtBQUVJLEVBQUEsS0FBSyxFQUFFLHNCQUZYO0FBR0ksRUFBQSxNQUFNLEVBQUU7QUFIWixDQU5lLEVBV2Y7QUFDSSxFQUFBLEVBQUUsRUFBRSxDQURSO0FBRUksRUFBQSxLQUFLLEVBQUUsK0JBRlg7QUFHSSxFQUFBLE1BQU0sRUFBRTtBQUhaLENBWGUsRUFnQmY7QUFDSSxFQUFBLEVBQUUsRUFBRSxDQURSO0FBRUksRUFBQSxLQUFLLEVBQUUsaUNBRlg7QUFHSSxFQUFBLE1BQU0sRUFBRTtBQUhaLENBaEJlLENBQW5CLEMsQ0FzQkE7O0FBQ0EsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFKLENBQVEsQ0FBQyxhQUFELEVBQWdCLGFBQWhCLEVBQStCLE1BQS9CLENBQVIsQ0FBZjs7SUFFTSxROzs7Ozs7d0NBQ1csSTs7Ozs7Z0NBQ0EsTSxFQUFRO0FBQ2pCLFdBQUssY0FBTCxDQUFvQixNQUFwQjtBQUNBLFVBQUksWUFBWSxHQUFHLEVBQW5CO0FBRmlCO0FBQUE7QUFBQTs7QUFBQTtBQUdqQiw2QkFBYyxRQUFkLDhIQUF3QjtBQUFBLGNBQWYsQ0FBZTtBQUNwQixVQUFBLFlBQVksSUFBSSxTQUFoQjs7QUFDQSxj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RCxDQUFtQixFQUFuQixDQUFzQixPQUF0QixFQUErQixjQUEvQixFQUErQyxVQUFBLENBQUM7QUFBQSxTQUFLLENBQUMsQ0FBQyxVQUFGLENBQWEsQ0FBYixDQUFMO0FBQUEsQ0FBaEQ7QUFDQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLE1BQWpCLENBQXdCO0FBQUEsU0FBTyxDQUFDLENBQUMsU0FBRixHQUFjLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsRUFBckI7QUFBQSxDQUF4QixFLENBQ0E7O0FBQ0EsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixFQUFuQixDQUFzQixRQUF0QixFQUFnQyxjQUFoQyxFQUFnRCxVQUFBLENBQUM7QUFBQSxTQUFJLENBQUMsQ0FBQyxZQUFGLENBQWUsQ0FBZixFQUFrQixDQUFDLENBQUMsTUFBRixDQUFTLEtBQTNCLENBQUo7QUFBQSxDQUFqRDtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNvbnN0IFQkID0gdG9kb3MgPT4gIG5ldyBUb0RvTGlzdEluaXQodG9kb3MpO1xyXG5sZXQgRGVmYXVsdFRvRG9zID0gW1xyXG4gICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHRpdGxlOiAnV3JpdGUgRG9jdW1lbnRhdGlvbiBmb3IgSW5ub3ZhdG9yJyxcclxuICAgICAgICBzdGF0dXM6ICdOb3QgU3RhcnRlZCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgdGl0bGU6ICdUcmFpbiBEZXZzIG9uIERldk9wcycsXHJcbiAgICAgICAgc3RhdHVzOiAnSW4gUHJvZ3Jlc3MnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAzLFxyXG4gICAgICAgIHRpdGxlOiAnQWRkIFZpZGVvIHdpZGdldCB0byB0ZW1wbGF0ZXMnLFxyXG4gICAgICAgIHN0YXR1czogJ0RvbmUnXHJcbiAgICB9LFxyXG4gICAgeyAgIFxyXG4gICAgICAgIGlkOiA0LFxyXG4gICAgICAgIHRpdGxlOiAnQWRkIHNlcnZpY2UgZmluZGVyIHRvIHRlbXBsYXRlcycsXHJcbiAgICAgICAgc3RhdHVzOiAnTm90IFN0YXJ0ZWQnXHJcbiAgICB9XHJcbl07XHJcbi8vc2V0IGhhcyBzb21lIHNwZWNpYWwgZnVuY3Rpb25zIHRoYXQgbWFrZSBpdCBuaWNlIGZvciB2YWxpZGF0aW9uIGV0Yy5cclxubGV0IFN0YXR1c2VzID0gbmV3IFNldChbJ05vdCBTdGFydGVkJywgJ0luIFByb2dyZXNzJywgJ0RvbmUnXSk7XHJcblxyXG5jbGFzcyBUb0RvTGlzdCB7XHJcbiAgICBfc29ydE9yZGVyID0gJ2lkJztcclxuICAgIGJ1aWxkU3RhdHVzIChzdGF0dXMpIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlU3RhdHVzKHN0YXR1cyk7XHJcbiAgICAgICAgbGV0IHN0YXR1c1NlbGVjdCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgb2YgU3RhdHVzZXMpIHtcclxuICAgICAgICAgICAgc3RhdHVzU2VsZWN0ICs9ICc8b3B0aW9uJztcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09PSBpKXtcclxuICAgICAgICAgICAgICAgIHN0YXR1c1NlbGVjdCArPSAnIHNlbGVjdGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGF0dXNTZWxlY3QgKz0gYD4gJHtpfSA8L29wdGlvbj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhdHVzU2VsZWN0O1xyXG4gICAgfTtcclxuICAgIHZhbGlkYXRlU3RhdHVzIChzdGF0dXMpIHtcclxuICAgICAgICBpZiAoIVN0YXR1c2VzLmhhcyhzdGF0dXMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGBpbnZhbGlkIHN0YXR1czogICR7c3RhdHVzfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIHNldHVwU3VtbWFyeSgpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSB0aGlzLnRvZG9zLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG9kb3NEb25lID0gdGhpcy50b2Rvcy5maWx0ZXIobyA9PiBvLnN0YXR1cyA9PT0gJ0RvbmUnKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHRvZG9zSW5Qcm9ncmVzcyA9IHRoaXMudG9kb3MuZmlsdGVyKG8gPT4gby5zdGF0dXMgPT09ICdJbiBQcm9ncmVzcycpLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG9kb3NOb3RTdGFydGVkID0gdGhpcy50b2Rvcy5maWx0ZXIobyA9PiBvLnN0YXR1cyA9PT0gJ05vdCBTdGFydGVkJykubGVuZ3RoO1xyXG4gICAgICAgIGxldCB0b3RhbFRleHQ9XCJcIjtcclxuICAgICAgICBsZXQgc3VtbWFyeVRleHQgPSBgJHt0b2Rvc0RvbmV9IERvbmU8YnI+ICR7dG9kb3NJblByb2dyZXNzfSBJbiBQcm9ncmVzczxicj4gJHt0b2Rvc05vdFN0YXJ0ZWR9IE5vdCBTdGFydGVkPGJyPmA7XHJcbiAgICAgICAgaWYodG90YWwgPCAxKSB7XHJcbiAgICAgICAgICAgdG90YWxUZXh0ID0gXCJObyBUb2RvcyB0byBkaXNwbGF5XCI7IFxyXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWwgPT09IDEgKSB7XHJcbiAgICAgICAgICAgIHRvdGFsVGV4dD1cIjEgdG9kb1wiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvdGFsVGV4dD1gJHt0b3RhbH0gdG9kb3NgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcudG8tZG8tdG90YWwnKS5odG1sKHRvdGFsVGV4dCk7XHJcbiAgICAgICAgJCgnLnRvLWRvLWJyZWFrZG93bicpLmh0bWwoc3VtbWFyeVRleHQpO1xyXG4gICAgfTtcclxuICAgIHNldHVwTGlzdCAoKSB7XHJcbiAgICAgICAgaWYgKCEkKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdqUXVlcnkgbm90ICBsb2FkZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuc29ydFRvRG9MaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFN1bW1hcnkoKTtcclxuICAgICAgICAkKCcuY3VycmVudC1saXN0JykuZW1wdHkoKTtcclxuICAgICAgICBmb3IgKGxldCBpIG9mIHRoaXMudG9kb3MpIHtcclxuICAgICAgICAgICAgLy9pIGlzIGFuIG9iamVjdCwgY2FuIGRlc3RydWN0dXJlIG9iamVjdHNcclxuICAgICAgICAgICAgbGV0IHtpZCwgdGl0bGUsIHN0YXR1c30gPSBpO1xyXG4gICAgICAgICAgICAkKCcuY3VycmVudC1saXN0JykuYXBwZW5kKGA8bGkgY2xhc3M9XCIke3N0YXR1cy5zcGxpdCgnICcpLmpvaW4oJycpfSBcIj4ke3RpdGxlfSA8c2VsZWN0IGNsYXNzPVwic3RhdHVzLXRvZG9cIiBkYXRhLWlkPVwiJHtpZH1cIj4ke3RoaXMuYnVpbGRTdGF0dXMoc3RhdHVzKX08L3NlbGVjdD48aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiZGVsZXRlXCIgY2xhc3M9XCJkZWxldGUtdG9kb1wiIGRhdGEtaWQ9XCIke2lkfVwiPjwvbGk+YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgc29ydFRvRG9MaXN0ICgpIHtcclxuICAgICAgICB0aGlzLnRvZG9zLnNvcnQoKGEsYikgPT4ge1xyXG4gICAgICAgICAgIGlmKHRoaXMuX3NvcnRPcmRlciA9PT0gJ2lkJykge1xyXG4gICAgICAgICAgICAgICAgYSA9IGEuaWQ7XHJcbiAgICAgICAgICAgICAgICBiID0gYi5pZDtcclxuICAgICAgICAgICAgICAgcmV0dXJuIGE8YiA/IC0xIDogYT5iID8gMSA6IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc29ydE9yZGVyID09PSAndGl0bGUnKXtcclxuICAgICAgICAgICAgICAgIGEgPSBhLnRpdGxlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBiID0gYi50aXRsZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGE8YiA/IC0xIDogYT5iID8gMSA6IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc29ydE9yZGVyID09PSAnc3RhdHVzJyl7XHJcbiAgICAgICAgICAgICAgICBhID0gYS5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBiID0gYi5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAvL2N1c3RvbSBzb3J0IG9yZGVyIGZvciBzdGF0dXM6IE5vdCBTdGFydGVkLCBJbiBQcm9ncmVzcywgRG9uZVxyXG4gICAgICAgICAgICAgICAgaWYgKGEgPT09ICdOb3QgU3RhcnRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgaWYgKGEgPT09ICdEb25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiArMTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBpZiAoYiA9PT0gJ05vdCBTdGFydGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiArMTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBpZiAoYiA9PT0gJ0RvbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIHNldCBzb3J0T3JkZXIgKHJlb3JkZXJCeSkge1xyXG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHJlb3JkZXJCeTsgXHJcbiAgICAgICAgdGhpcy5zZXR1cExpc3QgKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbmRUb0RvIChpdGVtKSB7XHJcbiAgICAgICAgLy91c2VkIGZvciBkZWxldGluZyBhbmQgY2hhbmdpbmcgc3RhdHVzXHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdubyBpdGVtIHByb3ZpZGVkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSAkKGl0ZW0udGFyZ2V0KS5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBvZiB0aGlzLnRvZG9zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS50aXRsZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBpLmlkOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMudG9kb3MuZmluZEluZGV4KG8gPT4gby5pZCA9PSBpdGVtKTtcclxuICAgICAgICBpZihpdGVtSW5kZXggPCAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyAnaXRlbSBub3QgZm91bmQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbUluZGV4O1xyXG4gICAgfVxyXG4gICAgYWRkVG9EbyAobmV3VG9kbyA9ICQoJyNuZXctdG9kbycpLnZhbCgpLCBzdGF0dXMgPSAnTm90IFN0YXJ0ZWQnKSB7XHJcbiAgICAgICAgaWYgKG5ld1RvZG8pIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVN0YXR1cyhzdGF0dXMpO1xyXG4gICAgICAgICAgICAvLy4uLiBzcHJlYWRzIHRoZSByZXN1bHRpbmcgYXJyYXkgaW50byBpbmRpdmlkdWFsIHBhcmFtZXRlcnMgd2hpY2ggaXMgd2hhdCBcIm1heFwiIHJlcXVpcmVzXHJcbiAgICAgICAgICAgIC8vbWFwIGNyZWF0ZXMgYSBuZXcgYXJyYXkuIG8gcmVwcmVzZW50cyBlYWNoIGl0ZW0gaW4gdGhlIG9sZCBhcnJheSBzbyBvLmlkIHJldHVybnMgdGhlIGlkIG9mIGVhY2ggb2JqZWN0IGluIHRoZSBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAgICAgICBsZXQgbWF4SUQgPSBNYXRoLm1heCguLi50aGlzLnRvZG9zLm1hcChvID0+IG8uaWQpKTtcclxuICAgICAgICAgICAgbmV3VG9kbyA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBtYXhJRCArIDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbmV3VG9kbyxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vLi4uIHNwcmVhZHMgdGhlIGV4aXN0aW5nIHRoaXMudG9kb3MgaW50byBpbmRpdmlkdWFsIHZhbHVlcyBmb3IgdGhlIG5ldyBhcnJheS5cclxuICAgICAgICAgICAgdGhpcy50b2RvcyA9IFsuLi50aGlzLnRvZG9zLCBuZXdUb2RvXTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cExpc3QgKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IFwibm8gTmV3IFRvZG8gdG8gYWRkXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBkZWxldGVUb0RvIChpdGVtKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMuZmluZFRvRG8gKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMudG9kb3Muc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5zZXR1cExpc3QgKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgY2hhbmdlU3RhdHVzIChpdGVtLCBzdGF0dXMpIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRlU3RhdHVzKHN0YXR1cyk7XHJcbiAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMuZmluZFRvRG8gKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMudG9kb3NbaXRlbUluZGV4XS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgdGhpcy5zZXR1cExpc3QgKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuY2xhc3MgVG9Eb0xpc3RJbml0IGV4dGVuZHMgVG9Eb0xpc3QgeyAgXHJcbiAgICBjb25zdHJ1Y3RvciAodG9kb3MgPSBEZWZhdWx0VG9Eb3MpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudG9kb3MgPSB0b2RvczsgXHJcbiAgICAgICAgdGhpcy5zZXR1cExpc3QoKTtcclxuICAgIH07XHJcbn0iLCJpbXBvcnQge1QkfSBmcm9tICcuL0dyZWV0cic7XHJcblxyXG52YXIgVCA9IFQkKCkuYWRkVG9EbygnQ3VkZGxlIHdpdGggdGhlIGNhdCcsICdEb25lJykuZGVsZXRlVG9EbygnQWRkIHNlcnZpY2UgZmluZGVyIHRvIHRlbXBsYXRlcycpLmNoYW5nZVN0YXR1cygnV3JpdGUgRG9jdW1lbnRhdGlvbiBmb3IgSW5ub3ZhdG9yJywgJ0luIFByb2dyZXNzJyk7XHJcbiQoJyNhZGQtdG9kbycpLmNsaWNrKCgpPT4gVC5hZGRUb0RvKCkpO1xyXG4vL3VzaW5nIFwib25cIiBpbnN0ZWFkIG9mIGNsaWNrL2NoYW5nZSBhbGxvd3MgZXZlbnRzIHRvIGJlIGFwcGxpZWQgdG8gaXRlbXMgdGhhdCBhcmUgYWRkZWQgdG8gdGhlIGRvbSBsYXRlci5cclxuJCgnLmN1cnJlbnQtbGlzdCcpLm9uKCdjbGljaycsICcuZGVsZXRlLXRvZG8nLCBlID0+ICBULmRlbGV0ZVRvRG8oZSkpO1xyXG4kKCcjdG8tZG8tc29ydCcpLmNoYW5nZSgoKSA9PiAgVC5zb3J0T3JkZXIgPSAkKCcjdG8tZG8tc29ydCcpLnZhbCgpKTsgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vdGFyZ2V0IG1vcmUgdXNlZnVsIHRoYW4gLmN1cnJlbnRUYXJnZXRcclxuJCgnLmN1cnJlbnQtbGlzdCcpLm9uKCdjaGFuZ2UnLCAnLnN0YXR1cy10b2RvJywgZSA9PiBULmNoYW5nZVN0YXR1cyhlLCBlLnRhcmdldC52YWx1ZSkpO1xyXG4vKlxyXG5cclxuW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOidQbGF5IHdpdGggUG9uaWVzJyxcclxuICAgICAgICBzdGF0dXM6ICdOb3QgU3RhcnRlZCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6J1dhdGNoIEZvb3RiYWxsJyxcclxuICAgICAgICBzdGF0dXM6ICdOb3QgU3RhcnRlZCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6J0RyaW5rIENvZmZlZScsXHJcbiAgICAgICAgc3RhdHVzOiAnRG9uZSdcclxuICAgIH1cclxuXSovIl19
