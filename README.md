# GROIW Plugin template for script

This is a template for creating a GROWI script plugin.

## Usage

### Download or folk this repository.

```bash
git clone git@github.com:goofmint/growi-plugin-script-template.git
```

### Change the name of the plugin in package.json.

```js
{
  "name": "growi-plugin-script-template",  // Change this name
  "version": "1.0.0",
  "description": "GROWI plugin template for script", // Change this description
	:
}
```

### Edit those files

Of course, you can add or remove files as you like.

- client-entry.tsx
- src/Hello.tsx
- src/Hello.css
- src/Demo.tsx

### Preview the plugin

```bash
yarn dev
```

### Build the plugin

```bash
yarn build
```

## Publish the plugin at GROWI

Add a topic `growi-plugin` on your GitHub repository.

Then, you can see your plugin on the GROWI plugin list page below.

https://growi.org/plugins

## License

MIT

