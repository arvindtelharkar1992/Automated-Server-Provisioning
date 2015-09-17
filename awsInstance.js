/*
Reference : http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
*/

var AWS = require('aws-sdk');

AWS.config.accessKeyId=process.env.AWS_ACCCESS_KEY_ID;
AWS.config.secretAccessKey=process.env.AWS_SECRET_ACCCESS_KEY;

AWS.config.update({'region':'us-east-1'});

var ec2 = new AWS.EC2();

var id;

var params = {
  ImageId: 'ami-1624987f', // Amazon Linux AMI x86_64 EBS
  InstanceType: 't1.micro',
  KeyName : 'AssignmentKey',
  MinCount: 1,
  MaxCount: 1
};

// Create the instance

ec2.runInstances(params, function(err, data) {
  if (err) { console.log("Could not create instance", err); return; }

  var instanceId = data.Instances[0].InstanceId;
  
  id=instanceId;

  console.log("Created instance", instanceId);

  // Add tags to the instance
  params = {Resources: [instanceId], Tags: [
    {Key: 'Name', Value: 'instanceName'}
  ]};
  ec2.createTags(params, function(err) {
    console.log("Tagging instance", err ? "failure" : "success");
  });

  params = {InstanceIds : [id]};

  setTimeout(function(){

ec2.describeInstances(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
      var publicIP = '"'+data.Reservations[0].Instances[0].PublicIpAddress+'"';
      console.log(publicIP);           // successful response
      var fs = require('fs');
      fs.appendFileSync('inventory','[aws]\nnode1 ansible_ssh_host='+publicIP+' ansible_ssh_user=ec2-user ansible_ssh_private_key_file=AssignmentKey.pem', encoding='utf8');
    }
});

},20000);    

});






