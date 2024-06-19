import tkinter as tk
from tkinter import messagebox
import requests as r
import jwt
from main import BASE_URL

def check_login(email, password):
    response = r.post(f"{BASE_URL}/auth/login", json={"email": email, "password": password})
    if (response.status_code == 200):
        token = response.json()["token"]
        payload = jwt.decode(token, algorithms=["HS256"], options={"verify_signature": False})
        if ("ADMIN" not in payload["roles"]):
            raise Exception("Vous n'avez pas les droits d'accès")
        return token
    else:
        raise Exception(response.json()["message"])

def login():
    email = email_entry.get()
    password = password_entry.get()
    try:
        token = check_login(email, password)
        if token:
            root.destroy()
            import ticketing
            ticketing.init(token)
    except Exception as e:
        messagebox.showerror("Erreur", str(e))

root = tk.Tk()
root.title("Login")

tk.Label(root, text="Email").grid(row=0, column=0)
email_entry = tk.Entry(root)
email_entry.grid(row=0, column=1)
email_entry.insert(0, "julien.zeybel2000+admin@gmail.com")

tk.Label(root, text="Mot de passe").grid(row=1, column=0)
password_entry = tk.Entry(root, show="*")
password_entry.grid(row=1, column=1)
password_entry.insert(0, "QQQQqqqq1*")

tk.Button(root, text="Login", command=login).grid(row=2, columnspan=2)

root.mainloop()