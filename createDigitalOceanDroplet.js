/*
Reference : https://github.ncsu.edu/CSC-DevOps-Spring2015/ServersWorkshop/blob/master/main.js
*/
var needle = require("needle");
var os   = require("os");

var config = {};

config.token= process.env.DIGITALOCEANTOKEN;

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

var client = 
{
   createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": "adtelharDropletDevops",
			"region":"nyc1",
			"size":"512mb",
			"image":"ubuntu-14-04-x32",
			// Id to ssh_key already associated with account.
			"ssh_keys":[process.env.DIGITALOCEAN_SSHKEY_ID],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	},
 retrieveDropletIP: function(dropletId, onResponse)
	{
		needle.get("https://api.digitalocean.com/v2/droplets/"+dropletId, {headers:headers}, onResponse)
	}
};

//create a droplet

var name = "adtelharDroplet";
var region = "nyc1"; // Fill one in from #1
var image = "ubuntu-14-04-x32"; // Fill one in from #2


client.createDroplet(name, region, image, function(err, resp, body)
   {
 	console.log(body);
 	// StatusCode 202 - Means server accepted request.
 	if(!err && resp.statusCode == 202)
 	{
       ipAddressOfDroplet = body.droplet.id;
       
       setTimeout(function(){
		    client.retrieveDropletIP(ipAddressOfDroplet,function(error, response){
			var data = response.body;
			var ipAddressOfDroplet = JSON.stringify(data.droplet.networks.v4[0].ip_address);
			console.log(ipAddressOfDroplet);
  			inventoryFile = require('fs');
            inventoryFile.writeFile('inventory','[digitalocean]\nnode0 ansible_ssh_host='+ipAddressOfDroplet+' ansible_ssh_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa\n', function (err){
  	        if (err) return console.log(err);
  	        console.log('inventory file created');
          });
       });
   }, 20000);

}

});

















