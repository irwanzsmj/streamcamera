# streamcamera
# Create VM instance in GCP for streamcamera server
How to create CCTV Prototype using ESP32 Cam Module :
1. Creating VM instance in Google Cloud Platform with this parameter :
    - VM Name : streamsg // you can choose another name with your preferences
    - Region : asia-southeast1 // choose the near server region around you for better connection
    - Zone : asia-southeast1-b
    - Machine series : N1
    - Machine type : f1-micro (1 vCPU, 614 MB memory) // we just need small server for stream
    - Boot Disk : Debian GNU/Linux 10 (buster) // you can choose anything for system operation
    - Checklist Allow HTTP traffic & Allow HTTPS traffic

2. Deploy Node.js CameraServer in VM :
    - Connect to 'streamsg' using SSH in GCP
    - Create new directory 'CameraServer' or something else
        "mkdir dirname"
    - Go to 'CameraServer' directory
        "cd dirname"
    - Install Node.js and npm from NodeSource
        "curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -"
        "sudo apt install nodejs"
    - Check the Node.js and NPM version in your VM
        "node -v"
        "npm -v"
    - Create new file with name 'server.js' and 'client.html'
        "touch server.js client.html"
    - Edit 'server.js' using nano or vi, copy and paste the server.js in CameraServer folder in this github
        "vi server.js"
    - Edit 'client.html' using nano or vi, copy and paste the client.html in CameraServer folder in this github
        "vi client.html"
    - Install some library that we use for this project
        "npm install --save express"
        "npm install --save ws"
        "npm install --save path"