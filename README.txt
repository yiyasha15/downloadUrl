We can run this node program by downloading node.js or by installing docker.

Steps to install node:

Step1: Install node.js in the pc (windows/mac)
	Link ( https://nodejs.org/en/download/)

Step 2: To ensure node is installed, run
	node -v
it should show the node version.

Step 3: Open terminal and go to the node program directory and run:
	
	npm i axios

	npm i download
	
	npm i node-cron
	
and to run it:
	 
	node filedownload.js


Steps to run docker:

Step1: Install docker in the pc (windows/mac)
	Link ( https://docs.docker.com/get-docker/ )

Step 2: Open terminal and go to the node program directory and run:
	
	docker build -t batch-program .
	
	docker run -i -dp 3000:3000 -v {FILEPATH TO SAVE IMAGES}:/app/images batch-program


example: docker run -i -dp 3000:3000 -v /Users/yiyasha/Desktop/ebm/downloadUrl/images:/app/images batch-program
(where /Users/yiyasha/Desktop/ebm/downloadUrl/images is filepath of the folder where you want to save the images)
