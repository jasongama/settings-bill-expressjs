var assert= require("assert");
var settingsBill =require ("../settings-billLogic");
describe('settingsBill' , function(){
   it('It should add numbers of calls made', function() {
   var set = settingsBill();
   set.recordAction('call');
   set.recordAction('call');
   set.recordAction('call');

  assert.equal(set.actionsFor("call").length,3);

 });
   
    it('It should add numbers of sms made' , function(){
        var set = settingsBill();
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('sms');

        assert.equal(set.actionsFor("sms").length, 3)
    });

    it('It should return danger when the calls or smss reach a cricticalLevel' , function(){
        var set = settingsBill();
        set.getSettings({
            callCost: 3,
            smsCost: 6,
            warningLevel: 2,
            criticalLevel: 8
        });

        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('call');
        set.recordAction('sms');
        set.recordAction('sms');
        set.recordAction('call');
       
        assert.equal(set.hasReachedCriticalLevel(),true)
    });
      // it('It should keep track total amounts calls and sms that are made' , function(){
    //     assert.equal(settingsBill('CL 124,CY 567,L 345, CJ 456,L 341','L'), 1)
    // });
});