
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 10000, years: 10, rate: 5})).toEqual('106.07');
  expect(calculateMonthlyPayment({amount: 100000, years: 10, rate: 5})).toEqual('1060.66');
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 10000, years: 10, rate: 5})).toMatch(/[.][0-9][0-9]$/g);
});

/// etc
