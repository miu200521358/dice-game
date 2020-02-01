describe("Cookie null", function() {
    let cookies = new CookieCls();

    it ("isAllowFrom line", function() {
        expect(cookies.isAllowFrom("line")).toBe(true);
    });

    it ("isAllowFrom mail", function() {
        expect(cookies.isAllowFrom("mail")).toBe(false);
    });
});
