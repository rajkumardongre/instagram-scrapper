const puppeteer = require("puppeteer");
require("dotenv").config();

const postCardSelector = "._aagu";
const postImageSelector = "._aagv img";
const postCaptionSelector = "._a9zs";
const postAuthorSelector = "._a9zc"

async function scrapPostById(id) {
  const browser = await puppeteer.launch(
    {
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    }
  );
  const page = await browser.newPage();

  const url = `https://www.instagram.com/p/${id}/`;
  try {
    console.log(`Scrapping post ${url} initiated...`);
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
        const author = document.querySelector(postAuthorSelector).innerText

        const captionElement = document.querySelector(postCaptionSelector);
        const caption = captionElement ? captionElement.innerText : "";

        const allTimeElements = document.querySelectorAll("time");
        const uploadedTime =
          allTimeElements[allTimeElements.length - 1].dateTime;

        const img = document.querySelector(postImageSelector);
        return { alt: img.alt, src: img.src, time: uploadedTime, caption, author };
      },
      postCaptionSelector,
      postImageSelector,
      postAuthorSelector
    );

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
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    const url = `https://www.instagram.com/explore/tags/${tag}`;
    await page.goto(url);
    console.log(`Open url ${url}`);
    console.log(`Waiting to load page...`);
    
    await page.waitForSelector(postCardSelector);
    await page.waitForSelector(postImageSelector);
    
    await page.exposeFunction("extractId", extractId);

  const posts = await page.evaluate(
    async (postCardSelector, postImageSelector) => {
      console.log(`Page Loaded successfully.`);
      const postElements = document.querySelectorAll(postCardSelector);
      
      const scrapPosts = [];

      for (const postElement of postElements) {
        const img = postElement.querySelector(postImageSelector);
        const id = await window.extractId(postElement.parentElement.href); // Extract ID from href
        scrapPosts.push({ id, imgUrl: img.src, alt: img.alt });
      }   
      
      return scrapPosts;
    },
    postCardSelector,
    postImageSelector,
  );
  
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
  try {
    const captionPromiseArray = [];
    posts.forEach(async (post) => {
      captionPromiseArray.push(scrapPostById(post.id));
    });
    const postData = await Promise.all(captionPromiseArray);
    for (let i = 0; i < posts.length; i++) {
      posts[i].caption = postData[i].caption;
      posts[i].time = postData[i].time;
      posts[i].postImgUrl = postData[i].postImgUrl;
      posts[i].author = postData[i].author;
    }
    console.log("Successfully popultated the posts with captions.");
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
