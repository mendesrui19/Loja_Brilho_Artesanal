const fs = require('fs');

async function main() {
  const data = JSON.parse(fs.readFileSync('instagram-feed.json', 'utf8'));
  let updated = false;

  for (const post of data) {
    if (!post.media_url && post.permalink) {
      console.log(`Fetching image for ${post.id}...`);
      try {
        const res = await fetch(`https://api.microlink.io/?url=${post.permalink}`);
        const result = await res.json();
        if (result.status === 'success' && result.data && result.data.image && result.data.image.url) {
          post.media_url = result.data.image.url;
          updated = true;
          console.log(`-> Success`);
        } else {
          console.log(`-> Failed to extract`);
        }
      } catch (err) {
        console.error(`-> Error:`, err.message);
      }
      // slight delay
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  if (updated) {
    fs.writeFileSync('instagram-feed.json', JSON.stringify(data, null, 2));
    fs.writeFileSync('instagram-feed.js', `window.__IG_FEED__ = ${JSON.stringify(data, null, 2)};\n`);
    console.log('Updated instagram-feed.json with real images!');
  } else {
    console.log('No updates made.');
  }
}

main();
