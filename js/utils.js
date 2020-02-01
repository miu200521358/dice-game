
// ゲーム情報管理クラス
const GameCls = class {

    constructor(width, height) {
        // ゲーム初期化
        this.game = new Core(width, height);
        // 背景色設定
        this.game.rootScene.backgroundColor = COLOR_BG;
        // 勝利情報をクリア
        this.totalWin = 0;
    }

    // プレゼント文言生成
    createPresentText() {
        for (var n = 0; n < PRESENT_LIST.length; n++) {
            if (this.totalWin < PRESENT_LIST[n].win) {
                return DICE_SCENE_HEADER_LABEL.text.challenge
                            .replace("{remaining_win}", (PRESENT_LIST[n].win - this.totalWin))
                            .replace("{present}", PRESENT_LIST[n].present.replace(/または/, "または<br>"));
            }
        }
        
        // 最後まで到達したら、最終文言表示
        return PRESENT_LIST[PRESENT_LIST.length - 1].message;
    }

    // 連勝切れ目の継続確認文言生成
    createWinConfirmText() {
        let str = DICE_SCENE_WIN_CONTINUE_CONFIRM_FORMAT;
    
        for (let n = 0; n < PRESENT_LIST.length; n++) {
            if (this.totalWin < PRESENT_LIST[n].win) {
                str = str                        
                        .replace("{remaining_win}", (PRESENT_LIST[n].win - this.totalWin))
                        .replace("{present}", PRESENT_LIST[n].present)
                        .replace("{advice}", ""+ PRESENT_LIST[n].advice)
                        .replace("{message}", ""+ PRESENT_LIST[n].message);
                break;
            }
        }
        
        return str;
    }

    // 勝負完了アラート
    showWinFinalAlert() {
        alert(PRESENT_LIST[PRESENT_LIST.length - 1].message);
        return true;
    }

    // 連勝切れ目であるか否か
    isWinBreak() {
        // 最終プレゼントは別でチェックするので、ここでは判定対象外
        for (var n = 0; n < PRESENT_LIST.length - 1; n++) {
            if (this.totalWin == PRESENT_LIST[n].win) {
                return true;
            }
        }
    
        return false;            
    }

    // 連勝最終か
    isWinFinal() {
        return this.totalWin >= PRESENT_LIST[PRESENT_LIST.length - 1].win;
    }

    // プレゼント用フォームデータ生成
    createPresentFormData(nowMoment) {
        return REPORT_SCENE_PRESENT_FORM_DATA_FORMAT
            .replace("{date}", nowMoment.format())
            .replace("{total_win}", this.totalWin)
            .replace("{present}", this.getPresentName())
            .replace("{key}", this.getPresentKey(nowMoment))
        ;
    }

    // プレゼント用キー生成
    getPresentKey(nowMoment) {
        return ((nowMoment.valueOf() - getEncryptKey(this.totalWin)));
    }

    // プレゼント名称取得
    getPresentName() {
        for (var n = 0; n < PRESENT_LIST.length; n++) {
            if (this.   totalWin == PRESENT_LIST[n].win) {
                return PRESENT_LIST[n].present;
            }
        }
    
        return "不正です";
    }


}

// テキストもしくは画像の切替を持つカスタムEntity
const CustomEntity = enchant.Class.create({
    initialize: function (data, loginData, gameData) {
        this.entity = null;

        if (data.image) {
            // 画像の指定がある場合、画像
            this.entity = new CustomImg(data.image, loginData, gameData);
        }
        else {
            // 画像の指定が無い場合、テキスト
            this.entity = (new CustomLabel(data.label, loginData));
        }
    },

    isImage: function() {
        return (this.entity instanceof CustomImg);
    },

    isText: function() {
        return (this.entity instanceof CustomLabel);
    },

    getEntity: function() {
        if (this.isImage()) {
            return this.entity;
        }
        else {
            return this.entity.label;
        }
    },

    changeText: function(text) {
        this.entity.setText(text);
    }
});

// カスタムラベル
const CustomLabel = enchant.Class.create({
    initialize: function (data, loginData) {
        this.label;
        this.enableHtml = data.enableHtml;
        this.enableEval = data.enableEval;

        if (data.enableHtml) {
            // HTML有効時は、Entity生成
            this.label = new Entity();
        }
        else {
            // HTML無効時は、Label生成
            this.label = new Label();
        }

        // X軸
        if (isNaN(data.x)) {
            // 数値ではない場合、中を展開して配置する
            if (loginData.isTutorial() && data.x.tutorial) {
                // チュートリアルモード
                this.label.x = data.x.tutorial;
            }
            else if (loginData.isFree() && data.x.free) {
                // フリーモード
                this.label.x = data.x.free;
            }
            else {
                // どれでもない場合は、挑戦モード
                this.label.x = data.x.challenge;
            }
        }
        else {
            // 数値だけの場合、そのまま設定
            this.label.x = data.x;
        }

        // Y軸
        if (isNaN(data.y)) {
            // 数値ではない場合、中を展開して配置する
            if (loginData.isTutorial() && data.y.tutorial) {
                // チュートリアルモード
                this.label.y = data.y.tutorial;
            }
            else if (loginData.isFree() && data.y.free) {
                // フリーモード
                this.label.y = data.y.free;
            }
            else {
                // どれでもない場合は、挑戦モード
                this.label.y = data.y.challenge;
            }
        }
        else {
            // 数値だけの場合、そのまま設定
            this.label.y = data.y;
        }

        if (data.width) {
            this.label.width = data.width;
        }
        if (data.color) {
            this.label.color = data.color;
        }
        if (data.font) {
            this.label.font = data.font;
        }
        if (data.textAlign) {
            this.label.textAlign = data.textAlign;
        }

        if (data.enableHtml) {
            // HTML有効時は、divタグで囲む
            this.label._element = document.createElement('div');
            this.label._element.innerHTML = this.getText(data);
        }
        else {
            if (data.enableEval) {
                // HTML無効時かつ数式変換の場合、数式に変換して設定
                this.label.text = eval(this.getText(data));
            }
            else {
                // HTML無効時は、そのままテキスト設定
                this.label.text = this.getText(data);
            }
        }
    },

    // ゲームモードに応じて文言取得
    getText: function (data) {
        if (typeof (data.text) == "string") {
            // 文字列の場合、そのまま返す
            return data.text;
        }
        else {
            // オブジェクトの場合、ゲームモードに応じて取得する
            if (loginData.isTutorial()) {
                // チュートリアルモード
                return data.text.tutorial;
            }
            else if (loginData.isFree()) {
                // フリーモード
                return data.text.free;
            }
            else {
                // 挑戦モード
                return data.text.challenge;
            }
        }
    },

    setText: function(text) {
        if (this.enableHtml) {
            // HTML有効時は、innerHTMLに設定
            this.label._element.innerHTML = text;
        }
        else {
            if (this.enableEval) {
                // HTML無効時かつ数式変換の場合、数式に変換して設定
                this.label.text = eval(text);
            }
            else {
                // HTML無効時は、そのままテキスト設定
                this.label.text = text;
            }
        }
    }
});

// カスタムラベルを拡張したバルーンクラス
const CustomBalloon = enchant.Class.create(CustomLabel, {
    initialize: function (data, loginData) {

        let labelX = (data.x) ? data.x : data.balloon.x;
        let labelY = (data.y) ? data.y : data.balloon.y;
        if (data.target && (data.balloon.type == "under" || data.balloon.type == "left" || data.balloon.type == "upper")) {
            // ターゲットが指定されている場合、そこを起点とする
            let targetEntity;
            if (data.target.image != null) {
                targetEntity = data.target.image;
            }
            else if (data.target.label != null) {
                targetEntity = data.target.label;
            }
            else {
                targetEntity = data.target;
            }

            console.log("targetEntity");
            console.log(targetEntity);

            labelX = (isNaN(targetEntity.x) ? targetEntity.x.tutorial : targetEntity.x)
                    + ((data.offsetX) ? data.offsetX : data.balloon.offsetX);
            labelY = (isNaN(targetEntity.y) ? targetEntity.y.tutorial : targetEntity.y)
                    + ((data.offsetY) ? data.offsetY : data.balloon.offsetY);
        }
        // console.log("labelX=%s, labelY=%s", labelX, labelY);

        let labelText = data.balloon.html.replace("{text}", data.text);
        // console.log("labelText=%s", labelText);

        // ラベル用データ再生成
        let labelData = {
            enableHtml: true,
            text: labelText,
            x: labelX,
            y: labelY,
            width: (data.width) ? data.width : data.balloon.width,
            height: (data.height) ? data.height : data.balloon.height,
            color: (data.color) ? data.color : data.balloon.color,
            font: (data.font) ? data.font : data.balloon.font,
            textAlign: (data.textAlign) ? data.textAlign : data.balloon.textAlign            
        }

        CustomLabel.call(this, labelData, loginData);

        // 一旦隠す
        this.label.tl.hide();

        // アニメーションを設定する
        for (let anime of data.balloon.animation) {
            if (anime.type == "delay") {
                this.label.tl.delay(anime.time);
            }
            else if (anime.type == "fadeIn") {
                this.label.tl.fadeIn(anime.time);
            }
            else if (anime.type == "scaleBy") {
                this.label.tl.scaleBy(anime.scaleX, anime.scaleY, anime.time);
            }
            else if (anime.type == "moveBy") {
                this.label.tl.moveBy(anime.x, anime.y, anime.time);
            }
            else {
                console.error("未定義アニメーション: "+ anime.type);
            }
        }
    }
});

// カスタム画像
const CustomImg = enchant.Class.create(enchant.Sprite, {
    initialize: function (data, loginData, gameData) {
        enchant.Sprite.call(this, data.width, data.height);
        this.image = gameData.game.assets[data.img];

        // X軸
        if (isNaN(data.x)) {
            // 数値ではない場合、中を展開して配置する
            if (loginData.isTutorial() && data.x.tutorial) {
                // チュートリアルモード
                this.x = data.x.tutorial;
            }
            else if (loginData.isFree() && data.x.free) {
                // フリーモード
                this.x = data.x.free;
            }
            else {
                // どれでもない場合は、挑戦モード
                this.x = data.x.challenge;
            }
        }
        else {
            // 数値だけの場合、そのまま設定
            this.x = data.x;
        }

        // Y軸
        if (isNaN(data.y)) {
            // 数値ではない場合、中を展開して配置する
            if (loginData.isTutorial() && data.y.tutorial) {
                // チュートリアルモード
                this.y = data.y.tutorial;
            }
            else if (loginData.isFree() && data.y.free) {
                // フリーモード
                this.y = data.y.free;
            }
            else {
                // どれでもない場合は、挑戦モード
                this.y = data.y.challenge;
            }
        }
        else {
            // 数値だけの場合、そのまま設定
            this.y = data.y;
        }

        this.scaleX = data.scale;
        this.scaleY = data.scale;
        this.originX = data.originX;
        this.originY = data.originY;
    }
});


// ライバルクラス
const RivalCls = enchant.Class.create({
    initialize: function(data, loginData, gameData) {
        this.img = new RivalImg(data.x, data.y, gameData.game.assets[data.img]);

        this.name = new Label();
        if (data.description) {
            // 詳細がある場合
            this.name.x = data.x + 70;
            this.name.y = data.y - 5;
            this.name.font = FONT18_ONELINE;
        }
        else {
            // 詳細がない場合
            this.name.x = data.x + 70;
            this.name.y = data.y + 20;
            this.name.font = FONT20_ONELINE;
        }
        this.name.color = COLOR_TEXT;
        this.name.text = data.name;

        if (data.description) {
            // 詳細がある場合
            this.description = new Label();
            this.description.x = data.x + 70;
            this.description.y = data.y - 5 + 30;
            this.description.color = COLOR_TEXT;
            this.description.font = FONT14_SPACE150;
            this.description.text = data.description;
        }
    },
    getImg: function() {
        return this.img;
    },
    getName: function() {
        return this.name;
    },
    getDescription: function() {
        return this.description;
    }
});

// ライバル画像
const RivalImg = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, img){
        enchant.Sprite.call(this, 500, 500);
        this.image = img;
        this.scaleX = 0.12;
        this.scaleY = 0.12;
        this.originX = 0;
        this.originY = 0;
        this.x = x;
        this.y = y;
    }
});

// ダイスクラス
const DiceCls = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y, length, adjust) {
        enchant.Sprite.call(this, length, length);

        this.length = length;
        this.x = x;
        this.y = y;

        this.image = new Surface(length * 6, length);
        this.drawDice(this.image.context, length, 'rgb(0,0,0)');

        this.is_roll = false;
        this.adjust = adjust;

        this.addEventListener('enterframe', this.onEnterFrame);
    },
    onEnterFrame: function(e) {
        if (this.is_roll == true) {
            // くるくる回ってるときは、調整を入れない
            this.frame = Math.floor((Math.random() * 6));
        }
    },
    stopRoll: function() {
        // 止める時に初めて勝率調整を設定する
        var f = Math.floor((Math.random() * 6) + this.adjust);
        if (f < 0) {
            f = 0;
        }
        else if (f > 5) {
            f = 5;
        }
        this.frame = f;
        
        this.is_roll = false;
    },
    startRoll: function() {
        this.is_roll = true;
    },
    getNumber: function() {
        return this.frame + 1;
    },
    setAdjust: function(adjust) {
        this.adjust = adjust;
    },
    getAdjust: function(adjust) {
        return this.adjust;
    },
    drawCircle: function(context, x, y, range, color) {
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, range, 0, Math.PI * 2, false);
        context.fill();
    },
    drawRect: function(context, x, y, width, height, fill_color, stroke_color) {
        context.beginPath();
        context.fillStyle = fill_color;
        context.fillRect(x + 2, y + 2, width - 4, height - 4);

        context.strokeStyle = stroke_color;
        context.strokeRect(x + 1, y + 1, width - 2, height - 2);
    },
    /* サイコロの各面を描く */
    drawDice: function(context, length, color) {
        for (var i = 0; i < 6; i++) {
            this.drawRect(context, length * i, 0, length, length, 'rgb(255,255,255)', 'rgb(0,0,0)');
        }
        this.drawOne(context, 0, 0, length, color);
        this.drawTwo(context, length, 0, length, color);
        this.drawThree(context, length * 2, 0, length, color);
        this.drawFour(context, length * 3, 0, length, color);
        this.drawFive(context, length * 4, 0, length, color);
        this.drawSix(context, length * 5, 0, length, color);

    },
    drawOne: function(context, x, y, length, color) {
        this.drawCircle(context, x + length / 2, y + length / 2, DiceCls.RADIUS, color);
    },
    drawTwo: function(context, x, y, length, color) {
        this.drawCircle(context, x + length / 4, y + length / 4, DiceCls.RADIUS, color);
        this.drawCircle(context, x + length * 3 / 4, y + length * 3 / 4, DiceCls.RADIUS, color);
    },
    drawThree: function(context, x, y, length, color) {
        this.drawTwo(context, x, y, length, color);
        this.drawOne(context, x, y, length, color);
    },
    drawFour: function(context, x, y, length, color) {
        this.drawTwo(context, x, y, length, color);
        this.drawCircle(context, x + length * 3 / 4, y + length / 4, DiceCls.RADIUS, color);
        this.drawCircle(context, x + length / 4, y + length * 3 / 4, DiceCls.RADIUS, color);
    },
    drawFive: function(context, x, y, length, color) {
        this.drawFour(context, x, y, length, color);
        this.drawOne(context, x, y, length, color);
    },
    drawSix: function(context, x, y, length, color) {
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 3; j++) {
                this.drawCircle(context, x + length / 4 + i * length / 2, y + j * length / 3 + length / 6, DiceCls.RADIUS, color);
            }
        }
    },

});
DiceCls.RADIUS = 5;

// --------------------------------------------------

/**
 * ガチャガチャ機能を有する変数（クラス）
 * gachalist: ガチャリスト
 * nowMoment: 実施日時moment
 */
const Gacha = function(gachalist, nowMoment) {
	//thisを扱い易くするために変数に保存
	var self = this;

	//引数のガチャの中身と重み（多重配列）を保存
	self.lists = (function() {
        // ガチャ対象であるかを判定する
        judgeGachaTarget(gachalist, nowMoment);

        targets = [];
        for ( let item of gachalist ) {
            if (item.target == true) {
                // ガチャ対象である場合、ターゲットに追加
                targets.push(item);
            }
        }

        return targets;
    }());

	//引数のガチャの中身と重み（多重配列）を元に全体の重みを計算
	self.totalWeight = (function() {
		var sum = 0;//合計保存用変数

		//listsの中を全て取り出すループ
		self.lists.forEach(function(list) {
			sum += list.rate;//配列に入っている確率の値を足す
		});
		return sum;//全ての確率値を足した値を
	}());
}

// ガチャのターゲットであるか否かを判定する
const judgeGachaTarget = function(gachalist, nowMoment) {
    for ( let item of gachalist ) {
        // 出現条件がある場合
        if (item.appearance) {
            // 追加するか否か
            var isAddList = {};

            // 日付範囲
            if (item.appearance.daterange) {
                for (var daterng of item.appearance.daterange) {
                    // console.log(daterng);
                    // console.log(moment(daterng.from, "YYYY/MM/DD").startOf("date"));
                    // console.log(moment(daterng.to, "YYYY/MM/DD").add(1, "days").startOf("date"));
                    // console.log(nowMoment);
                    
                    // FROM以降で、TO以前の場合、対象とする
                    if (nowMoment.isAfter(moment(daterng.from, "YYYY/MM/DD").startOf("date").add(-1, "milliseconds")) 
                            && nowMoment.isBefore(moment(daterng.to, "YYYY/MM/DD").add(1, "days").startOf("date"))) {
                        // console.log("daterange OK");
                        isAddList["daterange"] = true;
                        break;
                    }
                    else {
                        isAddList["daterange"] = false;
                    }
                }
            }

            // 曜日指定
            if (item.appearance.weekday) {
                for (var weekday of item.appearance.weekday) {
                    // 本日日付と曜日設定日付が同じであれば、同じ曜日とみなす
                    // console.log(nowMoment);
                    // console.log(moment(nowMoment).day(weekday));
                    // console.log(nowMoment.days() +"<-->"+ moment(nowMoment).day(weekday).days());
                    
                    if(nowMoment.days() == moment(nowMoment).day(weekday).days()) {
                        isAddList["weekday"] = true;
                        break;
                    }
                    else {
                        isAddList["weekday"] = false;
                    }
                }
            }

            // 時間範囲指定
            if (item.appearance.timerange) {
                for (var timerange of item.appearance.timerange) {
                    let fromTime = moment(timerange.from, "HH:mm");
                    let toTime = moment(timerange.to, "HH:mm");

                    let from = moment(nowMoment).hours(fromTime.hours()).minutes(fromTime.minutes()).startOf("second").add(-1, "milliseconds");
                    let to = moment(nowMoment).hours(toTime.hours()).minutes(toTime.minutes()).add(1, "seconds");

                    if (from.isAfter(to)) {
                        if (nowMoment.isAfter(from)) {
                            // 日付変更前
                            to.add(1, "days");
                        }
                        else {
                            // 日付変更後
                            from.add(-1, "days");
                        }
                    }

                    // console.log("-------------"+ nowMoment.format());
                    // console.log(timerange);
                    // console.log(from.format() + ":"+ nowMoment.isAfter(from));
                    // console.log(to.format() + ":"+ nowMoment.isBefore(to));
                    // console.log("--------------------");
                    
                    // FROM以降で、TO以前の場合、対象とする
                    if (nowMoment.isAfter(from) 
                            && nowMoment.isBefore(to)) {
                        // console.log("daterange OK");
                        isAddList["timerange"] = true;
                        break;
                    }
                    else {
                        isAddList["timerange"] = false;
                    }
                }
            }

            // 日付ポイント指定
            if (item.appearance.datespot) {
                for (var datespot of item.appearance.datespot) {
                    // 本日日付と設定日付が同じであれば、同じ曜日とみなす
                    // console.log(nowMoment);
                    // console.log(moment(nowMoment).dates());
                    // console.log(nowMoment.dates() +"<-->"+ datespot);
                    
                    if(nowMoment.date() == datespot) {
                        isAddList["datespot"] = true;
                        break;
                    }
                    else {
                        isAddList["datespot"] = false;
                    }
                }
                
            }

            // すべての条件が追加OKであれば、追加
            const isAddAll = function(){
                for (var key in isAddList) {
                    // console.log(key);
                    // console.log(isAddList[key]);
                    if (isAddList[key] == false) {
                        return false;
                    }
                }
                return true;
            }

            if (isAddAll()) {
                // 条件をすべて満たしていた場合、対象とする
                item.target = true;
            }
            else {
                // 条件が満たされていない場合、非対象
                item.target = false;
            }
        }
        else {
            // console.log("not item.appearance");
            // 出現条件がない場合、そのまま追加
            item.target = true;
        }
    }    
}

/**
 * ガチャを一回回すメソッド
 * Gachaオブジェクト生成時に渡した多重配列を元に一つ出力する
 */
Gacha.prototype.gacha = function() {
	//ランダムで値を生成（0?totalWeightの間の数）
	var r = Math.random() * this.totalWeight;

	//重み保存用変数
	var s = 0.0;

	//リストを順に取り出して、ランダムで生成した値rと比べて対象のアイテムを決めるて返す
	for (list in this.lists) {
		s += this.lists[list].rate;//ガチャの中身から重みを取得
		
		//ランダムの値と取得した重みを比べて対象のアイテムだった場合
		if (r < s) {
			//アイテム名を取得し、返す
			return this.lists[list];
		}
	}
}

// 星が散るエフェクト
const StarImg = enchant.Class.create(enchant.Sprite, {
    initialize: function(itemX, itemY, img_asset){
        enchant.Sprite.call(this, 200, 191);
        this.image = img_asset;
        this.scaleX = 0.1;
        this.scaleY = 0.1;
        this.originX = itemX;
        this.originY = itemY + 40;
        this.x = 0;
        this.y = 0;
    },
    spark: function() {
        var angle = Math.floor( Math.random() * 360 );
        var moveToX= Math.cos( angle * Math.PI/180 ) * 35 * Math.floor( Math.random() * 5 );
        var moveToY= Math.sin( angle * Math.PI/180 ) * 35 * Math.floor( Math.random() * 5 );
        
        // console.log("x: "+ this.x +", y: "+ this.y +", moveToX: "+ moveToX + ", moveToY: "+ moveToY);
        
        this.tl.moveTo(moveToX, moveToY, 20).fadeOut(5);
    }
});

// --------------------------------------------------

// ログイン管理クラス
const LoginCls = class {
    // ログイン失敗：開催期間外
    static get LOGIN_FAILURE_OUT_OF_PERIOD() { return "LOGIN_FAILURE_OUT_OF_PERIOD" };
    // ログイン失敗：遷移元拒否
    static get LOGIN_FAILURE_INVALID_FROM() { return "LOGIN_FAILURE_INVALID_FROM" };
    // ログイン失敗：遷移元アクセス済み
    static get LOGIN_FAILURE_ACCESSED_FROM() { return "LOGIN_FAILURE_ACCESSED_FROM" };
    // ログイン成功
    static get LOGIN_SUCCESS() { return "LOGIN_SUCCESS" };
    // ログイン失敗
    static get LOGIN_FAILURE() { return "LOGIN_FAILURE" };
    // Cookieキー：フリーモード
    static get COOKIE_KEY_FREE() { return "dicegame.cookie.from.free" };
    // Cookieキー：アイテムリスト
    static get COOKIE_KEY_ITEMS() { return "dicegame.cookie.gacha.items" };

    constructor(now, url) {
        // アクセス日時
        this.now = now;
        // URLパラメータ保持
        this.urlParams = new UrlParamsCls(url);
        // Cookie管理保持
        this.cookieParams = new CookieCls();
        // リトライ回数
        this.retryCnt = 0;
    }

    // ログイン処理実行
    login() {
        // 開催期間内であるかチェック
        if (!this.isFreePeriod() && !this.isChallengePeriod()) {
            // 両方期間外の場合、エラー
            return LoginCls.LOGIN_FAILURE_OUT_OF_PERIOD;
        }

        // 遷移元が許可できるかチェック
        if (!this.isValidFrom()) {
            // 遷移元拒否の場合、エラー
            return LoginCls.LOGIN_FAILURE_INVALID_FROM;
        }

        // Cookieベースで遷移元が許可できるかチェック
        if (!this.isAllowFrom()) {
            // 遷移元アクセス済みの場合、エラー
            return LoginCls.LOGIN_FAILURE_ACCESSED_FROM;
        }

        // ログイン保存
        if (this.save()) {
            // ログイン成功
            return LoginCls.LOGIN_SUCCESS;
        }

        // ログイン保存に失敗した場合
        return LoginCls.LOGIN_FAILURE;
    }

    // フリーモード開催期間内であるか
    isFreePeriod() {
        if (!this.urlParams.isFree()) {
            // そもそもフリーモードでアクセスしてなければfalse
            return false;
        }

        for (let dr of DURATION_PARAMS.free) {
            // console.log(moment(dr.from, "YYYY/MM/DD HH:mm"));
            // console.log(moment(dr.to, "YYYY/MM/DD HH:mm"));
            // console.log(this.now.isBetween(
            //     moment(dr.from, "YYYY/MM/DD HH:mm").add(-1, "milliseconds")
            //     , moment(dr.to, "YYYY/MM/DD HH:mm").add(1, "milliseconds")));
            if (this.now.isBetween(
                moment(dr.from, "YYYY/MM/DD HH:mm").add(-1, "milliseconds")
                , moment(dr.to, "YYYY/MM/DD HH:mm").add(1, "milliseconds"))) {
                // フリーモード期間の期間内である場合
                return true;
            }
        }

        // 最後まで合致しなければfalse
        return false;
    }

    // 挑戦モード開催期間内であるか
    isChallengePeriod() {
        if (this.urlParams.isFree()) {
            // そもそもフリーモードでアクセスしていればfalse
            return false;
        }

        for (let dr of DURATION_PARAMS.challenge) {
            // console.log(moment(dr.from, "YYYY/MM/DD HH:mm"));
            // console.log(moment(dr.to, "YYYY/MM/DD HH:mm"));
            // console.log(this.now.isBetween(
            //     moment(dr.from, "YYYY/MM/DD HH:mm").add(-1, "milliseconds")
            //     , moment(dr.to, "YYYY/MM/DD HH:mm").add(1, "milliseconds")));
            if (this.now.isBetween(
                moment(dr.from, "YYYY/MM/DD HH:mm").add(-1, "milliseconds")
                , moment(dr.to, "YYYY/MM/DD HH:mm").add(1, "milliseconds"))) {
                // 挑戦モード期間の期間内である場合
                return true;
            }
        }

        // 最後まで合致しなければfalse
        return false;
    }

    // 遷移元に不正がないか
    isValidFrom() {
        if (this.urlParams.isFree()) {
            // そもそもフリーモードでアクセスしていれば問題なし
            return true;
        }

        let from = this.urlParams.getFrom();
        // console.log("from: "+ from);
        if (from != null) {
            for (let f of FROM_PARAMS) {
                if (f.type == from) {
                    // 登録済みFROMパラメータの場合、アクセス可否を返す
                    return f.allow;
                }
            }
        }

        // 該当しないFROMパラメータは拒否
        return false;
    }

    // 遷移元が許可できるか
    isAllowFrom() {
        console.log("isAllowFrom: ");

        // フリーモードの場合、遷移元いかんに関わらず許可
        if (this.urlParams.isFree()) {
            console.log("isAllowFrom: free");
            return true;
        }

        console.log("isAllowFrom: this.urlParams.getFrom(): "+ this.urlParams.getFrom());
        // 挑戦モードの場合、遷移元に応じて許可するか否かを返す。
        return this.cookieParams.isAllowFrom(this.urlParams.getFrom());
    }

    // ログインセーブ
    save() {
        if (this.urlParams.isFree()) {
            // フリーモードの場合、固定キーでアクセス日時を保持
            this.cookieParams.set(LoginCls.COOKIE_KEY_FREE, this.now.format());

            return true;
        }
        else if (this.urlParams.isTutorial()) {
            // チュートリアルモードの場合、とりあえずフリー固定キーでアクセス日時を保持
            this.cookieParams.set(LoginCls.COOKIE_KEY_FREE, this.now.format());

            return true;
        }
        else {
            // 挑戦モードの場合
            let from = this.urlParams.getFrom();
            console.log("save from: "+ from);

            if (from != null) {
                for (let f of FROM_PARAMS) {
                    console.log("save f: "+ JSON.stringify(f));
                    if (f.type == from) {
                        // 登録済みFROMパラメータの場合
                        // アクセス日時を保存
                        this.cookieParams.set(f.cookie, this.now.format());

                        return true;
                    }
                }
            }
        }

        return false;
    }

    getFrom() {
        return this.urlParams.getFrom();
    }

    getUrlSearch() {
        return this.urlParams.getSearch();
    }

    turnoffTutorial() {
        // チュートリアル終了
        this.urlParams.set(UrlParamsCls.URL_PARAMS_TUTORIAL, "false");
    }

    isTutorial() {
        // チュートリアルで、リトライしてない場合のみ
        return this.urlParams.isTutorial() && this.retryCnt <= 0;
    }

    isFree() {
        // フリーもしくは、挑戦リトライ・チュートリアルリトライ時
        return this.urlParams.isFree() || this.retryCnt > 0;
    }

    isChallenge() {
        // フリーでもなく、チュートリアルでもなく、リトライしてない場合のみ挑戦モード
        return !this.urlParams.isFree() && !this.urlParams.isTutorial() && this.retryCnt <= 0;
    }

    // リトライする
    retry() {
        // リトライ回数加算
        this.retryCnt += 1;
        // チュートリアルはOFF
        this.turnoffTutorial();
    }

    // リトライ状態であるか否か
    isRetry() {
        return this.retryCnt > 0;
    }

    // アイテム関連 -------------------------

    getItems() {
        // アイテムリストを取得
        let cookieStr = this.cookieParams.get(LoginCls.COOKIE_KEY_ITEMS);
        // 展開
        if (cookieStr != null) {
            return JSON.parse(cookieStr);
        }
        else {
            // まだリストがない場合、空の配列を返す
            return [];
        }
    }

    saveItem(newItem) {
        // アイテムリストを取得
        let cookieStr = this.cookieParams.get(LoginCls.COOKIE_KEY_ITEMS);
        // 展開
        let items = [];
        // アイテムを追加するか
        let isAdd = true;
        if (cookieStr != null) {
            // アイテム配列を展開
            items =  JSON.parse(cookieStr);

            // まだアイテムをゲットしていなければ追加
            for (var item of items) {
                if (item.name == newItem.name) {
                    // すでにゲット済みアイテムの為、追加なし
                    isAdd = false;
                    break;
                }
            }
        }

        if (isAdd) {
            // 追加OKの場合、新アイテム追加
            items.push(newItem);
        }
        // Cookie保存
        this.cookieParams.set(LoginCls.COOKIE_KEY_ITEMS, JSON.stringify(items));
    }

}



// -------------------------------------------------------------------

// URLパラメータ管理クラス
const UrlParamsCls = class {
    // URLパラメータ：遷移元
    static get URL_PARAMS_FROM() { return "from" };
    // URLパラメータ：チュートリアルモード
    static get URL_PARAMS_TUTORIAL() { return "tutorial" };
    // URLパラメータ：フリーモード
    static get URL_PARAMS_FREE() { return "free" };

    constructor(url) {
        // console.log(url);
        // console.log("url.search="+ url.search);
        if (url != null && url.search != null && 1 < url.search.length) {
            // 初期化
            this.params = {};
            this.search = url.search;

            // 最初の1文字 (?記号) を除いた文字列を取得する
            var query = url.search.substring(1);

            // クエリの区切り記号 (&) で文字列を配列に分割する
            var parameters = query.split('&');

            for (var i = 0; i < parameters.length; i++) {
                // パラメータ名とパラメータ値に分割する
                var element = parameters[i].split('=');

                var paramName = decodeURIComponent(element[0]);
                var paramValue = decodeURIComponent(element[1]);

                // パラメータ名をキーとして連想配列に追加する
                this.params[paramName] = paramValue;
            }
        }
    }

    getSearch() {
        return this.search;
    }

    // チュートリアルモードであるか否か
    isTutorial() {
        return this.exist(UrlParamsCls.URL_PARAMS_TUTORIAL, "true");
    }

    // フリーモードであるか否か
    isFree() {
        return this.exist(UrlParamsCls.URL_PARAMS_FREE, "true");
    }

    // どこから遷移してきたか
    getFrom() {
        return this.get(UrlParamsCls.URL_PARAMS_FROM);
    }

    // 該当パラメータの値を返す
    get(name) {
        // URLパラメータに該当名称の項目があるかチェック
        if (this.params && this.params[name]) {
            // あればその値を返す
            return this.params[name];
        }
        return null;
    }

    // 該当パラメータの値を上書きする
    set(name, value) {
        this.params[name] = value;
    }

    // URLパラメータチェック
    exist(name, value) {
        // URLパラメータに該当名称の項目があるかチェック
        if (this.params && this.params[name]) {
            // あった場合
            if (value == null) {
                // 値が指定されていない場合は、そのままTRUE
                return true;
            }
            else {
                // console.log(this.params[name]);
                // console.log("value=" + value);
                // 値が指定されている場合は、その値かチェック
                return this.params[name] == value;
            }
        }

        // そもそもparamsが初期化されていなければ、false
        return false;
    }
};

// -------------------------------------------------------------------

// Cookie管理クラス
const CookieCls = class {
    constructor() { }

    // 遷移を許可するか
    isAllowFrom(type) {
        console.log("isAllowFrom: type: "+ type);
        console.log("isAllowFrom: docCookies.getItem(type): "+ docCookies.getItem(type));
        
        for (let f of FROM_PARAMS) {
            if (f.type == type) {
                if (docCookies.getItem(f.cookie) == null) {
                    // まだ訪問がCookieに記録されていない場合
                    // そもそも訪問を許可しているかどうかを返す
                    console.log("isAllowFrom: f: "+ JSON.stringify(f));
                    return f.allow;                        
                }
                else {
                    // 既に訪問がCookieに記録されている場合
                    console.log("isAllowFrom: f: "+ JSON.stringify(f));
                    // 繰り返しの訪問を許可している場合、true
                    if (f.type == type && f.repeat == true) {
                        return true;
                    }                        
                }
            }
        }

        // Cookieデバッグモードの状態に応じて、遷移許可可否を検討する
        return COOKIE_DEBUG_MODE;

        // if (docCookies.getItem(type) == null) {
        //     // まだ訪問がCookieに記録されていない場合
        //     // そもそも訪問を許可しているかどうかを返す
        //     for (let f of FROM_PARAMS) {
        //         console.log("isAllowFrom: f: "+ JSON.stringify(f));
        //         if (f.type == type) {
        //             return f.allow;
        //         }
        //     }
        //     // ここには来ないはずなので、false
        //     return false;
        // }
        // else {
        //     // 既に訪問がCookieに記録されている場合

        //     for (let f of FROM_PARAMS) {
        //         console.log("isAllowFrom: f: "+ JSON.stringify(f));
        //         // 繰り返しの訪問を許可している場合、true
        //         if (f.type == type && f.repeat == true) {
        //             return true;
        //         }
        //     }

        //     // Cookieデバッグモードの状態に応じて、遷移許可可否を検討する
        //     return COOKIE_DEBUG_MODE;
        // }
    }

    get(sKey) {
        return docCookies.getItem(sKey);
    }

    set(sKey, sValue) {
        console.log("cookie set: %s, %s", sKey, sValue);
        if (!COOKIE_DEBUG_MODE) {
            // Cookieデバッグモードではない場合のみ、設定
            docCookies.setItem(sKey, sValue, COOKIE_MILLSECOND);
        }
    }
};

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/
var docCookies = {
    getItem: function (sKey) {
        if (!sKey || !this.hasItem(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toGMTString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
    }
};

// ------------------------------------------


// 検証用キー生成
function getEncryptKey(totalWin) {
    if (PRESENT_LIST.length >= 1 && totalWin == PRESENT_LIST[0].win) {
        var buf = new Array(17);
        this.t = -1569615269;
        buf[0] = ((this.t >>> 23) | 0);
        this.t = 467300459;
        buf[1] = ((this.t >>> 14) | 0);
        this.t = 895525263;
        buf[2] = ((this.t >>> 2) | 0);
        this.t = -1112959597;
        buf[3] = ((this.t >>> 10) | 0);
        this.t = -1773662048;
        buf[4] = ((this.t >>> 1) | 0);
        this.t = -352131938;
        buf[5] = ((this.t >>> 9) | 0);
        this.t = 1972879041;
        buf[6] = ((this.t >>> 18) | 0);
        this.t = 264713267;
        buf[7] = ((this.t >>> 12) | 0);
        this.t = 1701173049;
        buf[8] = ((this.t >>> 24) | 0);
        this.t = 163182097;
        buf[9] = ((this.t >>> 18) | 0);
        this.t = 1112205598;
        buf[10] = ((this.t >>> 9) | 0);
        this.t = -1424418712;
        buf[11] = ((this.t >>> 7) | 0);
        this.t = -1021692081;
        buf[12] = ((this.t >>> 20) | 0);
        this.t = -730333603;
        buf[13] = ((this.t >>> 1) | 0);
        this.t = -1281592144;
        buf[14] = ((this.t >>> 8) | 0);
        this.t = 1441306505;
        buf[15] = ((this.t >>> 4) | 0);
        this.t = 975512346;
        buf[16] = ((this.t >>> 23) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 2 && totalWin == PRESENT_LIST[1].win) {
        var buf = new Array(17);
        this.t = -1727492110;
        buf[0] = ((this.t >>> 13) | 0);
        this.t = -1703328601;
        buf[1] = ((this.t >>> 22) | 0);
        this.t = 1633911067;
        buf[2] = ((this.t >>> 16) | 0);
        this.t = 724733986;
        buf[3] = ((this.t >>> 15) | 0);
        this.t = 458291912;
        buf[4] = ((this.t >>> 16) | 0);
        this.t = 1920791569;
        buf[5] = ((this.t >>> 24) | 0);
        this.t = -715287468;
        buf[6] = ((this.t >>> 10) | 0);
        this.t = 924414963;
        buf[7] = ((this.t >>> 8) | 0);
        this.t = -1741905595;
        buf[8] = ((this.t >>> 13) | 0);
        this.t = 926922729;
        buf[9] = ((this.t >>> 23) | 0);
        this.t = -537371372;
        buf[10] = ((this.t >>> 6) | 0);
        this.t = 1920322592;
        buf[11] = ((this.t >>> 6) | 0);
        this.t = 1602773819;
        buf[12] = ((this.t >>> 4) | 0);
        this.t = 600552182;
        buf[13] = ((this.t >>> 14) | 0);
        this.t = 243574000;
        buf[14] = ((this.t >>> 21) | 0);
        this.t = 2129776406;
        buf[15] = ((this.t >>> 17) | 0);
        this.t = -1580860510;
        buf[16] = ((this.t >>> 3) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 3 && totalWin == PRESENT_LIST[2].win) {
        var buf = new Array(10);
        this.t = 40391147;
        buf[0] = ((this.t >>> 6) | 0);
        this.t = 1329944820;
        buf[1] = ((this.t >>> 21) | 0);
        this.t = -1639115185;
        buf[2] = ((this.t >>> 16) | 0);
        this.t = 828970610;
        buf[3] = ((this.t >>> 16) | 0);
        this.t = -44883893;
        buf[4] = ((this.t >>> 14) | 0);
        this.t = 120699722;
        buf[5] = ((this.t >>> 21) | 0);
        this.t = -182942203;
        buf[6] = ((this.t >>> 20) | 0);
        this.t = 1478628340;
        buf[7] = ((this.t >>> 24) | 0);
        this.t = -508913635;
        buf[8] = ((this.t >>> 19) | 0);
        this.t = -1644115878;
        buf[9] = ((this.t >>> 5) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 4 && totalWin == PRESENT_LIST[3].win) {
        var buf = new Array(17);
        this.t = -1928314301;
        buf[0] = ((this.t >>> 18) | 0);
        this.t = -1784249421;
        buf[1] = ((this.t >>> 18) | 0);
        this.t = 598853337;
        buf[2] = ((this.t >>> 15) | 0);
        this.t = -1003317949;
        buf[3] = ((this.t >>> 15) | 0);
        this.t = 25497271;
        buf[4] = ((this.t >>> 12) | 0);
        this.t = 2010012031;
        buf[5] = ((this.t >>> 13) | 0);
        this.t = -1110657326;
        buf[6] = ((this.t >>> 13) | 0);
        this.t = -2055996305;
        buf[7] = ((this.t >>> 16) | 0);
        this.t = 1885269159;
        buf[8] = ((this.t >>> 5) | 0);
        this.t = -2053317266;
        buf[9] = ((this.t >>> 9) | 0);
        this.t = 97610278;
        buf[10] = ((this.t >>> 18) | 0);
        this.t = 406154561;
        buf[11] = ((this.t >>> 23) | 0);
        this.t = 1984797421;
        buf[12] = ((this.t >>> 7) | 0);
        this.t = 1270654826;
        buf[13] = ((this.t >>> 22) | 0);
        this.t = 1588360377;
        buf[14] = ((this.t >>> 8) | 0);
        this.t = 1862296766;
        buf[15] = ((this.t >>> 21) | 0);
        this.t = 1951080217;
        buf[16] = ((this.t >>> 24) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 5 && totalWin == PRESENT_LIST[4].win) {
        var buf = new Array(10);
        this.t = -1049821959;
        buf[0] = ((this.t >>> 13) | 0);
        this.t = 675396420;
        buf[1] = ((this.t >>> 21) | 0);
        this.t = -289349914;
        buf[2] = ((this.t >>> 1) | 0);
        this.t = 651137073;
        buf[3] = ((this.t >>> 23) | 0);
        this.t = 1826031217;
        buf[4] = ((this.t >>> 1) | 0);
        this.t = -1044294202;
        buf[5] = ((this.t >>> 8) | 0);
        this.t = -1733619482;
        buf[6] = ((this.t >>> 1) | 0);
        this.t = -112684874;
        buf[7] = ((this.t >>> 6) | 0);
        this.t = -979986052;
        buf[8] = ((this.t >>> 9) | 0);
        this.t = -1654206004;
        buf[9] = ((this.t >>> 6) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 6 && totalWin == PRESENT_LIST[5].win) {
        var buf = new Array(17);
        this.t = 575472649;
        buf[0] = ((this.t >>> 23) | 0);
        this.t = 1332299810;
        buf[1] = ((this.t >>> 16) | 0);
        this.t = -1502846073;
        buf[2] = ((this.t >>> 13) | 0);
        this.t = -304526494;
        buf[3] = ((this.t >>> 14) | 0);
        this.t = 1172638888;
        buf[4] = ((this.t >>> 12) | 0);
        this.t = 1917141773;
        buf[5] = ((this.t >>> 24) | 0);
        this.t = -1295108111;
        buf[6] = ((this.t >>> 23) | 0);
        this.t = 1027195841;
        buf[7] = ((this.t >>> 15) | 0);
        this.t = -1228147110;
        buf[8] = ((this.t >>> 17) | 0);
        this.t = -734012489;
        buf[9] = ((this.t >>> 6) | 0);
        this.t = -700838256;
        buf[10] = ((this.t >>> 5) | 0);
        this.t = 876386443;
        buf[11] = ((this.t >>> 7) | 0);
        this.t = -1028771645;
        buf[12] = ((this.t >>> 2) | 0);
        this.t = -1101135877;
        buf[13] = ((this.t >>> 17) | 0);
        this.t = -1171761373;
        buf[14] = ((this.t >>> 23) | 0);
        this.t = 1008681582;
        buf[15] = ((this.t >>> 23) | 0);
        this.t = 1956113167;
        buf[16] = ((this.t >>> 24) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
    else if (PRESENT_LIST.length >= 7 && totalWin == PRESENT_LIST[6].win) {
        var buf = new Array(10);
        this.t = -1555895903;
        buf[0] = ((this.t >>> 23) | 0);
        this.t = 654710929;
        buf[1] = ((this.t >>> 12) | 0);
        this.t = -1833247401;
        buf[2] = ((this.t >>> 9) | 0);
        this.t = -1756644704;
        buf[3] = ((this.t >>> 7) | 0);
        this.t = 431063640;
        buf[4] = ((this.t >>> 3) | 0);
        this.t = 1503863597;
        buf[5] = ((this.t >>> 12) | 0);
        this.t = 131897777;
        buf[6] = ((this.t >>> 14) | 0);
        this.t = 1215592523;
        buf[7] = ((this.t >>> 12) | 0);
        this.t = -2142632143;
        buf[8] = ((this.t >>> 5) | 0);
        this.t = 243213680;
        buf[9] = ((this.t >>> 22) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
        
    }
    else if (PRESENT_LIST.length >= 8 && totalWin == PRESENT_LIST[7].win) {
        var buf = new Array(17);
        this.t = 287798498;
        buf[0] = ((this.t >>> 22) | 0);
        this.t = 916221513;
        buf[1] = ((this.t >>> 20) | 0);
        this.t = 189556916;
        buf[2] = ((this.t >>> 13) | 0);
        this.t = 643764674;
        buf[3] = ((this.t >>> 20) | 0);
        this.t = 1038488832;
        buf[4] = ((this.t >>> 4) | 0);
        this.t = 844160147;
        buf[5] = ((this.t >>> 6) | 0);
        this.t = -523618277;
        buf[6] = ((this.t >>> 17) | 0);
        this.t = -573609625;
        buf[7] = ((this.t >>> 18) | 0);
        this.t = 1858754550;
        buf[8] = ((this.t >>> 17) | 0);
        this.t = -2097236143;
        buf[9] = ((this.t >>> 7) | 0);
        this.t = 450698950;
        buf[10] = ((this.t >>> 14) | 0);
        this.t = 322419073;
        buf[11] = ((this.t >>> 3) | 0);
        this.t = -45363673;
        buf[12] = ((this.t >>> 6) | 0);
        this.t = 1570209236;
        buf[13] = ((this.t >>> 15) | 0);
        this.t = 1372534605;
        buf[14] = ((this.t >>> 4) | 0);
        this.t = -116848767;
        buf[15] = ((this.t >>> 4) | 0);
        this.t = -1567715492;
        buf[16] = ((this.t >>> 13) | 0);
        
        var total = 0;
        for (var i = 0; i < buf.length; i ++) {
            total += buf[i];
        }
        
        return total;
    }
}
