# DevOpsHW1
Provisioning of servers using Digital Ocean and AWS, automatic creation of inventory file and creating a ansible playbook that can deploy a simple nginx webserver.

# Provisioning of Servers

The provisioning of servers has been done using the following service providers:
- Digital Ocean
- Amazon Web Services(AWS)

The file createDigitalOceanDroplet.js creates a Digital Ocean droplet by the name adtelharDropletDevops. The file awsInstance.js
creates a EC2 instance(t1.micro).

# Provisioning using Digital Ocean
## The following steps need to be followed in order to create a droplet with digital ocean:
- Create a ssh key with ssh-keygen -t rsa and setup the keys in ~/.ssh(which is the default location) for ssh access to the droplet.
Use the same public key(or create a new key with the same value) with your digital ocean account. These keys are required later when
ansible is used.
- Once the keys are setup, run npm install to ensure that all the dependencies are updated in the packate.json file.
- Run the command $nodejs createDigitalOceanDroplet.js
- This should create a Digital Ocean droplet by the name adtelharDropletDevops.
- After the droplet is up and running, the IP address of the droplet will be fetched and printed on the console.

## Updating the inventory file:

Once we run createDigitalOceanDroplet.js, a file called 'inventory' will get created and will contain the following entry:
node0 ansible_ssh_host="IP_ADDRESS_OF_DROPLET" ansible_ssh_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa

# Provisioning using Amazon Web Services(AWS)
##The following steps need to be followed in order to create a EC2 instance with AWS:
- After signing up for AWS we can create a key pair(which is named AssignmentKey.pem in this case) and save it. This .pem file will be used for authentication while sshing into the EC2 instance.
- Once the keys are setup, the aws-sdk for Javascript needs to be setup.
-  Run npm install aws-sdk to update dependencies and to ensure that the sdk is setup.
-  After setting up the sdk, run the command $nodejs awsInstance.js to create an EC2 instance. It does take some time to create the instance after which the public IP address of the instance will be printed out.

## Updating the inventory file:
- Once we run awsInstance.js, a file called 'inventory' will get updated and have the following line appended to it:
node1 ansible_ssh_host="IP_ADDRESS_OF_EC2_INSTANCE" ansible_ssh_user=ec2-user ansible_ssh_private_key_file=AssignmentKey.pem
- Here, AssignmentKey.pem is the name of the pem file which is used for authentication while sshing into the EC2 instance.









