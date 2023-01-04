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


export default {
    input: "src/sha-obj.js",
    output: [ 
        {   
            format: "iife",
            name: "SHAObj",
            file: "dist/SHAObj.iife.js"
        },
        {   
            format: "iife",
            name: "SHAObj",
            file: "dist/SHAObj.iife.min.js",
            plugins: [selectiveTerser]
        },
        {   
            format: "es",
            name: "SHAObj",
            file: "dist/SHAObj.esm.js"
        },
        {   
            format: "es",
            name: "SHAObj",
            file: "dist/SHAObj.esm.min.js",
            plugins: [selectiveTerser]
        },
    ]
};
