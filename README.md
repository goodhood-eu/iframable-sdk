# Nebenan.de iframe SDK

### Example of usage:

1. Add `<script src="https://nebenan.de/iframe/main.js"></script>` before `</head>` of each page where you want to show
   our Iframe
2. Add a small JS-snippet before `</body>`

```
<script type="text/javascript">
  function _initNebenan () {
    if (!_nebenan_initialized) {
      Window.NebenanInit(_nebenan_widget_config);
      _nebenan_initialized = true;
    }
  }

  // *** YOUR CONFIG HERE ***
  var _nebenan_widget_config = {
    utm: {
        utm_source: "my utm_source",
        utm_medium: "my utm_medium",
        utm_campaign: "my utm_campaign",
    }
  };
  var _nebenan_initialized = _nebenan_initialized || false;

  document.addEventListener('readystatechange', _initNebenan);
</script>
```

3. Add `<div id="nebenan-widget"></div>` to the place where you want to inject our iframe

### Config

Currently `_nebenan_widget_config` supports only `utm` key with wey-value object. All key-value pairs will be added as a
search params to iframe links (post links, logo, CTA);

**Example:**
```
var _nebenan_widget_config = {
  utm: {
    utm_source: "my utm_source",
    utm_medium: "my utm_medium",
    utm_campaign: "my utm_campaign",
  }
};
```

### Additional

Minified snippet:
```
<script type="text/javascript">
  var _nebenan_widget_config = {
    utm: {
      utm_source: "my utm_source",
      utm_medium: "my utm_medium",
      utm_campaign: "my utm_campaign",
    }
  };

  function _initNebenan(){_nebenan_initialized||(Window.NebenanInit(_nebenan_widget_config),_nebenan_initialized=!0)}var _nebenan_widget_config=_nebenan_widget_config||{},_nebenan_initialized=_nebenan_initialized||!1;document.addEventListener("readystatechange",_initNebenan);
</script>
```
