describe("Payments test", function() {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
    });
  
    it('should add a new payment', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('10');
        expect(allPayments['payment1'].tipPercent).toEqual(10);
    });
  
    it('should update payment tables', function () {
        let payment = createCurPayment();
        allPayments['payment1'] = payment;
        appendPaymentTable(payment);
        let table = document.querySelectorAll('#paymentTable tbody tr td');

        expect(table.length).toEqual(4);
        expect(table[0].innerText).toEqual('$100');
        expect(table[1].innerText).toEqual('$10');
        expect(table[2].innerText).toEqual('10%');
        expect(table[3].innerText).toEqual('X');
    });

    it('should create new payments', function () {
        let payment = {billAmt: '100', tipAmt: '10', tipPercent: 10,}

        expect(createCurPayment()).toEqual(payment);
    });
  
    afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
    });
  });
  