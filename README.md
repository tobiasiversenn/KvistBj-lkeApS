CDS.security – Submission requirements

To run the program 
Install docker desktop and in the project root directory (KvistBjælkeApS) open the terminal and type docker compose up --build

Your submission must include:
1.	Description of the developed login platform.
The login platform includes a platform where the user enters a username and password and then the user is redirected to either the page for users, admins or superusers depending on whether the login is from a user, superuser or admin. The user must log in with a valid username and password in order to access these pages.
You can login to the application with the following accounts to test the application:

<br> Username: "James" 
<br> Password: "password"
<br> Role: User

<br> Username: "Kyle"
<br> Password: "password"
<br> Role: Superuser

<br> Username: "Xenia"
<br> Password: "password"
<br> Role: Admin

Whenever you close the program, the database resets so that these accounts can be used to log in to the system again in case they were deleted under the administration panels in the program. Additional accounts with the ability to log in to the program can be found in the Program.cs file under the API project.
The GUI to the application of the loginpage, userpage, adminpage and superuserpage looks as follows: 
Loginpage: 
<img width="2559" height="1264" alt="image" src="https://github.com/user-attachments/assets/b0b81b92-5b98-4709-8348-cca1e1a126a8" />

Userpage: 
<img width="2559" height="1262" alt="image" src="https://github.com/user-attachments/assets/1b3f6fee-ea44-4d6a-9297-53fca7b7d829" />

Adminpage: 
<img width="2559" height="1261" alt="image" src="https://github.com/user-attachments/assets/c9167546-d77f-4f1f-8512-79a9d9771e18" />

Superuserpage: 
<img width="2559" height="1256" alt="image" src="https://github.com/user-attachments/assets/d666bcf8-ee9c-4588-8054-b9ec810073cb" />



3. Documentation of the implemented security features, together with alternatives you find
along the way.

The login platform includes security features such as authorization, authentication, password hashing and token generation. 
Authentication is used to check that when a user logs in, then the users username and password should match an exisiting user found in the database.

<img width="1055" height="293" alt="image" src="https://github.com/user-attachments/assets/331a0e65-63dd-4b70-8d54-f2ea7737227d" />
This is used for example here in the LoginController. If no user is found with that username and password, then the program returns Unauthorized which means the login wasn't a successful login

Authorization is used so only users with the right roles should be able to access specific pages. For example if you log in to the application with a user account, then you are not able to access the admin page, since you have only the User role and not the admin role.
This is used in all the backend controller endpoints. For example, at the top of the admin controller, there is this setting 

<img width="239" height="30" alt="image" src="https://github.com/user-attachments/assets/74eee964-6690-4ad5-9c69-70ee00618e07" />

This does so the user must have the admin role in order to access this.


Password hashing is used so users passwords are not stored as plain text in the database, but instead they are hashed. This is great so if the database gets compromised then all the passwords will not be directly available, they will instead be in a different format so they are useless information for the person that gains access to the database.
When retrieving all the usernames and passwords from the database, you can see that the passwords are hashed. The passwords are hashed in the way that they are concatenated by a hash and a salt. The part before the "." in the passwordhash is the hash and the part after the "." is the salt.
<img width="590" height="350" alt="image" src="https://github.com/user-attachments/assets/ccd642d6-4e8c-46da-bae1-c73f49911548" />

When a user is registered, their password is also hashed. It happens in this code: 
<img width="650" height="159" alt="image" src="https://github.com/user-attachments/assets/456bfaad-92c2-4356-8505-d24776bf5087" />

This image is from the userQueriesController in the backend. It calls the HashAndSaltPassword(string password) method from the Argon2PasswordHasher class which will hash and salt the password. The Argon2PasswordHasher code looks like this for that method: 

<img width="567" height="134" alt="image" src="https://github.com/user-attachments/assets/348685e0-536f-4fc8-9dc5-01df767e7c2c" />
<img width="603" height="330" alt="image" src="https://github.com/user-attachments/assets/cee1beb7-4804-467b-af09-34ba299c6d4e" />

Password hashing is also used when a user logs in via the login platform. The program stores the password that the user enters via the login platform and then finds the stored password hash for that user in the database. It is demonstrated in the screenshot below

<img width="1050" height="285" alt="image" src="https://github.com/user-attachments/assets/96977d50-fb9f-448a-a340-ffee1c43622f" />

After that is done, the code calls a method from the Argon2PasswordHasher to check whether the users password is valid. 

<img width="605" height="300" alt="image" src="https://github.com/user-attachments/assets/d9da0751-80cb-485f-a924-bb40c8351c58" />

What this does is that we split the HashedPassword stored from the database to that user where there is a ".". The "." seperates the hash and salt so we can now store the salt as a variable. We need to do this because we should not call the method to create a new salt because every new salt generated will be random. So we then call HashPassword(password, salt); and store it in a variable string hashedPasswordForGivenPassword. This will hash the password that the user entered and use the salt to the PasswordHash already found in the database for that user. We then check whether the newly Hashed password is the same as the hashed password stored in the database for that user. If it is, we return true, otherwise false. 


Token generation is also used. This does so when a user logs in with valid credentials then they get a token that can be found in the browsers sessionStorage. Tokens are used for many applications worldwide and is a good security feature. 



CDS.infrastructure – Submission requirements
Your submission must include:
1.	IP addressing plan for Kvist & Bjælke ApS.

Ip adress assignment
Division of the company’s network into appropriate logical networks.
Client - VLAN 570 - 10.5.70.0/24
Server - VLAN 571 - 10.5.71/24
Computers - VLAN 572 - 10.5.72/24
Network printers - VLAN 573 - 10.5.73/27
Servers - VLAN 574 - 10.5.74/27
IP Phones - VLAN 575 - 10.5.75/26
Wireless access points - VLAN 576 - 10.5.76/27
Surveillance cameras - VLAN 577 - 10.5.77/27
Network Equipment - VLAN 578 - 10.5.78/24 
Guest devices - VLAN 579 - 10.5.79/24

Static IP addresses: Server, Network printer, Wireless access points, surveillance cameras, servers
DHCP: Client, computers, IP phones, Guest devices 



2.	Brief documentation demonstrating subnetting.
The client and server uses a /24 which gives 254 usable addresses 
The computer uses a /24. The company has 15 desktop computers and 10 laptop computers so 254 usable addresses is a lot but in case the company expands then we have got enough computers/laptops
Network printers uses a /27. This gives 30 usable addresses. The company needs 3 network printers, but in case of company expansion, then we have got enough addresses. 
Servers uses a /27. This gives 30 usable addresses. The company needs 3 servers but again, because of the expansion we have set some extra addresses. 
IP phones uses a /26. This gives 62 usable host addresses. The company needs 12 IP phones, but in case the company expands, then we have got enough host addresses. 

• How are security and infrastructure interconnected?
The two subjects are interconnected in the way that the security subject manages the security of the login platform, by implementing the security features authorization, authentication, password hashing and token generation. The infrastructure subject makes it possible to host the application with Docker and to run the application via Ubuntu Server. 
