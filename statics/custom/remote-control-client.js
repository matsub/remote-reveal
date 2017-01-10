var pubnub = PUBNUB({
    publish_key : '---INSERT KEY HERE---',
    subscribe_key : '---INSERT KEY HERE---',
    ssl: true,
});

pubnub.subscribe({
    channel : 'output',
    message : function (message, envelope, channelOrGroup, time, channel) {
        jQuery('#display').text(message.slide + '.' + message.part);
        jQuery('#notes').html(message.notes);
    }
});

function buttonCommand(button) {
    pubnub.publish({
        channel : 'input',
        message : {button: button}
    });
}

jQuery(document).ready(function() {
    jQuery('button').click(function (eventObject) {
        var targetId = jQuery(this).attr('id');
        buttonCommand(targetId);
    });
    jQuery('input').change(function (eventObject) {
        jQuery('.buttons').toggle();
    });
});
