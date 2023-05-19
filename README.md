# keyboard-layers-2

Keyboard layers allows you to set keybindings which are specific to one of the infinite quickly switchable keyboard layers.

## How to use it

### Enable keyboard layers

You can add a keybinding which enables specific keyboard layer. To do this, pass your layer name as the command argument in the `layer` prop:

```json
[
  {
    "key": "ctrl+alt+1",
    "command": "keyboardLayers.changeLayer",
    "args": {
      "layer": "my-layer"
    }
  }
]
```

### Disable keyboard layers

To disable keyboard layers, run `keyboardLayers.changeLayer` without arguments:

```json
[
  {
    "key": "ctrl+alt+2",
    "command": "keyboardLayers.changeLayer"
  }
]
```

### Adding layer specific keybindings

You can add keybindings which will work only if some specific layer is active

```json
[
  {
    "key": "j",
    "command": "cursorDown",
    "when": "keyboardLayers.layer == 'my-layer'"
  }
]
```

## Recipes

### Toggle layers with a single keybinding

```json
[
  {
    "key": "ctrl+alt+1",
    "command": "keyboardLayers.changeLayer",
    "args": {
      "layer": "my-layer"
    },
    "when": "keyboardLayers.layer != 'my-layer'"
  },
  {
    "key": "ctrl+alt+1",
    "command": "keyboardLayers.changeLayer",
    "when": "keyboardLayers.layer == 'my-layer'"
  }
]
```

*Almost in the same way, you can implement cyclic walking through layers*

### Keybindings specific to multiple layers

```json
[
  {
    "key": "j",
    "command": "cursorDown",
    "when": "keyboardLayers.layer == 'layer-1' || keyboardLayers.layer == 'layer-2'"
  }
]
```

## Inspiration

Inspired by [RileyMathews/keyboard-layers](https://github.com/RileyMathews/keyboard-layers)

### Notable changes

- Significantly reduced CPU load
- Switching layers is done lightning fast
- Removed unnecessary keybindings, so you can add and use your own
- Removed the indication by changing the color theme in favor of the status bar indicator
- Added support for adding as many layers as you wish
