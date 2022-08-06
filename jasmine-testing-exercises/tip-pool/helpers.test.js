describe("Helpers test", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 10;
      submitPaymentInfo();
    });
  
    it('should sum total tip amounts', function () {
      expect(sumPaymentTotal('tipAmt')).toEqual(10);

      billAmtInput.value = 50;
      tipAmtInput.value = 20;
      submitPaymentInfo();

      expect(sumPaymentTotal('tipAmt')).toEqual(30);
    });
  
    it('should calculate tip percentage', function () {
      expect(calculateTipPercent(100, 20)).toEqual(20);
    });

    it('should append to the table', function () {
      let tableRow = document.createElement('tr');
      appendTd(tableRow, 'test');

      expect(tableRow.children.length).toEqual(1);
      expect(tableRow.firstChild.innerHTML).toEqual('test');
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentID = 0;
    });
  });
  