# DATA AI STUDIO

DATA AI STUDIO is a 100% local, privacy-first data analytics and machine learning studio built with TypeScript, React, Vite, Tailwind CSS, and Python (Pandas, NumPy, Scikit-learn, Plotly).

## Installation & Setup

### Prerequisites
- Node.js >= 18.0.0
- Python >= 3.10
- npm >= 9.0.0

### Frontend & Application Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd data-ai-studio
   ```

2. Install Node dependencies using the committed lockfile (`package-lock.json`):
   ```bash
   npm ci
   # or for development
   npm install
   ```

3. Build the application for production:
   ```bash
   npm run build
   ```

4. Start the local server:
   ```bash
   npm run dev
   # or production server
   npm start
   ```

### Python Backend & Local Analytics Engine
Install python dependencies:
```bash
pip install -r requirements.txt
# or with Poetry
poetry install
```

Start the Python backend engine:
```bash
python3 app.py
```

### Running Tests and Coverage
To execute unit tests and generate test coverage reports:
```bash
# Frontend unit tests with Vitest & Coverage
npm test
npm run test:coverage

# Python unit tests with pytest & coverage
pytest tests/ --cov=backend --cov-report=term-missing
```
