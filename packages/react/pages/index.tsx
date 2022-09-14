import data from "data/thumbnails.json";
import Image from "lib/Image";
import {NextPage} from "next";


const IndexPage: NextPage = () => {

  // Render
  const renderThumbnails = () => {
    const items = data;
    // const items = data.slice(0, 1);

    return items.map((item) => {
      const src = item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url;
      return <Image key={item.id} width={200} height={200} src={src}/>
    });
  }

  const render = () => {
    return <div className="w-full flex flex-col gap-2">
      <span className="text-lg font-bold">@flaze/image</span>
      {/*<div className="h-[2000px] w-[1px] block"></div>*/}

      <div className="w-full flex flex-row flex-wrap gap-2">
        {renderThumbnails()}
      </div>
    </div>;
  }

  return render();
};

export default IndexPage;
