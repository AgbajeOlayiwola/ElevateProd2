(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4156],
    {
        9974: function (e, t, s) {
            'use strict';
            var n = s(59499),
                r = s(11163),
                a = s(67294),
                c = (s(96930), s(78868), s(47041), s(61120), s(9473)),
                o = s(85893);
            function i(e, t) {
                var s = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t &&
                        (n = n.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable;
                        })),
                        s.push.apply(s, n);
                }
                return s;
            }
            t.Z = function (e) {
                return function (t) {
                    (0, c.I0)();
                    var s = (0, r.useRouter)(),
                        l = (0, a.useState)(!1),
                        u = l[0],
                        d = l[1],
                        h = (0, a.useState)(''),
                        _ = (h[0], h[1], (0, a.useState)('')),
                        v =
                            (_[0],
                            _[1],
                            (0, c.v9)(function (e) {
                                return e.accountPrimaryReducer;
                            }));
                    v.accountPrimary, v.accountPrimaryError;
                    if (
                        ((0, a.useEffect)(function () {
                            localStorage.getItem('token')
                                ? d(!0)
                                : (s.replace('../Auth/Login'), d(!1));
                        }, []),
                        u)
                    )
                        return (0, o.jsx)(
                            e,
                            (function (e) {
                                for (var t = 1; t < arguments.length; t++) {
                                    var s =
                                        null != arguments[t]
                                            ? arguments[t]
                                            : {};
                                    t % 2
                                        ? i(Object(s), !0).forEach(function (
                                              t
                                          ) {
                                              (0, n.Z)(e, t, s[t]);
                                          })
                                        : Object.getOwnPropertyDescriptors
                                        ? Object.defineProperties(
                                              e,
                                              Object.getOwnPropertyDescriptors(
                                                  s
                                              )
                                          )
                                        : i(Object(s)).forEach(function (t) {
                                              Object.defineProperty(
                                                  e,
                                                  t,
                                                  Object.getOwnPropertyDescriptor(
                                                      s,
                                                      t
                                                  )
                                              );
                                          });
                                }
                                return e;
                            })({}, t)
                        );
                };
            };
        },
        15040: function (e, t, s) {
            'use strict';
            s(67294);
            var n = s(85893);
            t.Z = function () {
                return (0, n.jsx)('svg', {
                    width: '8',
                    height: '5',
                    viewBox: '0 0 8 5',
                    fill: 'none',
                    xmlns: 'http://www.w3.org/2000/svg',
                    children: (0, n.jsx)('path', {
                        d: 'M1 1L4 4L7 1',
                        stroke: '#005B82',
                        strokeWidth: '1.66667',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                    })
                });
            };
        },
        86917: function (e, t, s) {
            'use strict';
            var n = s(67294),
                r = s(87623),
                a = s(36981),
                c = s.n(a),
                o = s(27640),
                i = s(11163),
                l = s(61120),
                u = s(9473),
                d = s(85893);
            t.Z = function (e) {
                var t = e.children,
                    s = e.page,
                    a = e.text,
                    h = e.action,
                    _ = e.preview,
                    v = e.previewSingle,
                    y = e.productAction,
                    p = (0, n.useState)(!1),
                    m = p[0],
                    f = p[1],
                    j = (0, n.useState)(''),
                    x = (j[0], j[1], (0, i.useRouter)()),
                    b = (0, u.I0)();
                return (0, d.jsxs)('div', {
                    className: c().dash,
                    children: [
                        (0, d.jsx)('div', {
                            className: m ? c().sidebar : c().sidebarActive,
                            children: (0, d.jsx)(r.YE, {
                                showSubnav: function () {
                                    f(!1);
                                }
                            })
                        }),
                        (0, d.jsx)(o.Z, {
                            timeout: 3e5,
                            onChange: function (e) {
                                e.idle &&
                                    (b((0, l.Cds)()),
                                    localStorage.getItem('user') ||
                                        x.replace('../Auth/Login'));
                            }
                        }),
                        m
                            ? null
                            : (0, d.jsxs)('div', {
                                  className: c().dashCont,
                                  children: [
                                      (0, d.jsx)(r.wp, {
                                          page: s,
                                          text: a,
                                          action: h,
                                          preview: _,
                                          previewSingle: v,
                                          productAction: y,
                                          sideAction: function () {
                                              f(!0);
                                          }
                                      }),
                                      t
                                  ]
                              })
                    ]
                });
            };
        },
        34212: function (e, t, s) {
            'use strict';
            s(67294);
            var n = s(65178);
            s(85893),
                n.ZP.div.withConfig({
                    displayName: 'Popup__PopupStyle',
                    componentId: 'sc-pgo5go-0'
                })([
                    'width:48%;max-width:600px;background-color:white;border-radius:20px;margin:32px auto;display:flex;position:absolute;top:10%;left:30%;z-index:10;'
                ]);
        },
        51225: function (e, t, s) {
            'use strict';
            s.r(t),
                s.d(t, {
                    default: function () {
                        return H;
                    }
                });
            var n = s(67294),
                r = s(86917),
                a = s(21817),
                c = s.n(a),
                o = s(58858),
                i = s(85893),
                l = function () {
                    return (0, i.jsx)('svg', {
                        width: '30',
                        height: '30',
                        viewBox: '0 0 30 30',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: (0, i.jsx)('path', {
                            d:
                                'M4.66314 1.00977H11.0832L14.2932 9.12063L10.2807 11.5539C11.9996 15.0765 14.8204 17.9275 18.3057 19.6647L20.7132 15.6093L28.7382 18.8537V25.3423C28.7382 26.2028 28.4 27.028 27.798 27.6364C27.196 28.2449 26.3796 28.5867 25.5282 28.5867C19.2675 28.2022 13.3625 25.5151 8.92736 21.0325C4.49221 16.5499 1.83359 10.5818 1.45312 4.25411C1.45312 3.39366 1.79132 2.56844 2.39332 1.96001C2.99531 1.35158 3.81179 1.00977 4.66314 1.00977',
                            stroke: '#6CCF00',
                            strokeWidth: '1.5',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round'
                        })
                    });
                },
                u = (s(46066), s(41548), s(11163)),
                d = (s(73873), s(17131), s(25025)),
                h = s.n(d),
                _ = s(41664),
                v = s.n(_),
                y = function (e) {
                    var t = e.account;
                    return (0, i.jsxs)('div', {
                        className: h().cove,
                        children: [
                            (0, i.jsxs)('div', {
                                className: h().coveBody,
                                children: [
                                    (0, i.jsx)('div', { className: h().left }),
                                    (0, i.jsxs)('div', {
                                        className: h().level,
                                        children: [
                                            (0, i.jsx)('p', {
                                                className: h().Levelup,
                                                children: 'LEVEL UP CHAMP'
                                            }),
                                            (0, i.jsx)('p', {
                                                className: h().YourBus,
                                                children:
                                                    'Your business account is not fully up. Complete account upgrade to access unlimited benefits.'
                                            })
                                        ]
                                    })
                                ]
                            }),
                            (0, i.jsx)(v(), {
                                href: './AccountUpgrade',
                                children: (0, i.jsxs)('button', {
                                    children: [
                                        'INDIVIDUAL' === t.customerCategory
                                            ? 'Upgrade Account'
                                            : (!0 ===
                                                  t.createdFromEcobankCred &&
                                                  t.customerCategory,
                                              'Update Documents'),
                                        ' '
                                    ]
                                })
                            })
                        ]
                    });
                },
                p = s(59499),
                m = (s(31877), s(53328));
            const f = 'label';
            function j(e, t) {
                'function' === typeof e ? e(t) : e && (e.current = t);
            }
            function x(e, t) {
                e.labels = t;
            }
            function b(e, t) {
                let s =
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : f;
                const n = [];
                e.datasets = t.map((t) => {
                    const r = e.datasets.find((e) => e[s] === t[s]);
                    return r && t.data && !n.includes(r)
                        ? (n.push(r), Object.assign(r, t), r)
                        : { ...t };
                });
            }
            function g(e) {
                let t =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : f;
                const s = { labels: [], datasets: [] };
                return x(s, e.labels), b(s, e.datasets, t), s;
            }
            function N(e, t) {
                let {
                    height: s = 150,
                    width: r = 300,
                    redraw: a = !1,
                    datasetIdKey: c,
                    type: o,
                    data: i,
                    options: l,
                    plugins: u = [],
                    fallbackContent: d,
                    updateMode: h,
                    ..._
                } = e;
                const v = (0, n.useRef)(null),
                    y = (0, n.useRef)(),
                    p = () => {
                        v.current &&
                            ((y.current = new m.kL(v.current, {
                                type: o,
                                data: g(i, c),
                                options: l && { ...l },
                                plugins: u
                            })),
                            j(t, y.current));
                    },
                    f = () => {
                        j(t, null),
                            y.current &&
                                (y.current.destroy(), (y.current = null));
                    };
                return (
                    (0, n.useEffect)(() => {
                        var e, t;
                        !a &&
                            y.current &&
                            l &&
                            ((e = y.current),
                            (t = l),
                            Object.assign(e.options, t));
                    }, [a, l]),
                    (0, n.useEffect)(() => {
                        !a && y.current && x(y.current.config.data, i.labels);
                    }, [a, i.labels]),
                    (0, n.useEffect)(() => {
                        !a &&
                            y.current &&
                            i.datasets &&
                            b(y.current.config.data, i.datasets, c);
                    }, [a, i.datasets]),
                    (0, n.useEffect)(() => {
                        y.current &&
                            (a ? (f(), setTimeout(p)) : y.current.update(h));
                    }, [a, l, i.labels, i.datasets, h]),
                    (0, n.useEffect)(() => {
                        y.current && (f(), setTimeout(p));
                    }, [o]),
                    (0, n.useEffect)(() => (p(), () => f()), []),
                    n.createElement(
                        'canvas',
                        Object.assign(
                            { ref: v, role: 'img', height: s, width: r },
                            _
                        ),
                        d
                    )
                );
            }
            const w = (0, n.forwardRef)(N);
            function S(e, t) {
                return (
                    m.kL.register(t),
                    (0, n.forwardRef)((t, s) =>
                        n.createElement(
                            w,
                            Object.assign({}, t, { ref: s, type: e })
                        )
                    )
                );
            }
            const I = S('line', m.ST);
            var E = s(9473),
                k = s(61120),
                C = s(35849);
            function P(e, t) {
                var s = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t &&
                        (n = n.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable;
                        })),
                        s.push.apply(s, n);
                }
                return s;
            }
            function D(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var s = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? P(Object(s), !0).forEach(function (t) {
                              (0, p.Z)(e, t, s[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(s)
                          )
                        : P(Object(s)).forEach(function (t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(s, t)
                              );
                          });
                }
                return e;
            }
            var O = function () {
                    var e = (0, E.v9)(function (e) {
                            return e.transactionElevateReducer;
                        }),
                        t = e.transactionElevate,
                        s =
                            (e.errorMessageTransactionElevate,
                            (0, n.useState)([])),
                        r = (s[0], s[1], (0, n.useState)([])),
                        a = (r[0], r[1], (0, n.useState)([])),
                        c = (a[0], a[1], (0, n.useState)([])),
                        o = (c[0], c[1], (0, n.useState)([])),
                        l =
                            (o[0],
                            o[1],
                            (0, n.useState)({
                                labels: [
                                    'Sun',
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thr',
                                    'Fri',
                                    'Sat'
                                ],
                                datasets: [
                                    {
                                        data: [],
                                        fill: !0,
                                        backgroundColor: 'rgba(75,192,192,0.1)',
                                        borderColor: 'red',
                                        tension: 0.6,
                                        label: 'Inflow'
                                    }
                                ]
                            })),
                        u = l[0],
                        d = l[1],
                        h = (0, E.I0)(),
                        _ = (0, n.useState)([]),
                        v = (_[0], _[1], (0, n.useState)());
                    v[0], v[1];
                    (0, n.useEffect)(function () {
                        return y();
                    }, []),
                        (0, n.useEffect)(function () {
                            h((0, k.kEI)());
                        }, []),
                        (0, n.useEffect)(
                            function () {
                                return y;
                            },
                            [t]
                        );
                    var y = function () {
                            var e = [
                                    'Sun',
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat'
                                ],
                                s = [
                                    'BILL_PAYMENT',
                                    'AIRTIME_TOPUP',
                                    'SINGLE_TRANSFER'
                                ],
                                n = new Date().getDay(),
                                r = [],
                                a = [0, 0, 0, 0, 0, 0, 0];
                            if (null !== t)
                                for (
                                    var c = function (c) {
                                            var o =
                                                n + c > 6 ? (n + c) % 7 : n + c;
                                            (r[c] = e[o]),
                                                t.transactions.map(function (
                                                    e
                                                ) {
                                                    (o = new Date(
                                                        e.transactionDate
                                                    ).getDay()) &&
                                                        s.indexOf(
                                                            e.transactionType
                                                        ) &&
                                                        (a[o] =
                                                            a[o] +
                                                            Number(
                                                                e.transactionAmount
                                                            ));
                                                });
                                        },
                                        o = 0;
                                    o <= 6;
                                    o++
                                )
                                    c(o);
                            d(
                                D(
                                    D({}, u),
                                    {},
                                    {
                                        labels: r,
                                        datasets: [
                                            D(
                                                D({}, u.datasets[0]),
                                                {},
                                                { data: a }
                                            )
                                        ]
                                    }
                                )
                            );
                        },
                        p = (0, n.useState)({
                            scales: {
                                x: { grid: { display: !0 } },
                                y: { grid: { display: !1 } }
                            }
                        }),
                        m = p[0];
                    p[1];
                    return (0, i.jsx)('div', {
                        children: (0, i.jsx)(I, { options: m, data: u })
                    });
                },
                T = s(75672),
                L = s.n(T),
                A = s(20094),
                M = function () {
                    var e = (0, n.useState)(!1),
                        t = e[0],
                        s = e[1];
                    return (0, i.jsxs)('div', {
                        className: L().body,
                        children: [
                            (0, i.jsx)('button', {
                                className: L().make,
                                onClick: function () {
                                    return s(!t);
                                },
                                children: 'Make Payment'
                            }),
                            (0, i.jsx)(A.Z, {
                                onClickOutside: function () {
                                    s(!1);
                                },
                                children: (0, i.jsx)('div', {
                                    className: t ? L().dat : L().dontshow,
                                    children: C.Li.map(function (e, t) {
                                        return (0,
                                        i.jsxs)('div', { className: L().comp, children: [(0, i.jsx)('p', { children: e.icon }), (0, i.jsx)(v(), { href: { pathname: './Payment', query: { id: e.path } }, children: e.title })] }, t);
                                    })
                                })
                            })
                        ]
                    });
                },
                R = s(18500),
                B = s.n(R),
                U = function () {
                    var e = (0, n.useState)(!1),
                        t = e[0],
                        s = e[1];
                    return (0, i.jsxs)('div', {
                        className: B().body,
                        children: [
                            (0, i.jsx)('button', {
                                className: B().rec,
                                onClick: function () {
                                    return s(!t);
                                },
                                children: 'Receive Payment'
                            }),
                            (0, i.jsx)(A.Z, {
                                onClickOutside: function () {
                                    s(!1);
                                },
                                children: (0, i.jsx)('div', {
                                    className: t ? B().dat : B().dontshow,
                                    children: C.g.map(function (e, t) {
                                        return (0,
                                        i.jsxs)('div', { className: B().comp, children: [(0, i.jsx)('p', { children: e.icon }), (0, i.jsx)(v(), { href: { pathname: './Payment', query: { id: e.path } }, children: e.title })] }, t);
                                    })
                                })
                            })
                        ]
                    });
                },
                Z = function () {
                    return (0, i.jsxs)('svg', {
                        width: '82',
                        height: '108',
                        viewBox: '0 0 82 108',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: [
                            (0, i.jsx)('path', {
                                d:
                                    'M74.2583 13.2324H7.74167C4.91581 13.2324 2.625 15.5232 2.625 18.3491V100.216C2.625 103.042 4.91581 105.332 7.74167 105.332H74.2583C77.0842 105.332 79.375 103.042 79.375 100.216V18.3491C79.375 15.5232 77.0842 13.2324 74.2583 13.2324Z',
                                stroke: '#D9D9D9',
                                strokeWidth: '5',
                                strokeLinejoin: 'round'
                            }),
                            (0, i.jsx)('path', {
                                d:
                                    'M25.6479 3V18.35M56.3479 3V18.35M20.5312 41.375H61.4646M20.5312 61.8417H51.2312M20.5312 82.3083H40.9979',
                                stroke: '#D9D9D9',
                                strokeWidth: '5',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round'
                            })
                        ]
                    });
                },
                F = s(80883),
                Y = s(43468),
                W = s(38526),
                q = (s(49153), s(33785), s(39728), s(9974));
            s(34212), s(15040);
            var H = (0, q.Z)(function () {
                var e,
                    t,
                    s,
                    a = (0, E.I0)(),
                    d = (0, u.useRouter)(),
                    h = (0, n.useState)(),
                    _ = h[0],
                    p = h[1],
                    m = (0, n.useState)(),
                    f = m[0],
                    j = m[1],
                    x = (0, n.useState)(),
                    b = x[0],
                    g = x[1],
                    N = (0, n.useState)(!0),
                    w = (N[0], N[1], (0, n.useState)('\u20a60.00')),
                    S = w[0],
                    I = w[1],
                    C = (0, n.useState)([]),
                    P = C[0],
                    D = C[1],
                    T = (0, n.useState)([]),
                    L = T[0],
                    A = T[1],
                    R = (0, n.useState)(!1),
                    B = R[0],
                    q = R[1],
                    H = (0, n.useState)(''),
                    Q = H[0],
                    V = H[1],
                    G = (0, n.useState)(''),
                    K = (G[0], G[1]),
                    z = (0, E.v9)(function (e) {
                        return e.transactionElevateReducer;
                    }),
                    X = z.transactionElevate,
                    J =
                        (z.errorMessageTransactionElevate,
                        (0, E.v9)(function (e) {
                            return e.balanceEnquiryReducer;
                        })),
                    $ = J.balanceEnquiry,
                    ee =
                        (J.errorMessageBalanceEnquiry,
                        (0, E.v9)(function (e) {
                            return e.accountPrimaryReducer;
                        })),
                    te = ee.accountPrimarys,
                    se =
                        (ee.accountPrimaryError,
                        (0, E.v9)(function (e) {
                            return e.bankAccountsReducer;
                        })),
                    ne = se.bankAccounts,
                    re =
                        (se.bankAccountErrorMessages,
                        (0, E.v9)(function (e) {
                            return e.userProfileReducer;
                        }).userProfile);
                (0, n.useEffect)(
                    function () {
                        if (null !== $) {
                            var e = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'NGN',
                                currencyDisplay: 'narrowSymbol'
                            }).format($.availableBalance);
                            I(e);
                        }
                    },
                    [$]
                );
                (0, n.useEffect)(function () {
                    a((0, k.LsN)()),
                        a((0, k.qDp)()),
                        a((0, k.uLZ)()),
                        a((0, k.kEI)()),
                        (function () {
                            var e = new Date(),
                                t = e.getDate(),
                                s = e.getMonth() + 1,
                                n = e.getFullYear();
                            j(
                                ''
                                    .concat(n, '-')
                                    .concat(
                                        s < 10 ? '0'.concat(s) : ''.concat(s),
                                        '-'
                                    )
                                    .concat(
                                        t < 10 ? '0'.concat(t) : ''.concat(t)
                                    )
                            );
                        })(),
                        (function (e) {
                            var t =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : new Date(),
                                s = new Date();
                            s.setDate(t.getDate() - e);
                            var n = s.getDate(),
                                r = s.getMonth() + 1,
                                a = s.getFullYear();
                            g(
                                ''
                                    .concat(a, '-')
                                    .concat(
                                        r < 10 ? '0'.concat(r) : ''.concat(r),
                                        '-'
                                    )
                                    .concat(
                                        n < 10 ? '0'.concat(n) : ''.concat(n)
                                    )
                            );
                        })(2);
                }, []),
                    (0, n.useEffect)(
                        function () {
                            var e;
                            null === (e = Object.keys(ne)) ||
                                void 0 === e ||
                                e.map(function (e) {
                                    var t;
                                    ne[e].accountNumber === Q
                                        ? (K(te),
                                          (t = { accountId: ne[e].accountId }),
                                          a((0, k.h2$)(t)))
                                        : K('Pending');
                                });
                        },
                        [Q]
                    );
                var ae = (0, n.useState)(''),
                    ce = (ae[0], ae[1]);
                function oe() {
                    var e =
                        null === globalThis || void 0 === globalThis
                            ? void 0
                            : globalThis.sessionStorage;
                    if (e) {
                        var t = e.getItem('currentPath');
                        e.setItem('prevPath', t),
                            e.setItem(
                                'currentPath',
                                globalThis.location.pathname
                            ),
                            ce(t);
                    }
                }
                (0, n.useEffect)(
                    function () {
                        return oe;
                    },
                    [d.asPath]
                ),
                    (0, n.useEffect)(
                        function () {
                            null !== re && A(re);
                        },
                        [re]
                    );
                var ie = new Date();
                ''
                    .concat(ie.getFullYear(), '-')
                    .concat(ie.getMonth() + 1, '-0')
                    .concat(ie.getDate());
                return (
                    (0, n.useEffect)(
                        function () {
                            null !== X &&
                                (D(X.transactions),
                                null === P ||
                                    void 0 === P ||
                                    P.filter(function (e) {
                                        e.transactionDate.split('T')[0] == f
                                            ? q(!0)
                                            : q(!1);
                                    }));
                        },
                        [X]
                    ),
                    (0, i.jsxs)(r.Z, {
                        page: 'Dashboard',
                        children: [
                            (0, i.jsx)(y, { account: L }),
                            (0, i.jsxs)('div', {
                                className: c().cove,
                                children: [
                                    (0, i.jsxs)('section', {
                                        className: c().sectionI,
                                        children: [
                                            (0, i.jsxs)('div', {
                                                className: c().Tpwh,
                                                children: [
                                                    (0, i.jsx)('h2', {
                                                        className: c().transP,
                                                        children:
                                                            'Transactions Today'
                                                    }),
                                                    !1 === B
                                                        ? (0, i.jsx)('div', {
                                                              className: c()
                                                                  .transactionBody,
                                                              children: (0,
                                                              i.jsxs)('div', {
                                                                  children: [
                                                                      (0,
                                                                      i.jsx)(
                                                                          'div',
                                                                          {
                                                                              className: c()
                                                                                  .transactionSvg,
                                                                              children: (0,
                                                                              i.jsx)(
                                                                                  Z,
                                                                                  {}
                                                                              )
                                                                          }
                                                                      ),
                                                                      (0,
                                                                      i.jsx)(
                                                                          'p',
                                                                          {
                                                                              children:
                                                                                  'No transactions has been made today.'
                                                                          }
                                                                      )
                                                                  ]
                                                              })
                                                          })
                                                        : null === P ||
                                                          void 0 === P ||
                                                          null ===
                                                              (e = P.filter(
                                                                  function (e) {
                                                                      var t = e.transactionDate.split(
                                                                          'T'
                                                                      );
                                                                      return (
                                                                          t[0] >=
                                                                              b &&
                                                                          t[0] <=
                                                                              f
                                                                      );
                                                                  }
                                                              )) ||
                                                          void 0 === e
                                                        ? void 0
                                                        : e.map(function (
                                                              e,
                                                              t
                                                          ) {
                                                              var s,
                                                                  n = new Intl.NumberFormat(
                                                                      'en-US',
                                                                      {
                                                                          style:
                                                                              'currency',
                                                                          currency:
                                                                              'NGN',
                                                                          currencyDisplay:
                                                                              'narrowSymbol'
                                                                      }
                                                                  ).format(
                                                                      e.transactionAmount
                                                                  );
                                                              null ===
                                                                  e.receiversName ||
                                                                  null === e ||
                                                                  void 0 ===
                                                                      e ||
                                                                  null ===
                                                                      (s =
                                                                          e.receiversName) ||
                                                                  void 0 ===
                                                                      s ||
                                                                  s.split(' ');
                                                              return (0,
                                                              i.jsxs)(
                                                                  'div',
                                                                  {
                                                                      children: [
                                                                          (0,
                                                                          i.jsxs)(
                                                                              'div',
                                                                              {
                                                                                  className: c()
                                                                                      .transaction,
                                                                                  children: [
                                                                                      (0,
                                                                                      i.jsx)(
                                                                                          'div',
                                                                                          {
                                                                                              className: c()
                                                                                                  .type,
                                                                                              children: (0,
                                                                                              i.jsx)(
                                                                                                  'p',
                                                                                                  {
                                                                                                      children:
                                                                                                          e.transactionType
                                                                                                  }
                                                                                              )
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      i.jsx)(
                                                                                          'div',
                                                                                          {
                                                                                              className: c()
                                                                                                  .money,
                                                                                              children: (0,
                                                                                              i.jsx)(
                                                                                                  'p',
                                                                                                  {
                                                                                                      children: n
                                                                                                  }
                                                                                              )
                                                                                          }
                                                                                      ),
                                                                                      (0,
                                                                                      i.jsx)(
                                                                                          'div',
                                                                                          {
                                                                                              className:
                                                                                                  e.status,
                                                                                              children: (0,
                                                                                              i.jsx)(
                                                                                                  'div',
                                                                                                  {
                                                                                                      className: c()
                                                                                                          .statusColor,
                                                                                                      children: (0,
                                                                                                      i.jsx)(
                                                                                                          'p',
                                                                                                          {
                                                                                                              children:
                                                                                                                  e.transactionStatus
                                                                                                          }
                                                                                                      )
                                                                                                  }
                                                                                              )
                                                                                          }
                                                                                      )
                                                                                  ]
                                                                              }
                                                                          ),
                                                                          (0,
                                                                          i.jsx)(
                                                                              'hr',
                                                                              {
                                                                                  className: c()
                                                                                      .hr
                                                                              }
                                                                          )
                                                                      ]
                                                                  },
                                                                  t
                                                              );
                                                          })
                                                ]
                                            }),
                                            (0, i.jsx)('div', {
                                                className: c().otherTrans,
                                                children: (0, i.jsx)('p', {
                                                    children:
                                                        'Other Transaction'
                                                })
                                            }),
                                            (0, i.jsxs)('div', {
                                                className: c().divCover,
                                                children: [
                                                    (0, i.jsx)(v(), {
                                                        href: {
                                                            pathname:
                                                                './Payment',
                                                            query: {
                                                                id:
                                                                    'Bills Payment'
                                                            }
                                                        },
                                                        children: (0,
                                                        i.jsxs)('div', {
                                                            className: c()
                                                                .dinCLass,
                                                            children: [
                                                                (0,
                                                                i.jsx)('div', {
                                                                    className: c()
                                                                        .svg,
                                                                    children: (0,
                                                                    i.jsx)(
                                                                        l,
                                                                        {}
                                                                    )
                                                                }),
                                                                (0, i.jsx)(
                                                                    'p',
                                                                    {
                                                                        className: c()
                                                                            .name,
                                                                        children:
                                                                            ' Airtime & Data'
                                                                    }
                                                                )
                                                            ]
                                                        })
                                                    }),
                                                    (0, i.jsx)(v(), {
                                                        href: {
                                                            pathname:
                                                                './Payment',
                                                            query: {
                                                                id:
                                                                    'Ecobank QR Only'
                                                            }
                                                        },
                                                        children: (0,
                                                        i.jsxs)('div', {
                                                            className: c()
                                                                .dinCLass,
                                                            children: [
                                                                (0,
                                                                i.jsx)('div', {
                                                                    className: c()
                                                                        .svg,
                                                                    children: (0,
                                                                    i.jsx)(
                                                                        F.Z,
                                                                        {}
                                                                    )
                                                                }),
                                                                (0, i.jsx)(
                                                                    'p',
                                                                    {
                                                                        className: c()
                                                                            .name,
                                                                        children:
                                                                            'Ecobank QR Code'
                                                                    }
                                                                )
                                                            ]
                                                        })
                                                    }),
                                                    (0, i.jsx)(v(), {
                                                        href: {
                                                            pathname:
                                                                './Payment',
                                                            query: {
                                                                id: 'USSD only'
                                                            }
                                                        },
                                                        children: (0,
                                                        i.jsxs)('div', {
                                                            className: c()
                                                                .dinCLass,
                                                            children: [
                                                                (0,
                                                                i.jsx)('div', {
                                                                    className: c()
                                                                        .svg,
                                                                    children: (0,
                                                                    i.jsx)(
                                                                        Y.Z,
                                                                        {}
                                                                    )
                                                                }),
                                                                (0, i.jsx)(
                                                                    'p',
                                                                    {
                                                                        className: c()
                                                                            .name,
                                                                        children:
                                                                            'USSD'
                                                                    }
                                                                )
                                                            ]
                                                        })
                                                    }),
                                                    (0, i.jsx)(v(), {
                                                        href: {
                                                            pathname:
                                                                './Payment',
                                                            query: {
                                                                id:
                                                                    'Single Transfer'
                                                            }
                                                        },
                                                        children: (0,
                                                        i.jsxs)('div', {
                                                            className: c()
                                                                .dinCLass,
                                                            children: [
                                                                (0,
                                                                i.jsx)('div', {
                                                                    className: c()
                                                                        .svg,
                                                                    children: (0,
                                                                    i.jsx)(
                                                                        W.Z,
                                                                        {}
                                                                    )
                                                                }),
                                                                (0, i.jsx)(
                                                                    'p',
                                                                    {
                                                                        className: c()
                                                                            .name,
                                                                        children:
                                                                            'Single Transfer'
                                                                    }
                                                                )
                                                            ]
                                                        })
                                                    })
                                                ]
                                            }),
                                            (0, i.jsxs)('div', {
                                                className: c().btmI,
                                                children: [
                                                    (0, i.jsxs)('div', {
                                                        className: c().btmItop,
                                                        children: [
                                                            (0, i.jsx)('p', {
                                                                children:
                                                                    'Cash Flow'
                                                            }),
                                                            (0, i.jsx)(
                                                                'select',
                                                                {
                                                                    className: c()
                                                                        .day,
                                                                    children: (0,
                                                                    i.jsx)(
                                                                        'option',
                                                                        {
                                                                            children:
                                                                                'Last 7 Days'
                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        ]
                                                    }),
                                                    (0, i.jsx)(O, {})
                                                ]
                                            })
                                        ]
                                    }),
                                    (0, i.jsxs)('section', {
                                        className: c().sectionII,
                                        children: [
                                            (0, i.jsxs)('div', {
                                                className: c().moneyCont,
                                                children: [
                                                    (0, i.jsxs)('div', {
                                                        className: c().card,
                                                        children: [
                                                            (0, i.jsxs)('div', {
                                                                className: c()
                                                                    .cardRight,
                                                                children: [
                                                                    (0, i.jsx)(
                                                                        'div',
                                                                        {
                                                                            className: c()
                                                                                .moneyBody,
                                                                            children: (0,
                                                                            i.jsxs)(
                                                                                'div',
                                                                                {
                                                                                    className: c()
                                                                                        .moneybodyDiv,
                                                                                    children: [
                                                                                        (0,
                                                                                        i.jsxs)(
                                                                                            'div',
                                                                                            {
                                                                                                children: [
                                                                                                    (0,
                                                                                                    i.jsxs)(
                                                                                                        'div',
                                                                                                        {
                                                                                                            className: c()
                                                                                                                .cardMone,
                                                                                                            children: [
                                                                                                                (0,
                                                                                                                i.jsx)(
                                                                                                                    'h1',
                                                                                                                    {
                                                                                                                        children: _
                                                                                                                            ? '*******'
                                                                                                                            : S
                                                                                                                    }
                                                                                                                ),
                                                                                                                (0,
                                                                                                                i.jsx)(
                                                                                                                    o.Z,
                                                                                                                    {
                                                                                                                        color:
                                                                                                                            'green',
                                                                                                                        typeSet: function (
                                                                                                                            e
                                                                                                                        ) {
                                                                                                                            p(
                                                                                                                                e
                                                                                                                            );
                                                                                                                        }
                                                                                                                    }
                                                                                                                )
                                                                                                            ]
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    i.jsx)(
                                                                                                        'p',
                                                                                                        {
                                                                                                            className: c()
                                                                                                                .avail,
                                                                                                            children:
                                                                                                                'Available Balance'
                                                                                                        }
                                                                                                    )
                                                                                                ]
                                                                                            }
                                                                                        ),
                                                                                        (0,
                                                                                        i.jsxs)(
                                                                                            'div',
                                                                                            {
                                                                                                children: [
                                                                                                    (0,
                                                                                                    i.jsx)(
                                                                                                        'p',
                                                                                                        {
                                                                                                            className: c()
                                                                                                                .accountDetails,
                                                                                                            children:
                                                                                                                'Account Number'
                                                                                                        }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    i.jsxs)(
                                                                                                        'div',
                                                                                                        {
                                                                                                            className: c()
                                                                                                                .assctDrop,
                                                                                                            children: [
                                                                                                                (0,
                                                                                                                i.jsxs)(
                                                                                                                    'select',
                                                                                                                    {
                                                                                                                        className: c()
                                                                                                                            .accountNumbers,
                                                                                                                        value: Q,
                                                                                                                        onChange: function (
                                                                                                                            e
                                                                                                                        ) {
                                                                                                                            V(
                                                                                                                                e
                                                                                                                                    .target
                                                                                                                                    .value
                                                                                                                            );
                                                                                                                        },
                                                                                                                        children: [
                                                                                                                            (0,
                                                                                                                            i.jsx)(
                                                                                                                                'option',
                                                                                                                                {
                                                                                                                                    children:
                                                                                                                                        'Select Account Number'
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            null ===
                                                                                                                                (t = Object.keys(
                                                                                                                                    ne
                                                                                                                                )) ||
                                                                                                                            void 0 ===
                                                                                                                                t
                                                                                                                                ? void 0
                                                                                                                                : t.map(
                                                                                                                                      function (
                                                                                                                                          e,
                                                                                                                                          t
                                                                                                                                      ) {
                                                                                                                                          return (0,
                                                                                                                                          i.jsx)(
                                                                                                                                              i.Fragment,
                                                                                                                                              {
                                                                                                                                                  children: (0,
                                                                                                                                                  i.jsx)(
                                                                                                                                                      'option',
                                                                                                                                                      {
                                                                                                                                                          value:
                                                                                                                                                              ne[
                                                                                                                                                                  e
                                                                                                                                                              ]
                                                                                                                                                                  .accountNumber,
                                                                                                                                                          children:
                                                                                                                                                              ne[
                                                                                                                                                                  e
                                                                                                                                                              ]
                                                                                                                                                                  .accountNumber
                                                                                                                                                      },
                                                                                                                                                      t
                                                                                                                                                  )
                                                                                                                                              }
                                                                                                                                          );
                                                                                                                                      }
                                                                                                                                  )
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ),
                                                                                                                ' ',
                                                                                                                (0,
                                                                                                                i.jsx)(
                                                                                                                    'svg',
                                                                                                                    {
                                                                                                                        width:
                                                                                                                            '10',
                                                                                                                        height:
                                                                                                                            '7',
                                                                                                                        viewBox:
                                                                                                                            '0 0 8 5',
                                                                                                                        fill:
                                                                                                                            'none',
                                                                                                                        xmlns:
                                                                                                                            'http://www.w3.org/2000/svg',
                                                                                                                        children: (0,
                                                                                                                        i.jsx)(
                                                                                                                            'path',
                                                                                                                            {
                                                                                                                                d:
                                                                                                                                    'M1 1L4 4L7 1',
                                                                                                                                stroke:
                                                                                                                                    'white',
                                                                                                                                strokeWidth:
                                                                                                                                    '1.66667',
                                                                                                                                strokeLinecap:
                                                                                                                                    'round',
                                                                                                                                strokeLinejoin:
                                                                                                                                    'round'
                                                                                                                            }
                                                                                                                        )
                                                                                                                    }
                                                                                                                )
                                                                                                            ]
                                                                                                        }
                                                                                                    )
                                                                                                ]
                                                                                            }
                                                                                        )
                                                                                    ]
                                                                                }
                                                                            )
                                                                        }
                                                                    ),
                                                                    (0,
                                                                    i.jsxs)(
                                                                        'div',
                                                                        {
                                                                            className: c()
                                                                                .recMak,
                                                                            children: [
                                                                                (0,
                                                                                i.jsx)(
                                                                                    U,
                                                                                    {}
                                                                                ),
                                                                                (0,
                                                                                i.jsx)(
                                                                                    M,
                                                                                    {}
                                                                                )
                                                                            ]
                                                                        }
                                                                    )
                                                                ]
                                                            }),
                                                            (0, i.jsx)('div', {
                                                                className: c()
                                                                    .bagMoney,
                                                                children: (0,
                                                                i.jsx)('img', {
                                                                    src:
                                                                        '/Assets/Images/bagmoney.png'
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    (0, i.jsxs)('div', {
                                                        className: c()
                                                            .otherAccounts,
                                                        children: [
                                                            (0, i.jsx)('h2', {
                                                                children:
                                                                    'Other Accounts'
                                                            }),
                                                            (0, i.jsx)('div', {
                                                                className: c()
                                                                    .otherAccountsDiv,
                                                                children: (0,
                                                                i.jsx)(
                                                                    'button',
                                                                    {
                                                                        children:
                                                                            '+Add New'
                                                                    }
                                                                )
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, i.jsx)('div', {
                                                className: c().btm,
                                                children: (0, i.jsxs)('div', {
                                                    className: c().btmII,
                                                    children: [
                                                        (0, i.jsx)('div', {
                                                            className: c()
                                                                .btmIIp,
                                                            children: (0,
                                                            i.jsx)('p', {
                                                                children:
                                                                    'Recent Transactions'
                                                            })
                                                        }),
                                                        0 === P.length
                                                            ? (0, i.jsx)(
                                                                  'div',
                                                                  {
                                                                      className: c()
                                                                          .transactionBody,
                                                                      children: (0,
                                                                      i.jsxs)(
                                                                          'div',
                                                                          {
                                                                              children: [
                                                                                  (0,
                                                                                  i.jsx)(
                                                                                      'div',
                                                                                      {
                                                                                          className: c()
                                                                                              .transactionSvg,
                                                                                          children: (0,
                                                                                          i.jsx)(
                                                                                              Z,
                                                                                              {}
                                                                                          )
                                                                                      }
                                                                                  ),
                                                                                  (0,
                                                                                  i.jsx)(
                                                                                      'p',
                                                                                      {
                                                                                          children:
                                                                                              'No transactions has been made, click on make payment to get started.'
                                                                                      }
                                                                                  )
                                                                              ]
                                                                          }
                                                                      )
                                                                  }
                                                              )
                                                            : null === P ||
                                                              void 0 === P ||
                                                              null ===
                                                                  (s = P.filter(
                                                                      function (
                                                                          e
                                                                      ) {
                                                                          var t = e.transactionDate.split(
                                                                              'T'
                                                                          );
                                                                          return (
                                                                              t[0] >=
                                                                                  b &&
                                                                              t[0] <=
                                                                                  f
                                                                          );
                                                                      }
                                                                  )) ||
                                                              void 0 === s
                                                            ? void 0
                                                            : s.map(function (
                                                                  e,
                                                                  t
                                                              ) {
                                                                  var s,
                                                                      n,
                                                                      r = new Intl.NumberFormat(
                                                                          'en-US',
                                                                          {
                                                                              style:
                                                                                  'currency',
                                                                              currency:
                                                                                  'NGN',
                                                                              currencyDisplay:
                                                                                  'narrowSymbol'
                                                                          }
                                                                      ).format(
                                                                          e.transactionAmount
                                                                      );
                                                                  null ===
                                                                  e.receiver
                                                                      ? (s = '')
                                                                      : (s =
                                                                            null ===
                                                                                e ||
                                                                            void 0 ===
                                                                                e ||
                                                                            null ===
                                                                                (n =
                                                                                    e.receiver) ||
                                                                            void 0 ===
                                                                                n
                                                                                ? void 0
                                                                                : n.split(
                                                                                      ' '
                                                                                  ));
                                                                  return (0,
                                                                  i.jsxs)(
                                                                      'div',
                                                                      {
                                                                          children: [
                                                                              (0,
                                                                              i.jsxs)(
                                                                                  'div',
                                                                                  {
                                                                                      className: c()
                                                                                          .transaction,
                                                                                      children: [
                                                                                          (0,
                                                                                          i.jsx)(
                                                                                              'div',
                                                                                              {
                                                                                                  className: c()
                                                                                                      .names,
                                                                                                  children: (0,
                                                                                                  i.jsx)(
                                                                                                      'p',
                                                                                                      {
                                                                                                          children:
                                                                                                              '' ===
                                                                                                              s
                                                                                                                  ? ''
                                                                                                                  : void 0 ===
                                                                                                                    s[1]
                                                                                                                  ? s[0]
                                                                                                                  : ''
                                                                                                                        .concat(
                                                                                                                            s[0],
                                                                                                                            ' '
                                                                                                                        )
                                                                                                                        .concat(
                                                                                                                            s[1]
                                                                                                                        )
                                                                                                      }
                                                                                                  )
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          i.jsx)(
                                                                                              'div',
                                                                                              {
                                                                                                  className: c()
                                                                                                      .type,
                                                                                                  children: (0,
                                                                                                  i.jsx)(
                                                                                                      'p',
                                                                                                      {
                                                                                                          children:
                                                                                                              e.transactionType
                                                                                                      }
                                                                                                  )
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          i.jsx)(
                                                                                              'div',
                                                                                              {
                                                                                                  className: c()
                                                                                                      .money,
                                                                                                  children: (0,
                                                                                                  i.jsx)(
                                                                                                      'p',
                                                                                                      {
                                                                                                          children: r
                                                                                                      }
                                                                                                  )
                                                                                              }
                                                                                          ),
                                                                                          (0,
                                                                                          i.jsx)(
                                                                                              'div',
                                                                                              {
                                                                                                  className:
                                                                                                      e.status,
                                                                                                  children: (0,
                                                                                                  i.jsx)(
                                                                                                      'div',
                                                                                                      {
                                                                                                          className: c()
                                                                                                              .statusColor,
                                                                                                          children: (0,
                                                                                                          i.jsx)(
                                                                                                              'p',
                                                                                                              {
                                                                                                                  children:
                                                                                                                      e.transactionStatus
                                                                                                              }
                                                                                                          )
                                                                                                      }
                                                                                                  )
                                                                                              }
                                                                                          )
                                                                                      ]
                                                                                  }
                                                                              ),
                                                                              (0,
                                                                              i.jsx)(
                                                                                  'hr',
                                                                                  {
                                                                                      className: c()
                                                                                          .hr
                                                                                  }
                                                                              )
                                                                          ]
                                                                      },
                                                                      t
                                                                  );
                                                              })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                );
            });
        },
        96930: function (e, t, s) {
            'use strict';
            var n = s(9669),
                r = s.n(n),
                a = s(47041),
                c = 1 / 24;
            (0, a.getCookie)('Token', c), (0, a.getCookie)('Token', c);
            var o = r().create({ baseURL: 'https://testvate.live' });
            t.Z = o;
        },
        77064: function (e, t, s) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                '/Dashboard',
                function () {
                    return s(51225);
                }
            ]);
        },
        25025: function (e) {
            e.exports = {
                cove: 'styles_cove__NZuxP',
                coveBody: 'styles_coveBody__zJbbo',
                left: 'styles_left__WyF_N',
                perc: 'styles_perc__lSRC9',
                level: 'styles_level__W7ePY',
                Levelup: 'styles_Levelup__gHB9n',
                YourBus: 'styles_YourBus__tiVHh'
            };
        },
        75672: function (e) {
            e.exports = {
                body: 'styles_body__OlS0g',
                make: 'styles_make___WFI2',
                comp: 'styles_comp__TYdpm',
                dontshow: 'styles_dontshow__Lfiuj',
                dat: 'styles_dat__FDrv_'
            };
        },
        18500: function (e) {
            e.exports = {
                body: 'styles_body___og8x',
                rec: 'styles_rec__4BhSf',
                comp: 'styles_comp__YQ3sU',
                dontshow: 'styles_dontshow__OrBSQ',
                dat: 'styles_dat__o6aK7'
            };
        },
        36981: function (e) {
            e.exports = {
                dash: 'styles_dash__ABdy6',
                main: 'styles_main__lmXLq',
                dashCont: 'styles_dashCont__9mu_R',
                sidebar: 'styles_sidebar__CtkW_',
                sidebarActive: 'styles_sidebarActive__KM5yi'
            };
        },
        21817: function (e) {
            e.exports = {
                sectionII: 'styles_sectionII__OUiCt',
                sectionI: 'styles_sectionI__H5ihA',
                cove: 'styles_cove__dXQuH',
                accountNumbers: 'styles_accountNumbers__Tu2Z2',
                assctDrop: 'styles_assctDrop__M3sXW',
                card: 'styles_card__zTRj0',
                Top: 'styles_Top__aGIYK',
                Tpwh: 'styles_Tpwh__Uvb3_',
                transPs: 'styles_transPs__kr_8M',
                transP: 'styles_transP__CcVNt',
                h5: 'styles_h5__jIYaj',
                payp: 'styles_payp__SL_CX',
                svgTxt: 'styles_svgTxt__YrLqG',
                svgCov: 'styles_svgCov__a_Qoh',
                ecop: 'styles_ecop__507Ws',
                payEco: 'styles_payEco__lbUUY',
                avail: 'styles_avail__qnEWi',
                recMak: 'styles_recMak___6umk',
                rec: 'styles_rec__4b59T',
                make: 'styles_make__uFJaN',
                cardMone: 'styles_cardMone__UJx9l',
                green: 'styles_green__wBhz0',
                otherTrans: 'styles_otherTrans__Gkoqz',
                name: 'styles_name__k0XVG',
                svg: 'styles_svg__oKf_z',
                dinCLass: 'styles_dinCLass__Zejb9',
                divCover: 'styles_divCover__voIsx',
                cards: 'styles_cards__QPas2',
                cardII: 'styles_cardII__Kg4_W',
                cardI: 'styles_cardI__jUEbz',
                btm: 'styles_btm__HtarF',
                btmI: 'styles_btmI__Da3fz',
                btmItop: 'styles_btmItop__L4K_2',
                btmII: 'styles_btmII__iPi5F',
                btmIII: 'styles_btmIII__yxKM6',
                btmIIp: 'styles_btmIIp__JobAt',
                select: 'styles_select__Gvf1T',
                transaction: 'styles_transaction__Nr7mE',
                names: 'styles_names__MvMix',
                type: 'styles_type__KkrqU',
                money: 'styles_money__scneW',
                status: 'styles_status__QHU6R',
                hr: 'styles_hr__xn82Y',
                greendot: 'styles_greendot__sXCoC',
                reddot: 'styles_reddot__10Ioo',
                day: 'styles_day__PNpAJ',
                dayPie: 'styles_dayPie__Ay7ud',
                paylink: 'styles_paylink__bRQeJ',
                othAccount: 'styles_othAccount__9xlbY',
                moneyCont: 'styles_moneyCont__FVMp8',
                moneyBody: 'styles_moneyBody__GHZn_',
                moneybodyDiv: 'styles_moneybodyDiv__yCsvq',
                accountDetails: 'styles_accountDetails__FRR3e',
                accountNumber: 'styles_accountNumber__YskIE',
                bagMoney: 'styles_bagMoney__CeRUb',
                cardRight: 'styles_cardRight__u7FBH',
                otherAccounts: 'styles_otherAccounts__yMtC3',
                otherAccountsDiv: 'styles_otherAccountsDiv__Q1SQc',
                transactionBody: 'styles_transactionBody__gnwAk',
                transactionSvg: 'styles_transactionSvg__6rL1y'
            };
        },
        73873: function () {},
        27640: function (e, t, s) {
            'use strict';
            s.d(t, {
                Z: function () {
                    return i;
                }
            });
            var n,
                r,
                a = s(67294);
            function c(e, t) {
                if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function');
            }
            function o(e, t) {
                if (!e)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                    );
                return !t || ('object' !== typeof t && 'function' !== typeof t)
                    ? e
                    : t;
            }
            var i =
                ((r = n = (function (e) {
                    function t() {
                        var s, n;
                        c(this, t);
                        for (
                            var r = arguments.length, a = Array(r), i = 0;
                            i < r;
                            i++
                        )
                            a[i] = arguments[i];
                        return (
                            (s = n = o(
                                this,
                                e.call.apply(e, [this].concat(a))
                            )),
                            (n.state = { idle: n.props.defaultIdle }),
                            (n.timeout = null),
                            (n.handleEvent = function () {
                                n.state.idle && n.handleChange(!1),
                                    clearTimeout(n.timeout),
                                    n.setTimeout();
                            }),
                            o(n, s)
                        );
                    }
                    return (
                        (function (e, t) {
                            if ('function' !== typeof t && null !== t)
                                throw new TypeError(
                                    'Super expression must either be null or a function, not ' +
                                        typeof t
                                );
                            (e.prototype = Object.create(t && t.prototype, {
                                constructor: {
                                    value: e,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0
                                }
                            })),
                                t &&
                                    (Object.setPrototypeOf
                                        ? Object.setPrototypeOf(e, t)
                                        : (e.__proto__ = t));
                        })(t, e),
                        (t.prototype.componentDidMount = function () {
                            this.attachEvents(), this.setTimeout();
                        }),
                        (t.prototype.componentWillUnmount = function () {
                            this.removeEvents();
                        }),
                        (t.prototype.componentDidUpdate = function (e) {
                            var t, s;
                            (t = e.events),
                                (s = this.props.events),
                                t.sort().toString() !== s.sort().toString() &&
                                    (this.removeEvents(), this.attachEvents());
                        }),
                        (t.prototype.attachEvents = function () {
                            var e = this;
                            this.props.events.forEach(function (t) {
                                window.addEventListener(t, e.handleEvent, !0);
                            });
                        }),
                        (t.prototype.removeEvents = function () {
                            var e = this;
                            this.props.events.forEach(function (t) {
                                window.removeEventListener(t, e.handleEvent);
                            });
                        }),
                        (t.prototype.handleChange = function (e) {
                            this.props.onChange({ idle: e }),
                                this.setState({ idle: e });
                        }),
                        (t.prototype.setTimeout = (function (e) {
                            function t() {
                                return e.apply(this, arguments);
                            }
                            return (
                                (t.toString = function () {
                                    return e.toString();
                                }),
                                t
                            );
                        })(function () {
                            var e = this;
                            this.timeout = setTimeout(function () {
                                e.handleChange(!0);
                            }, this.props.timeout);
                        })),
                        (t.prototype.render = function () {
                            return this.props.render(this.state);
                        }),
                        t
                    );
                })(a.Component)),
                (n.defaultProps = {
                    defaultIdle: !1,
                    render: function () {
                        return null;
                    },
                    onChange: function () {},
                    timeout: 1e3,
                    events: [
                        'mousemove',
                        'mousedown',
                        'keydown',
                        'touchstart',
                        'scroll'
                    ]
                }),
                r);
        }
    },
    function (e) {
        e.O(0, [7570, 7818, 9639, 27, 9728, 9774, 2888, 179], function () {
            return (t = 77064), e((e.s = t));
            var t;
        });
        var t = e.O();
        _N_E = t;
    }
]);
