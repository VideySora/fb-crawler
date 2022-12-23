# fb-crawler
### Install Nodejs

1. Check nodejs version
   ```
   node -v
   ```
   Check npm version:

    ```
    npm -v
    ```
2. If you have not installed yet

* Visit https://nodejs.org/uk/blog/release/v16.13.0/ download nodejs
* **Warning: this project uses Nodejs version 16.13.0, any newer version will make the script un-synchronized and the project will not run properly**
* The website provides many installments for different OS along with its source code. Download the corresponding file based on what OS you use. Here I use Windows 64-bit so I download the .msi file (.exe file works for Windows 64-bit too).

  <img width="671" alt="Screenshot 2022-10-26 at 01 44 34" src="https://cdn.discordapp.com/attachments/983155129924603954/1055742494530359327/image.png">
* Double-click the downloaded .msi file to proceed with the installation.

  <img width="483" alt="Screenshot 2022-10-26 at 01 47 46" src="https://cdn.discordapp.com/attachments/983155129924603954/1055744611269750845/image.png">

  <img width="554" alt="Screenshot 2022-10-26 at 01 48 06" src="https://user-images.githubusercontent.com/58254643/197856777-5bd9c8d5-bd18-475f-a5b9-2d7355b3c281.png">

  <img width="554" alt="Screenshot 2022-10-26 at 01 48 18" src="https://user-images.githubusercontent.com/58254643/197856821-737174c6-7fce-4068-bdf2-81b1ad69d235.png">
* Choose the directory to install nodejs (you can leave these as default)

  <img width="555" alt="Screenshot 2022-10-26 at 01 48 27" src="https://user-images.githubusercontent.com/58254643/197856866-f20ca0c7-5407-4730-8698-2194702e599c.png">

  <img width="555" alt="Screenshot 2022-10-26 at 01 48 38" src="https://user-images.githubusercontent.com/58254643/197856903-22cac776-a681-4473-9f35-480999af1a2d.png">

  <img width="556" alt="Screenshot 2022-10-26 at 01 48 49" src="https://user-images.githubusercontent.com/58254643/197856937-e5019d5f-56a4-4bb8-9cb3-413d5210c4d3.png">

  <img width="551" alt="Screenshot 2022-10-26 at 01 48 57" src="https://user-images.githubusercontent.com/58254643/197856970-e0a7d7fc-0bc1-4dd6-b0f3-daa125f7bc72.png">

Okay, that's it, we have installed installed nodejs.

3. Now we need to check the version of nodejs and npm we just installed by opening a cmd window and entering the following 2 commands:

* Check nodejs version:

  ```
  node -v
  ```
* Check npm version:

  ```
  npm -v
  ```
* Result:

  <img width="531" alt="Screenshot 2022-10-26 at 01 37 06" src="https://cdn.discordapp.com/attachments/983155129924603954/1055746360068014090/image.png">

### Run project
1. Install prequesite packages
+ Run "npm install" on both "frontend" and "backend" folder
+ The process might take longer than expected for first time users since it downloads node_modules directly from the web.
+ Once finished it should look like this:

  <img width="671" alt="Screenshot 2022-12-23 at 01 44 34" src="https://cdn.discordapp.com/attachments/983155129924603954/1055747706477359114/image.png">

  <img width="671" alt="Screenshot 2022-12-23 at 01 45 12" src="https://cdn.discordapp.com/attachments/983155129924603954/1055748065379758130/image.png">

2. Run backend
+ On backend folder, type `npm run dev` to start backend

3. Run frontend and login through default account
+ On frontend folder, type `npm start` to start frontend

+ You will be directed to the login page. Use this default account to login.

  ```
  username: admin
  password: admin
  ```
+ And that's it, you can try our website's feature from this point.