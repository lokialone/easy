import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
export default {
    input: './src/index.js',
    output: {
        format: 'umd', // 模块化类型
        file: 'dist/umd/vue.js',
        name: 'Vue', // 打包后的全局变量的名字
        sourcemap: true,
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        process.env.ENV === 'development'
            ? serve({
                  open: true,
                  openPage: '/public/index.html',
                  port: 3000,
                  contentBase: '',
              })
            : null,
        process.env.ENV === 'development' ? livereload() : null,
    ],
};
