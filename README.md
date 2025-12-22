
# 🎓 StudentMaster-IA
A smart app that automatically generates **summaries**, **revision sheets**, **flashcards**, and **quizzes** from a single uploaded document.

⚠️ **Currently in TEST mode**
This project is still in the experimental phase: only the main features are active (summary, flashcards, quizzes, revision sheets).

The goal is to progressively improve the tool until a full public version is released.

---

## 🚀 Why this project?
Originally, StudentMaster-IA was created for a personal need:
I had to review **network** lectures in slideshow format, sometimes very long, which wasted a lot of my time.

So I developed a tool capable of **reading my documents and automatically generating my revisions** using AI.

Seeing its potential, I decided to take the application further so that it would be **accessible to everyone in the future**.

---

## 📌 Description
**StudentMaster-AI** allows you to upload any file (PDF, Word, PowerPoint, text, etc.).
The application then automatically generates:

- 📝 **Structured summaries** in Markdown
- 📚 **Revision sheets**
- 🎴 **Educational flashcards**
- ❓ **Interactive quizzes**
- All this thanks to integrated AI (Ollama + LLM)

> Simply drag and drop a document, and everything will be analyzed and generated automatically.

---

## 🧠 General operation
1. The user uploads a document.

2. The backend extracts the text (PDF, DOCX, PPTX, TXT, MD).
3. The text is sent to a local Ollama model.

4. The AI ​​generates:

- an interactive Markdown summary

- flashcards (JSON format)

- a complete quiz (JSON format)
5. The frontend displays the results in a clear and modern interface.

---

## 🛠️ Technologies Used

### **Backend (Python + Flask + Ollama)**
- Flask / Flask-CORS
- Ollama (local templates)
- PyPDF2, python-docx, python-pptx (text extraction)
- dotenv (environment variables)

### **Frontend (React + TypeScript + Tailwind)**
- React Router
- Modern interface with Tailwind CSS
- Pages: Dashboard • Upload • Summary • Flashcards • Quiz • Review
- Data management via Flask API

---

## 📦 Installation

### **Ollama**
1 - Download [Ollama](https://ollama.com): [https://ollama.com/download](https://ollama.com/download)

2 - Launch the service:
```bash
ollama serve
```
3 - Download the template used by the application (here: Llama 3.1 8B):
``` bash
ollama pull llama3.1:8b
```
4 - Verify that the template works:
``` bash
ollama run llama3.1:8b "Hello"
```

### **Backend**
``` bash
python3 -m venv venv
source venv/bin/active
pip install flask flask-cors requests PyPDF2 python-docx python-pptx ollama python-dotenv flask-sqlalchemy flask-login
export FLASK_APP=project
export FLASH_DEBUG=1
flask run
```
Make sure you have a `.env` file with:
```
OLLAMA_API_URL="http://IP:PORT/api/generate"
FLASK_HOST="myhost"
FLASK_PORT=my_port
```
### **Frontend**
``` bash
npm install
npx shadcn@latest add utils
npm run dev
```
Make sure you have a `.env` file with:
```
VITE_API_BASE_URL="http://address_backend"
```
