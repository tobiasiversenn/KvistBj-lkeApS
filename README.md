CDS.security – Submission requirements
Your submission must include:
1.	Description of the developed login platform.
The login platform includes a platform where the user enters a username and password and then the user is redirected to either the page for users, admins or superusers depending on whether the login is from a user, superuser or admin. The user must log in with a valid username and password in order to access these pages.
You can login to the application with the following accounts to test the application:
<br>
Username: "James"
Password: "password"
Role: User

Username: "Kyle"
Password: "password"
Role: Superuser

Username: "Xenia"
Password: "password"
Role: Admin

Whenever you close the program, the database resets so that these accounts can be used to log in to the system again in case they were deleted under the administration panels in the program. Additional accounts that can log in to the program can be found in the Program.cs file under the API project.




3. Documentation of the implemented security features, together with alternatives you find
along the way.

The login platform includes security features such as authorization, authentication, password hashing and token generation. 
Authorization is used so 
Authentication is used so
Password hashing is used so users passwords are not stored as plain text in the database, but instead they are hashed. This is great so if the database gets compromised then all the passwords will not be directly available, they will instead be in a different format so they are useless information for the person that gains access to the database.
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


3. Network diagram illustrating the company’s proposed infrastructure (optional).
4. Documentation of the Ubuntu Server installation and configuration on VLAN 571.



5. Documentation of the Docker installation and deployment of the login platform.
6. Documentation of the client machine on VLAN 570.
7. Documentation demonstrating communication between the client and the login platform.
8. Brief description of any challenges encountered and how they were resolved. 

