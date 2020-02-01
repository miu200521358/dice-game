describe("UrlParams null", function() {
    let urlParams = new UrlParamsCls({
        "search": null
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams empty", function() {
    let urlParams = new UrlParamsCls({
        search: ""
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams tutorial=true", function() {
    let urlParams = new UrlParamsCls({
        search: "?tutorial=true"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(true);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams tutorial=hoge", function() {
    let urlParams = new UrlParamsCls({
        search: "?tutorial=hoge"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(true);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams free=true", function() {
    let urlParams = new UrlParamsCls({
        search: "?free=true"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(true);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams from=line", function() {
    let urlParams = new UrlParamsCls({
        search: "?from=line"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(true);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams from=line2", function() {
    let urlParams = new UrlParamsCls({
        search: "?from=line2"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams from=mail", function() {
    let urlParams = new UrlParamsCls({
        search: "?from=mail"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(true);
    // });
});

describe("UrlParams from=mail&tutorial=true", function() {
    let urlParams = new UrlParamsCls({
        search: "?from=mail&tutorial=true"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(true);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(false);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(false);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(true);
    // });
});

describe("UrlParams from=line&free=hoge", function() {
    let urlParams = new UrlParamsCls({
        search: "?from=line&free=hoge"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(true);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(true);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});

describe("UrlParams from=line&free=hoge", function() {
    let urlParams = new UrlParamsCls({
        search: "?free=hoge&from=line"
    });

    it ("isTutorial", function() {
        expect(urlParams.isTutorial()).toBe(false);
    });
    
    it ("isFree", function() {
        expect(urlParams.isFree()).toBe(true);
    });
    
    // it ("isFromLine", function() {
    //     expect(urlParams.isFromLine()).toBe(true);
    // });
    
    // it ("isFromMail", function() {
    //     expect(urlParams.isFromMail()).toBe(false);
    // });
});


