describe("Login isFreePeriod 2018/03/25 11:00", function() {
    let loginParams = new LoginCls(moment("2018/03/25 11:00", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(false);
    });
});

describe("Login isFreePeriod 2018/03/26 09:59", function() {
    let loginParams = new LoginCls(moment("2018/03/26 09:59", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(false);
    });
});

describe("Login isFreePeriod 2018/03/26 10:00", function() {
    let loginParams = new LoginCls(moment("2018/03/26 10:00", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(true);
    });
});

describe("Login isFreePeriod 2018/03/26 10:01", function() {
    let loginParams = new LoginCls(moment("2018/03/26 10:01", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(true);
    });
});

describe("Login isFreePeriod 2018/03/27 10:01", function() {
    let loginParams = new LoginCls(moment("2018/03/27 10:01", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(true);
    });
});

describe("Login isFreePeriod 2018/03/28 10:00", function() {
    let loginParams = new LoginCls(moment("2018/03/28 10:00", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(true);
    });
});

describe("Login isFreePeriod 2018/03/28 10:01", function() {
    let loginParams = new LoginCls(moment("2018/03/28 10:01", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(false);
    });
});

describe("Login isFreePeriod FreeOFF 2018/03/28 10:00", function() {
    let loginParams = new LoginCls(moment("2018/03/28 10:00", "YYYY/MM/DD HH:mm"), { search: "?tutorial=true" });

    it ("isFreePeriod", function() {
        expect(loginParams.isFreePeriod()).toBe(false);
    });
});

describe("Login isChallengePeriod 2018/04/06 11:00", function() {
    let loginParams = new LoginCls(moment("2018/04/06 11:00", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(false);
    });
});

describe("Login isChallengePeriod 2018/04/07 09:59", function() {
    let loginParams = new LoginCls(moment("2018/04/07 09:59", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(false);
    });
});

describe("Login isChallengePeriod 2018/04/07 10:00", function() {
    let loginParams = new LoginCls(moment("2018/04/07 10:00", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(true);
    });
});

describe("Login isChallengePeriod 2018/04/07 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/07 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(true);
    });
});

describe("Login isChallengePeriod 2018/04/08 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/08 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(true);
    });
});

describe("Login isChallengePeriod 2018/04/09 10:00", function() {
    let loginParams = new LoginCls(moment("2018/04/09 10:00", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(true);
    });
});

describe("Login isChallengePeriod 2018/04/09 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/09 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(false);
    });
});

describe("Login isChallengePeriod ChallengeOFF 2018/04/09 10:00", function() {
    let loginParams = new LoginCls(moment("2018/04/09 10:00", "YYYY/MM/DD HH:mm"), { search: "?free=true" });

    it ("isChallengePeriod", function() {
        expect(loginParams.isChallengePeriod()).toBe(false);
    });
});

// ---------------------------------------------------------


describe("Login isValidFrom line 2018/04/08 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/08 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=line" });

    it ("isValidFrom", function() {
        expect(loginParams.isValidFrom()).toBe(true);
    });
});

describe("Login isValidFrom mail 2018/04/08 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/08 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=mail" });

    it ("isValidFrom", function() {
        expect(loginParams.isValidFrom()).toBe(false);
    });
});

describe("Login isValidFrom movie 2018/04/08 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/08 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=movie" });

    it ("isValidFrom", function() {
        expect(loginParams.isValidFrom()).toBe(true);
    });
});

describe("Login isValidFrom line2 2018/04/08 10:01", function() {
    let loginParams = new LoginCls(moment("2018/04/08 10:01", "YYYY/MM/DD HH:mm"), { search: "?from=line2" });

    it ("isValidFrom", function() {
        expect(loginParams.isValidFrom()).toBe(false);
    });
});


