// 初期宣言
enchant();

// ログイン情報（ゲーム開始日時、Cookie、遷移元判定等）
let loginData;

// ゲームデータ
let gameData;

// ガチャデータ
let gachaData;

// 処理開始
window.onload = function () {
    // 全体背景色を設定
    document.getElementsByTagName("body").item(0).style.backgroundColor = COLOR_BG;
    // ドキュメントタイトルを設定
    document.getElementsByTagName("title").item(0).text = WINDOW_TITLE;

    // ログイン
    login();

    // ゲーム初期化
    gameData = new GameCls(420, 600);

    // ガチャ初期化
    if (ITEM_LIST != null) {
        gachaData = new Gacha(ITEM_LIST, loginData.now);
    }

    // ローディング
    loading();

    // プレロード
    preload();

    gameData.game.onload = function () {
        // ルールシーン生成
        pushRuleScene();
    }

    // ゲーム開始
    gameData.game.start();
}

// ログイン処理
function login() {
    loginData = new LoginCls(moment(), window.location);

    const loginResult = loginData.login();

    if (loginResult != LoginCls.LOGIN_SUCCESS) {
        // ログインに失敗した場合
        console.log("loginResult: "+ loginResult);
        alert(LOGIN_FAILURE_MESSAGE[loginResult]);

        // Google Analytics 登録
        ga('set', 'dimension1', loginData.now.format());
        ga('set', 'dimension2', loginData.getFrom());
        ga('send', 'event', loginResult, loginData.getUrlSearch());

        // 遷移先
        location.href = LOGIN_FAILURE_URLS[loginResult];

        // 遷移実行
        return true;
    }
}

// ローディング
function loading() {
    // ロード用画面
    let loadScene = new Scene();
    gameData.game.loadingScene = loadScene;

    // プログレス画面のプログレス表示
    let progressLoadingLabel = new CustomLabel(LOADING_SCENE_PROGRESS_LOADING, loginData);
    loadScene.addChild(progressLoadingLabel.label);

    // 最初に読み込んだ時はちょっと重いので、ローディングに時間がかかる
    loadScene.addEventListener('progress', function (e) {
        let progress = e.loaded / e.total;
        progress *= 100;
        progress = Math.round(progress);

        progressLoadingLabel.label.text =
            LOADING_SCENE_PROGRESS_LOADING.text.replace("{progress}", progress);
    });

    // メッセージ画像準備
    let loadImgSprite;

    // メッセージ画像もしくはテキストがある場合
    let messageLoadingLabel;
    let imgData;
    if (LOADING_SCENE_MESSAGE_ENTITY) {
        messageLoadingLabel = new CustomLabel(LOADING_SCENE_MESSAGE_LOADING, loginData);

        // モードに応じて画像データ取得
        if (loginData.isTutorial()) {
            imgData = LOADING_SCENE_MESSAGE_ENTITY.tutorial.image;
        }
        else if (loginData.isFree()) {
            imgData = LOADING_SCENE_MESSAGE_ENTITY.free.image;
        }
        else {
            imgData = LOADING_SCENE_MESSAGE_ENTITY.challenge.image;
        }
    }

    if (imgData) {
        gameData.game.preload([imgData.img]);
        loadImgSprite = new Sprite(imgData.width, imgData.height);
        
        // メッセージ画像を表示する場合
        loadScene.addEventListener('load', function (e) {
            loadScene.removeChild(progressLoadingLabel.label);

            loadImgSprite.image = gameData.game.assets[imgData.img];
            loadImgSprite.x = imgData.x;
            loadImgSprite.y = imgData.y;
            loadImgSprite.scaleX = imgData.scale;
            loadImgSprite.scaleY = imgData.scale;
            loadImgSprite.originX = imgData.originX;
            loadImgSprite.originY = imgData.originY;
            loadScene.addChild(loadImgSprite);
            loadScene.addChild(messageLoadingLabel.label);

            messageLoading(e);
        });
    }
    else if (LOADING_SCENE_MESSAGE_ENTITY != null) {
        // メッセージテキストがある場合
        loadScene.addEventListener('load', function (e) {
            loadScene.removeChild(progressLoadingLabel.label);

            // モードに応じて設定
            if (loginData.isTutorial()) {
                loadScene.addChild((new CustomLabel(LOADING_SCENE_MESSAGE_ENTITY.tutorial.label, loginData)).label);
            }
            else if (loginData.isFree()) {
                loadScene.addChild((new CustomLabel(LOADING_SCENE_MESSAGE_ENTITY.free.label, loginData)).label);
            }
            else {
                loadScene.addChild((new CustomLabel(LOADING_SCENE_MESSAGE_ENTITY.challenge.label, loginData)).label);
            }
            loadScene.addChild(messageLoadingLabel.label);

            messageLoading(e);
        });
    }
    else {
        // チラシローディングを表示市内場合、そのまま終了
        loadScene.addEventListener('load', function (e) {
            let core = enchant.Core.instance;
            core.removeScene(core.loadingScene);
            core.dispatchEvent(e);
        });
    }

    const messageLoading = function (e) {
        // ローディングで■を増やしていく
        let count = 0;
        let timer = setInterval(function () {
            messageLoadingLabel.label.text += LOADING_SCENE_MESSAGE_LOADING.progressTxt;
            if (count >= LOADING_SCENE_MESSAGE_LOADING.progressCnt) {
                clearInterval(timer);

                // 回数を超えたら、ローディング画面終了
                let core = enchant.Core.instance;
                core.removeScene(core.loadingScene);
                core.dispatchEvent(e);
            }
            count++;
        }, 500);
    }
}

// 画像の事前ロード
function preload() {

    // ゲーム開始
    if (RULE_SCENE_START_ENTITY.image != null) {
        gameData.game.preload([RULE_SCENE_START_ENTITY.image.img]);
    }

    // サイコロを回す
    if (DICE_SCENE_ROLL_START_ENTITY.image != null) {
        gameData.game.preload([DICE_SCENE_ROLL_START_ENTITY.image.img]);
    }

    // サイコロを止める
    if (DICE_SCENE_ROLL_STOP_ENTITY.image != null) {
        gameData.game.preload([DICE_SCENE_ROLL_STOP_ENTITY.image.img]);
    }
            
    // アイテムあり：リトライする
    if (COLLECTION_SCENE_RETRY_ENTITY && COLLECTION_SCENE_RETRY_ENTITY.image != null) {
        gameData.game.preload([COLLECTION_SCENE_RETRY_ENTITY.image.img]);
    }

    // アイテムあり：本番挑戦する
    if (COLLECTION_SCENE_CHALLENGE_ENTITY && COLLECTION_SCENE_CHALLENGE_ENTITY.image != null) {
        gameData.game.preload([COLLECTION_SCENE_CHALLENGE_ENTITY.image.img]);
    }

    // アイテムなし：リトライする
    if (NONCOLLECTION_SCENE_RETRY_ENTITY && NONCOLLECTION_SCENE_RETRY_ENTITY.image != null) {
        gameData.game.preload([NONCOLLECTION_SCENE_RETRY_ENTITY.image.img]);
    }

    // アイテムなし：本番挑戦する
    if (NONCOLLECTION_SCENE_CHALLENGE_ENTITY && NONCOLLECTION_SCENE_CHALLENGE_ENTITY.image != null) {
        gameData.game.preload([NONCOLLECTION_SCENE_CHALLENGE_ENTITY.image.img]);
    }

    // 本番完了：リトライ
    if (THANKYOU_SCENE_RETRY_ENTITY && THANKYOU_SCENE_RETRY_ENTITY.image != null) {
        gameData.game.preload([THANKYOU_SCENE_RETRY_ENTITY.image.img]);
    }

    // 本番完了：招待
    if (THANKYOU_SCENE_INVITATION_LINK_ENTITY && THANKYOU_SCENE_INVITATION_LINK_ENTITY.image != null) {
        gameData.game.preload([THANKYOU_SCENE_INVITATION_LINK_ENTITY.image.img]);
    }

    // 景品申請：申請
    if (REPORT_SCENE_CONTACT_LINK_ENTITY && REPORT_SCENE_CONTACT_LINK_ENTITY.image != null) {
        gameData.game.preload([REPORT_SCENE_CONTACT_LINK_ENTITY.image.img]);
    }

    // ルール画面：ウェルカム画像
    if (RULE_SCENE_WELCOME_IMG != null) {
        gameData.game.preload([RULE_SCENE_WELCOME_IMG.img]);
    }

    // ライバル画像をループ導入
    for (let rival of RIVAL_LIST) {
        gameData.game.preload([rival.img]);
    }

    if (ITEM_LIST != null) {
        // アイテム表示がある場合
        if (STAR_SPARK_IMG) {
            gameData.game.preload([STAR_SPARK_IMG.img]);
        }
        // コレクション画面用：未取得・取得可能
        gameData.game.preload([COLLECTION_UNACQUIRED.img]);
        // コレクション画面用：未取得・期間外
        gameData.game.preload([COLLECTION_OUTOFTERM.img]);
        // アイテム画像をループ導入
        for(let item of ITEM_LIST) {
            gameData.game.preload([item.img]);
        }
    }

    // 完了画面の誘導リンク画像導入
    for (let from of FROM_PARAMS) {
        if (from.image != null) {
            gameData.game.preload([from.image.img]);
        }
    }

}

// ルールシーン生成
function pushRuleScene() {
    let scene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // ウェルカム画像
    if (RULE_SCENE_WELCOME_IMG != null) {
        scene.addChild(new CustomImg(RULE_SCENE_WELCOME_IMG, loginData, gameData));
    }
    // ウェルカムメッセージ
    if (RULE_SCENE_WELCOME_LABEL != null) {
        scene.addChild((new CustomLabel(RULE_SCENE_WELCOME_LABEL, loginData)).label);
    }

    // 挑戦モードの場合、景品文言
    if (loginData.isChallenge()) {
        scene.addChild((new CustomLabel(RULE_SCENE_PRESENT_LABEL, loginData)).label);
    }

    // ルール文言
    scene.addChild((new CustomLabel(RULE_SCENE_RULE_LABEL, loginData)).label);

    // スタート画像
    let startEntity = new CustomEntity(RULE_SCENE_START_ENTITY, loginData, gameData);
    scene.addChild(startEntity.getEntity());

    // チュートリアルモードの場合
    if (loginData.isTutorial()) {
        // 初期バルーン
        let initialBalloon = (new CustomBalloon(RULE_SCENE_BALLOON_INITIAL, loginData)).label;
        scene.addChild(initialBalloon);

        initialBalloon.addEventListener('touchend', function (e) {
            // 初期バルーンが押下されたら、消して、ルールバルーン表示
            scene.removeChild(initialBalloon);

            let ruleBalloon = (new CustomBalloon(RULE_SCENE_BALLOON_RULE, loginData)).label;
            scene.addChild(ruleBalloon);

            ruleBalloon.addEventListener('touchend', function (e) {
                // ルールバルーンが押下されたら、消して、開始バルーン表示
                scene.removeChild(ruleBalloon);

                let startBalloon = (new CustomBalloon(RULE_SCENE_BALLOON_START, loginData)).label;
                scene.addChild(startBalloon);

                startBalloon.addEventListener('touchend', function (e) {
                    // ルールバルーンが押下されたら、消して、開始バルーン表示
                    scene.removeChild(startBalloon);
                });
    
                // 開始ボタンでゲーム開始
                startEntity.getEntity().addEventListener('touchend', function (e) {
                    replaceRivalScene();
                });

            });
        });
    }
    else {
        // 画面のどこを押してもゲーム開始
        scene.addEventListener('touchend', function (e) {
            replaceRivalScene();
        });
    }

    // シーン設定
    gameData.game.pushScene(scene);
}

// ライバル選択画面
function replaceRivalScene() {
    let scene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // ライバル選択画面：選択文言
    scene.addChild((new CustomLabel(RIVAL_SELECT_SCENE_SELECT_LABEL)).label);

    // ライバル情報を、リストに基づき取り込む
    let rivals = [];
    for (let rivalData of RIVAL_LIST) {
        let rival = new RivalCls(rivalData, loginData, gameData);
        scene.addChild(rival.getImg());
        scene.addChild(rival.getName());
        if (rival.getDescription()) {
            scene.addChild(rival.getDescription());
        }
        rivals.push(rival);
    }

    // ライバル選択イベント（パーツ）
    const createRivalEvent = function (rival, part) {
        part.addEventListener('touchend', function (e) {
            console.log("select rival: " + rival.getName().text);
            // Google Analytics 登録
            ga('set', 'dimension1', loginData.now.format());
            ga('set', 'dimension2', loginData.getFrom());
            ga('send', 'event', '対戦相手選択', rival.getName().text);
            // ゲームシーン生成
            replacePlayScene(rival);
        });
    }

    // ライバル選択イベント設定
    const createRivalEventAll = function (rivals) {
        for (let rival of rivals) {
            // 画像・名前・詳細どれを押してもライバル選択完了とする
            createRivalEvent(rival, rival.getImg());
            createRivalEvent(rival, rival.getName());
            if (rival.getDescription()) {
                createRivalEvent(rival, rival.getDescription());
            }
        }
    }

    if (loginData.isTutorial()) {
        // チュートリアルモードの場合

        // 初期バルーン
        let initialBalloon = (new CustomBalloon(RIVAL_SCENE_BALLOON_INITIAL, loginData)).label;
        scene.addChild(initialBalloon);

        initialBalloon.addEventListener('touchend', function (e) {
            // 初期バルーンが押下されたら、消して、ライバルバルーン表示
            scene.removeChild(initialBalloon);

            let rivalBalloon = (new CustomBalloon(RIVAL_SCENE_BALLOON_RIVAL, loginData)).label;
            scene.addChild(rivalBalloon);

            rivalBalloon.addEventListener('touchend', function (e) {
                // ルールバルーンが押下されたら、消して、ライバル選択イベント設定
                scene.removeChild(rivalBalloon);

                createRivalEventAll(rivals);
            });
        });
    }
    else {
        // チュートリアルでない場合、そのままライバルイベント設定
        createRivalEventAll(rivals);
    }

    // シーン設定
    gameData.game.replaceScene(scene);
}

// ゲーム画面
function replacePlayScene(rival) {
    let scene = new Scene();
    
    // シーン設定
    gameData.game.replaceScene(scene);

    let tutorialScene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // ライバルの画像
    scene.addChild(rival.getImg());
    rival.getImg().moveTo(180, 60);

    // サイコロ
    let rivalDice = new DiceCls(170, 140, 80, 0); // 上
    let myDice = new DiceCls(170, 250, 80, 0); // 下
    scene.addChild(myDice);
    scene.addChild(rivalDice);

    // プレイヤーラベル
    scene.addChild((new CustomLabel(DICE_SCENE_YOU_LABEL, loginData)).label);

    // サイコロを回す画像
    let diceRollEntity = new CustomEntity(DICE_SCENE_ROLL_START_ENTITY, loginData, gameData);
    scene.addChild(diceRollEntity.getEntity());

    // アイテムスプライト配置用配列
    let itemSpriteList = [];

    // アイテムゲット時ラベル
    let itemLabel = new Label(300, 30);
    itemLabel.color = COLOR_TEXT;
    itemLabel.font = FONT18_ONELINE;
    itemLabel.x = 20;
    itemLabel.y = 480;
    itemLabel.text = "";
    scene.addChild(itemLabel);

    // プレゼントラベル
    var presentLabel = new CustomLabel(DICE_SCENE_HEADER_LABEL).label;
    if (loginData.isChallenge()) {
        // 通常挑戦モードの場合、プレゼント文言設定
        presentLabel.text = gameData.createPresentText();
    }
    else {
        // それ以外の場合
        if (loginData.isFree()) {
            // フリーモード時
            presentLabel.text = DICE_SCENE_HEADER_LABEL.initialtext.free;
        }
        else {
            // チュートリアルモード時
            presentLabel.text = DICE_SCENE_HEADER_LABEL.initialtext.tutorial;
        }
    }

    scene.addChild(presentLabel);

    // ダイスボタンの入れ替え
    const replaceDiceRoll = function(type) {
        if (diceRollEntity.isImage()) {
            if (type == 'start') {
                diceRollEntity.getEntity().image = gameData.game.assets[DICE_SCENE_ROLL_START_ENTITY.image.img];
            }
            else {
                diceRollEntity.getEntity().image = gameData.game.assets[DICE_SCENE_ROLL_STOP_ENTITY.image.img];
            }            
        }
        else {
            if (type == 'start') {
                diceRollEntity.changeText(DICE_SCENE_ROLL_START_ENTITY.label.text);
            }
            else {
                diceRollEntity.changeText(DICE_SCENE_ROLL_STOP_ENTITY.label.text);
            }
        }
    }

    // ダイスを回す
    const rollDice = function() {
        let isRoll = false;
        diceRollEntity.getEntity().addEventListener('touchstart', function(e) {
            if (!isRoll) {
                // まだ回ってない場合

                // 勝率調整
                let winning;

                if (loginData.isTutorial()) {
                    console.log("winning: tutorial");
                    // チュートリアルモード
                    winning = WINNING["tutorial"];
                }
                else if (loginData.isFree()) {
                    console.log("winning: free");
                    // フリーモード
                    winning = WINNING["free"];
                }
                else {
                    if (loginData.isRetry()) {
                        console.log("winning: retry");
                        // 挑戦モード：リトライ
                        winning = WINNING["retry"];
                    }
                    else {
                        console.log("winning: challenge");
                        // 挑戦モード
                        winning = WINNING["challenge"];
                    }
                }

                // 連勝数で勝率調整
                for (var n = winning.length - 1; n >= 0; n--) {
                    if (gameData.totalWin >= winning[n].win){
                        myDice.setAdjust(winning[n].self);
                        rivalDice.setAdjust(winning[n].rival);
                        
                        break;
                    }
                }

                // ダイスを回す
                myDice.startRoll();
                rivalDice.startRoll();
                isRoll = true;

                replaceDiceRoll('stop');
            }
            else {
                // 回っている場合

                // ダイスを止める
                myDice.stopRoll();
                rivalDice.stopRoll();
                isRoll = false;

                // ダイスを回すイベントを一旦破棄
                diceRollEntity.getEntity().removeEventListener('touchstart', arguments.callee);
                    
                if (ISSUE_DEBUG_MODE || myDice.getNumber() > rivalDice.getNumber()) {
                    // ダイス結果：勝利
                    // 通算勝利回数加算
                    gameData.totalWin += 1;

                    // アイテムガチャで取得
                    let itemFinishFlg = false;
                    if (ITEM_LIST) {
                        let itemSprite = new Sprite(300, 300);
                        let item = gachaData.gacha();
                        // console.log(JSON.stringify(item));
                        
                        // アイテムをゲット数に応じて並べて配置
                        itemSprite.image = gameData.game.assets[item.img];
                        itemSprite.x = -120 + ((itemSpriteList.length % 8) * 50);
                        itemSprite.y = 310 + ( Math.floor(itemSpriteList.length / 8) * 50) ;
                        itemSprite.scaleX = 0.15;
                        itemSprite.scaleY = 0.15;
                        itemSprite.originX = 150;
                        itemSprite.originY = 150;

                        // アイテムアニメーション
                        itemSprite.tl.scaleBy(3, 3, 20).scaleBy(0.2, 0.2, 15).scaleBy(1.5, 1.5, 10).then(
                            () => {
                                itemFinishFlg = true;
                            }
                        );

                        // 星を散らすFLG=ONの場合、星スパーク
                        if (STAR_SPARK_IMG) {
                            for (var n = 0; n < 10; n++) {
                                var star = new StarImg(
                                    itemSprite.x + itemSprite.originX
                                    , itemSprite.y + itemSprite.originY
                                    , gameData.game.assets[STAR_SPARK_IMG.img]);
                                // console.log(star);
                                scene.addChild(star);
                                star.spark();
                            }    
                        }

                        // アイテムの折り返しに応じてメッセージのy軸を修正
                        itemLabel.y = itemSprite.y + 180;
                        itemLabel.text = item.name + " ("+ item.rateTxt + ") "+ item.message;

                        // Cookieに登録
                        loginData.saveItem(item);

                        itemSpriteList.push(itemSprite);
                        scene.addChild(itemSprite);
                    } else {
                        // アイテム表示しない場合、終了FLGは常にON
                        itemFinishFlg = true;
                    }

                    // 勝利フローティングラベル
                    let resultFinishFlg = false;
                    let resultLabel = (new CustomLabel(DICE_SCENE_WIN_LABEL, loginData)).label;
                    resultLabel.tl.hide().delay(5).fadeIn(5).moveBy(0, -50, 20).fadeOut(5).then(
                        () => {
                            resultFinishFlg = true;
                        }
                    );
                    scene.addChild(resultLabel);

                    if (loginData.isTutorial()) {
                        // チュートリアルモードの場合

                        // 連勝数設定
                        presentLabel.text = DICE_SCENE_HEADER_LABEL.text.tutorial.replace("{total_win}", gameData.totalWin);

                        // サイコロを回す画像に戻す
                        replaceDiceRoll('start');
                        
                        resultLabel.addEventListener('enterframe', function(e) {
                            // アニメーション終了後
                            if (itemFinishFlg && resultFinishFlg) {
                                // アニメーションが完了した場合、自分を破棄
                                this.removeEventListener('enterframe', arguments.callee);

                                // チュートリアルシーンを追加
                                gameData.game.pushScene(tutorialScene);

                                // 初期バルーン
                                let initialBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_WIN_INITIAL, loginData)).label;
                                tutorialScene.addChild(initialBalloon);

                                initialBalloon.addEventListener('touchend', function (e) {
                                    // 初期バルーンが押下されたら、消して、連勝ヘッダバルーン表示
                                    tutorialScene.removeChild(initialBalloon);

                                    let headerBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_WIN_HEADER, loginData)).label;
                                    tutorialScene.addChild(headerBalloon);

                                    headerBalloon.addEventListener('touchend', function (e) {
                                        // 連勝ヘッダバルーンが押下されたら、消して、アイテムバルーン表示
                                        tutorialScene.removeChild(headerBalloon);

                                        if (DICE_SCENE_BALLOON_ITEM != null) {
                                            // アイテム表記がある場合
                                            let itemDiceBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_ITEM, loginData)).label;
                                            tutorialScene.addChild(itemDiceBalloon);
                                
                                            itemDiceBalloon.addEventListener('touchend', function (e) {
                                                // ライバルダイスバルーンが押下されたら、消して、サイコロを回すバルーン表示
                                                tutorialScene.removeChild(itemDiceBalloon);
    
                                                let startBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_WIN_RESTART, loginData)).label;
                                                tutorialScene.addChild(startBalloon);
                                    
                                                startBalloon.addEventListener('touchend', function (e) {
                                                    // 回すバルーンが押下されたら、消して、勝負開始
                                                    tutorialScene.removeChild(startBalloon);
                                                    // シーン削除
                                                    gameData.game.removeScene(tutorialScene);
                                                    // ダイス回す処理設定
                                                    rollDice();
                                                });    
                                            });    
                                        }
                                        else {
                                            // アイテム表記がない場合
                                            let startBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_WIN_RESTART, loginData)).label;
                                            tutorialScene.addChild(startBalloon);
                                
                                            startBalloon.addEventListener('touchend', function (e) {
                                                // 回すバルーンが押下されたら、消して、勝負開始
                                                tutorialScene.removeChild(startBalloon);
                                                // シーン削除
                                                gameData.game.removeScene(tutorialScene);
                                                // ダイス回す処理設定
                                                rollDice();
                                            });    
                                        }
                                    });
                                });                
                            }
                        });        
                    }
                    else {
                        // チュートリアル以外はそのまま勝利処理
                        resultLabel.addEventListener('enterframe', function(e) {
                            if (itemFinishFlg && resultFinishFlg) {
                                // アニメーションが完了した場合、自分を破棄
                                this.removeEventListener('enterframe', arguments.callee);

                                if (loginData.isChallenge()) {
                                    // 挑戦モード時、景品ラベル設定
                                    presentLabel.text = gameData.createPresentText();
                
                                    if (gameData.isWinFinal() || gameData.isWinBreak()) {
                                        // 連勝最終プレゼント到達 or 連勝切れ目 の場合
                
                                        // 色を変えてプレゼントをアピールする
                                        presentLabel.color = COLOR_PRESENT;
                
                                        if (gameData.isWinFinal()) {
                                            // 連勝最終プレゼント到達の場合

                                            // Google Analytics 登録
                                            ga('set', 'dimension1', loginData.now.format());
                                            ga('set', 'dimension2', loginData.getFrom());
                                            ga('send', 'event', '勝利確認ダイアログ', '終了(完勝)', ''+ gameData.totalWin);
                                            
                                            if (gameData.showWinFinalAlert()) {
                                                // 完了メッセージ後に報告画面
                                                replaceReportScene();
                                            }
                                        }
                                        else {
                                            if (window.confirm(gameData.createWinConfirmText())) {
                                                // 連勝切れ目 の場合、継続確認ダイアログ
                                                // 勝負を続ける場合
            
                                                // Google Analytics 登録
                                                ga('set', 'dimension1', loginData.now.format());
                                                ga('set', 'dimension2', loginData.getFrom());
                                                ga('send', 'event', '勝利確認ダイアログ', '続行', ''+ gameData.totalWin);

                                                // サイコロを回す画像に戻す
                                                replaceDiceRoll('start');
                                                // ダイス回す処理設定
                                                rollDice();
                                            }
                                            else {
                                                // 勝負を降りる場合、再度確認する場合は、再度確認してから
                                                if (DICE_SCENE_RECONFIRM_MESSAGE == null
                                                    || (DICE_SCENE_RECONFIRM_MESSAGE != null && window.confirm(DICE_SCENE_RECONFIRM_MESSAGE))) {
                                                    // 勝負を降りる場合

                                                    // Google Analytics 登録
                                                    ga('set', 'dimension1', loginData.now.format());
                                                    ga('set', 'dimension2', loginData.getFrom());
                                                    ga('send', 'event', '勝利確認ダイアログ', '終了', ''+ gameData.totalWin);
                                                    
                                                    // 完了画面
                                                    replaceReportScene();
                                                }
                                                else {
                                                    // やっぱり勝負を続ける場合

                                                    // Google Analytics 登録
                                                    ga('set', 'dimension1', loginData.now.format());
                                                    ga('set', 'dimension2', loginData.getFrom());
                                                    ga('send', 'event', '勝利確認ダイアログ', '再確認続行', ''+ gameData.totalWin);

                                                    // サイコロを回す画像に戻す
                                                    replaceDiceRoll('start');
                                                    // ダイス回す処理設定
                                                    rollDice();
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        // 勝ったけど、まだ切れ目に到達していない場合

                                        // サイコロを回す画像に戻す
                                        replaceDiceRoll('start');
                                        // ダイス回す処理設定
                                        rollDice();
                                    }
                                }
                                else {
                                    // 通常挑戦モード以外の場合
                                    presentLabel.text = DICE_SCENE_HEADER_LABEL.text.free.replace("{total_win}", gameData.totalWin);

                                    // サイコロを回す画像に戻す
                                    replaceDiceRoll('start');

                                    // ダイス回す処理設定
                                    rollDice();
                                }
                            }
                        });
                    }
                } else {
                    // ダイス結果：敗北
                    // 通算勝利回数クリア
                    gameData.totalWin = 0;

                    // 敗北フローティングラベル
                    let resultFinishFlg = false;
                    let resultLabel = (new CustomLabel(DICE_SCENE_LOSE_LABEL, loginData)).label;
                    resultLabel.tl.hide().delay(5).fadeIn(5).moveBy(0, 80, 20).fadeOut(5).then(
                        () => {
                            resultFinishFlg = true;
                        }
                    );
                    scene.addChild(resultLabel);

                    if (loginData.isTutorial()) {
                        // チュートリアルモードの場合
                        
                        resultLabel.addEventListener('enterframe', function(e) {
                            // アニメーション終了後
                            if (resultFinishFlg) {
                                // アニメーションが完了した場合、自分を破棄
                                this.removeEventListener('enterframe', arguments.callee);

                                // チュートリアルシーンを追加
                                gameData.game.pushScene(tutorialScene);

                                // 初期バルーン
                                let initialBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_LOSE_INITIAL, loginData)).label;
                                tutorialScene.addChild(initialBalloon);

                                initialBalloon.addEventListener('touchend', function (e) {
                                    // 初期バルーンが押下されたら、消す
                                    tutorialScene.removeChild(initialBalloon);
                                    // シーン削除
                                    gameData.game.removeScene(tutorialScene);

                                    // チュートリアル時はコレクションシーンに遷移
                                    if (ITEM_LIST != null) {
                                        replaceCollectionScene();
                                    }
                                    else {
                                        replaceNonCollectionScene();
                                    }
                                });
                            }
                        });       
                    }
                    else {
                        // チュートリアル以外
                        resultLabel.addEventListener('enterframe', function(e) {
                            if (resultFinishFlg) {
                                // アニメーションが完了した場合、自分を破棄
                                this.removeEventListener('enterframe', arguments.callee);

                                if (loginData.isChallenge()) {
                                    // 挑戦モード：敗北

                                    // Google Analytics 登録
                                    ga('set', 'dimension1', loginData.now.format());
                                    ga('set', 'dimension2', loginData.getFrom());
                                    ga('send', 'event', '敗北', '敗北', ''+ gameData.totalWin);

                                    replaceThankyouScene();
                                }
                                else {
                                    if (loginData.isFree()) {
                                        // Google Analytics 登録
                                        ga('set', 'dimension1', loginData.now.format());
                                        ga('set', 'dimension2', "free");
                                        ga('send', 'event', '敗北', '敗北', ''+ gameData.totalWin);
                                    }

                                    // それ以外で敗北
                                    if (ITEM_LIST != null) {
                                        replaceCollectionScene();
                                    }
                                    else {
                                        replaceNonCollectionScene();
                                    }
                                }
                            }
                        });
                    }

                }
            }
        });    
    }


    if (loginData.isTutorial()) {
        // チュートリアルモードの場合

        // チュートリアルシーンを追加
        gameData.game.pushScene(tutorialScene);

        // 初期バルーン
        let initialBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_INITIAL, loginData)).label;
        tutorialScene.addChild(initialBalloon);

        initialBalloon.addEventListener('touchend', function (e) {
            // 初期バルーンが押下されたら、消して、マイダイスバルーン表示
            tutorialScene.removeChild(initialBalloon);

            let myDiceBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_MY_DICE, loginData)).label;
            tutorialScene.addChild(myDiceBalloon);

            myDiceBalloon.addEventListener('touchend', function (e) {
                // マイダイスバルーンが押下されたら、消して、ライバルダイスバルーン表示
                tutorialScene.removeChild(myDiceBalloon);

                let rivalDiceBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_RIVAL_DICE, loginData)).label;
                tutorialScene.addChild(rivalDiceBalloon);
    
                rivalDiceBalloon.addEventListener('touchend', function (e) {
                    // ライバルダイスバルーンが押下されたら、消して、勝敗バルーン表示
                    tutorialScene.removeChild(rivalDiceBalloon);

                    let battleBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_BATTLE, loginData)).label;
                    tutorialScene.addChild(battleBalloon);
        
                    battleBalloon.addEventListener('touchend', function (e) {
                        // 勝敗バルーンが押下されたら、消して、回すバルーン表示
                        tutorialScene.removeChild(battleBalloon);

                        let startBalloon = (new CustomBalloon(DICE_SCENE_BALLOON_START, loginData)).label;
                        tutorialScene.addChild(startBalloon);
            
                        startBalloon.addEventListener('touchend', function (e) {
                            // 回すバルーンが押下されたら、消して、勝負開始
                            tutorialScene.removeChild(startBalloon);
                            // シーン削除
                            gameData.game.removeScene(tutorialScene);
            
                            rollDice();
                        });            
                    });    
                });
            });
        });
    }
    else {
        // チュートリアルでない場合、回せる
        rollDice();
    }
}

// コレクション画面
function replaceCollectionScene() {
    let scene = new Scene();

    // シーン設定
    gameData.game.replaceScene(scene);

    let tutorialScene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // コレクション画面：タイトル
    scene.addChild((new CustomLabel(COLLECTION_SCENE_TITLE_LABEL)).label);

    // コレクション画面：メッセージ
    scene.addChild((new CustomLabel(COLLECTION_SCENE_MESSAGE_LABEL)).label);
    
    // cookieから取得済みアイテムリスト取得
    const collections = loginData.getItems();

    // アイテムを一覧に並べる
    for (let i = 0; i < ITEM_LIST.length - 1; i++) {
        // アイテム画像
        let itemSprite = new Sprite(300, 300);
        
        let isGeted = false;
        for (let cll of collections) {
            if (cll.name == ITEM_LIST[i].name) {
                // 取得済みアイテム
                isGeted = true;
                break;
            }
        }
        
        if (isGeted) {
            // 取得済みアイテムはそのまま表示する
            itemSprite.image = gameData.game.assets[ITEM_LIST[i].img];
        }
        else {
            if (ITEM_LIST[i].target == true) {
                // 未取得で、取得可能
                itemSprite.image = gameData.game.assets[COLLECTION_UNACQUIRED.img];
            }
            else {
                // 未取得で、期間外
                itemSprite.image = gameData.game.assets[COLLECTION_OUTOFTERM.img];
            }
        }

        itemSprite.x = -110 + ((i % 7) * 55);
        itemSprite.y = -10 + ( Math.floor(i / 7) * 55) ;
        itemSprite.scaleX = 0.15;
        itemSprite.scaleY = 0.15;
        itemSprite.originX = 150;
        itemSprite.originY = 150;
        scene.addChild(itemSprite);

        itemSprite.addEventListener('touchend', function (e) {
            // タッチしたら、詳細表示
            if (isGeted) {
                // 取得済みは詳細表示
                alert(ITEM_LIST[i].name + "\n("+ ITEM_LIST[i].rateTxt + ")\n\n"+ ITEM_LIST[i].message);
            }
            else {
                if (ITEM_LIST[i].target == true) {
                    // 未取得・取得可能
                    alert(COLLECTION_UNACQUIRED.text);
                }
                else {
                    // 未取得・取得不可
                    alert(COLLECTION_OUTOFTERM.text);
                }
            }
        });
    }

    // リトライ画像
    let retryEntity = new CustomEntity(COLLECTION_SCENE_RETRY_ENTITY, loginData, gameData);
    scene.addChild(retryEntity.getEntity());

    // FROMが指定されている場合、本番挑戦画像
    let challengeEntity = null;
    if (COLLECTION_SCENE_CHALLENGE_ENTITY != null) {
        challengeEntity = new CustomEntity(COLLECTION_SCENE_CHALLENGE_ENTITY, loginData, gameData);
    }

    const setRetryEvent = function() {
        // リトライボタンでゲーム開始
        retryEntity.getEntity().addEventListener('touchend', function (e) {
            loginData.retry();
            replaceRivalScene();
        });
    }

    const setChallengeEvent = function() {
        // リトライボタンでゲーム開始
        challengeEntity.getEntity().addEventListener('touchend', function (e) {
            // チュートリアル終了
            loginData.turnoffTutorial();
            // ルール画面からやり直し
            gameData.game.removeScene(scene);
            pushRuleScene();
        });
    }

    if (loginData.isTutorial()) {
        // チュートリアルモードの場合
        if (loginData.getFrom() != null && challengeEntity != null) {
            // FROMが指定されている場合、本番挑戦画像設定
            scene.addChild(challengeEntity.getEntity());
        }

        // シーン追加
        gameData.game.pushScene(tutorialScene);

        // 初期バルーン
        let initialBalloon = (new CustomBalloon(COLLECTION_SCENE_BALLOON_INITIAL, loginData)).label;
        tutorialScene.addChild(initialBalloon);

        initialBalloon.addEventListener('touchend', function (e) {
            // 初期バルーンが押下されたら、消して、アイテムバルーン表示
            tutorialScene.removeChild(initialBalloon);

            let itemBalloon = (new CustomBalloon(COLLECTION_SCENE_BALLOON_ITEM, loginData)).label;
            tutorialScene.addChild(itemBalloon);

            itemBalloon.addEventListener('touchend', function (e) {
                // アイテムバルーンが押下されたら、消して、リトライバルーン設定
                tutorialScene.removeChild(itemBalloon);

                let retryBalloon = (new CustomBalloon(COLLECTION_SCENE_BALLOON_RETRY, loginData)).label;
                tutorialScene.addChild(retryBalloon);
    
                retryBalloon.addEventListener('touchend', function (e) {
                    // リトライバルーンが押下されたら、消す
                    tutorialScene.removeChild(retryBalloon);

                    // FROMが指定されている場合のみ、挑戦画像バルーン設定
                    if (loginData.getFrom() != null && challengeEntity != null) {

                        let challengeBalloon = (new CustomBalloon(COLLECTION_SCENE_BALLOON_CHALLENGE, loginData)).label;
                        tutorialScene.addChild(challengeBalloon);

                        challengeBalloon.addEventListener('touchend', function (e) {
                            // 挑戦バルーンが押下されたら、消す
                            tutorialScene.removeChild(challengeBalloon);

                            // シーン除去
                            gameData.game.removeScene(tutorialScene);
            
                            // リトライイベント設定
                            setRetryEvent();                            
                            // 挑戦イベント設定
                            setChallengeEvent();
                        });                                            
                    }
                    else {
                        // フリーの場合
                        // シーン除去
                        gameData.game.removeScene(tutorialScene);
        
                        // リトライイベント設定
                        setRetryEvent();                            
                    }
                });
            });
        });
    }
    else {
        // チュートリアルでない場合、そのままライバルイベント設定
        setRetryEvent();
    }
}

// 挑戦モードの報告画面
function replaceReportScene() {
    let scene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // お祝いメッセージ
    scene.addChild((new CustomLabel(REPORT_SCENE_CONGRATULATIONS_LABEL)).label);

    //申請フォーム用：DOM設定
    var reportForm = new Entity();
    reportForm._element = document.createElement('textarea');
    reportForm._element.setAttribute('rows','4');
    reportForm._element.setAttribute('cols','40');
    reportForm._element.setAttribute('readOnly','true');
    reportForm._element.value = gameData.createPresentFormData(loginData.now);
    reportForm.width = 300;
    reportForm.height = 70;
    reportForm.x = 40;
    reportForm.y = 120;
    scene.addChild(reportForm);

    // 申請ページ遷移リンク
    var contactEntity = new CustomEntity(REPORT_SCENE_CONTACT_LINK_ENTITY, loginData, gameData);
    contactEntity.getEntity().addEventListener('touchend', function(e) {
        // Google Analytics 登録
        ga('set', 'dimension1', loginData.now.format());
        ga('set', 'dimension2', loginData.getFrom());
        ga('set', 'dimension2', gameData.getPresentKey(loginData.now));
        ga('send', 'event', 'リンク', '景品メール報告', ''+ gameData.totalWin);
        
        location.href = REPORT_LINK_URL + "?"+ encodeURIComponent(gameData.createPresentFormData(loginData.now));
    });
    scene.addChild(contactEntity.getEntity());

    // 申請時のサポート文言
    scene.addChild((new CustomLabel(REPORT_SCENE_SUPPORT_LABEL)).label);
    
    // シーン設定
    gameData.game.replaceScene(scene);    
}

// アイテムリストが未設定の場合の完了画面
function replaceNonCollectionScene() {
    let scene = new Scene();

    // シーン設定
    gameData.game.replaceScene(scene);

    let tutorialScene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // 終了メッセージ
    scene.addChild((new CustomLabel(NONCOLLECTION_SCENE_GAMEOVER_LABEL)).label);

    // リトライラベル
    if (NONCOLLECTION_SCENE_RETRY_LABEL != null) {
        scene.addChild((new CustomLabel(NONCOLLECTION_SCENE_RETRY_LABEL)).label);
    }

    // リトライ画像
    let retryEntity = null;
    if (NONCOLLECTION_SCENE_RETRY_ENTITY != null) {
        retryEntity = new CustomEntity(NONCOLLECTION_SCENE_RETRY_ENTITY, loginData, gameData);
        scene.addChild(retryEntity.getEntity());
    }

    // 本番挑戦画像
    let challengeEntity = null;
    if (NONCOLLECTION_SCENE_CHALLENGE_ENTITY != null) {
        challengeEntity = new CustomEntity(NONCOLLECTION_SCENE_CHALLENGE_ENTITY, loginData, gameData);
    }

    const setRetryEvent = function() {
        // リトライボタンでゲーム開始
        retryEntity.getEntity().addEventListener('touchend', function (e) {
            loginData.retry();
            replaceRivalScene();
        });
    }

    const setChallengeEvent = function() {
        // リトライボタンでゲーム開始
        challengeEntity.getEntity().addEventListener('touchend', function (e) {
            // チュートリアル終了
            loginData.turnoffTutorial();
            // ルール画面からやり直し
            gameData.game.removeScene(scene);
            pushRuleScene();
        });
    }

    if (loginData.isTutorial()) {
        // チュートリアルモードの場合
        if (loginData.getFrom() != null && challengeEntity != null) {
            // FROMが指定されている場合、本番挑戦画像設定
            scene.addChild(challengeEntity.getEntity());
        }

        // シーン追加
        gameData.game.pushScene(tutorialScene);

        // 初期バルーン
        let initialBalloon = (new CustomBalloon(NONCOLLECTION_SCENE_BALLOON_INITIAL, loginData)).label;
        tutorialScene.addChild(initialBalloon);

        initialBalloon.addEventListener('touchend', function (e) {
            // 初期バルーンが押下されたら、消して、アイテムバルーン表示
            tutorialScene.removeChild(initialBalloon);

            let retryBalloon = (new CustomBalloon(NONCOLLECTION_SCENE_BALLOON_RETRY, loginData)).label;
            tutorialScene.addChild(retryBalloon);

            retryBalloon.addEventListener('touchend', function (e) {
                // リトライバルーンが押下されたら、消す
                tutorialScene.removeChild(retryBalloon);

                // FROMが指定されている場合のみ、挑戦画像バルーン設定
                if (loginData.getFrom() != null && challengeEntity != null) {

                    let challengeBalloon = (new CustomBalloon(NONCOLLECTION_SCENE_BALLOON_CHALLENGE, loginData)).label;
                    tutorialScene.addChild(challengeBalloon);

                    challengeBalloon.addEventListener('touchend', function (e) {
                        // 挑戦バルーンが押下されたら、消す
                        tutorialScene.removeChild(challengeBalloon);

                        // シーン除去
                        gameData.game.removeScene(tutorialScene);
        
                        // リトライイベント設定
                        setRetryEvent();                            
                        // 挑戦イベント設定
                        setChallengeEvent();
                    });                                            
                }
                else {
                    // フリーの場合
                    // シーン除去
                    gameData.game.removeScene(tutorialScene);
    
                    // リトライイベント設定
                    setRetryEvent();                            
                }
            });
        });
    }
    else {
        // チュートリアルでない場合、そのままライバルイベント設定
        setRetryEvent();
    }
}

// 挑戦モードの敗北完了画面
function replaceThankyouScene() {
    let scene = new Scene();

    // モード追加
    appendModeHeader(scene);

    // 終了メッセージ
    scene.addChild((new CustomLabel(THANKYOU_SCENE_THANKYOU_LABEL)).label);
    
    // 他のFROMを表示したか否か
    let isOtherFrom = false;
    // FROM枠のY軸
    let fromY = 0;
    for (let from of FROM_PARAMS) {
        if (fromY == 0) {
            // 一番上のY位置を保持しておく
            fromY = from.message.y;
        }

        // ログインパラメータをcookieから確認する
        let fromcookie = loginData.cookieParams.get(from.cookie);

        if (!loginData.cookieParams.get(fromcookie)) {
            // 指定のFROMがまだcookieに登録されていない場合

            // メッセージを登録
            scene.addChild((new CustomLabel(from.message)).label);
            
            if (from.image != null) {
                console.log(from.image);
                // 画像リンクが設定されている場合、画像リンク表示
                let fromSprite = new CustomImg(from.image, loginData, gameData);

                // 押下時のイベント
                fromSprite.addEventListener('touchend', function(e) {
                    ga('set', 'dimension1', loginData.now.format());
                    ga('set', 'dimension2', loginData.getFrom());
                    ga('send', 'event', 'リンク', from.type + "登録");
        
                    location.href = from.url;
                });
        
                scene.addChild(fromSprite);
            }
            else {
                // 画像リンクがない場合、テキストリンク表示
                let fromLabel = (new CustomLabel(from.button)).label;

                // 押下時のイベント
                fromLabel.addEventListener('touchend', function(e) {
                    ga('set', 'dimension1', loginData.now.format());
                    ga('set', 'dimension2', loginData.getFrom());
                    ga('send', 'event', 'リンク', from.type + "登録");
        
                    location.href = from.url;
                });

                scene.addChild(fromLabel);
            }

            // 表示したら、FLG=ON
            isOtherFrom = true;

            // 最初の1個だけ表示してループを抜ける
            break;
        }
    }

    // 招待メッセージ
    let invitationLabelY = 0;
    if (THANKYOU_SCENE_INVITATION_LABEL != null) {
        let invitationLabel = (new CustomLabel(THANKYOU_SCENE_INVITATION_LABEL)).label;

        if (!isOtherFrom) {
            // 一旦Y軸を保持
            invitationLabelY = invitationLabel.y;
            // 他FROMが表示されていない場合、Y軸を変更
            invitationLabel.y = fromY;
        }

        scene.addChild(invitationLabel);
    }

    // 招待リンク
    let linkY = 0;
    if (THANKYOU_SCENE_INVITATION_LINK_ENTITY != null) {
        let invitationLinkEntity = new CustomEntity(THANKYOU_SCENE_INVITATION_LINK_ENTITY);

        if (!isOtherFrom) {
            // 招待メッセージから招待リンクまでの差を保持
            linkY = invitationLinkEntity.getEntity().y - invitationLabelY;
            // 他FROMが表示されていない場合、Y軸を変更
            invitationLabel.y = fromY + linkY;
        }

        scene.addChild(invitationLinkEntity.getEntity());
    }
    
    // リトライ文言
    if (THANKYOU_SCENE_RETRY_LABEL != null) {
        let retryLabel = (new CustomLabel(THANKYOU_SCENE_RETRY_LABEL)).label;
        scene.addChild(retryLabel);
    }

    // リトライ画像
    if (THANKYOU_SCENE_RETRY_ENTITY != null) {
        let retryEntity = new CustomEntity(THANKYOU_SCENE_RETRY_ENTITY, loginData, gameData);
        scene.addChild(retryEntity.getEntity());

        // リトライボタンでゲーム開始
        retryEntity.getEntity().addEventListener('touchend', function (e) {
            loginData.retry();
            replaceRivalScene();
        });
    }

    // シーン設定
    gameData.game.replaceScene(scene);
}





// 現在のモードを追記
function appendModeHeader(scene) {
    if (loginData.isTutorial()) {
        // チュートリアルモードの場合
        if (MODE_HEADER_LABELS["tutorial"] != null) {
            scene.addChild((new CustomLabel(MODE_HEADER_LABELS["tutorial"], loginData)).label);
        }
    }
    else if (loginData.isFree()) {
        // フリーモードの場合
        if (MODE_HEADER_LABELS["free"] != null) {
            scene.addChild((new CustomLabel(MODE_HEADER_LABELS["free"], loginData)).label);
        }
    }
    else {
        // 挑戦モードの場合
        if (MODE_HEADER_LABELS["challenge"] != null) {
            scene.addChild((new CustomLabel(MODE_HEADER_LABELS["challenge"], loginData)).label);
        }
    }


}
