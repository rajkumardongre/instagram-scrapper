const puppeteer = require("puppeteer");
// const {publicUrl} = require("./cDg")
require("dotenv").config();

const postCardSelector = "._aagu";
const postImageSelector = "._aagv img";
const postCaptionSelector = "._a9zs";
const postAuthorSelector = "._a9zc"

const launchBrowser = async () => {
  const browser = await puppeteer.launch(
    {
      headless: true,
      args: [
        // "--disable-setuid-sandbox",
        "--no-sandbox",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    }
  );
  return browser;
}

async function scrapPostById(id) {
  console.time(`Time post ${id}`)
  const url = `https://www.instagram.com/p/${id}/`;
  console.log(`Scrapping post ${url} initiated...`);
  const browser = await launchBrowser();
  const browserWSEndpoint = await browser.wsEndpoint()
  const browser2 = await puppeteer.connect({ browserWSEndpoint })
  const page = await browser2.newPage();
  
  try {
    console.log(`Loading post page: ${url}`)
    await page.goto(url);

    console.log(`locating caption form ${url} post...`);
    await page.waitForSelector(postCaptionSelector); // Wait for caption to load
    console.log(`locating image from ${url} post...`);
    await page.waitForSelector(postImageSelector);
    console.log(`locating author from ${url} post...`);
    await page.waitForSelector(postAuthorSelector);

    console.log(`Evaluting ${url} post...`)
    const postData = await page.evaluate(
      (postCaptionSelector, postImageSelector, postAuthorSelector) => {

        function viewableImgUrl(url){
          const p = url.split("/");
          var t = '';
          for (let i = 0; i < p.length; i++) {
              if(i==2){
                  t += p[i].replaceAll('-', '--').replaceAll('.','-')+atob('LnRyYW5zbGF0ZS5nb29n')+'/';
              } else { if(i != p.length-1){ t += p[i]+'/'; } else { t += p[i]; } }
          }
          return encodeURI(t);
        }

        const author = document.querySelector(postAuthorSelector).innerText

        const captionElement = document.querySelector(postCaptionSelector);
        const caption = captionElement ? captionElement.innerText : "";

        const allTimeElements = document.querySelectorAll("time");
        const uploadedTime =
          allTimeElements[allTimeElements.length - 1].dateTime;

        const img = document.querySelector(postImageSelector);
        const src = viewableImgUrl(img.src);
        return { alt: img.alt, src, time: uploadedTime, caption, author };
      },
      postCaptionSelector,
      postImageSelector,
      postAuthorSelector
    );
    console.timeEnd(`Time post ${id}`)
    console.log(`Succcessfull scrap post ${url}.\n\n`)
    return {
      alt: postData.alt,
      caption: postData.caption,
      postImgUrl: postData.src,
      time: postData.time,
      author: postData.author,
    };
  } catch (error) {
    console.error(`Error while scraping post ${url}:`, error);
    throw new Error(`Error while scraping post ${url}: ${error.message}`)
  } finally {
    await page.goto('about:blank') // because of you: https://github.com/puppeteer/puppeteer/issues/1490
    await page.close()
    await browser2.disconnect()
    await browser.close(); // Ensure browser closure
    console.log(`Scrapping post ${url} Done!`)
  }
}

function extractId(url) {
  const regex = /https:\/\/www.instagram.com\/p\/(.*?)\//;
  const match = url.match(regex);
  if (match && match.length > 1) {
    return match[1];
  } else {
    console.error("Invalid URL or ID not found");
    return "";
  }
}


async function scrapPostByTags(tag) {
  console.time("total time");
  console.log(`Scrapping all post with tag ${tag}...`);
  const browser = await launchBrowser();
  const url = `https://www.instagram.com/explore/tags/${tag}`;
  try {
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`Open url ${url}`);

    console.log(`locating postCardSelector on ${url}`);
    await page.waitForSelector(postCardSelector);
    console.log(`locating postImageSelector on ${url}`);
    await page.waitForSelector(postImageSelector);
    
    await page.exposeFunction("extractId", extractId);

    // await page.exposeFunction("publicUrl", publicUrl);
    console.log(`Evaluting TAG page ${url}`)
  const posts = await page.evaluate(
    async (postCardSelector, postImageSelector) => {
      function viewableImgUrl(img_url){
        const p = img_url.split("/");
        var t = '';
        for (let i = 0; i < p.length; i++) {
            if(i==2){
                t += p[i].replaceAll('-', '--').replaceAll('.','-')+atob('LnRyYW5zbGF0ZS5nb29n')+'/';
            } else { if(i != p.length-1){ t += p[i]+'/'; } else { t += p[i]; } }
        }
        return encodeURI(t);
      }

      const postElements = document.querySelectorAll(postCardSelector);
      
      const scrapPosts = [];

      for (const postElement of postElements) {
        const img = postElement.querySelector(postImageSelector);
        const id = await window.extractId(postElement.parentElement.href); // Extract ID from href
        const imgUrl = viewableImgUrl(img.src);
        scrapPosts.push({ id, imgUrl: imgUrl, alt: img.alt });
      }   
      
      return scrapPosts;
    },
    postCardSelector,
    postImageSelector,
  );
  
  console.log(`Posts fetched from ${tag}`)
  await populatePostsData(posts);
  
  console.timeEnd("total time");
  return posts;
} catch (error) {
  console.log(`Error while scrapping Tag ${tag}`)
  throw error;
} finally{
  await browser.close();
  console.log(`Scrapping tag ${tag} Done!`)
  }
}

// populate post time and caption
const populatePostsData = async (posts) => {
  console.log(`\n\nPopulating posts...`)
  try {
    for(let i=0; i<posts.length; i++){
      const postData = await scrapPostById(posts[i].id);
      posts[i].caption = postData.caption;
      posts[i].time = postData.time;
      posts[i].postImgUrl = postData.postImgUrl;
      posts[i].author = postData.author;
    };
    
    console.log("\n\nSuccessfully popultated the posts.\n\n");
  } catch (error) {
    throw error;
  }
};

// (async () => {
//   // const caption = await scrapPostById("C5UEx0hPIVN");
//   // console.log(caption)
//   const posts = await scrapPostByTags("flooding");
//   console.log(posts);
// })();

module.exports = {
  scrapPostByTags,
  scrapPostById,
};
