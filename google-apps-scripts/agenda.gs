/*
* onOpen event
*/
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if(ss){
    var menuEntries = [ 
      {name: "Refresca actes", functionName: "getActes"}
    ];
    ss.addMenu("Agenda", menuEntries);
  }
}

function getActes(){
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getDataRange().getValues();
  var i, z, k, l;
  
  var actes = [],
      acte = {};
  
  for(i=1, z=data.length; i<z; i++){
    acte = {};
    for(k=0, l=data[i].length; k<l; k++){
      acte[data[0][k]] = data[i][k];
    }
    actes.push(acte);
  }
  gscache.put("actes", actes);
}

function doGet(e){
  var c = gscache.get("actes");
  var cb = "";
  if(e && e.parameters && e.parameters.callback){
    cb = e.parameters.callback + "(";
  }
  Logger.log(JSON.stringify(c))
  return ContentService.createTextOutput((cb?cb:"")+JSON.stringify(c)+(cb?")":"")).setMimeType(ContentService.MimeType.JAVASCRIPT);
}