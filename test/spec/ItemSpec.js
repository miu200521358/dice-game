describe("期間限定アイテム テスト 01", function() {

    let TEST_ITEM_LIST_01 = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15
    }];

    var TEST_ITEM_GACHA_01 = new Gacha(TEST_ITEM_LIST_01, moment());
        
    it ("GACHA.length", function() {
        expect(TEST_ITEM_GACHA_01.lists.length).toBe(1);
    });

    it ("GACHA.name", function() {
        expect(TEST_ITEM_GACHA_01.lists[0].name).toBe("牡牛座");
    });

});


describe("期間限定アイテム テスト 日付範囲 01", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 日付範囲(yyyy/MM/ddの書式)。複数範囲指定可能
            "daterange": [{
                "from": "2018/03/26"
                , "to": "2018/03/27"
            }]
        }        
    }];
        
    it ("GACHA 2018/03/25", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/26", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/27", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/27", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/03/28", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/28", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

});



describe("期間限定アイテム テスト 日付範囲 02", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 日付範囲(yyyy/MM/ddの書式)。複数範囲指定可能
            "daterange": [{
                "from": "2018/03/26"
                , "to": "2018/03/27"
            },{
                "from": "2018/04/06"
                , "to": "2018/04/07"
            }]
        }        
    }];
        
    it ("GACHA 2018/03/25", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/26", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/27", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/27", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/03/28", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/28", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/05", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/05", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/04/06", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/06", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/04/07", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/07", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/04/08", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/08", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

});


describe("期間限定アイテム テスト 曜日 01", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 曜日（Monday・Tuesday・Wednesday・Thursday・Friday・Saturday・Sundayの文字列配列）
        	"weekday": [
                "Monday"
            ]
        }        
    }];
        
    it ("GACHA 2018/03/25", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/26", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/27", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/27", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/28", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/28", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/29", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/29", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/30", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/30", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/31", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/31", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/01", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/02", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/02", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

});



describe("期間限定アイテム テスト 曜日 02", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 曜日（Monday・Tuesday・Wednesday・Thursday・Friday・Saturday・Sundayの文字列配列）
        	"weekday": [
                "Wednesday", "Friday"
            ]
        }        
    }];
        
    it ("GACHA 2018/03/25", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/26", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/27", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/27", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/28", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/28", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/03/29", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/29", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/30", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/30", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/03/31", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/31", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/01", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/02", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/02", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/03", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/03", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/04/04", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/04", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/04/05", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/05", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

});


describe("期間限定アイテム テスト 時間 01", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
        	"timerange": [{
        		"from": "09:00"
        		, "to": "10:00"
            }]
        }        
    }];
        
    it ("GACHA 08:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 08:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 09:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 09:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 09:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 10:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 10:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 10:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 10:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
});


describe("期間限定アイテム テスト 時間 02", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
        	"timerange": [{
        		"from": "09:00"
        		, "to": "10:00"
            },
            // 日付を超える場合も設定可能
            {
        		"from": "23:00"
        		, "to": "01:00"
            }]
        }        
    }];
        
    it ("GACHA 08:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 08:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 09:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 09:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 09:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 09:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 10:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 10:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 10:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 10:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 22:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 22:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 23:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 23:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 23:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 23:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 23:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25 23:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 01:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26 01:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 01:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26 01:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
});


describe("期間限定アイテム テスト 日付指定 01", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 日付指定
        	"datespot": [3, 5, 10]
        }        
    }];
        
    it ("GACHA 2018/03/01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/01", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/02", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/02", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/03", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/03", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/04", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/04", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/05", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/05", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

        
    it ("GACHA 2018/04/01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/01", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/04/02", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/02", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/04/03", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/03", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/04/04", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/04", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/04/05", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/04/05", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

});



describe("期間限定アイテム テスト 日付範囲＋曜日", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 日付範囲(yyyy/MM/ddの書式)。複数範囲指定可能
            "daterange": [{
                "from": "2018/03/26"
                , "to": "2018/03/29"
            }],
            // 曜日（Monday・Tuesday・Wednesday・Thursday・Friday・Saturday・Sundayの文字列配列）
        	"weekday": [
                "Monday", "Wednesday"
            ]            
        }        
    }];
        
    it ("GACHA 2018/03/25", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/25", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/26", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/26", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/27", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/27", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/28", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/28", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });

    it ("GACHA 2018/03/29", function() {
        let TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/29", "YYYY/MM/DD"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

});


describe("期間限定アイテム テスト 時間＋日付指定", function() {

    let TEST_ITEM_LIST = [{
        "name": "牡牛座",
        "message": "牡牛座だよ",
        "img": "../img3/additem10.png",
        "rateTxt": "★",
        "rate": 15,
        // 出現条件
        "appearance" : {
            // 時間(HH:mmの書式)、日付指定がなければ、毎日この時間帯という指定になる
        	"timerange": [{
        		"from": "09:00"
        		, "to": "10:00"
            }],
            // 日付指定
        	"datespot": [3, 5, 10]            
        }        
    }];
        
    it ("GACHA 2018/03/05 08:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/05 08:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/04 09:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/04 09:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/05 09:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/05 09:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/04 09:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/04 09:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
        
    it ("GACHA 2018/03/05 09:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/05 09:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/12 09:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/12 09:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });

    it ("GACHA 2018/03/10 09:59", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/10 09:59", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/10 10:00", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/10 10:00", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(1);
        expect(TEST_ITEM_GACHA.lists[0].name).toBe("牡牛座");
    });
        
    it ("GACHA 2018/03/10 10:01", function() {
        var TEST_ITEM_GACHA = new Gacha(TEST_ITEM_LIST, moment("2018/03/10 10:01", "YYYY/MM/DD HH:mm"));
        expect(TEST_ITEM_GACHA.lists.length).toBe(0);
    });
});
