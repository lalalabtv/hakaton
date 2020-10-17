import PdfPrinter from 'pdfmake';
import * as fs from "fs";


var fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};

var printer = new PdfPrinter(fonts);

export default {
    
}
