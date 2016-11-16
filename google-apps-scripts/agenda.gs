var ss = SpreadsheetApp.getActiveSpreadsheet();

/*
* onOpen event
*/
function onOpen() {
  if(ss){
    var menuEntries = [ 
      {name: "Refresca actes", functionName: "getActes"}
    ];
    ss.addMenu("Agenda", menuEntries);
  }
}

function getActes(){
  var data = ss.getSheets()[0].getDataRange().getValues();
  var missatge = ss.getSheets()[1].getDataRange().getValues();
  
  var i, z, k, l;
  
  var dadesJSON = {
        "actes" : [],
        "missatge" : ""
      },
      acte = {};
  
  if(missatge.length){
    dadesJSON.missatge = missatge[0][0];
  }
  
  var currentData = new Date();
  
  for(i=1, z=data.length; i<z; i++){
    acte = {};
    for(k=0, l=data[i].length; k<l; k++){
      acte[data[0][k]] = data[i][k];
      if(data[0][k]==="data"){
        acte["proper"] = (currentData<data[i][k]?true:false);
      }
    }
    dadesJSON.actes.push(acte);
  }
  gscache.put("actes", dadesJSON);
}

function doGet(e){
  var c = gscache.get("actes");
  var cb = "";
  if(e && e.parameters && e.parameters.callback){
    cb = e.parameters.callback + "(";
  }
  return ContentService.createTextOutput((cb?cb:"")+JSON.stringify(c)+(cb?")":"")).setMimeType(ContentService.MimeType.JAVASCRIPT);
}