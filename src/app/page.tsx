import Link from "next/link";

const MOVIE_POSTERS = [
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/fast_and_the_furious_tokyo_drift_500x749.jpg?v=1707237847",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/28d0faf9de168c73ab4bfdd7db130f58_fa9b1dec-c0b1-4ba8-895e-3b090f3a5ee1_500x749.jpg?v=1573617508",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/5bf771612fa650d35559de93e3f30298_7cea7641-42c1-4ebd-ad28-21b24ef91bd8_500x749.jpg?v=1573593721",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/LaLaLand.24x36_500x749.jpg?v=1708547804",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/spider-man-across-the-spider-verse_jwnpnzm9_500x749.jpg?v=1675889160",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ca11daeac999969feee8e4c0e6e9234b_12b34982-2b14-481e-bd7b-1a408b23056a_500x749.jpg?v=1573590240",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/aladdin.adv.mpw.119123_500x749.jpg?v=1707409612",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/770b31fb605aed904377be7c0ad16c6b_70eecec3-5da6-4f88-81a5-ad865b30b279_500x749.jpg?v=1573588570",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/3e8f2abe00484d52fd509f90e5aa0bc0_89446a3e-b53d-48b8-bee6-8062262db32c_500x749.jpg?v=1573585539",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/7d3e10f2161704190ddb29f2736d69fb_6a0783cc-d2fe-420d-ae72-0a0c467db7bf_500x749.jpg?v=1573587299",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/mission_impossible__the_final_reckoning_500x749.jpg?v=1733261099",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/jurassicpark.mpw_500x749.jpg?v=1713805481",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/Alien.mpw.114883_500x749.jpg?v=1715178006",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/pulpfiction.2436_500x749.jpg?v=1620048742",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/8e1f927e7957ddc344894216377da49d_95812745-21a4-4779-8882-3599a2e913cb_500x749.jpg?v=1573655066",
  "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/ToyStory.mpw.102287_500x749.jpg?v=1709331779",
];

const InfiniteSlider = () => {
  return (
    <div className="relative m-auto w-full overflow-hidden bg-transparent before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_100%)] after:content-['']">
      <div className="animate-infinite-scroll flex w-[calc(500px*10)]">
        {MOVIE_POSTERS.concat(MOVIE_POSTERS).map((poster, index) => (
          <div className="slide flex w-[500px] items-center justify-center" key={index}>
            <img src={poster} alt={`Movie ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-8 bg-gradient-to-b from-[#D2B48C] to-[#483C32] text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[#6A4325]">Reel Reviews</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/pageFour"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Rate A Movie →</h3>
            <div className="text-lg">
              Rate movies easily - Click here to rate your favorite films and share your reviews.
            </div>
          </Link>
          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/pageFive"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Your Ratings →</h3>
            <div className="text-lg">
              View rated movies - Click here to see the films you've already rated and reviewed.
            </div>
          </Link>
          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/pageTwo"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Leave Feedback →</h3>
            <div className="text-lg">
              Rate our WebApp - leave comments, questions, and concerns here!
            </div>
          </Link>
          <Link
            className="flex flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/pageThree"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">About Us →</h3>
            <div className="text-lg">
              Learn about the student behind it all! - information here
            </div>
          </Link>
        </div>
      </div>
      <InfiniteSlider />
    </main>
  );
}
