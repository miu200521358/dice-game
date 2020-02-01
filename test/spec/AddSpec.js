describe("add テスト", function() {
    it ("add 1+1", function() {
        expect(add(1, 1)).toBe(2);
    });

    it ("add 2+3", function() {
        expect(add(2, 3)).toBe(5);
    });

    // 失敗ケース
    it ("add 6+8", function() {
        expect(add(6, 8)).toBe(10);
    });

});