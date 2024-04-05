import "dotenv/config.js";
import { Client } from "@notionhq/client";

const notion = new Client({auth: process.env.NOTION_KEY});

export default async function getDatabaseContents() {
    try {
       
        const db_id = await getDatabaseID();
        const response = await notion.databases.retrieve({ database_id: db_id });

        const UpcomingMovies = await notion.databases.query({
            database_id: db_id,
            filter: {
                "property": "Status",
                "select": {
                    "equals": "Upcoming"
            }
            }});
        
        let movies = [];
        for (let pg of UpcomingMovies.results){
            movies.push(await getMovieTitle(pg.id));
        };
        
        return movies;
    } catch (err) {

        return err;
    }
    

};

async function getDatabaseID() {
    const response = await notion.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID
      });

    let allBlocks = response.results;
  
    for (let obj of allBlocks){
        if (obj.type == 'child_database' ) {
            return obj.id;
        }
    };
    
    throw new Error("Couldn't find a database!")
};


async function getMovieTitle(pageId) {
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response.properties.Name.title[0].plain_text;
};


getDatabaseContents().then((res) => {
    console.log(res);
});

