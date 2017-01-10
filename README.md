[reveal-remote]: https://github.com/matsub/reveal-js-pubnub-remote-control-plugin/tree/read_note

# About this

This is an application to control a page of reveal.js remotely with [reveal-js-pubnub-remote-control-plugin][reveal-remote].


# Requirements

- Pages using reveal.js plugged [reveal-js-pubnub-remote-control-plugin][reveal-remote]
- `bower install`
- `pip install -r requirements.txt`
- Write your PUBNUB subscribe/publish keys to `statics/custom/remote-control-client.js`.

```javascript
var pubnub = PUBNUB({
    publish_key : '---INSERT KEY HERE---',
    subscribe_key : '---INSERT KEY HERE---',
    ssl: true,
});
```


# Run Server

```sh
$ python app.py
```
