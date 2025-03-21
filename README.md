# @randajan/esbuild-plugin-image-size

[![NPM](https://img.shields.io/npm/v/@randajan/esbuild-plugin-image-size.svg)](https://www.npmjs.com/package/@randajan/esbuild-plugin-image-size) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## 🚀 Features
✅ **Extracts image metadata** (`width`, `height`, `aspectRatio`)  
✅ **Generates an importable object** when using images in ESBuild  
✅ **Supports file filtering** using `entries` (like `.gitignore`)  
✅ **Works on all platforms** (Windows, Linux, macOS)  
✅ **Optimized for performance** – filters files directly in `onLoad`  

---

## 📦 Installation
```sh
npm install esbuild-plugin-image-meta --save-dev
```

---

## 📌 Usage
### 🖼 Importing an image
```js
import image from "./assets/photo.jpg";

console.log(image);
/*
{
  src: "/images/photo.jpg",
  width: 1920,
  height: 1080,
  aspectRatio: 1.777
}
*/
```

---

### 🔧 Configuration
You can configure the plugin with the following options:

```js
import esbuild from "esbuild";
import imageSizePlugin from "esbuild-plugin-image-meta";

esbuild.build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outdir: "dist",
    plugins: [
        imageSizePlugin({
            entries: ["src/images/**", "!src/excluded/**"], // Filter files
            extensions: ["png", "jpg"],                    // Allowed image types
            outputDir: "assets",                           // Output directory
            trait: (meta, buffer) => ({                    // Modify metadata (optional)
                ...meta,
                size: buffer.byteLength
            })
        })
    ]
}).catch(() => process.exit(1));
```

---

## 🎯 Options
| Option      | Type               | Default                    | Description |
|------------|------------------|--------------------------|-------------|
| `entries`  | `string | string[]` | `"*"` (process all)       | Defines which images should be processed (supports glob patterns). |
| `extensions` | `string[]` | `["png", "jpg", "jpeg", "gif", "webp", "svg"]` | Specifies which image types to process. |
| `outputDir` | `string` | `"images"` | Defines where processed images are stored in the output directory. |
| `trait` | `(meta, buffer) => object` | Identity function | Allows modifying the export object before bundling. |

---

## 📌 Example with Custom Metadata
If you want to **add the file size** to the exported object:
```js
imageSizePlugin({
    trait: (meta, buffer) => ({
        ...meta,
        size: buffer.byteLength
    })
});
```

Would generate:
```js
{
  src: "/images/photo.jpg",
  width: 1920,
  height: 1080,
  aspectRatio: 1.777,
  size: 345678
}
```

---

## 📄 License
MIT © [Your Name](https://github.com/yourname)

---

🔥 **Now your ESBuild pipeline automatically processes images and gives you structured metadata!** 🚀
