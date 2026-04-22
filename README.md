# 2026 Angular 21 Essentials — Recipe Book

This repository contains the **main Angular 21 Recipe Book application** along with several **stand‑alone concept projects**. Each supporting project demonstrates a specific Angular concept on its own, and these concepts are later applied inside the main Recipe Book app.

---

## Development Environment
- NVM:        1.2.2
- Node:       24.15.0 (active), also installed: 22.15.0, 18.17.0
- npm:        11.12.1
- npx:        11.12.1
- Angular CLI: 21.2.7 (local project version)

The project uses the **local Angular CLI** defined in `devDependencies`, ensuring consistent builds for everyone.

---

## Project Structure
Each project in this repository has:
- A **project folder**
- A **matching text file in the root directory** with the same name

Example:
- p01-essentials/
- p01-essentials.txt


These text files explain:
- What the project is about  
- What Angular concept it demonstrates  
- How it relates to the main Recipe Book app  

---

## Instruction & Glossary Files (`00-*.txt`)
Files starting with `00-` contain:
- Commands used throughout the repo  
- Setup notes  
- Angular / Node / NVM workflow explanations  
- Glossary of terms  
- Quick reference material  

These are placed in the root for **easy access**.

---

## Running the Main Project
- Inside the main project folder:

### Development server
- npm start

### Build
- npm run build

### Or using Angular CLI directly
- ng serve
- ng build
