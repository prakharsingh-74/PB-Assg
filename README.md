# Patient Directory Application

A high-performance Patient Directory application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Local API Integration**: Custom API route handler to serve 1,000 patient records from a JSON file.
- **Advanced Filtering**: Support for multiple medical issue filters and age ranges.
- **Smart Search**: Debounced search functionality (500ms) for efficient querying of patient names and IDs.
- **Server-Side Pagination**: Efficient data fetching with custom pagination controls.
- **Dual View Modes**:
  - **Table View**: Comprehensive list view for density and quick scanning.
  - **Card View**: Visual grid view for better individual patient inspection.
- **Responsive Design**: Mobile-friendly layouts for both views.
- **Premium UI**: Modern aesthetics following Figma design, including blue header patterns and curated badge colors.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd patient-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000)

## Architectural Decisions

### Data Fetching
Used Next.js Route Handlers (`/api/patients`) to implement a robust backend layer. This allows for server-side processing of large datasets (1,000+ records), ensuring the frontend remains fast by only loading small chunks of data.

### State Management
Utilized React's `useState` and `useEffect` combined with `URLSearchParams` for search and filter persistence. This ensures that the URL stays in sync with the current view state, allowing for shareable filtered views.

### Performance
Implemented a custom debounce mechanism for search queries to reduce unnecessary API calls while typing.

### UI Implementation
Opted for a custom CSS approach in `globals.css` for badge colors and header patterns to ensure the design matches the Figma file perfectly without the overhead of heavy third-party UI libraries.

### View Switching
Implemented a seamless toggle between Table and Card views without reloading data, providing a smooth user experience.
