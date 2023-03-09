(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2600],
    {
        41827: function (e, t, n) {
            'use strict';
            n(67294), n(61120), n(9473), n(85893);
        },
        58946: function (e, t, n) {
            'use strict';
            var s = n(59499),
                r = n(16835),
                i = n(67294),
                o = n(55694),
                a = n.n(o),
                c = n(85893);
            function l(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t &&
                        (s = s.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable;
                        })),
                        n.push.apply(n, s);
                }
                return n;
            }
            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? l(Object(n), !0).forEach(function (t) {
                              (0, s.Z)(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(n)
                          )
                        : l(Object(n)).forEach(function (t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(n, t)
                              );
                          });
                }
                return e;
            }
            t.Z = function () {
                var e = (function () {
                    var e = (0, i.useState)({
                            ssn1: '',
                            ssn2: '',
                            ssn3: '',
                            ssn4: '',
                            ssn5: '',
                            ssn6: ''
                        }),
                        t = (e[0], e[1]);
                    return {
                        handleChange: function (e) {
                            var n = e.target,
                                i = n.maxLength,
                                o = n.value,
                                a = n.name.split('-'),
                                c = (0, r.Z)(a, 2),
                                l = (c[0], c[1]);
                            if (o.length >= i && parseInt(l, 10) < 6) {
                                var p = document.querySelector(
                                    'input[name=ssn-'.concat(
                                        parseInt(l, 10) + 1,
                                        ']'
                                    )
                                );
                                null !== p && p.focus();
                            }
                            t(
                                u(
                                    u({}, o),
                                    {},
                                    (0, s.Z)({}, 'ssn'.concat(l), o)
                                )
                            );
                        }
                    };
                })().handleChange;
                return (0, c.jsxs)('div', {
                    className: a().otpInps,
                    children: [
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-1',
                            maxLength: 1,
                            onChange: e
                        }),
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-2',
                            maxLength: 1,
                            onChange: e
                        }),
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-3',
                            maxLength: 1,
                            onChange: e
                        }),
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-4',
                            maxLength: 1,
                            onChange: e
                        }),
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-5',
                            maxLength: 1,
                            onChange: e
                        }),
                        (0, c.jsx)('input', {
                            type: 'password',
                            name: 'ssn-6',
                            maxLength: 1,
                            onChange: e
                        })
                    ]
                });
            };
        },
        45168: function (e, t, n) {
            'use strict';
            n(67294);
            var s = n(44722),
                r = n(6417),
                i = n.n(r),
                o = n(85893);
            t.Z = function (e) {
                var t = e.text;
                return (0, o.jsxs)('div', {
                    className: i().profileSetupSide,
                    children: [
                        (0, o.jsx)('div', { className: i().green }),
                        (0, o.jsxs)('div', {
                            className: i().grey,
                            children: [
                                (0, o.jsxs)('div', {
                                    className: i().content,
                                    children: [
                                        (0, o.jsxs)('div', {
                                            className: i().contentHeader,
                                            children: [
                                                (0, o.jsx)(s.Z, {}),
                                                (0, o.jsxs)('p', {
                                                    className: i().SMeApp,
                                                    children: [
                                                        'Powered by ',
                                                        (0, o.jsx)('span', {
                                                            children: 'Ecobank'
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, o.jsx)('h2', { children: t }),
                                        (0, o.jsxs)('div', {
                                            className: i().colorDiv,
                                            children: [
                                                (0, o.jsx)('div', {
                                                    className: i().firstDiv
                                                }),
                                                (0, o.jsx)('div', {
                                                    className: i().secondDiv
                                                }),
                                                (0, o.jsx)('div', {
                                                    className: i().thirdDiv
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                (0, o.jsx)('div', {
                                    className: i().navImage,
                                    children: (0, o.jsx)('img', {
                                        src: '../Assets/Images/profileNav.png',
                                        alt: ''
                                    })
                                })
                            ]
                        })
                    ]
                });
            };
        },
        67548: function (e, t, n) {
            'use strict';
            n(67294), n(85893);
        },
        15040: function (e, t, n) {
            'use strict';
            n(67294);
            var s = n(85893);
            t.Z = function () {
                return (0, s.jsx)('svg', {
                    width: '8',
                    height: '5',
                    viewBox: '0 0 8 5',
                    fill: 'none',
                    xmlns: 'http://www.w3.org/2000/svg',
                    children: (0, s.jsx)('path', {
                        d: 'M1 1L4 4L7 1',
                        stroke: '#005B82',
                        strokeWidth: '1.66667',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                    })
                });
            };
        },
        97811: function (e, t, n) {
            'use strict';
            var s = n(59499),
                r = n(4730),
                i = n(67294),
                o = n(21984),
                a = n.n(o),
                c = n(85893),
                l = ['children', 'className'];
            function u(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    t &&
                        (s = s.filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                e,
                                t
                            ).enumerable;
                        })),
                        n.push.apply(n, s);
                }
                return n;
            }
            function p(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2
                        ? u(Object(n), !0).forEach(function (t) {
                              (0, s.Z)(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(n)
                          )
                        : u(Object(n)).forEach(function (t) {
                              Object.defineProperty(
                                  e,
                                  t,
                                  Object.getOwnPropertyDescriptor(n, t)
                              );
                          });
                }
                return e;
            }
            t.Z = function (e) {
                var t = e.children,
                    n = e.className,
                    s = (0, r.Z)(e, l),
                    o = (0, i.useState)(!1),
                    u = o[0],
                    d = o[1],
                    f = (0, i.useState)(40),
                    m = f[0],
                    h = f[1],
                    g = (0, i.useState)(0),
                    y = g[0],
                    v = g[1],
                    _ = (0, i.useCallback)(
                        function () {
                            !u && d(!0);
                        },
                        [u]
                    ),
                    x = (0, i.useCallback)(
                        function () {
                            u && d(!1);
                        },
                        [u]
                    ),
                    j = (0, i.useCallback)(function () {
                        if (b) {
                            var e = b.current,
                                t = e.scrollTop,
                                n = e.scrollHeight,
                                s = e.offsetHeight,
                                r = (parseInt(t, 10) / parseInt(n, 10)) * s;
                            (r = Math.min(r, s - m)), v(r);
                        }
                    }, []),
                    b = (0, i.useRef)();
                return (
                    (0, i.useEffect)(function () {
                        var e = b.current,
                            t = e.clientHeight,
                            n = t / e.scrollHeight,
                            s = Math.max(n * t, 40);
                        return (
                            h(s),
                            e.addEventListener('scroll', j, !0),
                            function () {
                                e.removeEventListener('scroll', j, !0);
                            }
                        );
                    }, []),
                    (0, c.jsxs)('div', {
                        onMouseOver: _,
                        onMouseOut: x,
                        className: a().cover,
                        children: [
                            (0, c.jsx)(
                                'div',
                                p(
                                    p(
                                        {
                                            ref: b,
                                            className: 'scrollhost '.concat(n)
                                        },
                                        s
                                    ),
                                    {},
                                    { children: t }
                                )
                            ),
                            (0, c.jsx)('div', {
                                className: a().scrollBar,
                                style: { opacity: u ? 1 : 0 },
                                children: (0, c.jsx)('div', {
                                    className: 'scroll-thumb',
                                    style: { height: m, top: y }
                                })
                            })
                        ]
                    })
                );
            };
        },
        78456: function (e, t, n) {
            'use strict';
            var s = n(16835),
                r = n(67294),
                i = n(15064),
                o = n.n(i),
                a = (n(11163), n(9473), n(68711)),
                c = n(64970),
                l = n.n(c),
                u = (n(9008), n(4298), n(47041)),
                p = n(9669),
                d = n.n(p),
                f = (n(42594), n(61120), n(85893)),
                m = { width: 390, height: 480, facingMode: 'user' };
            t.Z = function (e) {
                var t = e.action,
                    n = (0, r.useState)(!0),
                    i = n[0],
                    c = (n[1], r.useRef(null)),
                    p = r.useState(null),
                    h = (0, s.Z)(p, 2),
                    g = (h[0], h[1]),
                    y = (0, r.useState)(''),
                    v = y[0],
                    _ = y[1],
                    x = r.useState(null),
                    j = (0, s.Z)(x, 2),
                    b = (j[0], j[1]),
                    w = r.useState(''),
                    O = (0, s.Z)(w, 2),
                    N = O[0],
                    k = O[1],
                    S = (0, r.useState)(!1),
                    C = S[0],
                    I = S[1],
                    P = (0, r.useState)(!1),
                    Z = P[0],
                    D = P[1],
                    L = r.useCallback(
                        function () {
                            I(function (e) {
                                return !e;
                            }),
                                D(function (e) {
                                    return !e;
                                });
                            var e = c.current.getScreenshot();
                            b(e);
                            var t,
                                n = (function (e) {
                                    if (void 0 !== window) {
                                        for (
                                            var t = window.atob(e),
                                                n = t.length,
                                                s = new Uint8Array(n),
                                                r = 0;
                                            r < n;
                                            r++
                                        )
                                            s[r] = t.charCodeAt(r);
                                        return s.buffer;
                                    }
                                })(c.current.getScreenshot().split(',')[1]),
                                s = new File([n], 'userface-1828438.jpg', {
                                    type: 'image/jpeg'
                                }),
                                r = new FormData();
                            r.append('userFace', s),
                                (t =
                                    void 0 == (0, u.getCookie)('cookieToken')
                                        ? (0, u.getCookie)('existingToken')
                                        : (0, u.getCookie)('cookieToken')),
                                d()
                                    .post(
                                        'https://testvate.liveauthentication/facematch',
                                        r,
                                        {
                                            headers: {
                                                'Content-Type':
                                                    'multipart/form-data',
                                                Authorization: 'Bearer '.concat(
                                                    t
                                                )
                                            }
                                        }
                                    )
                                    .then(function (e) {
                                        _(e.data.message), D(!1);
                                    })
                                    .catch(function (e) {
                                        k(e.response.data.message), D(!1);
                                    });
                        },
                        [c, g, b]
                    );
                return (0, f.jsx)('div', {
                    className: o().body,
                    children: (0, f.jsxs)('div', {
                        className: o().cover,
                        children: [
                            (0, f.jsx)('div', {
                                className: o().imageOut,
                                children: (0, f.jsxs)('div', {
                                    children: [
                                        (0, f.jsx)('p', {
                                            className: o().takeSelf,
                                            children: 'Take a Lively Selfie'
                                        }),
                                        (0, f.jsx)('p', {
                                            className: o().finish,
                                            children:
                                                'Finish up with a clear photo of your face to verify your identity.'
                                        }),
                                        N
                                            ? (0, f.jsx)('p', { children: N })
                                            : null,
                                        (0, f.jsx)('div', {
                                            className:
                                                'facial verification successful' ===
                                                v
                                                    ? o().imageOuter
                                                    : N
                                                    ? o().errorInner
                                                    : o().imageInner,
                                            children: (0, f.jsx)(l(), {
                                                audio: !1,
                                                screenshotFormat: 'image/jpeg',
                                                videoConstraints: m,
                                                ref: c
                                            })
                                        })
                                    ]
                                })
                            }),
                            Z
                                ? (0, f.jsx)('p', {
                                      children:
                                          'Hold on your face is been verified!!!!'
                                  })
                                : null,
                            (0, f.jsx)(a.Z, {
                                onClick:
                                    'facial verification successful' === v
                                        ? t
                                        : L,
                                disabled: i,
                                active: i ? 'active' : 'inactive',
                                type: 'button',
                                text:
                                    'facial verification successful' === v
                                        ? 'Continue'
                                        : 'Snap',
                                err: v,
                                loads: C
                            })
                        ]
                    })
                });
            };
        },
        47854: function (e, t, n) {
            'use strict';
            var s = n(67294),
                r = n(68711),
                i = n(87536),
                o = n(87398),
                a = n.n(o),
                c = n(9473),
                l = n(27373),
                u = (n(13921), n(97811), n(58946)),
                p = n(61120),
                d = (n(70066), n(85893));
            t.Z = function (e) {
                e.handleShowThirdStep;
                var t = e.setFormData,
                    n = e.formData,
                    o = e.action,
                    f = (0, s.useState)([]),
                    m = (f[0], f[1], (0, c.I0)()),
                    h = (0, i.cI)(),
                    g = (h.register, h.handleSubmit),
                    y =
                        (h.watch,
                        h.formState.errors,
                        (0, c.v9)(function (e) {
                            return e.resetOtpReducer;
                        })),
                    v = y.resetOtp,
                    _ = y.resetOtpErrorMessages,
                    x = (0, s.useState)(!0),
                    j = x[0];
                x[1];
                return (
                    (0, s.useEffect)(function () {}, [v, _]),
                    (0, d.jsx)('form', {
                        onSubmit: g(o),
                        children: (0, d.jsx)('div', {
                            className: a().bvnBody,
                            children: (0, d.jsxs)('div', {
                                className: a().cover,
                                children: [
                                    (0, d.jsxs)('div', {
                                        children: [
                                            (0, d.jsx)(l.oD, {
                                                children: (0, d.jsx)(l.BG, {
                                                    children: 'OTP Verification'
                                                })
                                            }),
                                            (0, d.jsx)(l.N4, {
                                                children:
                                                    'A one time Password has been sent to your registered phone number please enter digits below.'
                                            }),
                                            _
                                                ? (0, d.jsxs)('p', {
                                                      children: [
                                                          ' ',
                                                          _.response.data
                                                              .message
                                                      ]
                                                  })
                                                : null,
                                            (0, d.jsx)('p', {
                                                className: a().inp,
                                                children: 'Input OTP'
                                            }),
                                            (0, d.jsx)(u.Z, {
                                                formData: n,
                                                setFormData: t
                                            }),
                                            (0, d.jsxs)(l.Yz, {
                                                children: [
                                                    (0, d.jsx)('p', {
                                                        onClick: function () {
                                                            var e = {
                                                                phoneNumber:
                                                                    n.phoneNumber
                                                            };
                                                            m((0, p.AKs)(e));
                                                        },
                                                        children: 'Resend OTP'
                                                    }),
                                                    (0, d.jsx)('button', {
                                                        style: {
                                                            cursor: 'pointer'
                                                        },
                                                        className: a().clr,
                                                        type: 'reset',
                                                        children: 'Clear'
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    (0, d.jsx)(r.Z, {
                                        disabled: j,
                                        active: j ? 'active' : 'inactive',
                                        type: 'submit',
                                        margin: '80px 0px 0px 0px',
                                        text: 'Proceed'
                                    })
                                ]
                            })
                        })
                    })
                );
            };
        },
        27373: function (e, t, n) {
            'use strict';
            n.d(t, {
                BG: function () {
                    return o;
                },
                N4: function () {
                    return i;
                },
                Yz: function () {
                    return a;
                },
                oD: function () {
                    return r;
                }
            });
            var s = n(65178),
                r =
                    (s.ZP.div.withConfig({
                        displayName: 'stylesmodule__CardContainer',
                        componentId: 'sc-flyker-0'
                    })([
                        'width:50%;padding-bottom:5%;background:#fefefe;border:1px solid rgba(219,219,219,0.6);box-shadow:0px 0px 74px -10px rgba(0,0,0,0.08);border-radius:12px;'
                    ]),
                    s.ZP.div.withConfig({
                        displayName: 'stylesmodule__CardHeadingBVN',
                        componentId: 'sc-flyker-1'
                    })([''])),
                i = s.ZP.h6.withConfig({
                    displayName: 'stylesmodule__SmallInstructionText',
                    componentId: 'sc-flyker-2'
                })([
                    'font-style:normal;font-weight:400;font-size:14px;line-height:27px;color:#7a7978;text-align:left;margin:0px;margin-top:32px;'
                ]),
                o = s.ZP.h3.withConfig({
                    displayName: 'stylesmodule__LeftHeading',
                    componentId: 'sc-flyker-3'
                })([
                    "font-family:'Inter',sans-serif;font-style:normal;font-weight:700;font-size:24px;line-height:33px;color:#102572;margin:0px;"
                ]),
                a =
                    (s.ZP.div.withConfig({
                        displayName: 'stylesmodule__RegisteredCardWrapper',
                        componentId: 'sc-flyker-4'
                    })([
                        'width:100%;height:auto;margin:0 auto;padding-bottom:5%;padding-bottom:5%;background:#fefefe;border:1px solid rgba(219,219,219,0.6);box-shadow:0px 0px 74px -10px rgba(0,0,0,0.08);border-radius:12px;'
                    ]),
                    s.ZP.label.withConfig({
                        displayName: 'stylesmodule__Label',
                        componentId: 'sc-flyker-5'
                    })([
                        'font-style:normal;font-weight:400;font-size:14px;line-height:19px;color:#3e3e3e;'
                    ]),
                    s.ZP.input.withConfig({
                        displayName: 'stylesmodule__FormInput',
                        componentId: 'sc-flyker-6'
                    })(['margin-top:0.5rem;']),
                    s.ZP.div.withConfig({
                        displayName: 'stylesmodule__InputWrapper',
                        componentId: 'sc-flyker-7'
                    })(['margin-top:1.4rem;']),
                    s.ZP.div.withConfig({
                        displayName: 'stylesmodule__ResetOTP',
                        componentId: 'sc-flyker-8'
                    })([
                        "display:flex;justify-content:space-between;margin-top:24px;width:100%;align-items:center;p{font-family:'Inter',sans-serif;font-style:normal;font-weight:500;font-size:16px;line-height:19px;text-align:center;color:#102572;margin:0px;cursor:pointer;}"
                    ]));
        },
        96930: function (e, t, n) {
            'use strict';
            var s = n(9669),
                r = n.n(s),
                i = n(47041),
                o = 1 / 24;
            (0, i.getCookie)('Token', o), (0, i.getCookie)('Token', o);
            var a = r().create({ baseURL: 'https://testvate.live' });
            t.Z = a;
        },
        55694: function (e) {
            e.exports = { otpInps: 'styles_otpInps__8uG6t' };
        },
        6417: function (e) {
            e.exports = {
                profileSetupSide: 'styles_profileSetupSide__nPf9d',
                green: 'styles_green__Kdv8d',
                grey: 'styles_grey___HFg1',
                content: 'styles_content__G3Xyj',
                SMeApp: 'styles_SMeApp__VuO64',
                contentHeader: 'styles_contentHeader__97sS6',
                colorDiv: 'styles_colorDiv__dL2e_',
                firstDiv: 'styles_firstDiv__Wmzkx',
                secondDiv: 'styles_secondDiv__3j1qM',
                thirdDiv: 'styles_thirdDiv__F9RBe',
                navImage: 'styles_navImage__vkoLG'
            };
        },
        21984: function (e) {
            e.exports = { cover: 'styles_cover___GlFr' };
        },
        15064: function (e) {
            e.exports = {
                body: 'styles_body__8SNSu',
                cover: 'styles_cover__EABd5',
                imageOuter: 'styles_imageOuter__BEfV4',
                imageOut: 'styles_imageOut__fA8iY',
                imageInner: 'styles_imageInner__1Laxd',
                errorInner: 'styles_errorInner__u0OUA',
                imageInnerActive: 'styles_imageInnerActive__Z9SI_',
                finish: 'styles_finish__8RsPm',
                takeSelf: 'styles_takeSelf__lvEj2',
                matiButtonSetup: 'styles_matiButtonSetup__wNzyK'
            };
        },
        87398: function (e) {
            e.exports = {
                bvnBody: 'styles_bvnBody__nvTOp',
                cover: 'styles_cover__2_VwV',
                inputs: 'styles_inputs__cV98s',
                clr: 'styles_clr__KH5MR',
                inp: 'styles_inp__g7tYY'
            };
        }
    }
]);
