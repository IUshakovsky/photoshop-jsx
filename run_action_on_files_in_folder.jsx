// Script performing photoshop action for every file in a folder recursively

app.displayDialogs = DialogModes.NO;        

var folderName = "/Users/guest/folder";
var actionSet = "My actions.atn";
var actionName = "My_action";

processFolder(folderName);  

function processFolder(path)  
{  
     var folder = new Folder(path);  
  
     var files = folder.getFiles();  
  
     for (var i = 0; i <files.length; i++)  
     {  
          var name = files[i].name
          if ( name.substring(0,1) != '.' )  {
               if (files[i] instanceof File)   
               {   
                    app.open( new File( files[i] ) );  
                    app.doAction (actionName, actionSet);
                    app.displayDialogs = DialogModes.NO; 
                    app.activeDocument.close(SaveOptions.SAVECHANGES);  
               }  
               else  
               {  
                    processFolder(files[i]);  
               }  
          }
     }  
}  
  

 