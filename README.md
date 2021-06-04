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
    - Create new file with name 'cameraserver.js' and 'cameraclient.html'
        "touch cameraserver.js cameraclient.html"
    - Edit 'cameraserver.js' using nano or vi, copy and paste the cameraserver.js in CameraServer folder in this repo
        "vi cameraserver.js"
    - Edit 'cameraclient.html' using nano or vi, copy and paste the cameraclient.html in CameraServer folder in this repo
        "vi cameraclient.html"
    - Install some library that we use for this project
        "npm install --save express"
        "npm install --save ws"
        "npm install --save path"

3. Coding ESP32 Cam Module for CameraClient :
    - We can buy ESP 32 Cam Module like this (https://www.tokopedia.com/mechatron/esp32-cam-esp-32-esp-32-wifi-bluetooth-face-recognition-camera-ov2640)
    - We need FTDI programmer upload code in ESP32 Cam Module like this (https://www.tokopedia.com/mechatron/usb-to-ttl-serial-industrial-grade-uart-ftdi-ft232-ft232rl-ft-232)
    - Wiring the ESP 32 Cam Module and FTDI programmer like this (https://www.geekering.com/categories/embedded-sytems/esp32/ricardocarreira/esp32-cam-board-how-to-begin-and-blink-a-led/)
    Pin to connect
    FTDI | ESP32 Cam Module
    GND - GND
    Vcc - 5V
    Rx - U0T
    Tx - U0R
    Jumper IO0 and GND in ESP 32 Cam Module
    - Connect the FTDI with your PC
    - Open Arduino IDE, Go to 'File' > ' Preferences', paste this
        "https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json"
    in Additional Board Manager URLs
    - Go to 'Tools' > 'Board Manager', type "ESP 32" and install from Espressif Systems
    - Look at 'Board' in 'Tools', choose 'ESP32 Arduino > 'AI Thinker ESP32-Cam'
    - Choose the Port that available
    - Install websocket library for arduino at 'Library Manager' in 'Tools', type 'ArduinoWebsockets' and install that
    - Go to 'File' > 'Open", Open the CameraClient folder in this repo, open the 'CameraClient.ino'
    - Change the ssid and password with wifi ssid and password that you want to use for this project
    - Change the websocket_server_host with VM external ip address 'streamsg' in your GCP
    - Upload your code to the board
    - Unplug the jumper IO0 and GND
    - Press restar button in ESP32 Cam Module

4. Connect CameraClient to CameraServer :
    - After success following step 2 about "Deploy Node.js CameraServer in VM", run the Node.js server
        "sudo node cameraserver.js"
    - In Arduino IDE, open serial monitor and change the baud rate to 115200. Wait for confirmation "WebSocket connected" if not connected, check your ssid and password
    - Open the cameraclient.html in your browser, (example: 34.126.131.88/cameraclient)
    - CCTV Prototype connected and ready for further proccess in Machine Learning

For the reference we can watch https://youtu.be/CpIkG9N5-JM to visualize the step by step above.