import tkinter as tk
from tkinter import messagebox
import requests as r
from main import BASE_URL

def fetch_tickets():
    response = r.get(f"{BASE_URL}/tickets")
    tickets = response.json()
    print(tickets)
    return tickets

def fetch_admins(token):
    print(token)
    response = r.get(f"{BASE_URL}/users?role=ADMIN", headers={"Authorization": f"Bearer {token}"})
    print(response.text)
    response.raise_for_status()
    admins = response.json()
    return admins

def assign_user(ticket_id, token):
    admins = fetch_admins(token)
    assign_window = tk.Toplevel(root)
    assign_window.title("Assigner Utilisateur")
    assign_window.geometry("400x200")
    
    tk.Label(assign_window, text="Assigner à :").pack(pady=10)
    user_var = tk.StringVar(assign_window)
    user_var.set(admins[0]["email"]) 
    
    users = [admin["email"] for admin in admins]
    user_menu = tk.OptionMenu(assign_window, user_var, *users)
    user_menu.pack(pady=10)
    
    def confirm_assign():
        selected_user = user_var.get()
        messagebox.showinfo("Assigné", f"Ticket {ticket_id} assigné à {selected_user}")
        assign_window.destroy()
    
    button_frame = tk.Frame(assign_window)
    button_frame.pack(pady=10)
    
    tk.Button(button_frame, text="Assigner", command=confirm_assign).pack(side='left', padx=5)
    tk.Button(button_frame, text="Annuler", command=assign_window.destroy).pack(side='left', padx=5)

def return_message(ticket_id):
    return_window = tk.Toplevel(root)
    return_window.title("Retour Message")
    return_window.geometry("400x200")
    
    tk.Label(return_window, text="Message :").pack(pady=10)
    message_entry = tk.Entry(return_window)
    message_entry.pack(pady=10)
    
    def confirm_return():
        message = message_entry.get()
        messagebox.showinfo("Message Envoyé", f"Message pour le Ticket {ticket_id} : {message}")
        return_window.destroy()
    
    button_frame = tk.Frame(return_window)
    button_frame.pack(pady=10)
    
    tk.Button(button_frame, text="Envoyer", command=confirm_return).pack(side='left', padx=5)
    tk.Button(button_frame, text="Annuler", command=return_window.destroy).pack(side='left', padx=5)

def validate_ticket(ticket_id):
    validation_window = tk.Toplevel(root)
    validation_window.title("Valider Ticket")
    validation_window.geometry("400x200")
    
    tk.Label(validation_window, text=f"Valider Ticket {ticket_id} ?").pack(pady=10)
    
    def confirm_validation():
        response = r.patch(f"{BASE_URL}/tickets/{ticket_id}", json={"isSolved": True})
        response.raise_for_status()
        print(response.text)
        messagebox.showinfo("Validé", f"Ticket {ticket_id} validé")
        validation_window.destroy()
    
    button_frame = tk.Frame(validation_window)
    button_frame.pack(pady=10)
    
    tk.Button(button_frame, text="Oui", command=confirm_validation).pack(side='left', padx=5)
    tk.Button(button_frame, text="Non", command=validation_window.destroy).pack(side='left', padx=5)

def init(t):
    global token
    token = t
    print(token)
    global root
    root = tk.Tk()
    root.title("Ticketing")
    root.geometry("1280x1080")

    tk.Label(root, text="Ticketing", font=("Helvetica", 16)).pack(anchor='nw')

    tickets = fetch_tickets()

    for ticket in tickets:
        frame = tk.Frame(root)
        frame.pack(fill='x')
        
        tk.Label(frame, text=ticket["id"], width=5).pack(side='left')
        tk.Label(frame, text=ticket["message"], width=50).pack(side='left')
        
        tk.Button(frame, text="Assigner", command=lambda t=ticket["id"]: assign_user(t, token)).pack(side='left')
        tk.Button(frame, text="Retour", command=lambda t=ticket["id"]: return_message(t)).pack(side='left')
        tk.Button(frame, text="Valider", command=lambda t=ticket["id"]: validate_ticket(t)).pack(side='left')

    root.mainloop()
