const projectsData = [
    {
      id: 1,
      title: "Inventory Tracking System",
      category: "software",
      content: [
        { type: "image", value: "../images/inventorywebsite.png", alt: "Project login page." },
        { type: "focused-text", value: "System login page made using pure CSS, no outside libraries as requested by the client." },
        { type: "text", value: "• Redesigned and iterated on an existing online inventory system using Agile methodology for AgWeatherNet’s 138 weather stations across Washington, collaborating with 2 teammates." },
        { type: "text", value: "• Led the design and development of a responsive frontend interface, enhancing user experience and accessibility." },
        { type: "text", value: "• Implemented secure authentication with JSON Web Tokens and contributed to SQL database functionality for efficient data retrieval, storage, and display." },
      ],
    },
    {
      id: 2,
      title: "Spreadsheet Application",
      category: "software",
      content: [
        { type: "text", value: "• Developed a spreadsheet application in C# using WinForms, incorporating OOP principles." },
        { type: "text", value: "• Built key features such as formula calculations, undo/redo functionality, save/load capabilities, and dynamic cell updating." },
        { type: "text", value: "• Leveraged event-driven programming, modular design, and scalable data structures for robust, flexible solutions." },
        { type: "video", value: "../videos/spreadsheetapp.mp4", alt: "Spreadsheet Application demo video." },
        { type: "focused-text", value: 'Check out the <a href="https://github.com/Josh-Abbott/Spreadsheet-Application" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 3,
      title: "Yelp Data Search Application",
      category: "software",
      content: [
        { type: "text", value: "• Created a Python application to query and analyze large-scale Yelp data using PostgreSQL, implementing JSON parsing, database schema design, and query optimization strategies to provide location-based business insights." },
        { type: "image", value: "../images/testing2.jpg", alt: "Project 1 screenshot" },
        { type: "video", value: "../videos/yelpapp.mp4", alt: "Spreadsheet Application demo video." },
        { type: "focused-text", value: 'Check out the <a href="https://github.com/Josh-Abbott/Yelp-Database" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 4,
      title: "Location Data Analysis",
      category: "software",
      content: [
        { type: "text", value: "•	Engineered a scalable pipeline to efficiently process and analyze over 13,000 Google Location History JSON entries using Python, R, and SQL alongside a teammate. " },
        { type: "text", value: "•	Implemented custom extraction, data cleaning, and confidence-based filtering logic to aggregate high-quality data into a structured SQLite database. " },
        { type: "text", value: "•	Visualized data to discover movement patterns and behavioral shifts during the COVID-19 pandemic using R (ggplot2, leaflet, kmeans) and Python (seaborn, pandas) to create graphs, cluster maps, and heatmaps." },        
        { type: "image", value: "../images/location1.png", alt: "Project presentation 1st screenshot" },
        { type: "image", value: "../images/location2.png", alt: "Project presentation 2nd screenshot" },
        { type: "image", value: "../images/location3.png", alt: "Project presentation 3rd screenshot" },
        { type: "image", value: "../images/location4.png", alt: "Project presentation 4th screenshot" },
        { type: "focused-text", value: 'Check out the <a href="https://github.com/Josh-Abbott/475-Project" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 5,
      title: "Unix Filesystem Tree Simulator",
      category: "software",
      content: [
        { type: "text", value: "•	Used Visual Studio Code to create tree data structures in C as the organization system for a Unix filesystem simulation. The commands supported include mkdir, rmdir, cd, ls, pwd, creat, rm, save, reload, and quit." },
        { type: "image", value: "../images/unixsim.jpg", alt: "Project demo screenshot" },
        { type: "text", value: 'Check out the <a href="https://github.com/Josh-Abbott/360-Lab1" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 7,
      title: "The City of Palm Bay",
      category: "game",
      content: [
        { type: "text", value: "•	This project is a work in progress." },
        { type: "image", value: "../images/testing2.jpg", alt: "Project 1 screenshot" },
      ],
    },
    {
      id: 8,
      title: "Destiny Bay",
      category: "game",
      content: [
        { type: "text", value: "•	This project is a work in progress." },
        { type: "image", value: "../images/testing2.jpg", alt: "Project 1 screenshot" },
        { type: "video", value: "../videos/shoppinglist.mp4", alt: "Shopping List Minigame video" },
      ],
    },
    {
      id: 9,
      title: "Solanas Resort",
      category: "game",
      content: [
        { type: "text", value: "•	This project is a work in progress." },
        { type: "image", value: "../images/testing2.jpg", alt: "Project 1 screenshot" },
      ],
    },
  ];
  
  export default projectsData;
  