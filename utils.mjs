async function goto(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0' });
}

function delay(time) {
   return new Promise(resolve => setTimeout(resolve, time * 1000));
}

export {
  goto,
  delay,
};
