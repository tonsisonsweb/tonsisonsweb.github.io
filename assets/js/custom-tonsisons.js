$(document).ready(function(){

	var home = $("body.home").size();
	var concerts = $("body.concerts").size();

	//AGENDA
	if(home>0 || concerts>0){
		$.getJSON("https://script.google.com/macros/s/AKfycbzZOx7mACKIaUx0tyWQNMA_g8WiAjmClupRKgR5LnKeampZ2EI/exec?callback=?", function(data){
			var noms_mesos = ["GEN","FEB","MAR","ABR","MAI","JUN","JUL","AGO", "SEP","OCT","NOV","DES"]
			if(home>0){
				var acte = data.actes.filter(function(item){
					if(item.home.toLowerCase()==="s"){
						return true;
					}
					return false;
				});

				if(acte && acte.length>0){
					var _data = new Date(acte[0].data);
					$("<table><tbody><tr><td class='celadata'><span class='celadata'><span class='celadia'>"+('0'+_data.getDate()).slice(-2)+"</span><span class='celames'>"+noms_mesos[_data.getMonth()]+"</span><span class='celaany'>"+_data.getFullYear()+"</span><span class='celahora'>"+acte[0].hora+"</span></span></td><td><b>"+acte[0].poblacio+"</b></td><td>"+acte[0].titol+"</td><td><a href='"+acte[0].maps+"' target='_blank'>"+acte[0].equipament+"</a></td></tr></tbody></table>").appendTo($(".proper-concert"));
				}
			}else{
				var currentDate = new Date();
				var stb_propers = [];
				var stb_anteriors = [];
				var _data;
				for(var i=0,z=data.actes.length;i<z;i++){
					_data = new Date(data.actes[i].data);
					if(data.actes[i].proper){
						stb_propers.push("<tr><td class='celadata'><span class='celadata'><span class='celadia'>"+('0'+_data.getDate()).slice(-2)+"</span><span class='celames'>"+noms_mesos[_data.getMonth()]+"</span><span class='celaany'>"+_data.getFullYear()+"</span><span class='celahora'>"+data.actes[i].hora+"</span></span></td><td><b>"+data.actes[i].poblacio+"</b></td><td>"+data.actes[i].titol+"</td><td><a href='"+data.actes[i].maps+"' target='_blank'>"+data.actes[i].equipament+"</a></td></tr>");
					}else{
						stb_anteriors.push("<tr><td class='celadata'><span class='celadata'><span class='celadia'>"+('0'+_data.getDate()).slice(-2)+"</span><span class='celames'>"+noms_mesos[_data.getMonth()]+"</span><span class='celaany'>"+_data.getFullYear()+"</span><span class='celahora'>"+data.actes[i].hora+"</span></span></td><td><b>"+data.actes[i].poblacio+"</b></td><td>"+data.actes[i].titol+"</td><td><a href='"+data.actes[i].maps+"' target='_blank'>"+data.actes[i].equipament+"</a></td></tr>");
					}
				}	

				if(stb_propers.length>0){
					$("<table><tbody>"+stb_propers.join('')+"</tbody></table>").appendTo($(".propers-concerts"));
				}else{
					$(".propers-concerts-h").css("display", "none");
				}

				if(stb_anteriors.length>0){
					$("<table><tbody>"+stb_anteriors.join('')+"</tbody></table>").appendTo($(".anteriors-concerts"));
				}else{
					$(".anteriors-concerts-h").css("display", "none");
				}
			}
		});
	}

});