const vscode = require('vscode')

// SECTION Types

/** @typedef {ReadonlyArray<Json>} JsonArray */

/** @typedef {{ readonly [key: string]: Json | undefined }} JsonRecord */

/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */

// SECTION Library

/** @type {(data: unknown) => data is ReadonlyArray<any>} */
const isArray = data => Array.isArray(data)

// SECTION Constants

const extensionName = 'keyboardLayers'

const register = vscode.commands.registerCommand

/** @type {(name: string) => string} */
const command = name => `${extensionName}.${name}`

/** @type {(layer: string) => string} */
const statusText = layer => `-- LAYER ${layer.toUpperCase()} ACTIVE --`

/** @type {(layer: string | undefined) => Thenable<void>} */
const setContext = layer => vscode.commands.executeCommand('setContext', `${extensionName}.layer`, layer)

// SECTION State

const statusItem = vscode.window.createStatusBarItem()

/** @type {string | undefined} */
let currentLayer

// SECTION Utils

/** @type {(name: string, handler: () => void, context: vscode.ExtensionContext) => void} */
const registerCommand = (name, handler, context) => {
	const disposable = register(command(name), handler)
	context.subscriptions.push(disposable)
}

/** @type {(layer: string) => void} */
const enableStatusItem = layer => {
	statusItem.text = statusText(layer)
	statusItem.show()
}

const disableStatusItem = () => {
	statusItem.hide()
}

// SECTION Commands

/** @type {(args?: Json) => Promise<void>} */
const changeLayer = (args) => {
	if (false
		|| args === undefined
		|| typeof args !== 'object'
		|| args === null
		|| isArray(args)
		|| !('layer' in args)
	) { return disable() }

	const { layer } = args

	if (false
		|| typeof layer !== 'string'
		|| layer === ''
	) { return disable() }

	return enable(layer.toLowerCase())
}

/** @type {(layer: string) => Promise<void>} */
const enable = async layer => {
	if (layer !== currentLayer) {
		currentLayer = layer
		await setContext(layer)
		enableStatusItem(layer)
	}
}

/** @type {() => Promise<void>} */
const disable = async () => {
	if (currentLayer !== undefined) {
		currentLayer = undefined
		await setContext(undefined)
		disableStatusItem()
	}
}

// SECTION Exports

/** @type {(context: vscode.ExtensionContext) => void} */
const activate = context => {
	registerCommand('changeLayer', changeLayer, context)
}

const deactivate = () => {}

module.exports = { activate, deactivate }
