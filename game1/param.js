// -----------------------------------------------------
// ■■　全体設定 ----------------------------------------

// 勝敗デバッグモード(true時、常勝判定)
const ISSUE_DEBUG_MODE = false;

// ウィンドウタイトル
const WINDOW_TITLE = "サイコロテスト";

// 景品申請リンク先
const REPORT_LINK_URL = "../other/reportLink.html";


// -----------------------------------------------------
// ■■　色設定 ----------------------------------------

// デフォルト文字色
const COLOR_TEXT = "rgb(0,0,0)";
// デフォルト背景色
const COLOR_BG = "rgb(255,208,205)";
// 景品文字色
const COLOR_PRESENT = "rgb(255,100,100)";
// 勝利文字色
const COLOR_WIN = "rgb(15,41,130)";
// 敗北文字列
const COLOR_LOSE = "rgb(100,140,255)";
// リンク文字列
const COLOR_LINK = "rgb(15,41,130)";


// -----------------------------------------------------
// ■■　フォント設定 ----------------------------------------

// フォント：デフォルトサイズで行間が少し空いてる(複数行向け)
const FONT18_SPACE150 = "18px/150% sans-serif";
// フォント：デフォルトサイズ
const FONT18_ONELINE = "18px/100% sans-serif";
// フォント：少し大きいサイズ
const FONT20_ONELINE = "20px/100% sans-serif";
// フォント：少し大きいサイズで行間が少し空いてる(複数行向け)
const FONT20_SPACE150 = "20px/150% sans-serif";
// フォント：一番大きいサイズで太字
const FONT25_BOLD_ONELINE = "bold 25px/100% sans-serif";
// フォント：少し大きいサイズで太字
const FONT20_BOLD_ONELINE = "bold 20px/100% sans-serif";
// フォント：少し小さいサイズ
const FONT16_ONELINE = "16px/100% sans-serif";
// フォント：小さいサイズ
const FONT14_ONELINE = "14px/100% sans-serif";
// フォント：小さいサイズで行間が少し空いてる(複数行向け)
const FONT14_SPACE150 = "14px/150% sans-serif";
// フォント：とても小さいサイズ
const FONT12_ONELINE = "12px/100% sans-serif";


// -----------------------------------------------------
// ■■　Cookie設定 ----------------------------------------
// Cookieはサーバにあげた場合のみ有効です。ローカルでは効きません。

// Cookieデバッグモード(true時、サーバにあげてもCookieチェックを行いません。)
const COOKIE_DEBUG_MODE = false;

// 30日
//const COOKIE_MILLSECOND = 60*60*24*30;
// 1日
const COOKIE_MILLSECOND = 60*60*24*1;
// 10分
// const COOKIE_MILLSECOND = 60 * 10;

// -----------------------------------------------------
// ■■　景品設定 ----------------------------------------

// ※リスト項目最大数：7
// win: 連勝切れ目
// present: プレゼント名
// presentShort: あおり文句でのプレゼント表記(不要の場合、null)
// message: あおり文句(不要の場合、null)
// 改行は「\n」で行ってください。
const PRESENT_LIST = [
    {
        "win": 1,
        "present": "おすすめ動画",
        "presentShort": null,
        "message": null,
        "advice": null
    },
    {
        "win": 3,
        "present": "お焚き上げ(悪縁断ち)",
        "presentShort": null,
        "message": null,
        "advice": null
    },
    {
        "win": 4,
        "present": "お焚き上げ(心願成就)",
        "presentShort": null,
        "message": null,
        "advice": null
    },
    {
        "win": 5,
        "present": "トルコのお塩",
        "presentShort": null,
        "message": null,
        "advice": null
    },
    {
        "win": 6,
        "present": "偉い先生サイン本",
        "presentShort": null,
        "message": null,
        "advice": null
    },
    {
        "win": 7,
        "present": "台湾旅行",
        "presentShort": null,
        // 最後の項目のmeesageは、ダイアログに必ず表示されるため、文言を設定してください。
        "message": "すごいや！おめでとう！",
        "advice": null
    }
];

// -----------------------------------------------------
// ■■　アイテム設定 ----------------------------------------

// 獲得アイテム画像リスト
// name: 名称
// message: メッセージ
// img: ファイルパス(画像サイズは300x300固定)
// rate: 出現率(数字が小さいほど出にくい)
// rateTxt: 出現率の文字表記
// appearance: 出現条件。どれも複数範囲指定可能
//      daterange: 日付範囲(yyyy/MM/ddの書式)。
//      weekday: 曜日（Monday・Tuesday・Wednesday・Thursday・Friday・Saturday・Sundayの文字列配列）
//      timerange: 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
//      datespot: 日付(毎月○日に出現等)
const ITEM_LIST = [
    {
        "name": "水瓶座",
        "message": "水瓶座だよ",
        "img": "img/additem01.png",
        "rateTxt": "★★★★",
        "rate": 1,
        // 出現条件
        "appearance": {
            // daterange: 日付範囲(yyyy/MM/ddの書式)。複数範囲指定可能
            "daterange": [{
                "from": "2018/03/26"
                , "to": "2018/04/27"
            },
            {
                "from": "2018/04/01"
                , "to": "2018/04/05"
            }]
        }
    }
    , {
        "name": "山羊座",
        "message": "山羊座だよ",
        "img": "img/additem02.png",
        "rateTxt": "★★★",
        "rate": 3,
        // 出現条件
        "appearance": {
            // weekday: 曜日（Monday・Tuesday・Wednesday・Thursday・Friday・Saturday・Sundayの文字列配列）
            "weekday": [
                "Wednesday", "Friday"
            ]
        }
    }
    , {
        "name": "射手座",
        "message": "射手座だよ",
        "img": "img/additem03.png",
        "rateTxt": "★★",
        "rate": 10,
        // 出現条件
        "appearance": {
            // timerange: 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
            "timerange": [{
                "from": "09:00"
                , "to": "10:00"
            },
            {
                "from": "23:00"
                , "to": "01:00"
            }]
        }
    }
    , {
        "name": "蠍座",
        "message": "蠍座だよ",
        "img": "img/additem04.png",
        "rateTxt": "★★",
        "rate": 10,
        // 出現条件
        "appearance": {
            // 日付(毎月○日に出現等)
            "datespot": [3, 5, 10]
        }
    }
    , {
        "name": "天秤座",
        "message": "天秤座だよ",
        "img": "img/additem05.png",
        "rateTxt": "★★",
        "rate": 10,
        // 出現条件（複数の場合、AND条件となる）
        "appearance": {
            // 日付範囲(yyyy/MM/ddの書式)。複数範囲指定可能
            "daterange": [{
                "from": "2018/03/26"
                , "to": "2018/04/27"
            },
            {
                "from": "2018/04/01"
                , "to": "2018/04/05"
            }],
            // 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
            "timerange": [{
                "from": "09:00"
                , "to": "10:00"
            },
            {
                "from": "23:00"
                , "to": "01:00"
            }]
        }
    }
    , {
        "name": "乙女座",
        "message": "乙女座だよ",
        "img": "img/additem06.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance": {
            // 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
            "timerange": [{
                "from": "09:00"
                , "to": "10:00"
            },
            {
                "from": "23:00"
                , "to": "01:00"
            }],
            // datespot: 日付(毎月○日に出現等)
            "datespot": [3, 5, 10]
        }
    }
];

// 飛び散る星イメージ
// ※nullの場合、表示しません。
const STAR_SPARK_IMG = {
    "img": "img/star.png"
};

// コレクション画面の未取得かつ取得可能アイテムアイコン
const COLLECTION_UNACQUIRED = {
    "img": "img/question.png",
    "text": "まだゲットしてないアイテムだよ。何かな？"
};

// コレクション画面の未取得かつ取得期間外アイテムアイコン
const COLLECTION_OUTOFTERM = {
    "img": "img/outofterm.png",
    "text": "今はゲットできないアイテムだよ。ごめんね。"
};

// -----------------------------------------------------
// ■■　開始設定 ----------------------------------------

// 遷移元情報
// type: 遷移元種別
// cookie: 遷移元Cookie名("dicegame.cookie.from.free"は使わないでください)
// allow: そこからの遷移を許可するか(想定外のところはfalseに設定してください)
// repeat: そこからの遷移を繰り返し許可するか(falseの場合、Cookie期間中1度のみアクセス許可します)
// message: 挑戦完了画面で未達成の場合に表示されるメッセージ
// image: 挑戦完了画面で未達成の場合に表示される画像リンク
// button: 挑戦完了画面で未達成の場合に表示されるテキストリンク ※image優先
// url: リンク押下時の遷移先
const FROM_PARAMS = [
    {
        // LINEからの遷移
        "type": "line",
        "cookie": "dicegame.cookie.from.line",
        "allow": true,
        "repeat": false,
        "message": {
            enableHtml: false,
            text: "LINE@に新規登録するともう1戦可能！",
            x: 40,
            y: 70,
            width: 380,
            font: FONT18_ONELINE,
            color: COLOR_TEXT
        },
        "image": {
            img: 'img/line_add_friendsbtn_ja.png',
            width: 232,
            height: 72,
            x: 40,
            y: 100,
            scale: 0.5,
            originX: 0,
            originY: 0
        },
        "button": null,
        "url": "../other/linelink.html"
    },
    {
        // メルマガからの遷移
        "type": "mail",
        "cookie": "dicegame.cookie.from.mail",
        // 遷移拒否
        "allow": true,
        "repeat": false,
        "message": {
            enableHtml: false,
            text: "メルマガに新規登録するともう1戦可能！",
            x: 40,
            y: 70,
            width: 380,
            font: FONT18_ONELINE,
            color: COLOR_TEXT
        },
        "image": null,
        "button": {
            enableHtml: false,
            text: "メルマガ無料登録",
            x: 40,
            y: 100,
            width: 300,
            font: FONT20_BOLD_ONELINE,
            color: COLOR_LINK
        },
        "url": "../other/maillink.html"
    },
    {
        // 動画からの遷移
        "type": "movie",
        "cookie": "dicegame.cookie.from.movie",
        "allow": true,
        "repeat": true,
        "message": {
            enableHtml: false,
            text: "動画を視聴するともう1戦可能！<br>景品申請は最初の1回だけが有効です。",
            x: 40,
            y: 70,
            width: 380,
            font: FONT18_ONELINE,
            color: COLOR_TEXT
        },
        "image": null,
        "button": {
            enableHtml: false,
            text: "動画視聴",
            x: 40,
            y: 100,
            width: 300,
            font: FONT20_BOLD_ONELINE,
            color: COLOR_LINK
        },
        "url": "../other/movielink.html"
    }
];

// 開催期間
// それぞれ複数設定可能です。YYYY/MM/DD HH:mm形式で設定してください。
const DURATION_PARAMS = {
    // フリーモード開催期間
    "free": [
        {
            "from": "2018/03/26 10:00",
            "to": "2099/03/28 10:00"
        },
        {
            "from": "2018/03/29 16:00",
            "to": "2099/04/28 10:00"
        }
    ],
    // 挑戦モード開催期間
    "challenge": [
        {
            "from": "2018/04/07 10:00",
            "to": "2099/04/09 10:00"
        },
        {
            "from": "2018/04/16 10:00",
            "to": "2099/04/18 10:00"
        },
        {
            "from": "2018/03/29 16:00",
            "to": "2099/04/28 10:00"
        }
    ]
};

// ログインエラーメッセージ
const LOGIN_FAILURE_MESSAGE = {
    // 開催期間外アクセス
    "LOGIN_FAILURE_OUT_OF_PERIOD": "開催期間外です。",
    // 遷移元アクセス拒否（パラメータ不正）
    "LOGIN_FAILURE_INVALID_FROM": "不正な遷移元からのアクセスです。",
    // 遷移元アクセス拒否（既にアクセス済み）
    "LOGIN_FAILURE_ACCESSED_FROM": "既にアクセスされた遷移元です。",
    // それ以外のエラー
    "LOGIN_FAILURE": "アクセスに失敗しました。再読み込みしてください。"
}

// 遷移先パラメータ
const LOGIN_FAILURE_URLS = {
    // ログイン失敗：開催期間外アクセス
    "LOGIN_FAILURE_OUT_OF_PERIOD": "../index.html",
    // ログイン失敗：遷移元アクセス拒否（パラメータ不正）
    "LOGIN_FAILURE_INVALID_FROM": "../index.html",
    // ログイン失敗：遷移元アクセス拒否（既にアクセス済み）
    "LOGIN_FAILURE_ACCESSED_FROM": "../index.html",
    // ログイン失敗：それ以外のエラー
    "LOGIN_FAILURE": "../index.html"
}

// -----------------------------------------------------
// ■■　バルーン設定 ----------------------------------------
// チュートリアルモード時に表示する吹き出しの設定です。

// 吹き出しの背景色
const BALLOON_BG_COLOR = "#e0edff";

// 吹き出しのOKをボタン風に表示するHTML
const BALLOON_OK_BUTTON_HTML = ""
    + "<div style='"
    + "font: " + FONT12_ONELINE + ";"
    + "width: 20px;"
    + "text-align: center;"
    + "margin: 0.2em 1em 0.2em auto;"
    + "padding: 0.2em 1em;"
    + "text-decoration: none;"
    + "background: #3e81d8;"
    + "color: #FFF;"
    + "border-bottom: solid 4px #2c459e;"
    + "border-radius: 3px;"
    + "'>OK</div>"
    ;

// 吹き出しの下向き矢印のCSS
const BALLOON_TRIANGLE_UNDER_CSS = ""
    + "margin-top: -40px;"
    + "margin-left: 40px;"
    + "width: 0;"
    + "height: 0;"
    + "border-top: 50px solid " + BALLOON_BG_COLOR + ";"
    + "border-right: 10px solid transparent;"
    + "border-bottom: 50px solid transparent;"
    + "border-left: 10px solid transparent;"
    ;

// 吹き出しの上向き矢印のCSS
const BALLOON_TRIANGLE_UPPER_CSS = ""
    + "position:relative;"
    + "top: 30px;"
    + "left: 40px;"
    + "width: 0;"
    + "height: 0;"
    + "border-bottom: 50px solid " + BALLOON_BG_COLOR + ";"
    + "border-right: 10px solid transparent;"
    + "border-top: 50px solid transparent;"
    + "border-left: 10px solid transparent;"
    ;

// 吹き出しの左向き矢印のCSS
const BALLOON_TRIANGLE_LEFT_CSS = ""
    + "position: absolute;"
    + "left: -50px;"
    + "top: 40px;"
    + "display: block;"
    + "width: 0;"
    + "height: 0;"
    + "border-right: 30px solid " + BALLOON_BG_COLOR + ";"
    + "border-top: 10px solid transparent;"
    + "border-left: 30px solid transparent;"
    + "border-bottom: 10px solid transparent;"
    ;

// 吹き出し本体のCSS
const BALLOON_CSS = ""
    + "position: relative;"
    + "display: inline-block;"
    + "margin: 1.5em 0;"
    + "padding: 7px 10px;"
    + "min-width: 120px;"
    + "max-width: 100%;"
    + "color: #555;"
    + "font-size: 16px;"
    + "background: " + BALLOON_BG_COLOR + ";"
    + "border-radius: 15px;"
    ;

// 下向き吹き出し
// html：吹き出しテキスト
//      {text}：吹き出しの中身文字列
// animation: 吹き出しアニメーション
// 参考：http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Timeline.html
const BALLOON_DIRECTION_UNDER = {
    type: "under",
    html: ""
        + "<div style='font: " + FONT18_ONELINE + ";'>"
        + "<div style='" + BALLOON_CSS + "'>{text}"
        + BALLOON_OK_BUTTON_HTML + "</div>"
        + "<div style='" + BALLOON_TRIANGLE_UNDER_CSS + "'>&nbsp;</div>"
        + "</div>",
    x: 0,
    y: 0,
    offsetX: 80,
    offsetY: -80,
    width: 200,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    animation: [
        // 表示させるまで少し待ち
        { "type": "delay", "time": 10 },
        // ちょっとゆっくり目に表示して
        { "type": "fadeIn", "time": 5 },
        // 初期位置から下に移動
        { "type": "moveBy", "x": 0, "y": 10, "time": 10 },
        // 前位置から上に移動
        { "type": "moveBy", "x": 0, "y": -10, "time": 7 },
        // 前位置から下に移動
        { "type": "moveBy", "x": 0, "y": 10, "time": 10 },
        // 前位置から上に移動
        { "type": "moveBy", "x": 0, "y": -10, "time": 7 }
    ]
}
    ;

// 上向き吹き出し
// html：吹き出しテキスト
//      {text}：吹き出しの中身文字列
// animation: 吹き出しアニメーション
// 参考：http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Timeline.html
const BALLOON_DIRECTION_UPPER = {
    type: "upper",
    html: ""
        + "<div style='font: " + FONT18_ONELINE + ";'>"
        + "<div style='" + BALLOON_TRIANGLE_UPPER_CSS + "'>&nbsp;</div>"
        + "<div style='" + BALLOON_CSS + "'>{text}"
        + BALLOON_OK_BUTTON_HTML + "</div>"
        + "</div>",
    x: 0,
    y: 0,
    offsetX: 80,
    offsetY: -80,
    width: 200,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    animation: [
        // 表示させるまで少し待ち
        { "type": "delay", "time": 10 },
        // ちょっとゆっくり目に表示して
        { "type": "fadeIn", "time": 5 },
        // 初期位置から上に移動
        { "type": "moveBy", "x": 0, "y": -10, "time": 10 },
        // 前位置から下に移動
        { "type": "moveBy", "x": 0, "y": 10, "time": 7 },
        // 前位置から上に移動
        { "type": "moveBy", "x": 0, "y": -10, "time": 10 },
        // 前位置から下に移動
        { "type": "moveBy", "x": 0, "y": 10, "time": 7 }
    ]
}
    ;

// 左向き吹き出し
// html：吹き出しテキスト
//      {text}：吹き出しの中身文字列
// animation: 吹き出しアニメーション
// 参考：http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Timeline.html
const BALLOON_DIRECTION_LEFT = {
    type: "left",
    html: ""
        + "<div style='font: " + FONT18_ONELINE + ";'>"
        + "<div style='" + BALLOON_TRIANGLE_LEFT_CSS + "'>&nbsp;</div>"
        + "<div style='" + BALLOON_CSS + "'>{text}"
        + BALLOON_OK_BUTTON_HTML + "</div>"
        + "</div>",
    x: 0,
    y: 0,
    offsetX: 80,
    offsetY: -80,
    width: 200,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    animation: [
        // 表示させるまで少し待ち
        { "type": "delay", "time": 10 },
        // ちょっとゆっくり目に表示して
        { "type": "fadeIn", "time": 5 },
        // 初期位置から左に移動
        { "type": "moveBy", "x": -10, "y": 0, "time": 10 },
        // 前位置から右に移動
        { "type": "moveBy", "x": 10, "y": 0, "time": 7 },
        // 前位置から左に移動
        { "type": "moveBy", "x": -10, "y": 0, "time": 10 },
        // 前位置から右に移動
        { "type": "moveBy", "x": 10, "y": 0, "time": 7 }
    ]
}
    ;


// 強調吹き出し
// html：吹き出しテキスト
//      {text}：吹き出しの中身文字列
// animation: 吹き出しアニメーション
// 参考：http://wise9.github.io/enchant.js/doc/core/ja/symbols/enchant.Timeline.html
const BALLOON_APPEAL = {
    type: "appeal",
    html: ""
        + "<div style='font: " + FONT18_ONELINE + ";'>"
        + "<div style='" + BALLOON_CSS + "'>{text}"
        + BALLOON_OK_BUTTON_HTML + "</div>"
        + "</div>",
    x: 120,
    y: 120,
    offsetX: 0,
    offsetY: 0,
    width: 200,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    animation: [
        // 表示させるまで少し待ち
        { "type": "delay", "time": 20 },
        // ちょっとゆっくり目に表示して
        { "type": "fadeIn", "time": 5 },
        // 少し大きくなる
        { "type": "scaleBy", "scaleX": 1.5, "scaleY": 1.5, "time": 12 },
        // 少し小さくなる
        { "type": "scaleBy", "scaleX": 0.8, "scaleY": 0.8, "time": 10 },
        // 少し大きくなる
        { "type": "scaleBy", "scaleX": 1.2, "scaleY": 1.2, "time": 8 },
        // 少し小さくなる
        { "type": "scaleBy", "scaleX": 0.8, "scaleY": 0.8, "time": 10 }
    ]
}
    ;

// -----------------------------------------------------------
// ■■　各画面共通 ----------------------------------------

// モード別ヘッダラベル
// 上から優先順に該当モードに合致した場合に表示します。
// ※それぞれnullの場合は表示しません。
const MODE_HEADER_LABELS = {
    // チュートリアルモード時のラベル
    "tutorial": {
        text: "【チュートリアル】",
        x: 300,
        y: 20,
        font: FONT14_ONELINE,
        color: COLOR_TEXT
    },
    // 挑戦モード時のラベル
    "challenge": {
        text: "【挑戦！】",
        x: 350,
        y: 20,
        font: FONT14_ONELINE,
        color: COLOR_TEXT
    },
    // フリーモード時のラベル
    "free": {
        text: "【フリー】",
        x: 350,
        y: 20,
        font: FONT14_ONELINE,
        color: COLOR_TEXT
    }
}

// -----------------------------------------------------------
// ■■　ローディング画面 ----------------------------------------

// ローディング画面：無地のローディング文字
// 画像の読み込みに少し時間がかかるので、その間のローディング表示です。
// {progress}: 進捗数字
const LOADING_SCENE_PROGRESS_LOADING = {
    enableHtml: false,
    text: "LOADING... {progress}",
    x: 270,
    y: 560,
    width: 300,
    font: FONT18_ONELINE,
    color: "#FFFFFF"
}

// ローディング画面：メッセージ画像・テキスト
// モード別に設定可能ですが、画像とラベルの両方が指定されていた場合、画像が優先されます。
// 
// image: 画像
//      target: 表示対象モード(challenge, )
//      width: 画像本来の幅
//      height: 画像本来の高さ
//      x: ゲーム画面内のX軸表示位置
//      y: ゲーム画面内のY軸表示位置
//      scale: 縮尺
//      originX: 縮尺等の基点。基本0でよい。
//      originY: 縮尺等の基点。基本0でよい。
// text: テキスト
//      enableHtml: HTMLタグを利用する場合、true（brタグだけの場合はfalseで可。）
//      text: 文言もしくはHTML
//      x: ゲーム画面内のX軸表示位置
//      y: ゲーム画面内のY軸表示位置
//      width: 画面内の表示サイズ。これを超えると折り返される
//      font: 文言のフォント
//      color: 文言の文字色
const LOADING_SCENE_MESSAGE_ENTITY = {
    'challenge': {
        'image': {
            img: 'img/leaflet.jpg',
            width: 420,
            height: 590,
            x: 0,
            y: 0,
            scale: 1,
            originX: 0,
            originY: 0
        },
        'label': null
    },
    'free': {
        'image': null,
        'label': {
            enableHtml: true,
            text: "<span style='font: " + FONT18_ONELINE + ";'>"
                + "<span style='color: #FF3333; font-weight: bold;'>NEWS</span><ul style='padding-left: 0px;'>"
                + "<li>2018/04/10　新アイテム3件追加！</li>"
                + "</ul></span>"
                + "<div style='font: " + FONT18_ONELINE + ";margin-top: 20px;'>そのままお待ちください</div>",
            x: 40,
            y: 20,
            width: 300,
            color: COLOR_TEXT
        }
    },
    'tutorial': {
        'image': null,
        'label': {
            enableHtml: true,
            text: "<span style='font: " + FONT18_ONELINE + ";'>"
                + "<span style='color: #FF3333; font-weight: bold;'>チュートリアル</span>"
                + "</span>"
                + "<div style='font: " + FONT18_ONELINE + ";margin-top: 20px;'>そのままお待ちください</div>",
            x: 40,
            y: 20,
            width: 300,
            color: COLOR_TEXT
        }
    }
};


// ローディング画面：全体画像のローディング文字
// progressTxt: 進捗度合いとして表示される文字
// progressCnt: 進捗待機数
const LOADING_SCENE_MESSAGE_LOADING = {
    enableHtml: false,
    text: "LOADING ",
    progressTxt: "■",
    progressCnt: 3,
    x: 270,
    y: 560,
    width: 300,
    font: FONT18_ONELINE,
    color: "#FFFFFF"
}



// -----------------------------------------------------------
// ■■　ルール画面 ----------------------------------------

// ルール画面：ウェルカム画像
// ※nullの場合、表示しません。
// width: 画像本来の幅
// height: 画像本来の高さ
// x: ゲーム画面内のX軸表示位置
// y: ゲーム画面内のY軸表示位置
// scale: 縮尺
// originX: 縮尺等の基点。基本0でよい。
// originY: 縮尺等の基点。基本0でよい。
const RULE_SCENE_WELCOME_IMG = {
    img: 'img/welcome.png',
    width: 500,
    height: 500,
    x: 20,
    y: 30,
    scale: 0.12,
    originX: 0,
    originY: 0
}

// ルール画面：ウェルカムメッセージ
// ※nullの場合、表示しません。
// enableHtml: HTMLタグを利用する場合、true（brタグだけの場合はfalseで可。）
// text: 文言もしくはHTML
// x: ゲーム画面内のX軸表示位置
// y: ゲーム画面内のY軸表示位置
// width: 画面内の表示サイズ。これを超えると折り返される
// font: 文言のフォント
// color: 文言の文字色
const RULE_SCENE_WELCOME_LABEL = {
    enableHtml: true,
    text: "<span style='font: " + FONT18_ONELINE + ";'>"
        + "<span style='color: #FF3333; font-weight: bold;'>こんにちは！</span><br>"
        + "僕、ウンエルだよ。<br>　<br>"
        + "開運につながる<br>フォーチュンダイス、<br>"
        + "楽しんでいってね。</span>",
    x: 100,
    y: 20,
    width: 300,
    color: COLOR_TEXT
}

// ルール画面：プレゼント文言
// 挑戦モードの時のみ表示します。
const RULE_SCENE_PRESENT_LABEL = {
    enableHtml: false,
    text: "景品<br>"
        + "　入手したラッキーアイテムの数に応じて<br>　景品をプレゼント♪<br>　<br>"
        + "・1個   … おすすめ動画プレゼント<br>"
        + "・2個   … おすすめ動画2つプレゼント<br>"
        + "・3個   … お焚き上げ(悪縁断ち)<br>"
        + "・4個   … お焚き上げ(心願成就)<br>"
        + "・5個   … 【聖なる炎の国】<br>　　　　　　トルコの塩<br>"
        + "・6個   … 風水師の先生サイン本<br>"
        + "・7個   … 台湾旅行<br>",
    x: 20,
    y: 150, // ウェルカムメッセージがある場合は、150くらい。ない場合は、20くらい。
    width: 400,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// ルール画面：ルール文言
// ゲームモードによって、文言またはY軸の位置を変更します。
const RULE_SCENE_RULE_LABEL = {
    enableHtml: false,
    text: {
        "challenge": "ルール<br>"
            + "・相手を選んでね。<br>"
            + "・サイコロを振って！<br>"
            + "・数字の目が相手より<br>　大きければラッキー♪<br>"
            + "　同じか小さければアンラッキー…<br>"
            + "・景品の申請はメールフォームからだよ～<br>"
            + "<br>",
        "free": "ルール<br>"
            + "・相手を選んでね。<br>"
            + "・サイコロを振って！<br>"
            + "・数字の目が相手より<br>　大きければラッキー♪<br>"
            + "　同じか小さければアンラッキー…<br>"
            + "・何度でも遊べるよ<br>"
            + "<br>",
        "tutorial": "ルール<br>"
            + "・僕が吹き出しで案内するから、<br>その順番に沿って遊んでね。<br>"
            + "・相手を選んでね。<br>"
            + "・サイコロを振って！<br>"
            + "・数字の目が相手より<br>　大きければラッキー♪<br>"
            + "　同じか小さければアンラッキー…<br>"
            + "<br>"
    },
    x: 20,
    y: {
        "challenge": 400,   // ウェルカムメッセージがある場合は、400くらい。ない場合は、340くらい。
        "free": 150,        // フリーモード時、景品がない分上に配置
        "tutorial": 150     // チュートリアルモード自、景品がない分上に配置
    },
    width: 400,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// ルール画面：ゲームスタート画像
const RULE_SCENE_START_ENTITY = {
    'image': {
        img: 'img/game_start.png',
        width: 446,
        height: 120,
        x: 120,
        y: {
            "challenge": 540,
            "free": 340,
            "tutorial": 340
        },
        scale: 0.44,
        originX: 0,
        originY: 0    
    },
    text: null
}

// ルール画面：初期バルーン（チュートリアル開始案内）
// balloon: 吹き出しタイプ(BALLOON_APPEAL, BALLOON_DIRECTION_LEFT, BALLOON_DIRECTION_UNDER)
// target: 吹き出しを示す対象。(BALLOON_DIRECTION_LEFT, BALLOON_DIRECTION_UNDERのみ)
// text: 吹き出し内のテキスト
// width: 画面内の表示サイズ。これを超えると折り返される（未指定の場合、balloon設定が適用される）
// color: 文言の文字色（未指定の場合、balloon設定が適用される）
const RULE_SCENE_BALLOON_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "フォーチュンダイスへようこそ！<br>"
        + "僕が案内するからついてきてね。"
}

// ルール画面：ルールバルーン
const RULE_SCENE_BALLOON_RULE = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：ルールラベル
    target: RULE_SCENE_RULE_LABEL,
    // 吹き出し位置調整
    offsetX: 80,
    offsetY: -150,
    width: 300,
    text: "このゲームの簡単なルールだよ。<br>"
        + "でも僕がつきっきりで案内するから<br>"
        + "きっと大丈夫！"
}

// ルール画面：開始ボタンバルーン
const RULE_SCENE_BALLOON_START = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：開始画像
    target: RULE_SCENE_START_ENTITY,
    // 吹き出し位置調整
    offsetX: 10,
    offsetY: -110,
    width: 300,
    text: "さぁ、このボタンを押して始めよう！"
}

// -----------------------------------------------------------
// ■■　ライバル選択画面 ----------------------------------------

// ライバル選択画面：選択文言
// textAlign: 水平方向の文字位置（left, center, right）
const RIVAL_SELECT_SCENE_SELECT_LABEL = {
    enableHtml: false,
    text: "お相手を選んで下さい",
    x: 0,
    y: 20,
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    textAlign: "center"
}

// ライバルリスト
// 項目最大数：5
// x: x位置
// y: y位置
// name: 名前
// img: 画像(画像サイズは500x500固定)
// description: 説明(nullの場合、表示しません。)
const RIVAL_LIST = [
    {
        "x": 20,
        "y": 70,
        "name": "スダーニ　げん",
        "img": 'img/Gen.png',
        "description": "ドバイに行ったとき、<br>らくだと顔の長さ勝負をしたんだって。"
    },
    {
        "x": 20,
        "y": 170,
        "name": "ヒゲアラブ",
        "img": 'img/hige.png',
        "description": "国際線に乗ると英語で接客されるってのも<br>納得の顔の濃さだよね！"
    },
    {
        "x": 20,
        "y": 270,
        "name": "月下老人",
        "img": 'img/yuelao.png',
        "description": "げっかろうじんだよ。<br>縁結びの神様なんだ。<br>台湾の龍山寺とかで会えるんだって。"
    },
    {
        "x": 20,
        "y": 370,
        "name": "木花咲耶姫",
        "img": 'img/sakuya.png',
        "description": "このはなさくやひめだよ。<br>富士山やお酒の神様なんだって。<br>桜ともよくコラボしてるね。"
    }
];

// ライバルバルーン用ラベル（中身は空）
const RIVAL_SELECT_SCENE_RIVAL_LABEL = {
    enableHtml: false,
    text: "",
    x: 20,  // ライバルリスト1件目のXと同じ値
    y: 70,  // ライバルリスト1件目のYと同じ値
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// ライバル選択画面：初期バルーン
const RIVAL_SCENE_BALLOON_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "この画面では、ゲームの対戦相手を選ぶよ。"
}

// ライバル選択画面：ライバルバルーン
const RIVAL_SCENE_BALLOON_RIVAL = {
    // 吹き出しタイプ：左方向
    balloon: BALLOON_DIRECTION_LEFT,
    // 吹き出し対象：ライバルラベル
    target: RIVAL_SELECT_SCENE_RIVAL_LABEL,
    // 吹き出し位置調整
    offsetX: 190,
    offsetY: 5,
    width: 200,
    text: "気になる相手を選んでね<br>"
        + "その人があなたの対戦相手だよ。"
}

// -----------------------------------------------------------
// ■■　ダイス画面 ---------------------------------------------

// ダイス画面：プレイヤーの名称
const DICE_SCENE_YOU_LABEL = {
    enableHtml: false,
    text: "あなた",
    x: 185,
    y: 340,
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// ダイス画面：サイコロを回す
const DICE_SCENE_ROLL_START_ENTITY = {
    'image': {
        img: 'img/dice_start.png',
        width: 446, 
        height: 120,
        x: 110,
        y: 380,
        scale: 0.44,
        originX: 0,
        originY: 0        
    },
    'label': null
}

// ダイス画面：サイコロを止める
const DICE_SCENE_ROLL_STOP_ENTITY = {
    'image': {
        img: 'img/dice_stop.png',
        width: 446, 
        height: 120,
        x: 110,
        y: 380,
        scale: 0.44,
        originX: 0,
        originY: 0        
    },
    'label': null
}

// 通常勝負版：勝率テーブル
// 指定連勝数以降は、最後の連勝数を適用
// モード別に指定可能
// challenge：挑戦モード
// free: フリーモード
// retry: 挑戦リトライモード
//      win: 連勝数
//      self: 自分の勝率(サイコロの目にこの数字を加算)
//      rival: ライバルの勝率(サイコロの目にこの数字を加算)
// チュートリアルは、1回目は必ず勝利し、2回目は必ず敗北する
const WINNING = {
    "challenge": [
        { "win": 0, "self": 4, "rival": -1 },
        { "win": 1, "self": 2, "rival": 0 },
        { "win": 2, "self": 1, "rival": 0 },
        { "win": 3, "self": 0, "rival": 1 },
        { "win": 4, "self": 0, "rival": 1 },
        { "win": 5, "self": -1, "rival": 2 },
        { "win": 6, "self": -1, "rival": 2 },
        { "win": 7, "self": -2, "rival": 2 }
    ],
    "free": [
        { "win": 0, "self": 0, "rival": 0 },
    ],
    "tutorial": [
        // チュートリアル初回は必ず勝つ
        { "win": 0, "self": 4, "rival": -4 },
        // チュートリアル二回目は必ず負ける
        { "win": 1, "self": -4, "rival": 4 }
    ],
    "retry": [
        { "win": 0, "self": 1, "rival": -1 },
        { "win": 1, "self": 2, "rival": 0 },
        { "win": 2, "self": 1, "rival": 0 },
        { "win": 3, "self": 0, "rival": 1 },
        { "win": 4, "self": 0, "rival": 1 },
        { "win": 5, "self": -1, "rival": 2 },
        { "win": 6, "self": -1, "rival": 2 },
        { "win": 7, "self": -2, "rival": 2 }
    ]
};

// ダイス画面：勝利文言
// enableHtmlはfalse固定
const DICE_SCENE_WIN_LABEL = {
    enableHtml: false,
    text: "すごいね!!",
    x: 150,
    y: 220,
    width: 400,
    font: FONT25_BOLD_ONELINE,
    color: COLOR_WIN
}

// ダイス画面：敗北文言
// enableHtmlはfalse固定
const DICE_SCENE_LOSE_LABEL = {
    enableHtml: false,
    text: "あーーーっ",
    x: 150,
    y: 220,
    width: 400,
    font: FONT25_BOLD_ONELINE,
    color: COLOR_LOSE
}

// ダイス画面：連勝ヘッダ
// text: 連勝中の文言
// initialtext: 初期表示時の文言（挑戦モードはtext文言を表示)
// ■組み込み可能変数
// 　{remaining_win}: 連勝残り回数
// 　{present}: プレゼント名
//   {total_win}：連勝数
const DICE_SCENE_HEADER_LABEL = {
    enableHtml: false,
    text: {
        "challenge": "あと{remaining_win}個のラッキーアイテムを入手すれば<br>"
            + "「{present}」プレゼント！",
        "tutorial": "ラッキーアイテム{total_win}個ゲット！",
        "free": "ラッキーアイテム{total_win}個ゲット！"
    },
    initialtext: {
        "tutorial": "お試し対戦",
        "free": ""
    },
    x: 10,
    y: 10,
    width: 320,
    font: FONT16_ONELINE,
    color: COLOR_TEXT
}

// ダイス画面：勝利時、勝利切れ目の継続有無確認ダイアログ文言
// ■組み込み可能変数
// 　{remaining_win}: 連勝残り回数
// 　{present}: プレゼント名
// 　{advice}: アドバイス (未設定ならば何も出力しない)
// 　{message}: その他メッセージ (未設定ならば何も出力しない)
const DICE_SCENE_WIN_CONTINUE_CONFIRM_FORMAT = ""
    + "やったね！\n"
    + "あと{remaining_win}個のラッキーアイテムを入手すれば\nリアルでも{present}をプレゼントしちゃうよ。"
    + "\n\n対戦を続ける場合は「OK」。\n続けない場合は「キャンセル」をクリックしてね。";

// ダイス画面：一度降りるを選択した際のあおり文句
// null 設定すると、あおり文句そのものを表示しません。
// 改行は「\n」で行ってください。
const DICE_SCENE_RECONFIRM_MESSAGE = null;

// ダイス画面：初期バルーン
const DICE_SCENE_BALLOON_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "いよいよゲーム開始だよ"
}

// 自分のサイコロバルーン用ラベル（中身は空）
const DICE_SCENE_BALLOON_MY_DICE_LABEL = {
    enableHtml: false,
    text: "",
    x: 170,  // 固定
    y: 250,  // 固定
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// ダイス画面：自分のサイコロバルーン
const DICE_SCENE_BALLOON_MY_DICE = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：自分のサイコロバルーン用ラベル
    target: DICE_SCENE_BALLOON_MY_DICE_LABEL,
    // 吹き出し位置調整
    offsetX: -40,
    offsetY: -140,
    width: 300,
    text: "あなたが回すサイコロだよ。"
}

// ライバルのサイコロバルーン用ラベル（中身は空）
const DICE_SCENE_BALLOON_RIVAL_DICE_LABEL = {
    enableHtml: false,
    text: "",
    x: 170,  // 固定
    y: 140,  // 固定
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// ダイス画面：ライバルのサイコロバルーン
const DICE_SCENE_BALLOON_RIVAL_DICE = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：ライバルのサイコロバルーン用ラベル
    target: DICE_SCENE_BALLOON_RIVAL_DICE_LABEL,
    // 吹き出し位置調整
    offsetX: -40,
    offsetY: -140,
    width: 300,
    text: "ライバルが回すサイコロだよ。"
}

// ダイス画面：勝敗バルーン
const DICE_SCENE_BALLOON_BATTLE = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "サイコロを回して、ライバルよりあなたの方が<br>大きい目を出したら、あなたの勝ち！<br><br>"
        + "二人が同じ目か、あなたが小さい目を出してしまったら、あなたの負け…<br><br>"
}

// ダイス画面：サイコロを回すボタンバルーン
const DICE_SCENE_BALLOON_START = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：回す画像
    target: DICE_SCENE_ROLL_START_ENTITY,
    // 吹き出し位置調整
    offsetX: -20,
    offsetY: -180,
    width: 350,
    text: "それじゃあ、一度サイコロを回してみよう。<br>"
        + "このボタンを押すとダイスが回りだすよ。<br>"
        + "好きなタイミングでもう一度ボタンを押してね。ダイスが止まるよ。"
}

// ダイス画面：勝利：初期バルーン
const DICE_SCENE_BALLOON_WIN_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "おめでとう！<br>あなたの勝ちだよ！"
}

// ダイス画面：勝利：ヘッダバルーン
const DICE_SCENE_BALLOON_WIN_HEADER = {
    // 吹き出しタイプ：上方向
    balloon: BALLOON_DIRECTION_UPPER,
    // 吹き出し対象：連勝ヘッダラベル
    target: DICE_SCENE_HEADER_LABEL,
    // 吹き出し位置調整
    offsetX: 30,
    offsetY: -20,
    width: 300,
    text: "あなたがゲットしたラッキーアイテムの数だよ。<br>"
        + "本番挑戦時には、ここに次の景品が表示されるよ。"
}

// アイテムバルーン用ラベル（中身は空）
const DICE_SCENE_BALLOON_ITEM_LABEL = {
    enableHtml: false,
    text: "",
    x: 30,  // 固定
    y: 310,  // 固定
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// ダイス画面：アイテムバルーン
const DICE_SCENE_BALLOON_ITEM = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：アイテムバルーン用ラベル
    target: DICE_SCENE_BALLOON_ITEM_LABEL,
    // 吹き出し位置調整
    offsetX: -30,
    offsetY: -40,
    width: 300,
    text: "勝負に勝つと、ラッキーアイテムがゲットできるよ。<br>"
        + "限定アイテムもあるからいっぱい遊んでみてね。"
}

// ダイス画面：サイコロを回すボタン2回目バルーン
const DICE_SCENE_BALLOON_WIN_RESTART = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：回す画像
    target: DICE_SCENE_ROLL_START_ENTITY,
    // 吹き出し位置調整
    offsetX: -30,
    offsetY: -140,
    width: 300,
    text: "勝負に勝つと、さらに勝負する事ができるよ。<br>さぁ、もう一度挑戦してみよう！"
}

// ダイス画面：敗北：初期バルーン
const DICE_SCENE_BALLOON_LOSE_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "残念…負けちゃった…"
}



// -----------------------------------------------------------
// ■■　コレクション画面 ---------------------------------------------

// コレクション画面：タイトル
// textAlign: 水平方向の文字位置（left, center, right）
const COLLECTION_SCENE_TITLE_LABEL = {
    enableHtml: false,
    text: "フォーチュンアイテムコレクション",
    x: 0,
    y: 20,
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT,
    textAlign: "center"
}

// コレクション画面：タイトル
// textAlign: 水平方向の文字位置（left, center, right）
const COLLECTION_SCENE_MESSAGE_LABEL = {
    enableHtml: false,
    text: "ゲットしたフォーチュンアイテム<br>"
        + "タップするとアイテムの詳細が見れるよ。",
    x: 20,
    y: 50,
    width: 400,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// コレクション画面：ゲームリトライ画像
const COLLECTION_SCENE_RETRY_ENTITY = {
    'image': {
        img: 'img/game_restart.png',
        width: 446,
        height: 120,
        x: 120,
        y: 300,
        scale: 0.44,
        originX: 0,
        originY: 0    
    },
    'label': null
}

// コレクション画面：勝負画像
// チュートリアルの場合のみ表示される
const COLLECTION_SCENE_CHALLENGE_ENTITY = {
    'image': {
        img: 'img/game_invitation.png',
        width: 446,
        height: 120,
        x: 120,
        y: 370,
        scale: 0.44,
        originX: 0,
        originY: 0    
    },
    'label': null
}

// コレクション画面：初期バルーン
const COLLECTION_SCENE_BALLOON_INITIAL = {
    // 吹き出しタイプ：強調
    balloon: BALLOON_APPEAL,
    text: "お疲れ様。<br>これでこのゲームはいったんおしまいだよ。"
}

// アイテムバルーン用ラベル（中身は空）
const COLLECTION_SCENE_BALLOON_ITEM_LABEL = {
    enableHtml: false,
    text: "",
    x: 0,  // 固定
    y: 0,  // 固定
    width: 400,
    font: FONT18_ONELINE,
    color: COLOR_TEXT
}

// コレクション画面：ゲットアイテム
const COLLECTION_SCENE_BALLOON_ITEM = {
    // 吹き出しタイプ：上方向
    balloon: BALLOON_DIRECTION_UPPER,
    // 吹き出し対象：アイテムバルーン用ラベル
    target: DICE_SCENE_BALLOON_ITEM_LABEL,
    // 吹き出し位置調整
    offsetX: -20,
    offsetY: -140,
    width: 350,
    text: "あなたがゲットしたラッキーアイテムの一覧だよ。<br>"
        + "「？」の欄は、今ゲットできるかもしれないアイテム。<br>"
        + "「×」の欄は、期間限定で今はゲットできないアイテムなんだ。<br>"
        + "30日間経つと、僕忘れちゃうから、また遊びに来てね。"
}

// コレクション画面：もうちょっと遊ぶ
const COLLECTION_SCENE_BALLOON_RETRY = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：回す画像
    target: COLLECTION_SCENE_RETRY_ENTITY,
    // 吹き出し位置調整
    offsetX: -30,
    offsetY: -140,
    width: 300,
    text: "もう一回遊びたいときは、このボタンをクリックしてね！<br>"
        + "新しいアイテムがゲットできるかも！"
}

// コレクション画面：本番挑戦
const COLLECTION_SCENE_BALLOON_CHALLENGE = {
    // 吹き出しタイプ：下方向
    balloon: BALLOON_DIRECTION_UNDER,
    // 吹き出し対象：回す画像
    target: COLLECTION_SCENE_CHALLENGE_ENTITY,
    // 吹き出し位置調整
    offsetX: -30,
    offsetY: -150,
    width: 300,
    text: "景品をかけて勝負するときは、このボタンをクリックしてね！"
}


// -----------------------------------------------------------
// ■■　報告画面 ----------------------------------------

// 報告画面：お祝いメッセージ
const REPORT_SCENE_CONGRATULATIONS_LABEL = {
    enableHtml: false,
    text: ""
        + "わあ、すごいね!!<br>　<br>"
        + "申請ページへ進んでね。<br>"
        + "コードはぼくが持っていくよ。<br>",
    x: 40,
    y: 20,
    width: 400,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// 報告画面：プレゼント申請フォーム文言
// ■組み込み可能変数
// 　{date}:挑戦日付
// 　{total_win}: 連勝数
// 　{present}: プレゼント名
// 　{key}: キー
const REPORT_SCENE_PRESENT_FORM_DATA_FORMAT = ""
    + "祈願日時: {date}\n"
    + "ラッキーアイテム数: {total_win}\n"
    + "応募景品: {present}\n"
    + "キー: {key}"
    ;

// 報告画面：申請ページへ進むメッセージ
const REPORT_SCENE_CONTACT_LINK_ENTITY = {
    'image': null,
    'label': {
        enableHtml: false,
        text: "⇒申請ページへ進む",
        x: 40,
        y: 200,
        width: 300,
        font: FONT20_BOLD_ONELINE,
        color: COLOR_LINK    
    }
}

// 報告画面：申請時のサポート文言
const REPORT_SCENE_SUPPORT_LABEL = {
    enableHtml: false,
    text: "サポート文言",
    x: 40,
    y: 250,
    width: 400,
    font: FONT14_SPACE150,
    color: COLOR_TEXT
}
    ;

// -----------------------------------------------------------
// ■■　アイテムなし投了画面 ----------------------------------------

// アイテムなし投了画面：上部メッセージ
const NONCOLLECTION_SCENE_GAMEOVER_LABEL = null;

// アイテムなし投了画面：リトライ
// ※nullの場合、表示しません。
const NONCOLLECTION_SCENE_RETRY_LABEL = null;

// 完了画面：リトライリンク文言
// ※nullの場合、表示しません。
const NONCOLLECTION_SCENE_RETRY_ENTITY = null;

// コレクション画面：勝負画像
// チュートリアルの場合のみ表示される
const NONCOLLECTION_SCENE_CHALLENGE_ENTITY = null;

// コレクション画面：初期バルーン
const NONCOLLECTION_SCENE_BALLOON_INITIAL = null;

// コレクション画面：もうちょっと遊ぶ
const NONCOLLECTION_SCENE_BALLOON_RETRY = null;

// コレクション画面：本番挑戦
const NONCOLLECTION_SCENE_BALLOON_CHALLENGE = null;

// -----------------------------------------------------------
// ■■　挑戦完了画面 ----------------------------------------

// 挑戦完了画面：上部メッセージ
const THANKYOU_SCENE_THANKYOU_LABEL = {
    enableHtml: false,
    text: "ラッキー捕まえられなくて<br>ごめんね。",
    x: 40,
    y: 20,
    width: 400,
    font: FONT20_SPACE150,
    color: COLOR_TEXT
}
    ;

// 挑戦完了画面：招待文言
const THANKYOU_SCENE_INVITATION_LABEL = {
    enableHtml: false,
    text: ""
        + "遊んでくれたお礼に、<br>幸運のお裾分けだよ。<br>実は風水の先生に<br>"
        + "「台湾と風水」というネタで<br>少しだけ話してもらったことがあるんだ♪<br>"
        + "　<br>"
        + "通常5000円なんだけど、<br>"
        + "下のリンクから申し込んでくれれば<br>無料になるよ！<br>"
        + "（抽選で10名様だけだけど…）<br>"
        + "　<br>"
        + "興味ある人は<br>こちらから応募してね！",
    x: 40,
    y: 150,
    width: 300,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// 挑戦完了画面：招待リンク
const THANKYOU_SCENE_INVITATION_LINK_ENTITY = {
    'image': null,
    'label': {
        enableHtml: false,
        text: "「台湾と風水」<br>無料プレゼントフォームへ",
        x: 40,
        y: 430,
        width: 300,
        font: FONT20_BOLD_ONELINE,
        color: COLOR_LINK    
    }
}

// 挑戦完了画面：リトライ
// nullの場合、表示しません。
const THANKYOU_SCENE_RETRY_LABEL = {
    enableHtml: false,
    text: ""
        + "もうちょっと遊んでいく？<br>"
        + "※景品は出ないんだけど…！",
    x: 40,
    y: 500,
    width: 300,
    font: FONT18_SPACE150,
    color: COLOR_TEXT
}

// 完了画面：リトライリンク文言
const THANKYOU_SCENE_RETRY_ENTITY = {
    'image': {
        img: 'img/game_restart.png',
        width: 446, 
        height: 120,
        x: 120,
        y: 550,
        scale: 0.44,
        originX: 0,
        originY: 0
    },
    'label': null
}
