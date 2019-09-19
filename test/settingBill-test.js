var assert = require("assert");
var settingsBill = require("../settings-billLogic");
describe('settingsBill', function () {
    it('It should show numbers of sms that are added in a list', function () {
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
        }])

    });

    it('It should show numbers of call that are added in a list', function () {
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
    it('It should the total amount of calls', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');



        assert.deepEqual(set.totals(), {
            smsTotal: 0,
            callTotal: 24,
            grandTotal: 24
        })
    });
    it('It should the total amount of smss', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');



        assert.deepEqual(set.totals(), {
            smsTotal: 30,
            callTotal: 0,
            grandTotal: 30
        })
    });
    it('It should get the updatesettings', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        });


        assert.deepEqual(set.getSettings(), {
            callCost: 3,
            smsCost: 6,
            warningLevel: 10,
            criticalLevel: 30
        })
    });
    it('It should  filter through the list show only the calls', function () {
        var set = settingsBill();
        set.setSettings({
            callCost: 4,
            smsCost: 3,
            warningLevel: 10,
            criticalLevel: 30
        });


        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('call');
       

        assert.deepEqual(set.actionsFor("call"), [{
            type: 'call',
            cost: 4,
            timestamp: new Date()
        }])
    });
    
});