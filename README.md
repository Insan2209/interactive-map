# Pirate's Isle Interactive Map

This project was created as an interactive web application for exploring the fictional world of Pirate's Isle.

## Available Features

### `Interactive Map`

Built using Leaflet.js with custom CRS for smooth navigation and interaction.

### `Collapsible Sidebar`

Organizes different map sections like regions, islands, forts, and points of interest.

### `Database Integration`

Dynamic data fetching from a Supabase backend ensures updated content.

### `Camera Movement`

Smooth map navigation transitions using React and Leaflet integrations.

### `Layer Controls`

Enables toggling of overlay elements like region boundaries and points of interest.

### `Thematic Visual Design`

Styled with Tailwind CSS for consistent and engaging visuals.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Leaflet.js
- **Backend**: Supabase (Database-as-a-Service)
- **Build Tools**: Node.js, Webpack/React Scripts

## Third-Party Dependencies

- `@supabase/supabase-js`: Database interactions.
- `leaflet`: Map rendering and CRS customization.
- `react-collapsible`: Collapsible sidebar functionality.
- `tailwindcss`: Styling.

## How to Install and Run Locally

In the project directory, you can run:

### `npm install`

Installs all necessary dependencies for the project.

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page reloads when you make changes, and lint errors are shown in the console.

### Environment Variables

Create a `.env` file in the root directory with the following keys:
```
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### `npm run build`

Builds the app for production.\
The optimized production build is created in the `build` folder.

## Deployment and Releasing a New Version

### `npm run build`

Builds the project for deployment.\
Transfer the `build` folder to your hosting service, ensuring environment variables are correctly configured.

### Versioning

Use Git tags or maintain a `CHANGELOG.md` for tracking changes between releases.

## Learn More

Explore the technologies used in this project:

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Leaflet Documentation](https://leafletjs.com/)

## Additional Notes

- **IDE Plugins**: Prettier and ESLint are recommended for code formatting and linting.
- **Map Tiles**: Ensure the required tiles are available in `./tiles/{z}/{x}/{y}.png`.

For bug reports or suggestions, contact the creator at: michalwojtal3@gmail.com.


