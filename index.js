import slib, { argv } from "@randajan/simple-lib";

const { isBuild} = argv;

slib(isBuild, {
    mode: "node",
    lib:{
        minify:false,
    },
    demo:{
        external:["chalk"],
    },
})