
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";
import micromatch from "micromatch";

export const imageSizePlugin = ({
    entries = "*",
    extensions = ["png", "jpg", "jpeg", "gif", "webp", "svg"],
    outputDir = "images",
    trait = _=>_
} = {})=>{
    return {
        name: "image-size",
        setup(build) {
            const filter = new RegExp(`\\.(${extensions.join("|")})$`, "i");
            const outdir = path.join(build.initialOptions.outdir || "", outputDir);
            const root = process.cwd();

            build.onLoad({ filter }, async (args) => {
                const filePath = args.path;
                const fileName = path.basename(filePath);
                const outputFile = path.join(outdir, fileName);
                const filePathRel = path.relative(root, filePath).replace(/\\/g, "/");

                if (!micromatch.isMatch(filePathRel, entries)) { return; }

                const buffer = fs.readFileSync(filePath);
                const { width, height } = imageSize(buffer);

                if (!width || !height) {
                    throw new Error(`Cannot determine size of image: ${filePath}`);
                }

                // Zkopírujeme obrázek do dist/assets
                await fs.mkdir(outdir, { recursive: true });
                await fs.copyFile(filePath, outputFile);

                const src = path.posix.join("/"+outputDir, fileName);
                const exp = { src, width, height, aspectRatio:width/height};

                return {
                    contents: `export default ${JSON.stringify(trait(exp, buffer) || exp)};`,
                    loader: "js",
                };
            });
        },
    };
}

export default imageSizePlugin;