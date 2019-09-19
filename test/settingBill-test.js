var assert = require("assert");
var settingsBill = require("../settings-billLogic");
describe('settingsBill', function () {
    it('It should show numbers of sms made', function () {
        var set = settingsBill();

        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 20,
            criticalLevel: 80
        });

        set.recordAction('sms');


        assert.deepEqual(set.actions(), [{
            type: 'sms',
            cost: 6,
            timestamp: new Date()
        }]);

    });

    it('It should show numbers of call made', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 6,
            smsCost: 6,
            warningLevel: 20,
            criticalLevel: 80
        });
        set.recordAction('call');



        assert.deepEqual(set.actions("call"), [{
            type: 'call',
            cost: 6,
            timestamp: new Date()
        }])
    });


    it('It should warn you  if the calls and smss have reach the warninglevel ', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');


        set.totals()
        assert.equal(set.hasReachedWarningLevel(), 'warning')
    });
    it('It should indicate danger if the calls and smss have reach the cricticallevel ', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');


        set.totals()
        assert.equal(set.hasReachedWarningLevel(), 'danger')
    });
    it('It should calculate the total amount of calls and smss', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');



        assert.deepEqual(set.totals(), {
            smsTotal: 18,
            callTotal: 12,
            grandTotal: 30
        })
    });

});