/**
 * Created by poovarasanv on 02-02-2016.
 */
/*
 LumX v0.3.96
 (c) 2014-2015 LumApps http://ui.lumapps.com
 License: MIT
 */
angular.module("lumx.utils", ["lumx.utils.event-scheduler", "lumx.utils.transclude", "lumx.utils.transclude-replace", "lumx.utils.utils"]), angular.module("lumx", ["lumx.button", "lumx.checkbox", "lumx.date-picker", "lumx.dialog", "lumx.dropdown", "lumx.fab", "lumx.file-input", "lumx.notification", "lumx.progress", "lumx.radio-button", "lumx.ripple", "lumx.scrollbar", "lumx.search-filter", "lumx.select", "lumx.switch", "lumx.tabs", "lumx.text-field", "lumx.thumbnail", "lumx.tooltip", "lumx.utils"]), angular.module("lumx.utils.event-scheduler", []).service("LxEventSchedulerService", ["$document", "LxUtils", function (e, n) {
    function t(e) {
        var n = o[e.type];
        if (angular.isDefined(n))for (var t = 0, l = n.length; l > t; t++) {
            var i = n[t];
            if (angular.isDefined(i) && angular.isDefined(i.callback) && angular.isFunction(i.callback) && (i.callback(e), e.isPropagationStopped()))break
        }
    }

    function l(l, i) {
        var r = {eventName: l, callback: i}, c = n.generateUUID();
        return a[c] = r, angular.isUndefined(o[l]) && (o[l] = [], e.on(l, t)), o[l].unshift(a[c]), c
    }

    function i(n) {
        var l = !1, i = a[n];
        if (angular.isDefined(i) && angular.isDefined(o[i.eventName])) {
            var r = o[i.eventName].indexOf(i);
            angular.isDefined(r) && r > -1 && (o[i.eventName].splice(r, 1), delete a[n], l = !0), 0 === o[i.eventName].length && (delete o[i.eventName], e.off(i.eventName, t))
        }
        return l
    }

    var a = {}, o = {};
    return {register: l, unregister: i}
}]), angular.module("lumx.utils.transclude-replace", []).directive("ngTranscludeReplace", ["$log", function (e) {
    return {
        terminal: !0, restrict: "EA", link: function (n, t, l, i, a) {
            return a ? void a(function (e) {
                e.length ? t.replaceWith(e) : t.remove()
            }) : void e.error("orphan", "Illegal use of ngTranscludeReplace directive in the template! No parent directive that requires a transclusion found. ")
        }
    }
}]), angular.module("lumx.utils.transclude", []).config(["$provide", function (e) {
    e.decorator("ngTranscludeDirective", ["$delegate", function (e) {
        return e.shift(), e
    }])
}]).directive("ngTransclude", function () {
    return {
        restrict: "EAC", link: function (e, n, t, l, i) {
            var a = t.ngTransclude || "sibling";
            switch (a) {
                case"sibling":
                    i(function (e) {
                        n.empty(), n.append(e)
                    });
                    break;
                case"parent":
                    i(e, function (e) {
                        n.empty(), n.append(e)
                    });
                    break;
                case"child":
                    var o = e.$new();
                    i(o, function (e) {
                        n.empty(), n.append(e), n.on("$destroy", function () {
                            o.$destroy()
                        })
                    });
                    break;
                default:
                    var r = parseInt(a);
                    if (!isNaN(r)) {
                        for (var c = e, s = 0; r > s && c.$parent; s++)c = c.$parent;
                        i(c, function (e) {
                            n.empty(), n.append(e)
                        })
                    }
            }
        }
    }
}), angular.module("lumx.utils.utils", []).service("LxUtils", function () {
    function e() {
        var e = (new Date).getTime(), n = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (n) {
            var t = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" == n ? t : 3 & t | 8).toString(16)
        });
        return n.toUpperCase()
    }

    return {generateUUID: e}
}), function () {
    "use strict";
    function e() {
        function e(e) {
            return angular.isDefined(e.href) || angular.isDefined(e.ngHref) || angular.isDefined(e.ngLink) || angular.isDefined(e.uiSref)
        }

        function n(n, t) {
            return e(t) ? "link.html" : "button.html"
        }

        function t(e, n, t, l) {
            var i = "btn", a = angular.isDefined(n) ? n : "m", o = angular.isDefined(t) ? t : "primary", r = angular.isDefined(l) ? l : "raised";
            e.removeAttr("class").addClass(i + " btn--" + a + " btn--" + o + " btn--" + r)
        }

        function l(e, n) {
            return t(e, n.lxSize, n.lxColor, n.lxType), function (e, n, l) {
                l.$observe("lxSize", function (e) {
                    t(n, e, l.lxColor, l.lxType)
                }), l.$observe("lxColor", function (e) {
                    t(n, l.lxSize, e, l.lxType)
                }), l.$observe("lxType", function (e) {
                    t(n, l.lxSize, l.lxColor, e)
                }), n.on("click", function (e) {
                    l.disabled === !0 && (e.preventDefault(), e.stopImmediatePropagation())
                })
            }
        }

        var i = {restrict: "E", templateUrl: n, compile: l, replace: !0, transclude: !0};
        return i
    }

    angular.module("lumx.button", []).directive("lxButton", e)
}(), function () {
    "use strict";
    function e() {
        var e = {
            restrict: "E",
            templateUrl: "checkbox.html",
            scope: {
                ngModel: "=",
                name: "@?",
                ngTrueValue: "@?",
                ngFalseValue: "@?",
                ngChange: "&?",
                ngDisabled: "=?",
                lxColor: "@?"
            },
            controller: n,
            controllerAs: "lxCheckbox",
            bindToController: !0,
            transclude: !0
        };
        return e
    }

    function n(e) {
        function n() {
            i(e.generateUUID()), a(!1), c.ngTrueValue = angular.isUndefined(c.ngTrueValue) ? !0 : c.ngTrueValue, c.ngFalseValue = angular.isUndefined(c.ngFalseValue) ? !1 : c.ngFalseValue, c.lxColor = angular.isUndefined(c.lxColor) ? "accent" : c.lxColor
        }

        function t() {
            return o
        }

        function l() {
            return r
        }

        function i(e) {
            o = e
        }

        function a(e) {
            r = e
        }

        var o, r, c = this;
        c.getCheckboxId = t, c.getCheckboxHasChildren = l, c.setCheckboxId = i, c.setCheckboxHasChildren = a, n()
    }

    function t() {
        function e(e, n, t, l) {
            l[0].setCheckboxHasChildren(!0), l[1].setCheckboxId(l[0].getCheckboxId())
        }

        var n = {
            restrict: "AE",
            require: ["^lxCheckbox", "^lxCheckboxLabel"],
            templateUrl: "checkbox-label.html",
            link: e,
            controller: l,
            controllerAs: "lxCheckboxLabel",
            bindToController: !0,
            transclude: !0,
            replace: !0
        };
        return n
    }

    function l() {
        function e() {
            return t
        }

        function n(e) {
            t = e
        }

        var t, l = this;
        l.getCheckboxId = e, l.setCheckboxId = n
    }

    function i() {
        var e = {
            restrict: "AE",
            require: "^lxCheckbox",
            templateUrl: "checkbox-help.html",
            transclude: !0,
            replace: !0
        };
        return e
    }

    angular.module("lumx.checkbox", []).directive("lxCheckbox", e).directive("lxCheckboxLabel", t).directive("lxCheckboxHelp", i), n.$inject = ["LxUtils"]
}(), angular.module("lumx.date-picker", []).controller("lxDatePickerController", ["$scope", "$timeout", "$window", function (e, n, t) {
    function l() {
        var n = [], t = angular.copy(e.activeDate).date(0), l = angular.copy(e.activeDate).date(1), i = angular.copy(l).endOf("month"), a = angular.copy(i).date();
        e.emptyFirstDays = [];
        for (var o = 0 === l.day() ? 6 : l.day() - 1; o > 0; o--)e.emptyFirstDays.push({});
        for (var r = 0; a > r; r++) {
            var c = angular.copy(t.add(1, "days"));
            c.selected = angular.isDefined(e.selected.model) && c.isSame(e.selected.date, "day"), c.today = c.isSame(moment(), "day"), n.push(c)
        }
        e.emptyLastDays = [];
        for (var s = 7 - (0 === i.day() ? 7 : i.day()); s > 0; s--)e.emptyLastDays.push({});
        e.days = n
    }

    var i, a, o, r, c, s = this;
    e.ctrlData = {isOpen: !1}, this.init = function (e, n) {
        a = e.find(".lx-date-picker"), r = e, c = angular.element(t), s.build(n, !1)
    }, this.build = function (n, t) {
        if (n !== i || t) {
            i = n, moment.locale(i), angular.isDefined(e.model) ? (e.selected = {
                model: moment(e.model).format("LL"),
                date: e.model
            }, e.activeDate = moment(e.model)) : (e.selected = {
                model: void 0,
                date: new Date
            }, e.activeDate = moment()), e.moment = moment, e.days = [], e.daysOfWeek = [moment.weekdaysMin(1), moment.weekdaysMin(2), moment.weekdaysMin(3), moment.weekdaysMin(4), moment.weekdaysMin(5), moment.weekdaysMin(6), moment.weekdaysMin(0)], e.years = [];
            for (var a = moment().year() - 100; a <= moment().year() + 100; a++)e.years.push(a);
            l()
        }
    }, e.previousMonth = function () {
        e.activeDate = e.activeDate.subtract(1, "month"), l()
    }, e.nextMonth = function () {
        e.activeDate = e.activeDate.add(1, "month"), l()
    }, e.select = function (n) {
        e.selected = {model: n.format("LL"), date: n.toDate()}, e.model = n.toDate(), l()
    }, e.selectYear = function (n) {
        e.yearSelection = !1, e.selected.model = moment(e.selected.date).year(n).format("LL"), e.selected.date = moment(e.selected.date).year(n).toDate(), e.model = moment(e.selected.date).toDate(), e.activeDate = e.activeDate.add(n - e.activeDate.year(), "year"), l()
    }, e.openPicker = function () {
        e.ctrlData.isOpen || (e.ctrlData.isOpen = !0, n(function () {
            e.yearSelection = !1, o = angular.element("<div/>", {"class": "lx-date-filter"}), o.appendTo("body").on("click", function () {
                e.closePicker()
            }), a.appendTo("body").show(), n(function () {
                o.addClass("lx-date-filter--is-shown"), a.addClass("lx-date-picker--is-shown")
            }, 100)
        }))
    }, e.closePicker = function () {
        e.ctrlData.isOpen && (o.removeClass("lx-date-filter--is-shown"), a.removeClass("lx-date-picker--is-shown"), c.off("resize"), n(function () {
            o.remove(), a.hide().appendTo(r), e.ctrlData.isOpen = !1
        }, 600))
    }, e.displayYearSelection = function () {
        e.yearSelection = !0, n(function () {
            var e = a.find(".lx-date-picker__year-selector"), n = e.find(".lx-date-picker__year--is-active");
            e.scrollTop(e.scrollTop() + n.position().top - e.height() / 2 + n.height() / 2)
        })
    }, e.clearDate = function () {
        e.model = void 0
    }
}]).directive("lxDatePicker", function () {
    return {
        restrict: "AE",
        controller: "lxDatePickerController",
        scope: {model: "=", label: "@", fixedLabel: "&", allowClear: "@", icon: "@"},
        templateUrl: "date-picker.html",
        link: function (e, n, t, l) {
            function i(e) {
                return e ? e : (null !== navigator.language ? navigator.language : navigator.browserLanguage).split("_")[0].split("-")[0] || "en"
            }

            l.init(n, i(t.locale)), t.$observe("locale", function () {
                l.build(i(t.locale), !1)
            }), e.$watch("model", function () {
                l.build(i(t.locale), !0)
            }), t.$observe("allowClear", function (n) {
                e.allowClear = !(!angular.isDefined(n) || "true" !== n)
            })
        }
    }
}), angular.module("lumx.dialog", ["lumx.utils.event-scheduler"]).service("LxDialogService", ["$rootScope", "$timeout", "$interval", "$window", "LxEventSchedulerService", function (e, n, t, l, i) {
    function a(e) {
        27 == e.keyCode && angular.isDefined(f) && S.close(f), e.stopPropagation()
    }

    function o(e) {
        if (!angular.isUndefined(p) || (g = D[e].lxDialogElement, p = g.find(".dialog__header"), x = g.find(".dialog__content"), h = g.find(".dialog__actions"), !angular.isUndefined(p))) {
            var n = 60, t = n + p.outerHeight() + x.outerHeight() + h.outerHeight();
            if (d !== t || u !== l.innerHeight)if (d = t, u = l.innerHeight, t >= l.innerHeight) {
                if (g.addClass("dialog--is-fixed"), 0 === g.find(".dialog__scrollable").length) {
                    var i = angular.element("<div/>", {"class": "dialog__scrollable"});
                    i.css({top: p.outerHeight(), bottom: h.outerHeight()}).on("scroll", r), x.wrap(i)
                }
            } else g.removeClass("dialog--is-fixed"), g.find(".dialog__scrollable").length > 0 && x.unwrap()
        }
    }

    function r() {
        angular.isUndefined(m) && (m = angular.element(".dialog__scrollable"), angular.isUndefined(m)) || angular.isDefined(D[f]) && angular.isDefined(D[f].lxDialogOnscrollend) && m.scrollTop() + m.innerHeight() >= m[0].scrollHeight && (D[f].lxDialogOnscrollend(), m.off("scroll", r), n(function () {
            m.on("scroll", r)
        }, 500))
    }

    var c, s, d, u, f, g, p, x, h, m, v, b, S = this, D = {};
    this.registerScope = function (e, n) {
        D[e] = n
    }, this.open = function (l) {
        f = l, e.$broadcast("lx-dialog__open-start", l), angular.element("body").css({overflow: "hidden"}), s = angular.element("<div/>", {"class": "dialog-filter"}), s.appendTo("body"), (angular.isUndefined(D[l].lxDialogAutoClose) || "true" === D[l].lxDialogAutoClose) && s.on("click", function () {
            S.close(l)
        }), (angular.isUndefined(D[l].lxDialogEscapeClose) || "true" === D[l].lxDialogEscapeClose) && (b = i.register("keyup", a)), D[l].lxDialogElement.appendTo("body").show(), n(function () {
            D[l].lxDialogIsOpened = !0, s.addClass("dialog-filter--is-shown"), D[l].lxDialogElement.addClass("dialog--is-shown"), n(function () {
                e.$broadcast("lx-dialog__open-end", l)
            }, 600)
        }, 100), c = t(function () {
            o(l)
        }, 500)
    }, this.close = function (l, a) {
        var o = function () {
            angular.isDefined(b) && n(function () {
                i.unregister(b), b = void 0
            }, 1), angular.element(".dialog__scrollable").off("scroll", r), f = void 0, e.$broadcast("lx-dialog__close-start", l), v && n.cancel(v), t.cancel(c), s.removeClass("dialog-filter--is-shown"), D[l].lxDialogElement.removeClass("dialog--is-shown"), D[l].lxDialogOnclose && D[l].lxDialogOnclose(), n(function () {
                angular.element("body").css({overflow: "visible"}), s.remove(), g = void 0, p = void 0, x = void 0, h = void 0, m = void 0, D[l].lxDialogElement.hide().removeClass("dialog--is-fixed").appendTo(D[l].lxDialogParent), D[l].lxDialogIsOpened = !1, d = void 0, e.$broadcast("lx-dialog__close-end", l)
            }, 600)
        };
        if (a || angular.isUndefined(D[l].lxDialogBeforeClose) || !angular.isFunction(D[l].lxDialogBeforeClose))o(); else {
            var u = D[l].lxDialogBeforeClose();
            angular.isObject(u) && angular.isDefined(u.then) ? u.then(o) : u && o()
        }
    }, angular.element(l).on("resize", function () {
        angular.isDefined(f) && (v && n.cancel(v), v = n(function () {
            o(f)
        }, 200))
    })
}]).controller("LxDialogController", ["$scope", "LxDialogService", function (e, n) {
    this.init = function (t, l) {
        e.lxDialogIsOpened = !1, e.lxDialogElement = t, e.lxDialogParent = t.parent(), n.registerScope(l, e)
    }
}]).directive("lxDialog", function () {
    return {
        restrict: "E",
        controller: "LxDialogController",
        scope: !0,
        template: '<div><div ng-if="lxDialogIsOpened" ng-transclude="child"></div></div>',
        replace: !0,
        transclude: !0,
        link: function (e, n, t, l) {
            t.$observe("id", function (e) {
                e && l.init(n, e)
            }), t.$observe("autoClose", function (n) {
                e.lxDialogAutoClose = n
            }), t.$observe("escapeClose", function (n) {
                e.lxDialogEscapeClose = n
            }), t.$observe("beforeClose", function (n) {
                e.lxDialogBeforeClose = function () {
                    return e.$eval(n)
                }
            }), t.$observe("onclose", function (n) {
                e.lxDialogOnclose = function () {
                    return e.$eval(n)
                }
            }), t.$observe("onscrollend", function (n) {
                e.lxDialogOnscrollend = function () {
                    return e.$eval(n)
                }
            })
        }
    }
}).directive("lxDialogClose", ["LxDialogService", function (e) {
    return {
        restrict: "A", scope: !0, link: function (n, t, l) {
            l.$observe("lxDialogClose", function (e) {
                n.lxDialogCloseSkipBefore = e
            }), t.on("click", function () {
                e.close(t.parents(".dialog").attr("id"), n.lxDialogCloseSkipBefore)
            })
        }
    }
}]), angular.module("lumx.dropdown", ["lumx.utils.event-scheduler"]).service("LxDropdownService", ["$timeout", "$document", "LxEventSchedulerService", function (e, n, t) {
    function l(e) {
        r || n.on("click", a), (angular.isUndefined(e.lxDropdownEscapeClose) || "true" === e.lxDropdownEscapeClose) && (e.idEventScheduler = t.register("keyup", o)), r && r !== e && (r.lxDropdownIsOpened = !1), r = e
    }

    function i(l) {
        r === l && (angular.isDefined(l.idEventScheduler) && e(function () {
            t.unregister(l.idEventScheduler), delete l.idEventScheduler, r = null
        }, 1), n.off("click", a))
    }

    function a() {
        r && r.$apply(function () {
            r.lxDropdownIsOpened = !1
        })
    }

    function o(e) {
        27 == e.keyCode && a(), e.stopPropagation()
    }

    var r = null;
    return {open: l, close: i}
}]).controller("LxDropdownController", ["$scope", "$timeout", "$window", "LxDropdownService", function (e, n, t, l) {
    function i() {
        e.lxDropdownIsDropped = !1, s()
    }

    function a() {
        e.lxDropdownIsDropped = !0, f.appendTo("body"), n(function () {
            r(), c()
        })
    }

    function o() {
        var n = angular.element(t).scrollTop(), l = u.offset().top - n, i = u.outerHeight(), a = f.outerHeight(), o = l, r = "to_bottom";
        return "true" === e.lxDropdownOverToggle ? l + a >= t.innerHeight && t.innerHeight - l + i / 2 < t.innerHeight / 2 && (r = "to_top", o = t.innerHeight - (o + i)) : angular.isDefined(e.lxDropdownOverToggle) || "true" !== e.lxDropdownFromTop ? l + i + a < t.innerHeight || t.innerHeight - l + i / 2 >= t.innerHeight / 2 ? o += i : (r = "to_top", o = t.innerHeight - o) : angular.isUndefined(e.lxDropdownOverToggle) && "true" === e.lxDropdownFromTop && l + a >= t.innerHeight && t.innerHeight - l < t.innerHeight / 2 && (r = "to_top"), {
            direction: r,
            originY: o + n
        }
    }

    function r() {
        var n = f.scrollTop();
        f.removeAttr("style"), f.css({opacity: 1});
        var l = f.outerWidth(), i = f.outerHeight(), a = angular.element(t).scrollTop(), r = u.offset().top - a, c = o();
        if (!p) {
            var s = l;
            angular.isDefined(e.lxDropdownWidth) && (s = "full" === e.lxDropdownWidth ? u.outerWidth() : u.outerWidth() + parseInt(e.lxDropdownWidth)), x = {
                left: "right" !== e.lxDropdownPosition ? u.offset().left : void 0,
                right: "right" === e.lxDropdownPosition ? t.innerWidth - u.offset().left - u.outerWidth() : void 0,
                width: s
            }, p = c.direction, "to_bottom" === p ? x.top = c.originY : x.bottom = c.originY
        }
        var d = angular.copy(x);
        "to_bottom" === p && r + i > t.innerHeight - 8 ? (d.overflow = "auto", d.height = t.innerHeight - 8 - r, "true" === e.lxDropdownOverToggle || !angular.isDefined(e.lxDropdownOverToggle) && "true" === e.lxDropdownFromTop || (d.height -= u.outerHeight()), f.scrollTop(n)) : "to_top" === p && (d.bottom = t.innerHeight - (r + a), "true" === e.lxDropdownOverToggle && (d.bottom -= u.outerHeight()), 8 > r + a - i && (d.overflow = "auto", d.height = r - 8, "true" === e.lxDropdownOverToggle && (d.height += u.outerHeight()), f.scrollTop(n))), f.css(d)
    }

    function c() {
        var n = f.outerWidth(), t = f.outerHeight();
        f.css({width: 0, height: 0, opacity: 1}), f.find(".dropdown-dropdownMenu__content").css({
            width: n,
            height: t
        }), f.velocity({width: n}, {
            duration: 200,
            easing: "easeOutQuint",
            queue: !1
        }), f.velocity({height: t}, {
            duration: 500, easing: "easeOutQuint", queue: !1, complete: function () {
                t === g ? f.css({height: "auto"}) : f.css({overflow: "auto"}), angular.isDefined(e.lxDropdownWidth) || f.css({width: "auto"}), f.find(".dropdown-menu__content").removeAttr("style")
            }
        }), u.addClass("dropdown--is-active")
    }

    function s() {
        f.velocity({width: 0, height: 0}, {
            duration: 200, easing: "easeOutQuint", complete: function () {
                f.appendTo(u).removeAttr("style"), u.removeClass("dropdown--is-active"), p = void 0
            }
        })
    }

    function d() {
        e.lxDropdownIsDropped && r()
    }

    var u, f, g, p, x;
    e.lxDropdownIsOpened = !1, e.lxDropdownIsDropped = !1, this.registerDropdown = function (n) {
        u = n, e.lxDropdownPosition = angular.isDefined(e.lxDropdownPosition) ? e.lxDropdownPosition : "left"
    }, this.registerDropdownMenu = function (e) {
        f = e
    }, this.toggle = function () {
        e.lxDropdownIsOpened = !e.lxDropdownIsOpened
    }, e.$watch("lxDropdownIsOpened", function (n) {
        n ? (a(), l.open(e)) : (i(), l.close(e))
    }), angular.element(t).on("resize", d), e.$on("$locationChangeSuccess", function () {
        e.lxDropdownIsOpened = !1
    }), e.$on("$destroy", function () {
        f.remove(), l.close(e)
    }), this.updatePositionAndSize = d
}]).directive("lxDropdown", function () {
    return {
        restrict: "E",
        controller: "LxDropdownController",
        templateUrl: "dropdown.html",
        transclude: !0,
        replace: !0,
        scope: !0,
        link: function (e, n, t, l) {
            l.registerDropdown(n), t.$observe("position", function (n) {
                e.lxDropdownPosition = n
            }), t.$observe("width", function (n) {
                e.lxDropdownWidth = n
            }), t.$observe("fromTop", function (n) {
                e.lxDropdownFromTop = n
            }), t.$observe("overToggle", function (n) {
                e.lxDropdownOverToggle = n
            }), t.$observe("escapeClose", function (n) {
                e.lxDropdownEscapeClose = n
            })
        }
    }
}).directive("lxDropdownToggle", function () {
    return {
        restrict: "AE",
        require: "^lxDropdown",
        templateUrl: "dropdown-toggle.html",
        replace: !0,
        transclude: !0,
        link: function (e, n, t, l) {
            n.on("click", function (n) {
                n.stopPropagation(), e.$apply(function () {
                    l.toggle()
                })
            })
        }
    }
}).directive("lxDropdownMenu", ["$timeout", function (e) {
    return {
        restrict: "E",
        require: "^lxDropdown",
        templateUrl: "dropdown-menu.html",
        transclude: !0,
        replace: !0,
        link: function (n, t, l, i, a) {
            var o;
            i.registerDropdownMenu(t), t.on("click", function (e) {
                e.stopPropagation(), n.$apply(function () {
                    i.toggle()
                })
            }), n.$watch(function () {
                return t.html()
            }, function (n) {
                o && e.cancel(o), o = e(i.updatePositionAndSize, 150)
            })
        }
    }
}]).directive("lxDropdownFilter", ["$timeout", function (e) {
    return {
        restrict: "A", link: function (n, t) {
            t.on("click", function (e) {
                e.stopPropagation()
            }), e(function () {
                t.find("input").focus()
            }, 200)
        }
    }
}]), function () {
    "use strict";
    function e() {
        function e(e, n, t, l) {
            t.$observe("lxDirection", function (e) {
                l.setFabDirection(e)
            }), e.$watch(t.lxFabProgress, function (e) {
                l.setFabProgress(e)
            }), angular.isUndefined(t.lxFabProgressColor) && l.setFabProgressColor("primary"), t.$observe("lxFabProgressColor", function (e) {
                l.setFabProgressColor(e)
            })
        }

        var t = {
            restrict: "E",
            templateUrl: "fab.html",
            scope: !0,
            link: e,
            controller: n,
            controllerAs: "lxFab",
            bindToController: !0,
            transclude: !0
        };
        return t
    }

    function n() {
        function e(e) {
            l.lxDirection = e
        }

        function n(e) {
            l.lxFabProgress = e
        }

        function t(e) {
            l.lxFabProgressColor = e
        }

        var l = this;
        l.setFabDirection = e, l.setFabProgress = n, l.setFabProgressColor = t
    }

    function t() {
        var e = {restrict: "E", require: "^lxFab", templateUrl: "fab-trigger.html", transclude: !0, replace: !0};
        return e
    }

    function l() {
        function e(e, n, t, l) {
            e.parentCtrl = l
        }

        var n = {
            restrict: "E",
            require: "^lxFab",
            templateUrl: "fab-actions.html",
            link: e,
            transclude: !0,
            replace: !0
        };
        return n
    }

    angular.module("lumx.fab", []).directive("lxFab", e).directive("lxFabTrigger", t).directive("lxFabActions", l)
}(), angular.module("lumx.file-input", []).directive("lxFileInput", ["$timeout", function (e) {
    return {
        restrict: "E",
        scope: {label: "@", value: "=", change: "&"},
        templateUrl: "file-input.html",
        replace: !0,
        link: function (n, t) {
            function l(e) {
                i.val(""), e ? (a.text(e.replace(/C:\\fakepath\\/i, "")), t.addClass("input-file--is-active")) : (a.text(""), t.hasClass("input-file--is-active") && t.removeClass("input-file--is-active")), n.value = a.text()
            }

            var i = t.find("input"), a = t.find(".input-file__filename");
            i.addClass("input-file__input").on("change", function () {
                e(function () {
                    l(i.val()), t.addClass("input-file--is-focused")
                }), angular.isDefined(n.change) && n.change({e: i[0].files[0], newValue: i.val(), oldValue: a.text()})
            }).on("blur", function () {
                t.removeClass("input-file--is-focused")
            }), n.$watch("value", function (e) {
                l(e)
            })
        }
    }
}]), angular.module("lumx.notification", ["lumx.utils.event-scheduler"]).service("LxNotificationService", ["$injector", "$rootScope", "$timeout", "LxEventSchedulerService", function (e, n, t, l) {
    function i(e) {
        return parseFloat(window.getComputedStyle(e, null).height)
    }

    function a() {
        var e = D.length - 1;
        D[e].height = i(D[e].elem[0]);
        for (var n = 0, t = e; t >= 0; t--)D.length > 1 && t !== e && (n = 24 + D[e].height, D[t].margin += n, D[t].elem.css("marginBottom", D[t].margin + "px"))
    }

    function o(e) {
        for (var n = D.indexOf(e), l = 24 + D[n].height, i = 0; n > i; i++)D.length > 1 && (D[i].margin -= l, D[i].elem.css("marginBottom", D[i].margin + "px"));
        e.elem.removeClass("notification--is-shown"), t(function () {
            e.elem.remove(), D.splice(n, 1)
        }, 400)
    }

    function r(e, n, l, i) {
        var r, c = angular.element("<div/>", {"class": "notification"}), s = angular.element("<span/>", {
            "class": "notification__content",
            html: e
        });
        if (angular.isDefined(n)) {
            var d = angular.element("<i/>", {"class": "notification__icon mdi mdi-" + n});
            c.addClass("notification--has-icon").append(d)
        }
        angular.isDefined(i) && c.addClass("notification--" + i), c.append(s).appendTo("body"), t(function () {
            c.addClass("notification--is-shown")
        }, 100);
        var u = {elem: c, margin: 0};
        D.push(u), a(), c.bind("click", function () {
            o(u), angular.isDefined(r) && t.cancel(r)
        }), (angular.isUndefined(l) || !l) && (r = t(function () {
            o(u)
        }, 6e3))
    }

    function c(e, n) {
        r(e, "check", n, "green")
    }

    function s(e, n) {
        r(e, "alert-circle", n, "red")
    }

    function d(e, n) {
        r(e, "alert", n, "orange")
    }

    function u(e, n) {
        r(e, "information-outline", n, "blue")
    }

    function f(e) {
        var n = angular.element("<div/>", {"class": "dialog__header p++ fs-title", text: e});
        return n
    }

    function g(e) {
        var n = angular.element("<div/>", {"class": "dialog__content p++ pt0 tc-black-2", text: e});
        return n
    }

    function p(t, i, a) {
        var o = e.get("$compile"), r = angular.element("<div/>", {"class": "dialog__actions"}), c = angular.element("<button/>", {
            "class": "btn btn--m btn--blue btn--flat",
            text: t.ok
        });
        if (angular.isDefined(t.cancel)) {
            var s = angular.element("<button/>", {"class": "btn btn--m btn--red btn--flat", text: t.cancel});
            s.attr("lx-ripple", ""), o(s)(n), r.append(s), s.bind("click", function () {
                i(!1), m()
            })
        }
        return c.attr("lx-ripple", ""), o(c)(n), r.append(c), c.bind("click", function () {
            i(!0), m()
        }), a || (S = l.register("keyup", function (e) {
            13 == e.keyCode ? (i(!0), m()) : 27 == e.keyCode && (i(angular.isUndefined(t.cancel)), m()), e.stopPropagation()
        })), r
    }

    function x(e, n, l, i, a) {
        v = angular.element("<div/>", {"class": "dialog-filter"}), b = angular.element("<div/>", {"class": "dialog dialog--alert"});
        var o = f(e), r = g(n), c = p(l, i, a);
        v.appendTo("body"), b.append(o).append(r).append(c).appendTo("body").show().focus(), t(function () {
            angular.element(document.activeElement).blur(), v.addClass("dialog-filter--is-shown"), b.addClass("dialog--is-shown")
        }, 100)
    }

    function h(e, n, l, i, a) {
        v = angular.element("<div/>", {"class": "dialog-filter"}), b = angular.element("<div/>", {"class": "dialog dialog--alert"});
        var o = f(e), r = g(n), c = p({ok: l}, i, a);
        v.appendTo("body"), b.append(o).append(r).append(c).appendTo("body").show().focus(), t(function () {
            angular.element(document.activeElement).blur(), v.addClass("dialog-filter--is-shown"), b.addClass("dialog--is-shown")
        }, 100)
    }

    function m() {
        angular.isDefined(S) && t(function () {
            l.unregister(S), S = void 0
        }, 1), v.removeClass("dialog-filter--is-shown"), b.removeClass("dialog--is-shown"), t(function () {
            v.remove(), b.remove()
        }, 600)
    }

    var v, b, S, D = [];
    return {alert: h, confirm: x, error: s, info: u, notify: r, success: c, warning: d}
}]), function () {
    "use strict";
    function e() {
        var e = {
            restrict: "E",
            templateUrl: "progress.html",
            scope: {lxType: "@?", lxDiameter: "@?", lxColor: "@?"},
            controller: n,
            controllerAs: "lxProgress",
            bindToController: !0
        };
        return e
    }

    function n() {
        function e() {
            t.lxDiameter = angular.isDefined(t.lxDiameter) ? t.lxDiameter : 50, t.lxColor = angular.isDefined(t.lxColor) ? t.lxColor : "primary"
        }

        function n() {
            return "circular" === t.lxType ? {transform: "scale(" + parseInt(t.lxDiameter) / 100 + ")"} : void 0
        }

        var t = this;
        t.getProgressDiameter = n, e()
    }

    angular.module("lumx.progress", []).directive("lxProgress", e)
}(), function () {
    "use strict";
    function e(e, n, t) {
        function l() {
            d && (d = !1, r.remove())
        }

        function i() {
            u && (u = !1, c.remove())
        }

        function a(l, i) {
            if (!d) {
                var a = angular.isDefined(l) ? l : "primary", o = angular.isDefined(i) ? i : "body";
                r = e('<lx-progress lx-type="circular" lx-color="' + a + '"></lx-progress>')(n), t(function () {
                    angular.element(o).append(r[0]), d = !0
                })
            }
        }

        function o(l, i) {
            if (!u) {
                var a = angular.isDefined(l) ? l : "primary", o = angular.isDefined(i) ? i : "body";
                c = e('<lx-progress lx-type="linear" lx-color="' + a + '"></lx-progress>')(n), t(function () {
                    angular.element(o).append(c[0]), u = !0
                })
            }
        }

        var r, c, s = {circular: {show: a, hide: l}, linear: {show: o, hide: i}}, d = !1, u = !1;
        return s
    }

    angular.module("lumx.progress").service("LxProgressService", e), e.$inject = ["$compile", "$rootScope", "$timeout"]
}(), function () {
    "use strict";
    function e() {
        var e = {restrict: "E", templateUrl: "radio-group.html", transclude: !0};
        return e
    }

    function n() {
        var e = {
            restrict: "E",
            templateUrl: "radio-button.html",
            scope: {
                name: "@",
                value: "@?",
                ngModel: "=",
                ngValue: "=?",
                ngChange: "&?",
                ngDisabled: "=?",
                lxColor: "@?"
            },
            controller: t,
            controllerAs: "lxRadioButton",
            bindToController: !0,
            transclude: !0
        };
        return e
    }

    function t(e) {
        function n() {
            i(e.generateUUID()), a(!1), angular.isDefined(c.value) && angular.isUndefined(c.ngValue) && (c.ngValue = c.value), c.lxColor = angular.isUndefined(c.lxColor) ? "accent" : c.lxColor
        }

        function t() {
            return o
        }

        function l() {
            return r
        }

        function i(e) {
            o = e
        }

        function a(e) {
            r = e
        }

        var o, r, c = this;
        c.getRadioButtonId = t, c.getRadioButtonHasChildren = l, c.setRadioButtonId = i, c.setRadioButtonHasChildren = a, n()
    }

    function l() {
        function e(e, n, t, l) {
            l[0].setRadioButtonHasChildren(!0), l[1].setRadioButtonId(l[0].getRadioButtonId())
        }

        var n = {
            restrict: "AE",
            require: ["^lxRadioButton", "^lxRadioButtonLabel"],
            templateUrl: "radio-button-label.html",
            link: e,
            controller: i,
            controllerAs: "lxRadioButtonLabel",
            bindToController: !0,
            transclude: !0,
            replace: !0
        };
        return n
    }

    function i() {
        function e() {
            return t
        }

        function n(e) {
            t = e
        }

        var t, l = this;
        l.getRadioButtonId = e, l.setRadioButtonId = n
    }

    function a() {
        var e = {
            restrict: "AE",
            require: "^lxRadioButton",
            templateUrl: "radio-button-help.html",
            transclude: !0,
            replace: !0
        };
        return e
    }

    angular.module("lumx.radio-button", []).directive("lxRadioGroup", e).directive("lxRadioButton", n).directive("lxRadioButtonLabel", l).directive("lxRadioButtonHelp", a), t.$inject = ["LxUtils"]
}(), angular.module("lumx.ripple", []).directive("lxRipple", ["$timeout", function (e) {
    return {
        restrict: "A", link: function (n, t, l) {
            var i;
            t.css({position: "relative", overflow: "hidden"}).bind("mousedown", function (n) {
                var a;
                if (0 === t.find(".ripple").length ? (a = angular.element("<span/>", {"class": "ripple"}), l.lxRipple && a.addClass("bgc-" + l.lxRipple), t.prepend(a)) : a = t.find(".ripple"), a.removeClass("ripple--is-animated"), !a.height() && !a.width()) {
                    var o = Math.max(t.outerWidth(), t.outerHeight());
                    a.css({height: o, width: o})
                }
                var r = n.pageX - t.offset().left - a.width() / 2, c = n.pageY - t.offset().top - a.height() / 2;
                a.css({top: c + "px", left: r + "px"}).addClass("ripple--is-animated"), i = e(function () {
                    a.removeClass("ripple--is-animated")
                }, 651)
            }), n.$on("$destroy", function () {
                e.cancel(i)
            })
        }
    }
}]), angular.module("lumx.scrollbar", []).service("LxScrollbarService", ["$window", "$timeout", function (e, n) {
    function t() {
        angular.element(e).trigger("resize")
    }

    function l(e, t) {
        angular.isDefined(e) && "" !== e && n(function () {
            a[e] = t
        })
    }

    function i(e) {
        return a[e]
    }

    var a = {};
    return {update: t, setScrollPercent: l, getScrollPercent: i}
}]).controller("LxScrollbarController", ["$scope", "$window", "LxScrollbarService", function (e, n, t) {
    function l() {
        s = c.outerHeight(), u = d.outerHeight(), x = u - s, s >= u ? f.hide() : (f.show(), a(0, 0), f.css({height: s}), g.css({height: s / u * 100 + "%"}))
    }

    function i(e, n) {
        n >= 0 && x >= n ? a(e, n) : 0 > n ? a(0, 0) : a(s - g.outerHeight(), x)
    }

    function a(e, n) {
        g.css({top: e}), f.css({top: n}), c.scrollTop(n), angular.isDefined(r) && t.setScrollPercent(r, n / x * 100)
    }

    var o, r, c, s, d, u, f, g, p, x;
    this.setElementId = function (e) {
        r = e
    }, this.init = function (t) {
        c = t, c.addClass("scrollbar-container").wrapInner('<div class="scrollbar-content"></div>'), d = c.find(".scrollbar-content"), f = angular.element("<div/>", {"class": "scrollbar-y-axis"}), g = angular.element("<div/>", {"class": "scrollbar-y-axis__handle"}), f.append(g).prependTo(c), g.bind("mousedown", function () {
            var e, t, l;
            angular.element(n).bind("mousemove", function (a) {
                n.innerWidth >= 1024 && (a.preventDefault(), f.addClass("scrollbar-y-axis--is-dragging"), angular.isUndefined(o) && (o = a.pageY), angular.isUndefined(p) && (p = g.position().top), e = a.pageY - o + p, t = e / (s - g.outerHeight()), l = x * t, i(e, l))
            })
        }), angular.element(n).bind("mouseup", function () {
            n.innerWidth >= 1024 && (f.removeClass("scrollbar-y-axis--is-dragging"), o = void 0, p = void 0, angular.element(n).unbind("mousemove"))
        }), c.bind("mousewheel", function (e) {
            if (n.innerWidth >= 1024) {
                e.preventDefault();
                var t = c.scrollTop() / x, l = (s - g.outerHeight()) * t;
                i(l, c.scrollTop() + -1 * e.originalEvent.wheelDelta)
            }
        }), e.$watch(function () {
            return c.outerHeight() || d.outerHeight()
        }, function (e) {
            angular.isNumber(e) && n.innerWidth >= 1024 && l()
        })
    }, angular.element(n).bind("resize", function () {
        n.innerWidth < 1024 ? f.hide() : l()
    })
}]).directive("lxScrollbar", function () {
    return {
        restrict: "AE", controller: "LxScrollbarController", link: function (e, n, t, l) {
            l.init(n), t.$observe("id", function (e) {
                angular.isDefined(e) && l.setElementId(e)
            })
        }
    }
}), angular.module("lumx.search-filter", []).directive("lxSearchFilter", ["$timeout", function (e) {
    return {
        restrict: "E",
        templateUrl: "search-filter.html",
        scope: {model: "=?", theme: "@", placeholder: "@"},
        link: function (n, t, l) {
            var i = t.find(".search-filter__input"), a = t.find(".search-filter__label"), o = t.find(".search-filter"), r = t.find(".search-filter__container");
            n.closed = angular.isDefined(l.closed), angular.isUndefined(n.theme) && (n.theme = "light"), l.$observe("filterWidth", function (e) {
                r.css({width: e})
            }), i.on("blur", function () {
                angular.isDefined(l.closed) && !i.val() && o.velocity({width: 40}, {
                    duration: 400,
                    easing: "easeOutQuint",
                    queue: !1
                })
            }), a.on("click", function () {
                angular.isDefined(l.closed) ? (o.velocity({width: l.filterWidth ? l.filterWidth : 240}, {
                    duration: 400,
                    easing: "easeOutQuint",
                    queue: !1
                }), e(function () {
                    i.focus()
                }, 401)) : i.focus()
            }), n.clear = function () {
                n.model = void 0, i.focus()
            }
        }
    }
}]), angular.module("lumx.select", []).filter("filterChoices", ["$filter", function (e) {
    return function (n, t, l) {
        if (t)return n;
        var i = [];
        if (angular.isArray(n))i = n; else if (angular.isObject(n))for (var a in n)angular.isArray(n[a]) && (i = i.concat(n[a]));
        return e("filter")(i, l)
    }
}]).controller("LxSelectController", ["$scope", "$filter", "$compile", "$sce", "$timeout", "$interpolate", function (e, n, t, l, i, a) {
    function o(e, n) {
        for (var t = 0; t < e.length; t++)if (angular.equals(e[t], n))return t;
        return -1
    }

    function r(n) {
        D = !1, e.lxSelectMultiple ? -1 === o(e.lxSelectData.selected, n) && e.lxSelectData.selected.push(n) : e.lxSelectData.selected = [n]
    }

    function c(n, t, l) {
        if (D = !1, e.lxSelectAllowClear || e.lxSelectMultiple) {
            !angular.isDefined(t) || e.lxSelectMultiple && !l || t.stopPropagation();
            var i = o(e.lxSelectData.selected, n);
            -1 !== i && e.lxSelectData.selected.splice(i, 1)
        }
    }

    function s(n, t) {
        angular.isDefined(t) && e.lxSelectMultiple && t.stopPropagation(), e.lxSelectMultiple && d(n) ? c(n) : r(n)
    }

    function d(n) {
        return angular.isDefined(e.lxSelectData.selected) && -1 !== o(e.lxSelectData.selected, n)
    }

    function u() {
        return angular.isUndefined(e.lxSelectChoices()) || 0 === n("filterChoices")(e.lxSelectChoices(), e.lxSelectFilter, e.lxSelectData.filter).length
    }

    function f() {
        return angular.isDefined(e.lxSelectMinLength) && angular.isDefined(e.lxSelectData.filter) && e.lxSelectData.filter.length < e.lxSelectMinLength
    }

    function g() {
        return "true" !== e.lxSelectLoading && (f() || u() && !f())
    }

    function p() {
        return "true" !== e.lxSelectLoading && !u() && !f()
    }

    function x() {
        return angular.isArray(e.lxSelectChoices())
    }

    function h(e) {
        return l.trustAsHtml(e)
    }

    function m() {
        return angular.isDefined(e.lxSelectData.selected) ? e.lxSelectData.selected : []
    }

    function v(n, t, l) {
        var a = e.lxSelectMultiple ? [] : void 0, o = [];
        if (!n || e.lxSelectMultiple && 0 === n.length)return void l(a);
        if (e.lxSelectData.loading = !0, e.lxSelectMultiple)if (angular.isDefined(t)) {
            var r = !1, c = function (n) {
                return function (t) {
                    i(function () {
                        void 0 !== t && a.splice(n, 0, t), o.splice(o.indexOf(n), 1), 0 !== o.length || r || (r = !0, e.lxSelectData.loading = !1, l(a))
                    })
                }
            };
            for (var s in n)o.push(s), t(n[s], c(s))
        } else l(n); else angular.isDefined(t) ? (e.lxSelectData.loading = !0, t(n, function (n) {
            e.lxSelectData.loading = !1, l(n)
        })) : l(n)
    }

    var b, S = !1, D = !0;
    e.lxSelectData = {filter: "", selected: [], loading: !1}, this.registerTransclude = function (n) {
        e.lxSelectData.selectedTransclude = n
    }, this.getScope = function () {
        return e
    }, e.$watch("lxSelectNgModel.$modelValue", function (n) {
        return S ? void(S = !1) : void v(n, e.lxSelectModelToSelection, function (n) {
            D = !0;
            var t = void 0 !== n ? angular.copy(n) : [];
            e.lxSelectMultiple || (t = void 0 !== n ? [angular.copy(n)] : []), e.lxSelectData.selected = t, e.$selected = e.lxSelectMultiple || 1 !== e.lxSelectGetSelectedElements().length ? void 0 : e.lxSelectGetSelectedElements()[0]
        })
    }), e.$watch("lxSelectData.selected", function (n) {
        if (angular.isDefined(n) && angular.isDefined(e.lxSelectData.selectedTransclude) && (b && b.$destroy(), b = e.$new(), e.lxSelectData.selectedTemplate = {
                html: "",
                selected: {}
            }, angular.forEach(n, function (l, i) {
                b.$selected = l, e.lxSelectData.selectedTemplate.selected[i] = l,
                    e.lxSelectData.selectedTransclude(b, function (l) {
                        var o = angular.element("<div/>"), r = angular.element("<div/>").append(l), c = t(r.html())(b);
                        if (l.html(a(c.html())(b)), e.lxSelectMultiple && (e.lxSelectAllowClear || n.length > 1)) {
                            var s = angular.element('<i class="lx-select__delete-button" ng-click="lxSelectUnselect(lxSelectTranscludeSelected[' + i + '], $event, true)"></i>');
                            l.append(s)
                        }
                        o.append(l), e.lxSelectMultiple && o.find("span").addClass("lx-select__tag"), e.lxSelectData.selectedTemplate.html += o.html()
                    })
            })), D)return void(D = !1);
        var l = n;
        e.lxSelectMultiple || (l = n ? n[0] : void 0), v(l, e.lxSelectSelectionToModel, function (n) {
            S = !0, e.lxSelectChange && e.lxSelectChange({
                newValue: angular.copy(n),
                oldValue: angular.copy(e.lxSelectNgModel.$modelValue)
            }), e.lxSelectNgModel.$setViewValue(angular.copy(n)), e.$selected = e.lxSelectMultiple || 1 !== e.lxSelectGetSelectedElements().length ? void 0 : e.lxSelectGetSelectedElements()[0]
        })
    }, !0), e.$watch("lxSelectData.filter", function (n, t) {
        n !== t && (angular.isUndefined(e.lxSelectMinLength) || n && e.lxSelectMinLength <= n.length) && e.lxSelectFilter && e.lxSelectFilter(n, t)
    }), e.lxSelectSelect = r, e.lxSelectUnselect = c, e.lxSelectToggle = s, e.lxSelectIsChoicesVisible = p, e.lxSelectIsHelperVisible = g, e.lxSelectIsSelected = d, e.lxSelectFilterNeeded = f, e.lxSelectGetSelectedElements = m, e.lxSelectHasNoResults = u, e.lxSelectIsChoicesArray = x, e.lxSelectTrust = h
}]).directive("lxSelect", function () {
    return {
        restrict: "AE",
        controller: "LxSelectController",
        require: "?ngModel",
        scope: !0,
        templateUrl: "select.html",
        transclude: !0,
        replace: !0,
        link: function (e, n, t, l) {
            e.lxSelectMultiple = angular.isDefined(t.multiple) && e.$eval(t.multiple) !== !1, e.lxSelectDefaultMaxResults = angular.isDefined(t.maxResults) ? e.$eval(t.maxResults) : 100, e.lxSelectFloatingLabel = angular.isDefined(t.floatingLabel), e.lxSelectTree = angular.isDefined(t.tree), e.lxSelectNgModel = l, e.lxSelectCustom = void 0, e.lxSelectPlaceholder = "", e.lxSelectLoading = "", e.lxSelectMinLength = void 0, e.lxSelectAllowClear = "", e.lxSelectChoices = function () {
                return []
            }, e.lxSelectDisabled = void 0, e.lxSelectError = void 0, e.lxSelectValid = void 0, e.lxSelectChange = void 0, e.lxSelectFilter = void 0, e.lxSelectSelectionToModel = void 0, e.lxSelectModelToSelection = void 0, t.$observe("custom", function (n) {
                e.lxSelectCustom = n
            }), t.$observe("placeholder", function (n) {
                e.lxSelectPlaceholder = n
            }), t.$observe("loading", function (n) {
                e.lxSelectLoading = n
            }), t.$observe("minLength", function (n) {
                e.lxSelectMinLength = n
            }), t.$observe("allowClear", function (n) {
                e.lxSelectAllowClear = n
            }), t.$observe("disabled", function (n) {
                e.lxSelectDisabled = function () {
                    return e.$eval(n)
                }
            }), t.$observe("error", function (n) {
                e.lxSelectError = function () {
                    return e.$eval(n)
                }
            }), t.$observe("valid", function (n) {
                e.lxSelectValid = function () {
                    return e.$eval(n)
                }
            }), t.$observe("choices", function (n) {
                e.lxSelectChoices = function () {
                    return e.$eval(n)
                }
            }), t.$observe("change", function (n) {
                e.lxSelectChange = function (t, l) {
                    return e.$eval(n, {newValue: t, oldValue: l})
                }
            }), t.$observe("filter", function (n) {
                e.lxSelectFilter = function (t, l) {
                    return e.$eval(n, {newValue: t, oldValue: l})
                }
            });
            var i = function (n) {
                e.lxSelectSelectionToModel = function (t, l) {
                    return e.$eval(n, {data: t, callback: l})
                }
            };
            angular.isDefined(t.selectionToModel) && i(t.selectionToModel), t.$observe("selectionToModel", i);
            var a = function (n) {
                e.lxSelectModelToSelection = function (t, l) {
                    return e.$eval(n, {data: t, callback: l})
                }
            };
            angular.isDefined(t.modelToSelection) && a(t.modelToSelection), t.$observe("modelToSelection", a)
        }
    }
}).directive("lxSelectSelected", function () {
    return {
        restrict: "E",
        require: "^lxSelect",
        templateUrl: "select-selected.html",
        transclude: !0,
        link: function (e, n, t, l, i) {
            l.registerTransclude(i)
        }
    }
}).directive("lxSelectChoices", function () {
    return {restrict: "E", require: "^lxSelect", templateUrl: "select-choices.html", transclude: !0}
}).directive("lxSelectChoicesSelected", ["$compile", "$parse", function (e, n) {
    return {
        restrict: "E", link: function (n, t, l) {
            n.$watch(l.content, function () {
                var i = n.$eval(l.content);
                n.lxSelectTranscludeSelected = i.selected, t.html(i.html), e(t.contents())(n)
            }, !0)
        }
    }
}]), function () {
    "use strict";
    function e() {
        var e = {
            restrict: "E",
            templateUrl: "switch.html",
            scope: {
                ngModel: "=",
                name: "@?",
                ngTrueValue: "@?",
                ngFalseValue: "@?",
                ngChange: "&?",
                ngDisabled: "=?",
                lxColor: "@?"
            },
            controller: n,
            controllerAs: "lxSwitch",
            bindToController: !0,
            transclude: !0
        };
        return e
    }

    function n(e) {
        function n() {
            i(e.generateUUID()), a(!1), c.ngTrueValue = angular.isUndefined(c.ngTrueValue) ? !0 : c.ngTrueValue, c.ngFalseValue = angular.isUndefined(c.ngFalseValue) ? !1 : c.ngFalseValue, c.lxColor = angular.isUndefined(c.lxColor) ? "accent" : c.lxColor
        }

        function t() {
            return o
        }

        function l() {
            return r
        }

        function i(e) {
            o = e
        }

        function a(e) {
            r = e
        }

        var o, r, c = this;
        c.getSwitchId = t, c.getSwitchHasChildren = l, c.setSwitchId = i, c.setSwitchHasChildren = a, n()
    }

    function t() {
        function e(e, n, t, l) {
            l[0].setSwitchHasChildren(!0), l[1].setSwitchId(l[0].getSwitchId())
        }

        var n = {
            restrict: "AE",
            require: ["^lxSwitch", "^lxSwitchLabel"],
            templateUrl: "switch-label.html",
            link: e,
            controller: l,
            controllerAs: "lxSwitchLabel",
            bindToController: !0,
            transclude: !0,
            replace: !0
        };
        return n
    }

    function l() {
        function e() {
            return t
        }

        function n(e) {
            t = e
        }

        var t, l = this;
        l.getSwitchId = e, l.setSwitchId = n
    }

    function i() {
        var e = {restrict: "AE", require: "^lxSwitch", templateUrl: "switch-help.html", transclude: !0, replace: !0};
        return e
    }

    angular.module("lumx.switch", []).directive("lxSwitch", e).directive("lxSwitchLabel", t).directive("lxSwitchHelp", i), n.$inject = ["LxUtils"]
}(), angular.module("lumx.tabs", []).controller("LxTabsController", ["$scope", "$sce", "$timeout", "$window", function (e, n, t, l) {
    function i() {
        var e = m.outerWidth(), n = v.outerWidth();
        return e > n
    }

    function a() {
        for (var e, n = v.offset().left, t = 0; t < b.length; t++) {
            var l = angular.element(b[t]).offset().left;
            if (!e && l > n - v.outerWidth() && n > l) {
                e = angular.element(b[t]);
                break
            }
        }
        return e
    }

    function o() {
        for (var e, n = v.offset().left + v.outerWidth(), t = 0; t < b.length; t++) {
            var l = angular.element(b[t]), i = l.offset().left + l.outerWidth();
            if (!e && i > n) {
                e = angular.element(b[t]);
                break
            }
        }
        return e
    }

    function r() {
        for (var e, n = v.offset().left, t = 0; t < b.length; t++) {
            var l = angular.element(b[t]).offset().left;
            if (!e && l > n) {
                e = b[t];
                break
            }
        }
        return angular.element(e)
    }

    function c() {
        return void 0 === a()
    }

    function s() {
        return void 0 === o()
    }

    function d() {
        var n = o(), l = v.offset().left - n.offset().left;
        l += 41, w += l;
        var i = {translateX: w + "px"}, a = {duration: 200};
        m.velocity(i, a), S.velocity(i, a), t(function () {
            e.$apply()
        }, 201)
    }

    function u() {
        var n = a(), l = v.offset().left - n.offset().left;
        l += 41, w += l;
        var i = {translateX: w + "px"}, o = {duration: 200};
        m.velocity(i, o), S.velocity(i, o), t(function () {
            e.$apply()
        }, 201)
    }

    function f() {
        var e = v.offset().left, n = r(), t = e - n.offset().left + 41;
        w += t;
        var l = {translateX: w + "px"}, i = {duration: 10};
        m.velocity(l, i), S.velocity(l, i)
    }

    function g() {
        return D
    }

    function p(n) {
        t(function () {
            e.lxTabsActiveTab = n
        })
    }

    function x(n) {
        b.removeClass("tc-" + e.lxTabsIndicator), b.eq(n).addClass("tc-" + e.lxTabsIndicator)
    }

    function h(n) {
        var t;
        t = e.lxTabsActiveTab > n ? "right" : "left";
        var l = m.parent(".tabs").outerWidth(), i = m.find(".tabs-link").eq(e.lxTabsActiveTab), a = i.outerWidth(), o = i.position().left, r = l - (o + a);
        if (angular.isUndefined(n))S.css({left: o, right: r}); else {
            var c = {duration: 200, easing: "easeOutQuint"};
            "left" === t ? (S.velocity({left: o}, c), S.velocity({right: r}, c)) : (S.velocity({right: r}, c), S.velocity({left: o}, c))
        }
    }

    var m, v, b, S, D = [], w = 0;
    this.init = function (e) {
        m = e.find(".tabs__links"), v = m.parent(".tabs"), b = m.find(".tabs-link"), S = e.find(".tabs__indicator")
    }, this.getScope = function () {
        return e
    }, this.addTab = function (e) {
        return D.push(e), t(function () {
            h()
        }), D.length - 1
    }, this.removeTab = function (n) {
        var l = D.indexOf(n);
        if (-1 !== l) {
            for (var i = l + 1; i < D.length; ++i)--D[i].lxTabIndex;
            if (D.splice(l, 1), l === e.lxTabsActiveTab)e.lxTabsActiveTab = 0, t(function () {
                h(l)
            }); else if (l < e.lxTabsActiveTab) {
                var a = e.lxTabsActiveTab;
                e.lxTabsActiveTab = a - 1, t(function () {
                    h(a)
                })
            } else t(function () {
                h()
            })
        }
    }, e.$watch("lxTabsActiveTab", function (e, n) {
        e !== n && t(function () {
            x(e), h(n)
        })
    }), e.$watchCollection(function () {
        return D
    }, function () {
        if (t(function () {
                b = m.find(".tabs-link")
            }), i()) {
            var e = r();
            angular.equals(e[0], b[b.length - 1]) && u()
        }
    }), angular.element(l).on("resize", function () {
        h(), i() && f()
    }), e.lxTabsGetTabs = g, e.lxTabsSetActiveTab = p, e.lxTabsIsPaginationActive = i, e.lxTabsIsPaginationLeftDisabled = c, e.lxTabsIsPaginationRightDisabled = s, e.lxTabsShowNextPage = d, e.lxTabsShowPrevPage = u
}]).directive("lxTabs", ["$parse", function (e) {
    return {
        restrict: "E",
        controller: "LxTabsController",
        templateUrl: "tabs.html",
        transclude: !0,
        replace: !0,
        scope: !0,
        link: function (n, t, l, i) {
            if (i.init(t), n.lxTabsActiveTab = 0, n.lxTabsLinksTc = "dark", n.lxTabsLinksBgc = "white", n.lxTabsIndicator = "blue-500", n.lxTabsZDepth = "0", n.lxTabsLayout = "full", n.lxTabsIconPrefix = "mdi mdi-", n.$watch(function () {
                    return "activeTab"in l ? n.$parent.$eval(l.activeTab) : 0
                }, function (e) {
                    n.lxTabsActiveTab = angular.isDefined(e) ? e : 0
                }), "activeTab"in l) {
                var a = e(l.activeTab);
                n.$watch("lxTabsActiveTab", function (e) {
                    a.assign && a.assign(n, e)
                })
            }
            l.$observe("linksTc", function (e) {
                n.lxTabsLinksTc = e || "dark"
            }), l.$observe("linksBgc", function (e) {
                n.lxTabsLinksBgc = e || "white"
            }), l.$observe("indicator", function (e) {
                n.lxTabsIndicator = e || "blue-500"
            }), l.$observe("noDivider", function (e) {
                n.lxTabsNoDivider = e
            }), l.$observe("zDepth", function (e) {
                n.lxTabsZDepth = e || "0"
            }), l.$observe("layout", function (e) {
                n.lxTabsLayout = e || "full"
            }), l.$observe("showIconAndHeading", function (e) {
                n.lxTabsShowIconAndHeading = e
            }), l.$observe("iconPrefix", function (e) {
                n.lxTabsIconPrefix = e || "mdi mdi-"
            })
        }
    }
}]).directive("lxTab", function () {
    return {
        require: "^lxTabs",
        restrict: "E",
        scope: !0,
        templateUrl: "tab.html",
        transclude: !0,
        replace: !0,
        link: function (e, n, t, l) {
            e.lxTabData = l.getScope(), e.lxTabIndex = l.addTab(e), t.$observe("heading", function (n) {
                e.lxTabHeading = n
            }), t.$observe("icon", function (n) {
                e.lxTabIcon = n
            }), e.$on("$destroy", function (e) {
                l.removeTab(e.currentScope)
            })
        }
    }
}).directive("lxTabLink", ["$timeout", function (e) {
    return {
        require: "^lxTabs", restrict: "A", link: function (n, t) {
            n.lxTabsActiveTab === t.parent().index() && e(function () {
                t.addClass("tc-" + n.lxTabsIndicator)
            }), t.on("mouseenter", function () {
                n.lxTabsActiveTab !== t.parent().index() && t.addClass("tc-" + n.lxTabsIndicator)
            }).on("mouseleave", function () {
                n.lxTabsActiveTab !== t.parent().index() && t.removeClass("tc-" + n.lxTabsIndicator)
            })
        }
    }
}]), angular.module("lumx.text-field", []).filter("unsafe", ["$sce", function (e) {
    return e.trustAsHtml
}]).directive("lxTextField", ["$timeout", function (e) {
    return {
        restrict: "E",
        scope: {label: "@", disabled: "&", error: "&", valid: "&", fixedLabel: "&", icon: "@", theme: "@"},
        templateUrl: "text-field.html",
        replace: !0,
        transclude: !0,
        link: function (n, t, l, i, a) {
            function o() {
                n.data.focused = !0, n.$apply()
            }

            function r() {
                n.data.focused = !1, n.$apply()
            }

            function c() {
                n.data.model = u.$modelValue || f.val()
            }

            function s() {
                c(), n.$apply()
            }

            function d() {
                e(function () {
                    var e = angular.element('<textarea class="text-field__input" style="width: ' + f.width() + 'px;">' + f.val() + "</textarea>");
                    e.appendTo("body"), f.css({height: e[0].scrollHeight + "px"}), e.remove()
                })
            }

            angular.isUndefined(n.theme) && (n.theme = "light");
            var u, f;
            n.data = {focused: !1, model: void 0}, a(function () {
                f = t.find("textarea"), f[0] ? (d(), f.on("cut paste drop keydown", function () {
                    d()
                })) : f = t.find("input"), f.addClass("text-field__input"), f.on("focus", o), f.on("blur", r), f.on("propertychange change click keyup input paste", s), u = f.data("$ngModelController"), n.$watch(function () {
                    return u.$modelValue
                }, c)
            })
        }
    }
}]), angular.module("lumx.thumbnail", []).controller("LxThumbnailController", ["$scope", function (e) {
    function n() {
        var n = e.thumbnailWidth / e.originalWidth, t = e.thumbnailWidth, l = e.originalHeight * n;
        if (l < e.thumbnailHeight) {
            var i = e.thumbnailHeight / l;
            l = e.thumbnailHeight, t = i * t
        }
        e.element.css({
            background: "url(" + e.thumbnailSrc + ") no-repeat",
            "background-position": "center",
            "background-size": t + "px " + l + "px",
            overflow: "hidden"
        })
    }

    this.init = function (n) {
        e.element = n
    }, this.prepareImage = function () {
        e.isLoading = !0;
        var t = new Image;
        t.src = e.thumbnailSrc, e.element.css({
            width: e.thumbnailWidth + "px",
            height: e.thumbnailHeight + "px"
        }), t.onload = function () {
            e.originalWidth = t.width, e.originalHeight = t.height, n(), e.isLoading = !1
        }
    }
}]).directive("lxThumbnail", function () {
    return {
        restrict: "E",
        template: '<div class="thumbnail" ng-class="{ \'thumbnail--is-loading\': isLoading }"></div>',
        replace: !0,
        controller: "LxThumbnailController",
        scope: {thumbnailSrc: "@", thumbnailWidth: "@", thumbnailHeight: "@"},
        link: function (e, n, t, l) {
            l.init(n), t.$observe("thumbnailSrc", function () {
                t.thumbnailSrc && l.prepareImage()
            }), t.$observe("thumbnailWidth", function () {
                t.thumbnailWidth && l.prepareImage()
            }), t.$observe("thumbnailHeight", function () {
                t.thumbnailHeight && l.prepareImage()
            })
        }
    }
}), angular.module("lumx.tooltip", []).controller("LxTooltipController", ["$scope", "$timeout", function (e, n) {
    var t, l, i, a, o, r, c, s = this;
    this.init = function (e, n) {
        c = e, l = n.lxTooltip, i = angular.isDefined(n.tooltipPosition) ? n.tooltipPosition : "top", a = angular.isDefined(n.tooltipColor) ? n.tooltipColor : "black", t = angular.element("<div/>", {"class": "tooltip tooltip--" + i + " tooltip--" + a}), r = angular.element("<div/>", {"class": "tooltip__background"}), o = angular.element("<span/>", {
            "class": "tooltip__label",
            text: l
        }), c.bind("mouseenter", function () {
            s.showTooltip()
        }), c.bind("mouseleave", function () {
            s.hideTooltip()
        })
    }, this.showTooltip = function () {
        var e = c.outerWidth(), n = c.outerHeight(), l = c.offset().top, a = c.offset().left;
        t.append(r).append(o).appendTo("body"), "top" === i ? t.css({
            left: a - t.outerWidth() / 2 + e / 2,
            top: l - t.outerHeight()
        }) : "bottom" === i ? t.css({
            left: a - t.outerWidth() / 2 + e / 2,
            top: l + n
        }) : "left" === i ? t.css({
            left: a - t.outerWidth(),
            top: l + n / 2 - t.outerHeight() / 2
        }) : "right" === i && t.css({
            left: a + e,
            top: l + n / 2 - t.outerHeight() / 2
        }), t.addClass("tooltip--is-active")
    }, this.update = function (e) {
        l = e, o.text(l)
    }, this.hideTooltip = function () {
        angular.isDefined(t) && (t.removeClass("tooltip--is-active"), n(function () {
            t.remove()
        }, 200))
    }, this.isDisplayed = function () {
        return angular.isDefined(t) && t.hasClass("tooltip--is-active")
    }, e.$on("$destroy", function (e) {
        angular.isDefined(t) && t.remove()
    })
}]).directive("lxTooltip", function () {
    return {
        restrict: "A", controller: "LxTooltipController", link: function (e, n, t, l) {
            t.$observe("lxTooltip", function () {
                t.lxTooltip ? l.isDisplayed() ? l.update(t.lxTooltip) : l.init(n, t) : l.hideTooltip()
            })
        }
    }
}), angular.module("lumx.dropdown").run(["$templateCache", function (e) {
    e.put("dropdown.html", '<div class="dropdown" ng-transclude="child"></div>\n'), e.put("dropdown-toggle.html", '<div ng-transclude="child"></div>\n'), e.put("dropdown-menu.html", '<div class="dropdown-menu dropdown-menu--{{ lxDropdownPosition }}" ng-class="{ \'dropdown__menu--is-dropped\': lxDropdownIsDropped }">\n    <div class="dropdown-menu__content" ng-transclude="child" ng-if="lxDropdownIsDropped"></div>\n</div>\n')
}]), angular.module("lumx.file-input").run(["$templateCache", function (e) {
    e.put("file-input.html", '<div class="input-file">\n    <span class="input-file__label" ng-bind-html="label | unsafe"></span>\n    <span class="input-file__filename"></span>\n    <input type="file">\n</div>\n')
}]), angular.module("lumx.text-field").run(["$templateCache", function (e) {
    e.put("text-field.html", "<div class=\"text-field text-field--{{ theme }}-theme\"\n     ng-class=\"{ 'text-field--is-valid': valid(),\n                 'text-field--has-error': error(),\n                 'text-field--is-disabled': disabled(),\n                 'text-field--fixed-label': fixedLabel(),\n                 'text-field--is-active': data.model || data.focused,\n                 'text-field--is-focused': data.focused,\n                 'text-field--label-hidden': fixedLabel() && data.model,\n                 'text-field--with-icon': icon && fixedLabel() }\">\n" + '    <label class="text-field__label" ng-bind-html="label | unsafe"></label>\n\n    <div class="text-field__icon" ng-if="icon && fixedLabel() ">\n        <i class="mdi mdi-{{ icon }}"></i>\n    </div>\n\n    <div ng-transclude="1"></div>\n</div>\n')
}]), angular.module("lumx.search-filter").run(["$templateCache", function (e) {
    e.put("search-filter.html", '<div class="search-filter search-filter--{{ theme }}-theme"\n     ng-class="{ \'search-filter--is-focused\': model,\n                 \'search-filter--is-closed\': closed }">\n    <div class="search-filter__container">\n        <label class="search-filter__label"><i class="mdi mdi-magnify"></i></label>\n        <input type="text" class="search-filter__input" placeholder="{{ placeholder }}" ng-model="model">\n        <span class="search-filter__cancel" ng-click="clear()"><i class="mdi mdi-close-circle"></i></span>\n    </div>\n</div>')
}]), angular.module("lumx.select").run(["$templateCache", function (e) {
    e.put("select.html", "<div class=\"lx-select\"\n     ng-class=\"{ 'lx-select--is-unique': !lxSelectMultiple,\n                 'lx-select--is-multiple': lxSelectMultiple,\n                 'lx-select--is-valid': lxSelectValid(),\n                 'lx-select--has-error': lxSelectError(),\n                 'lx-select--is-disabled': lxSelectDisabled() }\">\n" + '    <lx-dropdown width="32" over-toggle="true">\n        <div ng-transclude="child"></div>\n    </lx-dropdown>\n</div>\n'), e.put("select-selected.html", '<div lx-dropdown-toggle>\n    <span class="lx-select__floating-label" ng-if="lxSelectGetSelectedElements().length !== 0 && lxSelectFloatingLabel" ng-bind-html="lxSelectTrust(lxSelectPlaceholder)"></span>\n\n    <div class="lx-select__selected"\n         ng-class="{ \'lx-select__selected--is-unique\': !lxSelectMultiple,\n                     \'lx-select__selected--is-multiple\': lxSelectMultiple && lxSelectGetSelectedElements().length > 0,\n                     \'lx-select__selected--placeholder\': lxSelectGetSelectedElements().length === 0 }"\n         lx-ripple>\n        <span ng-if="lxSelectGetSelectedElements().length === 0" ng-bind-html="lxSelectTrust(lxSelectPlaceholder)"></span>\n\n        <div ng-if="!lxSelectMultiple && lxSelectGetSelectedElements().length === 1">\n            <i class="lx-select__close mdi mdi-close-circle" ng-click="lxSelectUnselect($selected, $event)" ng-if="lxSelectAllowClear"></i>\n            <span ng-transclude="child"></span>\n        </div>\n\n        <div ng-if="lxSelectMultiple">\n            <div class="lx-select__tag" ng-repeat="$selected in lxSelectGetSelectedElements()">\n                <span ng-transclude="child"></span>\n            </div>\n        </div>\n    </div>\n</div>\n'), e.put("select-choices.html", '<lx-dropdown-menu class="lx-select__choices {{ lxSelectCustom }}">\n    <ul ng-if="!lxSelectTree">\n        <li ng-if="lxSelectGetSelectedElements().length > 0">\n            <lx-select-choices-selected class="lx-select__chosen"\n                                        ng-class="{ \'lx-select__chosen--is-multiple\': lxSelectMultiple,\n                                                    \'lx-select__chosen--is-deletable\': lxSelectMultiple && (lxSelectGetSelectedElements().length > 1 || lxSelectAllowClear), }"\n                                        content="lxSelectData.selectedTemplate"></lx-select-choices-selected>\n        </li>\n\n        <li>\n            <div class="lx-select__filter dropdown-filter"\n                 ng-class="{ \'dropdown-filter\': !lxSelectCustom }">\n                <lx-search-filter model="lxSelectData.filter" filter-width="100%" lx-dropdown-filter></lx-search-filter>\n            </div>\n        </li>\n\n        <li class="lx-select__help" ng-if="lxSelectIsHelperVisible()">\n            <span ng-if="lxSelectFilterNeeded()">Type minimum {{ lxSelectMinLength }} to search</span>\n            <span ng-if="lxSelectHasNoResults() && !lxSelectFilterNeeded()">No results!</span>\n        </li>\n\n        <div ng-if="lxSelectIsChoicesVisible() && lxSelectIsChoicesArray()">\n            <li ng-repeat="$choice in lxSelectChoices() | filterChoices:lxSelectFilter:lxSelectData.filter | limitTo:lxSelectDefaultMaxResults track by $index">\n                <div class="lx-select__choice"\n                   ng-class="{ \'lx-select__choice--is-multiple\': lxSelectMultiple,\n                               \'lx-select__choice--is-selected\': lxSelectIsSelected($choice),\n                               \'dropdown-link\': !lxSelectCustom }"\n                   ng-click="lxSelectToggle($choice, $event)"\n                   ng-transclude="child"></div>\n            </li>\n        </div>\n\n        <div ng-if="lxSelectIsChoicesVisible() && !lxSelectIsChoicesArray()">\n            <li ng-repeat-start="($subheader, children) in lxSelectChoices()">\n                <span ng-class="{ \'dropdown-link dropdown-link--is-header\': !lxSelectCustom }"\n                      ng-bind-html="lxSelectTrust($subheader)"></span>\n            </li>\n\n            <li ng-repeat-end ng-repeat="$choice in children | filterChoices:lxSelectFilter:lxSelectData.filter | limitTo:lxSelectDefaultMaxResults track by $index">\n                <div class="lx-select__choice"\n                   ng-class="{ \'lx-select__choice--is-multiple\': lxSelectMultiple,\n                               \'lx-select__choice--is-selected\': lxSelectIsSelected($choice),\n                               \'dropdown-link\': !lxSelectCustom }"\n                   ng-click="lxSelectToggle($choice, $event)"\n                   ng-transclude="child"></div>\n            </li>\n        </div>\n\n        <li class="lx-select__loader" ng-if="lxSelectLoading === \'true\'">\n            <i class="mdi mdi-reload"></i>\n        </li>\n    </ul>\n</lx-dropdown-menu>\n')
}]), angular.module("lumx.tabs").run(["$templateCache", function (e) {
    e.put("tabs.html", '<div class="tabs tabs--theme-{{ lxTabsLinksTc }} tabs--layout-{{ lxTabsLayout }}"\n     ng-class="{ \'tabs--no-divider\': lsTabsNoDivider }">\n\n    <button class="tabs__pagination-left btn btn--m bgc-{{ lxTabsLinksBgc }}"\n            ng-click="lxTabsShowPrevPage()"\n            ng-if="lxTabsIsPaginationActive()"\n            ng-disabled="lxTabsIsPaginationLeftDisabled()">\n      <i class="mdi mdi-chevron-left"></i>\n    </button>\n\n    <ul class="tabs__links bgc-{{ lxTabsLinksBgc }} z-depth{{ lxTabsZDepth }}"\n        ng-class="{\'tabs__pagination-padding\': lxTabsIsPaginationActive()}">\n        <li ng-repeat="tab in lxTabsGetTabs() track by $index">\n            <a lx-tab-link\n               class="tabs-link"\n               ng-class="{ \'tabs-link--is-active\': $index === lxTabsActiveTab }"\n               ng-click="lxTabsSetActiveTab($index)"\n               lx-ripple="{{ lxTabsIndicator }}">\n               <span ng-if="tab.lxTabIcon !== undefined"><i class="{{ lxTabsIconPrefix }}{{ tab.lxTabIcon }}"></i></span>\n               <span ng-if="tab.lxTabIcon === undefined || lxTabsShowIconAndHeading">{{ tab.lxTabHeading }}</i></span>\n            </a>\n        </li>\n    </ul>\n\n    <button class="tabs__pagination-right btn btn--m bgc-{{ lxTabsLinksBgc }}"\n            ng-click="lxTabsShowNextPage()"\n            ng-if="lxTabsIsPaginationActive()"\n            ng-disabled="lxTabsIsPaginationRightDisabled()">\n      <i class="mdi mdi-chevron-right"></i>\n    </button>\n\n    <div class="tabs__panes" ng-transclude="child"></div>\n\n    <div class="tabs__indicator bgc-{{ lxTabsIndicator }}"></div>\n</div>\n'), e.put("tab.html", '<div class="tabs-pane" ng-if="lxTabIndex === lxTabData.lxTabsActiveTab" ng-transclude="child"></div>\n')
}]), angular.module("lumx.date-picker").run(["$templateCache", function (e) {
    e.put("date-picker.html", '<div class="lx-date" ng-class="{ \'lx-date--fixed-label\': fixedLabel(),\n                                 \'lx-date--with-icon\': icon && fixedLabel() }">\n\n    <div class="text-field__icon" ng-if="icon && fixedLabel() ">\n        <i class="mdi mdi-{{ icon }}"></i>\n    </div>\n\n    <!-- Date picker input -->\n    <div class="lx-date__input-wrapper">\n        <lx-text-field class="lx-date-input" label="{{ label }}" ng-click="openPicker()">\n            <input type="text" ng-model="selected.model" ng-disabled="true">\n        </lx-text-field>\n\n        <a class="lx-date__clear" ng-click="clearDate()" ng-if="allowClear">\n            <i class="mdi mdi-close-circle" ng-click="unselect($selected, $event)" ng-if="allowClear"></i>\n        </a>\n    </div>\n\n    <!-- Date picker -->\n    <div class="lx-date-picker">\n        <div ng-if="ctrlData.isOpen">\n            <div class="lx-date-picker__header">\n                <!-- Current day of week -->\n                <div class="lx-date-picker__current-day-of-week">\n                    <span>{{ moment(selected.date).format(\'dddd\') }}</span>\n                </div>\n\n                <!-- Current date -->\n                <div class="lx-date-picker__current-date">\n                    <span ng-class="{ \'tc-white-1\': !yearSelection, \'tc-white-3\': yearSelection }">{{ moment(selected.date).format(\'MMM\') }}</span>\n                    <strong ng-class="{ \'tc-white-1\': !yearSelection, \'tc-white-3\': yearSelection }">{{ moment(selected.date).format(\'DD\') }}</strong>\n                    <a ng-class="{ \'tc-white-3\': !yearSelection, \'tc-white-1\': yearSelection }" ng-click="displayYearSelection()">{{ moment(selected.date).format(\'YYYY\') }}</a>\n                </div>\n            </div>\n\n            <div class="lx-date-picker__content">\n                <!-- Calendar -->\n                <div class="lx-date-picker__calendar" ng-if="!yearSelection">\n                    <div class="lx-date-picker__nav">\n                        <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="previousMonth()">\n                            <i class="mdi mdi-chevron-left"></i>\n                        </button>\n\n                        <span>{{ activeDate.format(\'MMMM YYYY\') }}</span>\n\n                        <button class="btn btn--xs btn--teal btn--icon" lx-ripple ng-click="nextMonth()">\n                            <i class="mdi mdi-chevron-right"></i>\n                        </button>\n                    </div>\n\n                    <div class="lx-date-picker__days-of-week">\n                        <span ng-repeat="day in daysOfWeek">{{ day }}</span>\n                    </div>\n\n                    <div class="lx-date-picker__days">\n                        <span class="lx-date-picker__day lx-date-picker__day--is-empty"\n                              ng-repeat="x in emptyFirstDays">&nbsp;</span><!--\n\n                     --><div class="lx-date-picker__day"\n                             ng-class="{ \'lx-date-picker__day--is-selected\': day.selected,\n                                         \'lx-date-picker__day--is-today\': day.today }"\n                             ng-repeat="day in days">\n                            <a ng-click="select(day)">{{ day ? day.format(\'D\') : \'\' }}</a>\n                        </div><!--\n\n                     --><span class="lx-date-picker__day lx-date-picker__day--is-empty"\n                              ng-repeat="x in emptyLastDays">&nbsp;</span>\n                    </div>\n                </div>\n\n                <!-- Year selection -->\n                <div class="lx-date-picker__year-selector" ng-if="yearSelection">\n                    <a class="lx-date-picker__year"\n                         ng-class="{ \'lx-date-picker__year--is-active\': year == activeDate.format(\'YYYY\') }"\n                         ng-repeat="year in years"\n                         ng-click="selectYear(year)"\n                         ng-if="yearSelection">\n                        <span>{{ year }}</span>\n                    </a>\n                </div>\n            </div>\n\n            <!-- Actions -->\n            <div class="lx-date-picker__actions">\n                <button class="btn btn--m btn--teal btn--flat" lx-ripple ng-click="closePicker()">Ok</button>\n            </div>\n        </div>\n    </div>\n</div>\n')
}]), angular.module("lumx.progress").run(["$templateCache", function (e) {
    e.put("progress.html", '<div class="progress-container progress-container--{{ lxProgress.lxType }} progress-container--{{ lxProgress.lxColor }}"\n     ng-style="lxProgress.getProgressDiameter()">\n    <div class="progress-circular-wrapper" ng-if="lxProgress.lxType === \'circular\'">\n        <div class="progress-circular">\n            <div class="progress-circular__gap"></div>\n\n            <div class="progress-circular__left">\n                <div class="progress-circular__half-circle"></div>\n            </div>\n\n            <div class="progress-circular__right">\n                <div class="progress-circular__half-circle"></div>\n            </div>\n        </div>\n    </div>\n\n    <div class="progress-linear-wrapper" ng-if="lxProgress.lxType === \'linear\'">\n        <div class="progress-linear progress-linear--is-shown">\n            <div class="progress-linear__background"></div>\n            <div class="progress-linear__bar progress-linear__bar--first"></div>\n            <div class="progress-linear__bar progress-linear__bar--second"></div>\n        </div>\n    </div>\n</div>\n')
}]), angular.module("lumx.button").run(["$templateCache", function (e) {
    e.put("link.html", "<a ng-transclude lx-ripple></a>\n"), e.put("button.html", "<button ng-transclude lx-ripple></button>\n")
}]), angular.module("lumx.checkbox").run(["$templateCache", function (e) {
    e.put("checkbox.html", '<div class="checkbox checkbox--{{ lxCheckbox.lxColor }}">\n    <input id="{{ lxCheckbox.getCheckboxId() }}"\n           type="checkbox"\n           class="checkbox__input"\n           name="{{ lxCheckbox.name }}"\n           ng-model="lxCheckbox.ngModel"\n           ng-true-value="{{ lxCheckbox.ngTrueValue }}"\n           ng-false-value="{{ lxCheckbox.ngFalseValue }}"\n           ng-change="lxCheckbox.ngChange()"\n           ng-disabled="lxCheckbox.ngDisabled">\n\n    <label for="{{ lxCheckbox.getCheckboxId() }}" class="checkbox__label" ng-transclude ng-if="!lxCheckbox.getCheckboxHasChildren()"></label>\n    <ng-transclude-replace ng-if="lxCheckbox.getCheckboxHasChildren()"></ng-transclude-replace>\n</div>\n'), e.put("checkbox-label.html", '<label for="{{ lxCheckboxLabel.getCheckboxId() }}" class="checkbox__label" ng-transclude></label>\n'), e.put("checkbox-help.html", '<span class="checkbox__help" ng-transclude></span>\n')
}]), angular.module("lumx.radio-button").run(["$templateCache", function (e) {
    e.put("radio-group.html", '<div class="radio-group" ng-transclude></div>\n'), e.put("radio-button.html", '<div class="radio-button radio-button--{{ lxRadioButton.lxColor }}">\n    <input id="{{ lxRadioButton.getRadioButtonId() }}"\n           type="radio"\n           class="radio-button__input"\n           name="{{ lxRadioButton.name }}"\n           ng-model="lxRadioButton.ngModel"\n           ng-value="lxRadioButton.ngValue"\n           ng-change="lxRadioButton.ngChange()"\n           ng-disabled="lxRadioButton.ngDisabled">\n\n    <label for="{{ lxRadioButton.getRadioButtonId() }}" class="radio-button__label" ng-transclude ng-if="!lxRadioButton.getRadioButtonHasChildren()"></label>\n    <ng-transclude-replace ng-if="lxRadioButton.getRadioButtonHasChildren()"></ng-transclude-replace>\n</div>\n'), e.put("radio-button-label.html", '<label for="{{ lxRadioButtonLabel.getRadioButtonId() }}" class="radio-button__label" ng-transclude></label>\n'), e.put("radio-button-help.html", '<span class="radio-button__help" ng-transclude></span>\n')
}]), angular.module("lumx.switch").run(["$templateCache", function (e) {
    e.put("switch_label.html", '<label for="{{ lxSwitchLabel.getSwitchId() }}" class="switch__label" ng-transclude></label>\n'), e.put("switch_help.html", '<span class="switch__help" ng-transclude></span>\n'), e.put("switch.html", '<div class="switch switch--{{ lxSwitch.lxColor }}">\n    <input id="{{ lxSwitch.getSwitchId() }}"\n           type="checkbox"\n           class="switch__input"\n           name="{{ lxSwitch.name }}"\n           ng-model="lxSwitch.ngModel"\n           ng-true-value="{{ lxSwitch.ngTrueValue }}"\n           ng-false-value="{{ lxSwitch.ngFalseValue }}"\n           ng-change="lxSwitch.ngChange()"\n           ng-disabled="lxSwitch.ngDisabled">\n\n    <label for="{{ lxSwitch.getSwitchId() }}" class="switch__label" ng-transclude ng-if="!lxSwitch.getSwitchHasChildren()"></label>\n    <ng-transclude-replace ng-if="lxSwitch.getSwitchHasChildren()"></ng-transclude-replace>\n</div>\n')
}]), angular.module("lumx.fab").run(["$templateCache", function (e) {
    e.put("fab.html", '<div class="fab">\n    <ng-transclude-replace></ng-transclude-replace>\n\n    <lx-progress class="fab__progress"\n                 lx-type="circular" lx-color="{{ lxFab.lxFabProgressColor }}" lx-diameter="64"\n                 ng-if="lxFab.lxFabProgress"></lx-progress>\n</div>\n'),
        e.put("fab-trigger.html", '<div class="fab__primary" ng-transclude></div>\n'), e.put("fab-actions.html", '<div class="fab__actions fab__actions--{{ parentCtrl.lxDirection }}" ng-transclude></div>\n')
}]);