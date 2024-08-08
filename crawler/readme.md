`node src/pages.js`: to get page IDs under category list; output to stdout

`node src/crawl.js -f <list of page IDs> -o <array of item data>`: to crawl wiki pages by page ID

`node src/verify.js -f <array of item data>`: to verify crawled data

`node src/materials.js -f <array of item data> -m <existing entity ID-name mapping> -o <new mapping>`: to get entity ID-to-name mapping

`node src/recipes.js -f <array of item data> -m <entity ID-name mapping> -o <array of item recipes with entity ID>`: to generate a craftable entity list with recipes, using entity ID
