/* remote controls of reveal.js */
var pubnub = PUBNUB({
    publish_key : '---INSERT PUB---',
    subscribe_key : '---INSERT SUB---',
    ssl: true,
});

pubnub.subscribe({
    channel : 'output',
    message : function (message, envelope, channelOrGroup, time, channel) {
        jQuery('#note').html(message.notes);
    }
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}


/* Stopwatch */
class Stopwatch {
    constructor(target) {
        this.times;
        this.running = false;
        this.target = target;
        this.reset();
    }
    
    reset() {
        this.times = [0, 0];
        this.print(this.times);
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        let diff = Math.abs(timestamp - this.time);
        this.times[1] += diff / 1000;
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
        let timeText = this.format(this.times);
        this.target.text(timeText);
    }

    format(times) {
        return times.map(Math.floor).map(pad0).join(':');
    }
}

function pad0(value) {
    let count = 2;
    let result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function toggleSwitch() {
    jQuery('#start').toggle();
    jQuery('#stop').toggle();
}

jQuery(document).ready(function() {
    /* remote controls of reveal.js */
    jQuery('input').change((e) => { jQuery('.buttons').toggle(); });
    jQuery('button').click((e) => {
        let targetId = jQuery(e.currentTarget).attr('id');
        buttonCommand(targetId);
    });

    /* stopwatch */
    let sw = new Stopwatch(jQuery('#stopwatch > time'));

    jQuery('#start').click((e) => {
        toggleSwitch();
        sw.start();
    });
    jQuery('#stop').click((e) => {
        toggleSwitch();
        sw.stop();
    });
    jQuery('#reset').click((e) => { sw.reset(); });
});
