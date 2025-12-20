# Chocolate Casper

The old classic Casper theme for [Ghost](http://github.com/tryghost/ghost/) modified to be used at https://onlydarkchocolate.com.

## Changes compared to original Casper (v 1.4.0)
 - image posts on main page
 - disqus comments
 - twitter typeahead search by post titles
 - Open Sans is used everywhere, no Merriweather (default Times New Roman in ios browsers is a deal breaker for serif fonts :( )
 - copyright line in the footer has hardcoded inception year
 - tags page which lists all tags ad number of posts (ugly, but works)
 - all external links are open in new tab (target="_blank")
 - updated to be compatible with Ghost 2.x
 - removed google+ share button
 - `buy me coffee` button on each post
 - `#StandWithUkraine` banner on each post (instead of top bmc button)
 - Updated for Ghost 6.x compatibility, including:
    - Replaced deprecated helpers (e.g., @blog) with modern equivalents (@site).
    - Modernized search to use the Content API for fetching post titles.
    - Implemented a dynamic tags page to display all public tags with post counts and a loading spinner.
    - Self-hosted Google Fonts to resolve theme warnings and improve performance.
    - Integrated Ghost's native custom font system.
    - zip command to build the theme with Content API key included
    - replace disqus with native comments
  - drop social media buttons
 
## Build zip
To build the theme for deployment, first ensure you have Node.js and npm installed.

1.  **Create a `.env` file** in the root of the theme directory.
    *   This file will contain your Ghost Content API key.
    *   **Do NOT commit this file to Git.**
    *   Example content for `.env`:
        ```
        GHOST_CONTENT_API_KEY=YOUR_API_KEY_HERE
        ```
    *   You will need to replace `YOUR_API_KEY_HERE` with the Content API key obtained from your Ghost Admin (Settings > Integrations > Add custom integration).

2.  **Install dependencies** (only needed once):
    ```bash
    npm install
    ```

3.  **Run the build command:**
    ```bash
    npm run zip
    ```
    This command will:
    *   Inject your API key from `.env` into `default.hbs`.
    *   Create a `.zip` archive of your theme (e.g., `chocolate-casper-1.6.32.zip`) in the parent directory.
    *   Print the full path to the generated zip file.

    You can then upload this zip file via your Ghost Admin (Settings > Design).

## Copyright & License

Copyright (c) 2013-2017 Ghost Foundation - Released under the [MIT license](LICENSE).
