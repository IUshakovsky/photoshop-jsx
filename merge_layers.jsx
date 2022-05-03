// Script to merge all files as layers in a folder and save resulting image.
// File 'bg.png' is used as a background with blending mode Normal.
// All other files are added with blending mode Screen.
// Text file with parameters:
// - destination folder;
// - shape_id - paramater to be added to resulting file name;
// - cs_id - paramater to be added to resulting file name;

var src_folder_path = "../wdir"
var par_file_path = "../params.txt"

function main() {
    var par_file = new File(par_file_path);
    var params_str = read_file(par_file);
    if (params_str) {
        var params_array = params_str.split(';');
        if (params_array.length == 3) {
            var result_folder = params_array[0];
            var shape_id = params_array[1];
            var cs_id = params_array[2];
        }
    }
    else {
        alert('Wrong params!');
    }

    var fileArray = new Array();
    var folder = new Folder(src_folder_path);
    var docs = folder.getFiles();
    var len = docs.length;
    var bg_file;
	for (var i = 0; i < len; i++) {
		var doc = docs[i];

		if (doc instanceof File) {
            if (doc.name.substring(0, 1) != "."  ){ 
				if ( doc.name != 'bg.png' ) {
                	fileArray.push(doc); 
                } else {
                    bg_file = doc;
                }	
			}			
		}
	}
	
	app.displayDialogs = DialogModes.NO;
    var new_doc = documents.add(100, 100, 300, 'Done', NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1);
	var new_layer = new_doc.activeLayer;

    // add bg layer
    add_layer(new_doc, bg_file, BlendMode.NORMAL)

	// loop through all files in the source folder
	for (var i = 0; i < fileArray.length; i++) {
		var file = fileArray[i];
        add_layer(new_doc, file, BlendMode.SCREEN);
    }	

	new_layer.remove();
	new_doc.revealAll();
	new_doc.trim(TrimType.TRANSPARENT, true, true, true, true);
	new_doc.mergeVisibleLayers();
	var prefix = Math.random().toString().substring(2,8);
	var img_file = prefix + "_" + shape_id + "_" + cs_id;
	save_file(img_file, result_folder);
	new_doc.close(SaveOptions.DONOTSAVECHANGES);
}

function add_layer(new_doc, file, blend_mode){
	var doc = open(file);
	var name = doc.name;

	doc.changeMode(ChangeMode.RGB);
	doc.bitsPerChannel = BitsPerChannelType.EIGHT;
	doc.artLayers.add( );
	doc.mergeVisibleLayers();

	var layer = doc.activeLayer;
	layer.name = name;
    layer.blendMode = blend_mode; 
	layer.duplicate(new_doc, ElementPlacement.PLACEATBEGINNING);

	doc.close(SaveOptions.DONOTSAVECHANGES);
}

function save_file(name, outputFolder) {
    var jpegOptions = new JPEGSaveOptions();
    jpegOptions.quality = 12;
    app.displayDialogs = DialogModes.NO;
    app.activeDocument.saveAs(new File(outputFolder + "/" + name + ".jpg"), jpegOptions);
}

function read_file(file_) {
    file_.open('r');
    var str = file_.read();
    return str;
}

main();