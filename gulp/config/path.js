// Получаем имя папки проэкта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());   

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        /********************** */
        html: `${buildFolder}/`,
        /*********************** */  
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        // svg: `${buildFolder}/img/svg/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`
    },
    src: {
        /************************** */
        html: `${srcFolder}/pug/templates/*.pug`,
        /************************** */
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        files: `${srcFolder}/files/**/*.*`
    },
    watch: {
        /************************ */
        html:`${srcFolder}/pug/**/*.pug`,
        /************************ */
        scss: `${srcFolder}/scss/**/*.{scss,sass}`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,icon}`,
        files: `${srcFolder}/files/**/*.*`
    },
    clean:buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `site`
}