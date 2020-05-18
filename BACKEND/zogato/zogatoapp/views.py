from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import bcrypt
import mysql.connector
from .config import *

config = {
  'user': DBUSER,
  'password': DBPASS,
  'host': DBHOST,
  'database': DBNAME,
  'raise_on_warnings': True
}



def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
def setmarks(request):
    print(request)
    if(request.method =='GET'):	
        return HttpResponse("GET method NOT Allowed")
    if(request.method=='POST'):
        p =json.loads(request.body.decode('utf-8'))
        roll_no = p['roll_no'].upper()
        physics = p['physics']
        chem = p['chem']
        maths = None
        bio = None
        query = ''
        if "maths" in p.keys():
            maths = p['maths']
            print(maths)
            query = "INSERT INTO marks(roll_no, physics, chem, maths) VALUES('"+roll_no+"',"+physics+","+chem+","+maths+");"
        if "bio" in p.keys():
            bio = p["bio"]
            query = "INSERT INTO marks(roll_no, physics, chem, bio) VALUES('"+roll_no+"',"+physics+","+chem+","+bio+");"
        #setup db connection
        print(query)
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
            conn.close()
            print(p)
            return HttpResponse("Successful",200)
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",400)

@csrf_exempt
def adduser(request):
    print(request)
    if(request.method =='GET'):	
        return HttpResponse("GET method NOT Allowed")
    if(request.method=='POST'):
        p =json.loads(request.body.decode('utf-8'))
        roll_no = p['roll_no'].upper()
        f_name = p['fname']
        l_name = p['lname']
        standard = p['class']
        pwd = p['pwd']
        password = str.encode(pwd)
        print(type(password))
        hashed = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')
        print(hashed)
        query = '''INSERT INTO users(roll_no, f_name, l_name, class, password) VALUES("'''+roll_no+'''","'''+f_name+'''","'''+l_name+'''",'''+standard+''',"'''+str(hashed)+'''");'''
    
        #setup db connection
        print(query)
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            
            result=cursor.fetchone()
            print(result)

            conn.commit()
            conn.close()
            # print(p)
            return HttpResponse("Successful",status=200)
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)
        # return HttpResponse("Hi")
   
@csrf_exempt
def signin(request):
    print(request)
    if(request.method =='GET'):	
        return HttpResponse("GET method NOT Allowed")
    if(request.method=='POST'):
        p =json.loads(request.body.decode('utf-8'))
        roll_no = p['roll_no'].upper()
        standard = p['class']
        pwd = p['pwd'].encode('utf-8')
        query = "SELECT * FROM users WHERE roll_no ='"+roll_no+"';"
        
        
        #setup db connection
        print(query)
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            print(vars(cursor),"CURRSOR")
            # conn.commit()
            result=cursor.fetchone()
            print(result)
            conn.close()
            if(result is not None):
                hashed = str.encode(result[4])
                f_name = result[1]
                l_name = result[2]
                c= result[3]
                r_no = result[0]
                print(type(hashed))
                if bcrypt.checkpw(pwd, hashed):
                    user = {
                        'name':f_name+" "+l_name,
                        'class':c,
                        'roll_no':r_no
                    }
                    user = json.dumps(user)
                    print("It Matches!")
                    return HttpResponse(user,status=200)
                else:
                    print("It Does not Match :(")
                    return HttpResponse("User Does Not Exist",status=400)
            else:
                return HttpResponse("User Does Not Exist",status=400)
            # return HttpResponse("PPPP")
        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)

@csrf_exempt
def getmarks(request):
    print(request)
    if(request.method =='POST'):	
        return HttpResponse("POST method NOT Allowed")
    if(request.method=='GET'):
        query = "SELECT m.roll_no, u.f_name,u.l_name, m.physics, m.chem, m.maths, m.bio FROM marks m INNER JOIN users u on m.roll_no = u.roll_no"

        #setup db connection
        print(query)
        marks = []
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            result=cursor.fetchall()
            print(result)
            conn.close()
            for r in result:
                student={}
                student["roll_no"] = r[0]
                student["name"] = r[1].capitalize()+" "+r[2].capitalize()
                student["physics"] = r[3]
                student['chem'] = r[4]
                student['maths'] = r[5]
                student['bio'] = r[6]
                
                marks.append(student)
            marks = json.dumps(marks)
            return HttpResponse(marks,status=200)

        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)
        # return HttpResponse("Hi")

@csrf_exempt
def getuser(request, roll_no):
    print(request)
    if(request.method =='POST'):	
        return HttpResponse("POST method NOT Allowed")
    if(request.method=='GET'):
        query = "SELECT * FROM users WHERE roll_no='"+roll_no+"';"
        #setup db connection
        print(query)
        marks = []
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            result=cursor.fetchall()
            print(result)
            conn.close()
            for r in result:
                student={}
                student["roll_no"] = r[0]
                student["fname"] = r[1]
                student["lname"] = r[2]
                student['class'] = r[3]
                
                marks.append(student)
            marks = json.dumps(marks)
            return HttpResponse(marks,status=200)

        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)
        # return HttpResponse("Hi")

@csrf_exempt
def updateuser(request):
    print(request)
    if(request.method =='GET'):	
        return HttpResponse("GET method NOT Allowed")
    if(request.method=='POST'):
        p =json.loads(request.body.decode('utf-8'))
        roll_no = p['roll_no'].upper()
        standard = p['class']
        fname = p['fname']
        lname = p['lname']
        query = "UPDATE users SET f_name='"+fname+"', l_name='"+lname+"',class="+str(standard)+" WHERE roll_no='"+roll_no+"';"
        #setup db connection
        print(query)
        students = []
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            # result=cursor.fetchall()
            # print(result)
            conn.commit()
            conn.close()
            return HttpResponse({'roll_no':roll_no},status=200)

        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)

@csrf_exempt
def deleteuser(request):
    print(request)
    if(request.method =='GET'):	
        return HttpResponse("GET method NOT Allowed")
    if(request.method=='POST'):
        p =json.loads(request.body.decode('utf-8'))
        roll_no = p['roll_no'].upper()
        query = "DELETE FROM users WHERE roll_no='"+roll_no+"';"      
        #setup db connection
        print(query)
        students = []
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
            conn.close()
            return HttpResponse("Successful",status=200)

        except mysql.connector.Error as err:
            print("Something went wrong: {}".format(err))
            return HttpResponse("Something went wrong",status=400)