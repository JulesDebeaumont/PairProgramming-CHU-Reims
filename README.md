# Pair Programming
Application developed as part of a technical interview at the University Hospital of Reims.
  
### 🔧 1 - Installation 

- Run `git init`
- Clone the project
- In the Front/ directory, run `npm install`
- In the Back/ directory, run `composer install`
- Still in the Back/ directory, create and set up a .env file for the database connexion

  
### 🚀 2 - Launch the servers

- Launch your database
- In the Back/ directory, run `php artisan serve`
- Still in the Back/ directory, run `php artisan mirgrte:fresh --seed`
- In the Front/ directory, run `npm run start`

  
### 📎 3 - Misc

- Reset DB and load seeders (Back/): `php artisan mirgrte:fresh --seed`
