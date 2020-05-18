Steps to run the app


For UI
Inside the zogato/UI folder, run : 
npm install
npm run

For Backend

Inside zogato/BACKEND folder, run :
1.Create a virtual environment: 
virtualenv venv
2. Activate the virtual environment
For(ubuntu/mac): source venv/bin/activate
3. Install the requirements using:
pip3 install -r requirements.txt
4. Fill in the details for the Database Specification in zogato/BACKEND/zogato/zogatoapp/config.py file
5. Inside zogato/BACKEND/zogato folder,to start the django server run :
python3 manage.py runserver

PFA the sql dump for DB tables.


How to use the app?

go to the URL : http://localhost:3000
You will be redirected to the register page. 
Register yourself and submit.
Then Signin again and Go to the Fill marks page and fill in your marks.
The result of all the students is shown in Dashboard Page at "http://localhost:3000/dashboard"
To edit the user details or delete a user, you can go to the Profile page and update name and class of the user or delete user.
To delete user just click on the bin icon(