/**
 * Created by lihongyan on 2017/3/16.
 */
var util = require('util');
var events = require('events');
function Pulser() {
    events.EventEmitter.call(this);
}
util.inherits(Pulser,events.EventEmitter);
Pulser.prototype.start = function () {
    var self = this;
    this.id = setInterval(function () {
        util.log('>>>>pulser');
        self.emit('pulse');
        util.log('<<<<pulser');
    },1000);
}
var pulser = new  Pulser();
pulser.on('pulse',function () {
    util.log('pulse received');
});
pulser.start();