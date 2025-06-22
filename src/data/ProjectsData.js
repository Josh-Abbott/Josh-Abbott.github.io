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
        { type: "text", value: "• Designed and implemented popularity and success ranking algorithms for businesses, using custom metrics such as check-in patterns, review consistency, and business longevity." },
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
        { type: "image", value: "../images/location1.png", alt: "Project presentation 1st screenshot." },
        { type: "image", value: "../images/location2.png", alt: "Project presentation 2nd screenshot." },
        { type: "image", value: "../images/location3.png", alt: "Project presentation 3rd screenshot." },
        { type: "image", value: "../images/location4.png", alt: "Project presentation 4th screenshot." },
        { type: "focused-text", value: 'Check out the <a href="https://github.com/Josh-Abbott/475-Project" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 5,
      title: "Unix Filesystem Tree Simulator",
      category: "software",
      content: [
        { type: "text", value: "•	Used Visual Studio Code to create tree data structures in C as the organization system for a Unix filesystem simulation. The commands supported include mkdir, rmdir, cd, ls, pwd, creat, rm, save, reload, and quit." },
        { type: "image", value: "../images/unixsim.png", alt: "Project demo screenshot" },
        { type: "text", value: 'Check out the <a href="https://github.com/Josh-Abbott/360-Lab1" target="_blank" rel="noopener noreferrer">GitHub repository</a> for this project.' },
      ],
    },
    {
      id: 7,
      title: "The City of Palm Bay",
      category: "game",
      content: [
        { type: "text", value: "•	Co-developed an online multiplayer roleplaying game simulating a player-driven town economy and government, where users work jobs, earn currency, and influence how the town operates through social and political systems." },
        { type: "text", value: "•	Engineered a Lua-based virtual economy system supporting up to 50 concurrent players, enabling competitive job mechanics across six dynamic businesses with real-time wage payouts and financial persistence." },
        { type: "video", value: "../videos/palmdemo.mp4", alt: "Project gameplay demo video." },
        { type: "text", value: "•	Designed and programmed a dynamic legislation system with 20+ interconnected laws affecting in-game economics, civil rights, public infrastructure, and business operations — all built in Lua using object-oriented design for scalability and modularity." },
        { type: "text", value: "•	Developed a player-run government system where users campaign for council roles, propose new laws, and vote on policy changes in real time, enabling emergent gameplay and replayability shaped by player choice." },
        { type: "video", value: "../videos/palmpolitic.mp4", alt: "Political system demo video." },
        { type: "focused-text", value: "Game mechanics modified slightly to be showcased with only one player."},
      ],
    },
    {
      id: 8,
      title: "Destiny Bay",
      category: "game",
      content: [
        { type: "focused-text", value: "All content showcased is from a work-in-progress build and not final." },
        { type: "text", value: "• Co-developed an online multiplayer game set in a large-scale virtual city, featuring minigames, roleplay mechanics, and interactive experiences across various zones." },
        { type: "text", value: "• Designed a modular in-game store system with 75+ item types, supporting live updates across all servers — including price changes, removals, and time-limited offers — without requiring code redeployment or downtime." },
        { type: "video", value: "../videos/destinydemo1.mp4", alt: "Project shop demo video." },
        { type: "text", value: "• Implemented a virtual currency and XP system using Lua, enabling up to 50 players per server to earn and spend currency on items, cosmetics, and roleplay features." },
        { type: "text", value: "• Built a scalable minigame framework supporting up to 20 players per instance, enabling competitive games like tag and reward-based challenges to enhance replayability." },
        { type: "video", value: "../videos/destinydemo2.mp4", alt: "Shopping List Minigame video." },
        { type: "focused-text", value: "The 'Shopping List' minigame challenges players to collect the highest number of items before time runs out; this demo is shown with one player for clarity." }

      ],
    },
    {
      id: 9,
      title: "Solanas Resort",
      category: "game",
      content: [
        { type: "image", value: "../images/solanasresort2.jpg", alt: "Project 1st screenshot." },
        { type: "focused-text", value: "Image taken from developer tools." },
        { type: "text", value: "• Co-developed and marketed a multiplayer roleplay game set in an interactive virtual resort, where users engage in time-based activities and simulated job experiences." },
        { type: "text", value: "• Created a Lua-based currency system that incentivized longer play sessions by rewarding time and enabling purchases of in-game items and activities." },
        { type: "text", value: "• Designed systems simulating resort employee roles such as check-ins and housekeeping for up to 50 concurrent players." },
        { type: "text", value: "• Implemented monetized in-game purchases that generated over $10,000 in platform revenue." },
        { type: "text", value: "• Led a team of 3–4 core developers and managed external contributors across modeling, graphics, and other assets over a 2-year development cycle." },
        { type: "text", value: "• Boosted ad clickthrough rates by up to 50% through A/B testing and analysis of millions of platform impressions." },
        { type: "image", value: "../images/solanasresort1.png", alt: "Project 2nd screenshot." },
        { type: "focused-text", value: "Image taken from developer tools." },
        { type: "text", value: "Accomplishments:" },
        { type: "text", value: "• Reached 2.1 million+ unique play sessions and nearly 34,000 favorites." },
        { type: "text", value: "• Peaked at approximately 600 concurrent players." },
        { type: "text", value: '• Featured in a YouTube <a href="https://youtu.be/sRmf9KEqbLg" target="_blank" rel="noopener noreferrer">video</a> by a Spanish creator with 4.2M+ views and 65,000+ likes.' }
      ],
    },
  ];
  
  export default projectsData;
  