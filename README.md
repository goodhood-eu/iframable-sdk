# Nebenan.de iframe SDK

### Live examples:
:surfing_man: [GHPages](https://goodhood-eu.github.io/iframable-sdk/) :surfing_woman:
### Example of usage:
1. Add a small JS-snippet before `</body>`

```
<script type="text/javascript">
  !function(){
  // ** YOUR CONFIG HERE **
    var t = {
      partner: 'raiffeisen_neuulm',
      host: 'http://localhost:3001',
      params: {
        utm_source: "my utm_source",
        utm_medium: "my utm_medium",
        utm_campaign: "my utm_campaign",
        topic: "climate_environment_2021",
      }
    };

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://sdk.nebenan.de/npm/nebenan-iframe-sdk/' + (t.v || 'latest') + '/main.js';
    s.onload = function () { var e=e||!1;document.addEventListener("readystatechange",function(){e||(new GoodHoodSDK(t).init(),e=!0)}) }

    document.getElementsByTagName('head')[0].appendChild(s);
  }();
</script>
```

3. Add `<div id="goodhood-widget"></div>` to the place where you want to inject our iframe.  
   **Note:** you can change widget wrapper id\class name, but you will have to pass it in config (see `config.selector`)

### Config

`_goodhood_config` support keys:

- `partner`: integration id, (example: `raiffeisen_neuulm`)  If specified, then feed items will be fetched from corporations feed, otherwise, from default public feed
- `params`: additional search parameters (utm, and \ or feed search parameters. see example)
- `selector`: CSS-selector for wrapper element where iFrame should be appended. Default: `#goodhood-widget`
- `host`: Nebenan URL (default: `https://nebenan.de`)
- `v`: SDK version (default: `latest`)

**Example with minimum required data:**

```
var _goodhood_config = {
   partner: 'raiffeisen_neuulm',
   params: {
      utm_source: "my utm_source",
      utm_medium: "my utm_medium",
      utm_campaign: "my utm_campaign",
   }
};
```

[More examples here.](/docs)

### Additional

Minified snippet example:

```
<script type="text/javascript">
  !function(){
    var e={
      partner:"raiffeisen_neuulm",
      params:{
         utm_source:"my utm_source",
         utm_medium:"my utm_medium",
         utm_campaign:"my utm_campaign"
      }
   },
   t=document.createElement("script");t.type="text/javascript",t.src="https://sdk.nebenan.de/npm/nebenan-iframe-sdk/"+(e.v||"latest")+"/main.js",t.onload=function(){var t=t||!1;document.addEventListener("readystatechange",function(){t||(new GoodHoodSDK(e).init(),t=!0)})},document.getElementsByTagName("head")[0].appendChild(t)}();
</script>
````  

### CDN Links
- Latest deployed https://sdk.nebenan.de/npm/nebenan-iframe-sdk/latest/main.js (+style.css)
- Specific version: https://sdk.nebenan.de/npm/nebenan-iframe-sdk/1.0.0/main.js (+style.css)
