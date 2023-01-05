import { importManager } from "rollup-plugin-import-manager";
import terser from "@rollup/plugin-terser";

const selectiveTerser = terser({
    output: {
        comments: (node, comment) => {
            const text = comment.value;
            const type = comment.type;
            if (type === "comment2") {
                return !(/BaseEx\|\w+/).test(text) && (/@license/i).test(text);
            }
        }
    },
});


const makeBuild = (name, plugins) => {
    return {
        input: "src/sha-obj.js",

        output: [ 
            {   
                format: "iife",
                name: "SHAObj",
                file: `dist/${name}.iife.js`
            },
            {   
                format: "iife",
                name: "SHAObj",
                file: `dist/${name}.iife.min.js`,
                plugins: [selectiveTerser]
            },
            {   
                format: "es",
                name: "SHAObj",
                file: `dist/${name}.esm.js`
            },
            {   
                format: "es",
                name: "SHAObj",
                file: `dist/${name}.esm.min.js`,
                plugins: [selectiveTerser]
            },
        ],

        plugins: plugins
    };
};

const builds = [];
// build with base-ex included
builds.push(makeBuild(
    "sha-obj-bex", 
    [
        importManager({
            units: [
                {
                    file: "**/sha-obj.js",
                    module: "base-ex",
                    actions: {
                        select: "module",
                        rename: "../node_modules/base-ex/src/base-ex.js"
                    }
                }
            ]
        })
    ]
));

// build without base-ex
builds.push(makeBuild(
    "sha-obj", 
    [
        importManager({
            units: [
                {
                    file: "**/sha-obj.js",
                    module: "base-ex",
                    actions: "remove"
                }
            ]
        })
    ]
));


export default builds;
