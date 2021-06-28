# Nebenan.de iframe SDK

### Example of usage:

1. Add `<script src="https://nebenan.de/iframe/main-1.0.0.js"></script>` before `</head>` of each page where you want to
   show our Iframe
2. Add a small JS-snippet before `</body>`

```
<script type="text/javascript">
   (function (){
    function _initNebenan () {
      if (!_nebenan_initialized) {
        new Nebenan(_nebenan_widget_config).init();
        _nebenan_initialized = true;
      }
    }

    // *** YOUR CONFIG HERE ***
    var _nebenan_widget_config = {
      partner: 'raiffeisen_neuulm',
      host: 'http://localhost:3001',
      utm: {
        utm_source: "my utm_source",
        utm_medium: "my utm_medium",
        utm_campaign: "my utm_campaign",
      }
    };

    var _nebenan_initialized = _nebenan_initialized || false;
    document.addEventListener('readystatechange', _initNebenan);
  })()
</script>
```

3. Add `<div id="nebenan-widget"></div>` to the place where you want to inject our iframe.  
   **Note:** you can change widget wrapper id\class name, but you will have to pass it in config (see `config.selector`)

### Config

`_nebenan_widget_config` support keys:

- `utm`: key-value object. All key-value pairs will be added as a search params to iframe links (*required*)
- `partner`: integration id, (example: `raiffeisen_neuulm`) (*required*)
- `selector`: CSS-selector for wrapper element where iFrame should be appended. Default: `#nebenan-widget`
- `host`: Nebenan URL (default: `https://nebenan.de`)

**Example:**

```
var _nebenan_widget_config = {
   partner: 'raiffeisen_neuulm',
   selector: '.nebenan',
   host: 'https://nebenan.de',
   utm: {
      utm_source: "my utm_source",
      utm_medium: "my utm_medium",
      utm_campaign: "my utm_campaign",
   }
};
```

### Additional

Minified snippet example:

```
<script type="text/javascript">
  !function(){
    var t = {
      partner: 'raiffeisen_neuulm',
      host: 'http://localhost:3001',
      utm: {
        utm_source: "my utm_source",
        utm_medium: "my utm_medium",
        utm_campaign: "my utm_campaign",
      }
    };
    var e=e||!1;document.addEventListener("readystatechange",function(){e||(new Nebenan(t).init(),e=!0)})
  }();
</script>
```
