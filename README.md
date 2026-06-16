# AI Website Builder CLI

An AI-powered command line website builder that uses the Google Gemini API to generate frontend websites through terminal commands automatically.

This project allows users to describe what they want to build, and the AI agent generates and executes shell commands step-by-step to create folders, HTML, CSS, and JavaScript files directly from the terminal.

---

# Features

* AI-powered website generation using Gemini API
* Automatic shell command execution
* Step-by-step frontend creation workflow
* Cross-platform command handling using Node.js OS detection
* Interactive CLI interface
* File and folder creation automation
* HTML, CSS, and JavaScript generation
* Error handling for command execution
* Conversation history tracking
* Uses Gemini Function Calling (Tools)

---

# Tech Stack

## Backend / Runtime

* Node.js

## AI SDK

* `@google/genai`

## Additional Packages

* `dotenv`
* `readline-sync`

## Core Node Modules

* `child_process`
* `util`
* `os`
* `process`
* `fs`

---

# Project Structure

```bash
.
├── index.js
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

# How It Works

The application follows an AI-agent workflow:

1. User enters a website idea in the terminal.
2. Gemini analyzes the request.
3. Gemini generates shell commands.
4. The tool executor runs those commands.
5. Commands create folders/files and write code.
6. Results are sent back to Gemini.
7. Gemini continues until the website setup is complete.

---

# Prerequisites

Before running the project, make sure the following are installed on your system.

## Required Software

### 1. Node.js

Install Node.js version 18 or later.

Check installation:

```bash
node -v
npm -v
```

Download from:

* [https://nodejs.org/](https://nodejs.org/)

---

### 2. Google Gemini API Key

You need a Gemini API key from Google AI Studio.

Get API key from:

* [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

# Installation Guide

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ai-website-builder.git
```

---

## Step 2: Move Into Project Directory

```bash
cd ai-website-builder
```

---

## Step 3: Install Dependencies

```bash
npm install
```

This installs all required packages.

---

# Environment Setup

Create a `.env` file in the root directory.

## Example `.env`

```env
GEMINI_API_KEY=your_api_key_here
```

---

# Required Dependencies

Install manually if needed:

```bash
npm install @google/genai dotenv readline-sync
```

---

# Running the Project

Start the application using:

```bash
node index.js
```

---

# Example Usage

## Input

```bash
What to build today ??  Create a responsive calculator website
```

## AI Workflow

The AI may generate commands such as:

```bash
mkdir calculator
```

```bash
touch calculator/index.html
```

```bash
touch calculator/style.css
```

```bash
touch calculator/script.js
```

Then it writes code into those files automatically.

---

# Exit the Program

To stop the application:

```bash
exit
```

---

# Main Components Explained

## 1. Google Gemini Integration

```js
const ai = new GoogleGenAI({})
```

Initializes the Gemini AI model.

---

## 2. Command Executor

```js
async function executeCommand({command})
```

Executes shell commands using Node.js child processes.

Capabilities:

* Create folders
* Create files
* Modify files
* Delete files
* Read files
* Execute terminal operations

---

## 3. Function Calling / Tools

```js
const commandExecuter = {
    name: 'executeCommand'
}
```

Defines a tool for Gemini so it can execute terminal commands.

---

## 4. Conversation History

```js
const History = [];
```

Stores user prompts and AI responses.

---

## 5. Interactive CLI Loop

```js
while (true)
```

Keeps the terminal session active until the user types `exit`.

---

# Workflow Architecture

```text
User Prompt
     ↓
Gemini AI Model
     ↓
Generates Shell Commands
     ↓
Node.js Tool Executor
     ↓
Terminal Execution
     ↓
Response Sent Back to AI
     ↓
Website Files Generated
```

---

# Error Handling

The project handles:

* Invalid shell commands
* Execution failures
* Runtime exceptions
* Terminal stderr outputs

Example:

```js
catch (err) {
    return `Error : ${err}`
}
```

---

# Supported Operations

The AI agent can:

* Create projects
* Generate frontend websites
* Create folders/files
* Edit files
* Write HTML/CSS/JS code
* Fix errors iteratively
* Run terminal commands

---

# Security Warning

⚠️ Important:

This project allows AI-generated terminal command execution.

Be careful while running:

* Unknown prompts
* Destructive shell commands
* File deletion operations
* Commands with system-level access

Recommended:

* Run inside a sandbox
* Use virtual environments
* Avoid running as administrator/root

---

# Example package.json

```json
{
  "type": "module",
  "dependencies": {
    "@google/genai": "latest",
    "dotenv": "latest",
    "readline-sync": "latest"
  }
}
```

---

# Future Improvements

Possible future enhancements:

* React/Vue/Angular support
* Backend generation
* Docker integration
* File preview system
* AI debugging mode
* GUI interface
* Voice command support
* Multi-agent architecture
* Deployment automation
* Git integration

---

# Troubleshooting

## 1. Module Not Found Error

Solution:

```bash
npm install
```

---

## 2. Gemini API Key Error

Check:

* `.env` file exists
* API key is valid
* Environment variables are loaded correctly

---

## 3. Permission Denied

Try:

```bash
sudo node index.js
```

Linux/macOS only.

---

## 4. ES Module Error

Add this to `package.json`:

```json
{
  "type": "module"
}
```




