![alt text](image.png)

A React-based application for creating and managing professional resumes made at the Nexus Crew AI Hackathon by [Aaron Jibin](https://github.com/Aarxn-Jibz), [Anadhika Goswami](https://github.com/anadhikag), [Anna Isson](https://github.com/AnnaIsson) and [Joel D'Silva](https://github.com/joel-dsilva) held at Christ University, Bangalore. You can access the website [here](https://resumebuilder-45k.pages.dev/).

## Project Output/Demo

<img width="1895" height="941" alt="image" src="https://github.com/user-attachments/assets/be3846a7-c97b-46cb-ae63-a93e5c46811a" />
<img width="1752" height="956" alt="image" src="https://github.com/user-attachments/assets/c49758ec-7f56-4107-9e77-a8f222bbfc9b" />
<img width="1919" height="889" alt="image" src="https://github.com/user-attachments/assets/5de6c46e-7342-4b37-b440-1a4c40bc8abb" />


---

## Key Features & Benefits

* **Dynamic Resume Generation:** Create customized resumes based on your skills and experience.
* **AI-Powered Skill Scoring:** Analyze your resume against a Job Description (JD) to provide a score and keyword suggestions.
* **PDF Export:** Easily export your resume in PDF format for sharing and printing.
* **Modern UI:** A clean and intuitive user interface built with React and Tailwind CSS.

---

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

* **Node.js:** (v18 or higher recommended) - [Download Node.js](https://nodejs.org/)
* **npm** (usually installed with Node.js) or **Yarn**
* **Git:** For cloning the repository.

---

## Installation & Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/Aarxn-Jibz/resumebuilder.git](https://github.com/Aarxn-Jibz/resumebuilder.git)
    cd resumebuilder
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Using Yarn:

    ```bash
    yarn install
    ```

3. **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Using Yarn:

    ```bash
    yarn dev
    ```

    This will start the application in your browser, usually at `http://localhost:5173/`.

---

## Usage Examples & Code Structure

This project primarily involves a React frontend. The core logic resides within the `src/` directory.

* **AIScore.jsx:** This component is responsible for the AI-powered scoring, using **@xenova/transformers** for semantic analysis of your resume text against a job description.
* **DownloadResume.jsx:** Handles the creation of the PDF file using **jsPDF** and navigation to the score page.
* **App.jsx:** The main application router and entry point.

---

## Configuration Options

The application uses environment variables which may be specified using the `.env` file.

Currently, there are no specific environment variables that need to be configured beyond the default Vite setup.

---

## Contributing Guidelines

We welcome contributions to improve the ResumeBuilder project! Please follow these guidelines:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3. **Make your changes**, ensuring to follow the existing code style.
4. **Commit your changes:** `git commit -m "Add your descriptive commit message"`.
5. **Push to your branch:** `git push origin feature/your-feature-name`.
6. **Create a pull request** on GitHub.

---

## License Information 

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details

---

## Acknowledgments

* **React:** For the framework.
* **Vite:** For the fast development environment.
* **Tailwind CSS:** For the utility-first CSS framework.
* **@xenova/transformers:** For local NLP processing.
* **jsPDF & PDFJS-dist:** For PDF creation and reading functionality.
