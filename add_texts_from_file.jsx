// Script to add texts from file to text layer named 'L_text'
// and saving result images to destination folder.
// New image is created for each line in source file.
//
// File params4jsx.txt should contain parameters separated by semicolon:
// 1 - file with numbered lines of text content;
// 2 - destination root folder path;
// 3 - id to be included in each result file name;
// 4 - folder name in root folder;
//
// PS template should contain text layer named 'L_text'.


var par_file = new File("/Users/IUshakovsky/Projects/Stokar/psjs/params4jsx_txt.txt"); //file with parameters

function main() {
    try {
        var lr_text = app.activeDocument.artLayers.getByName("L_text");
    } catch (e) {
        alert("Text layer L_text not found. Sorry...");
    }

    var params_str = read_file(par_file);
    if (params_str) {
        var params_array = params_str.split(';');
        if (params_array.length == 4) {
            var file_cont_name = params_array[0]
            var folder = params_array[1]
            var src_id = params_array[2]
            var folder_id = params_array[3]
        }
    }
    else {
        alert('Wrong params!')
    }

    if (lr_text.kind == 'LayerKind.TEXT') {
        var t_item = lr_text.textItem;
        file_cont = new File(file_cont_name)
        var file_str = read_file(file_cont)
        var file_array = file_str.split('\n');
        var folder_path = folder + "/" + folder_id
        var img_file;
        var content_id;
        var i;
        var prefix;
        for (i = 0; i < file_array.length; i++) {
            app.displayDialogs = DialogModes.NO;
            if (file_array[i]) {
                t_item.contents = (file_array[i].substring(file_array[i].indexOf(" ") + 1) );
                content_id = file_array[i].substring(0, file_array[i].indexOf(" "))
                prefix = Math.random().toString().substring(2,8)
                img_file = prefix + "_" + src_id + "_" + folder_id + "_" + content_id;
                save_file(img_file, folder_path);
            }
        }
    } else {
        alert("Wrong layer kind");
    }
}

function save_file(name, outputFolder) {
    var jpegOptions = new JPEGSaveOptions();
    jpegOptions.quality = 10;
    app.displayDialogs = DialogModes.NO;
    app.activeDocument.saveAs(new File(outputFolder + "/" + name + ".jpg"), jpegOptions);
    app.displayDialogs = DialogModes.ALL;
}

function read_file(file_) {
    file_.open('r');
    var str = file_.read();
    return str;
}

main() 