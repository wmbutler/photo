# photos

This project is a sandbox for testing drag and drop ideas for categorizing photos. I have a vision for being able to sit round a table with friends and/or family and drop photos into albums visually.

Ideally, people could sit around a large digital table with "stacks" of photos and drag them into albums, buckets, people, tags etc. These buckets could be shared with certain groups of people via open apis. Wouldn't it be cool to drop pictures into grandma's picture frame directly to your friend's shared album?

The real problem is not the technology but the fact that Google Photos (my personal favorite) doesn't have an API for managing this process. This puts my idea in an awkward position, because it was never my intention to develop a full photo sharing service, but rather harness the API of an existing service to make the categorization of photos a more shared experience. Everyone seems to like sifting through photos, almost like assembling a puzzle.

Long term, I can see this API moving to augmented reality so people could hand photos to one another virtually or over long distances.

# installation

This project uses nodejs so you must have that and mpn installed.

```
git clone git@github.com:wmbutler/photo.git
cd photo
npm install
node server.js
```

Point browser to: <a target="_blank" href="http://localhost:3000/dropzones.html">http://localhost:3000/dropzones.html</a>

![sample16dc8.png](https://www.steemimg.com/images/2016/09/15/sample16dc8.png)
