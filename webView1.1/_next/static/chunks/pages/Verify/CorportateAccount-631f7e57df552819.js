(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9852],
    {
        74526: function (e, t, n) {
            'use strict';
            n.r(t);
            var s = n(67294),
                o = n(962),
                c = n.n(o),
                r = n(9473),
                a = n(11163),
                i = n(47041),
                u = n(96930),
                l = n(78868),
                _ = n(61120),
                f = n(85893);
            t.default = function () {
                var e = (0, s.useState)(''),
                    t = (e[0], e[1], (0, s.useState)([])),
                    n = (t[0], t[1], (0, s.useState)('')),
                    o = n[0],
                    d = n[1],
                    h = (0, s.useState)(),
                    v = h[0],
                    g = h[1],
                    p = (0, s.useState)(''),
                    y = (p[0], p[1], (0, s.useState)('')),
                    m = y[0],
                    k =
                        (y[1],
                        (0, r.v9)(function (e) {
                            return e.profile;
                        })),
                    x =
                        (k.isLoading,
                        k.profile,
                        k.errorMessage,
                        (0, a.useRouter)()),
                    C = (0, r.I0)(),
                    j = (0, s.useRef)(null),
                    w = (0, s.useState)('00:00:60'),
                    N = w[0],
                    S = w[1],
                    b = function (e) {
                        var t = (function (e) {
                                var t = Date.parse(e) - Date.parse(new Date()),
                                    n = Math.floor((t / 1e3) % 60),
                                    s = Math.floor((t / 1e3 / 60) % 60);
                                return {
                                    total: t,
                                    hours: Math.floor((t / 1e3 / 60 / 60) % 24),
                                    minutes: s,
                                    seconds: n
                                };
                            })(e),
                            n = t.total,
                            s = t.hours,
                            o = t.minutes,
                            c = t.seconds;
                        n >= 0 &&
                            S(
                                (s > 9 ? s : '0' + s) +
                                    ':' +
                                    (o > 9 ? o : '0' + o) +
                                    ':' +
                                    (c > 9 ? c : '0' + c)
                            );
                    };
                (0, s.useEffect)(function () {
                    !(function (e) {
                        S('00:00:60'), j.current && clearInterval(j.current);
                        var t = setInterval(function () {
                            b(e);
                        }, 1e3);
                        j.current = t;
                    })(
                        (function () {
                            var e = new Date();
                            return e.setSeconds(e.getSeconds() + 50), e;
                        })()
                    );
                }, []);
                (0, s.useEffect)(
                    function () {
                        'success' === o && x.push('/Succes/CorpSuccess');
                    },
                    [m, o]
                ),
                    (0, s.useEffect)(
                        function () {
                            !(function () {
                                var e;
                                (e =
                                    void 0 == (0, i.getCookie)('cookieToken')
                                        ? (0, i.getCookie)('existingToken')
                                        : (0, i.getCookie)('cookieToken')),
                                    u.Z.post(
                                        'https://testvate.live'.concat(
                                            l.Z.corpNewUser
                                        ),
                                        {
                                            affiliateCode: 'ENG',
                                            currency: 'NGN'
                                        },
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                                Authorization: 'Bearer '.concat(
                                                    e
                                                )
                                            }
                                        }
                                    )
                                        .then(function (t) {
                                            'success' === t.data.message &&
                                                setInterval(function () {
                                                    u.Z.get(
                                                        'https://testvate.livebank-account/status',
                                                        {
                                                            headers: {
                                                                'Content-Type':
                                                                    'application/json',
                                                                Authorization: 'Bearer '.concat(
                                                                    e
                                                                )
                                                            }
                                                        }
                                                    )
                                                        .then(function (e) {
                                                            d(e.data.message);
                                                        })
                                                        .catch(function (e) {});
                                                }, 1e4);
                                        })
                                        .catch(function (t) {
                                            t &&
                                                setInterval(function () {
                                                    u.Z.get(
                                                        'https://testvate.livebank-account/status',
                                                        {
                                                            headers: {
                                                                'Content-Type':
                                                                    'application/json',
                                                                Authorization: 'Bearer '.concat(
                                                                    e
                                                                )
                                                            }
                                                        }
                                                    )
                                                        .then(function (e) {
                                                            d(e.data.message);
                                                        })
                                                        .catch(function (e) {});
                                                }, 3e4);
                                        });
                            })();
                        },
                        [m, o]
                    );
                return (
                    (0, s.useEffect)(
                        function () {
                            ('Pending Creation, Try Again' !== m &&
                                'Try Again' !== m &&
                                'Bank Account has not been created for this user' !==
                                    m) ||
                                setTimeout(function () {
                                    C(newAccountStatusData());
                                }, 1e4),
                                'success' === o.message && x.push('/Succes'),
                                '00:00:00' === N &&
                                    (C((0, _.Cds)()),
                                    localStorage.getItem('user') ||
                                        x.replace('/Auth/Login')),
                                '00:00:10' === N &&
                                    g(
                                        'Your Account Number will be sent to your Email'
                                    );
                        },
                        [m, o, N]
                    ),
                    (0, f.jsx)(f.Fragment, {
                        children: (0, f.jsx)('div', {
                            className: c().cover,
                            children: (0, f.jsx)('div', {
                                className: c().covInn,
                                children: (0, f.jsxs)('div', {
                                    className: c().load,
                                    children: [
                                        m
                                            ? (0, f.jsxs)('div', {
                                                  className: c().error,
                                                  children: [
                                                      (0, f.jsx)('h2', {
                                                          className: c().error,
                                                          children: m
                                                      }),
                                                      (0, f.jsx)('br', {})
                                                  ]
                                              })
                                            : N <= '00:00:10'
                                            ? (0, f.jsxs)('div', {
                                                  children: [
                                                      (0, f.jsx)('p', {
                                                          className: c().error,
                                                          children: N
                                                      }),
                                                      (0, f.jsx)('p', {
                                                          children: v
                                                      })
                                                  ]
                                              })
                                            : (0, f.jsxs)(f.Fragment, {
                                                  children: [
                                                      (0, f.jsxs)('svg', {
                                                          width: '59',
                                                          height: '15',
                                                          viewBox: '0 0 59 15',
                                                          fill: 'none',
                                                          xmlns:
                                                              'http://www.w3.org/2000/svg',
                                                          className: c().svg,
                                                          children: [
                                                              (0,
                                                              f.jsx)('circle', {
                                                                  cx: '7.5',
                                                                  cy: '7.25684',
                                                                  r: '7',
                                                                  fill:
                                                                      '#6CCF00'
                                                              }),
                                                              (0,
                                                              f.jsx)('circle', {
                                                                  cx: '29.5',
                                                                  cy: '7.25684',
                                                                  r: '7',
                                                                  fill:
                                                                      '#6CCF00'
                                                              }),
                                                              (0,
                                                              f.jsx)('circle', {
                                                                  cx: '51.5',
                                                                  cy: '7.25684',
                                                                  r: '7',
                                                                  fill:
                                                                      '#6CCF00'
                                                              })
                                                          ]
                                                      }),
                                                      (0, f.jsx)('p', {
                                                          className: c().kindly,
                                                          children:
                                                              'Kindly wait while the system fetches your account number, this will take a moment.'
                                                      })
                                                  ]
                                              }),
                                        (0, f.jsx)('br', {}),
                                        ' '
                                    ]
                                })
                            })
                        })
                    })
                );
            };
        },
        96930: function (e, t, n) {
            'use strict';
            var s = n(9669),
                o = n.n(s),
                c = n(47041),
                r = 1 / 24;
            (0, c.getCookie)('Token', r), (0, c.getCookie)('Token', r);
            var a = o().create({ baseURL: 'https://testvate.live' });
            t.Z = a;
        },
        24704: function (e, t, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                '/Verify/CorportateAccount',
                function () {
                    return n(74526);
                }
            ]);
        },
        962: function (e) {
            e.exports = {
                cover: 'styles_cover__rp_1E',
                covInn: 'styles_covInn__gZidJ',
                kindly: 'styles_kindly__biais',
                load: 'styles_load__599Hk',
                svg: 'styles_svg__LkNZh',
                loading: 'styles_loading__kkXXB',
                loading1: 'styles_loading1__OMNrQ',
                loading2: 'styles_loading2__jZzmJ',
                coverInn: 'styles_coverInn__pdKd_',
                oops: 'styles_oops__03O2Y',
                someDiv: 'styles_someDiv__M2HQH',
                some: 'styles_some__he6KW',
                btn: 'styles_btn__YCM6v',
                failSvg: 'styles_failSvg__du5Ll',
                error: 'styles_error__2stHI'
            };
        }
    },
    function (e) {
        e.O(0, [9774, 2888, 179], function () {
            return (t = 24704), e((e.s = t));
            var t;
        });
        var t = e.O();
        _N_E = t;
    }
]);
